import { BigInt, Bytes, log } from '@graphprotocol/graph-ts'
import { 
  PoolTx, ZkCommon,
  LastSyncBlock,
  DirectDeposit,
  DepositOperation,
  TransferOperation,
  WithdrawalOperation,
  PermittableDepositOperation,
  DDBatchOperation
} from "../generated/schema"
import { CustomABIDecoder, appendDirectDepositsArgs } from "./abiDecoder"
import { 
  TX_TYPE_DELEGATED_DEPOSIT,
  TX_TYPE_DEPOSIT,
  TX_TYPE_TRANSFER,
  TX_TYPE_WITHDRAWAL,
  TX_TYPE_PERMITTABLE_DEPOSIT
} from './constants'

export function keepBlock(
  block: BigInt
): void {
  // keccak256('zkbob.operations-last-block')
  const lb_id = Bytes.fromHexString('0x7c4094d0a7f0084b32f81ba62f2813a564893ae84c891571087195dc4adc398d')
  let lastBlock = LastSyncBlock.load(lb_id)
  if (lastBlock == null) {
    lastBlock = new LastSyncBlock(lb_id)
  }
  lastBlock.block = block
  lastBlock.save()
}

export function isDelegatedDeposit(data: Bytes): bool {
  // first 4 bytes of keccak256('appendDirectDeposits(uint256,uint256[],uint256,uint256[8],uint256[8])')
  // log.info('Bytes to compare {}, {}, {}, {}', [data[0].toString(), data[1].toString(), data[2].toString(), data[3].toString()])
  return (data[0] == 0x1d && data[1] == 0xc4 && data[2] == 0xcb && data[3] == 0x33)
}

function prepareDepositOperation(
  id: string,
  data: Bytes,
  pooltx: PoolTx
): DepositOperation {
  let operation = new DepositOperation(id)
  operation.pooltx = pooltx.id
  operation.nullifier = CustomABIDecoder.transferNullifier(data)
  operation.index_ref = CustomABIDecoder.transferIndex(data)
  operation.token_amount = CustomABIDecoder.transferTokenAmount(data)
  operation.fee = CustomABIDecoder.fee(data)
  operation.save()

  return operation
}

function prepareTransferOperation(
  id: string,
  data: Bytes,
  pooltx: PoolTx
): TransferOperation {
  let operation = new TransferOperation(id)
  operation.pooltx = pooltx.id
  operation.nullifier = CustomABIDecoder.transferNullifier(data)
  operation.index_ref = CustomABIDecoder.transferIndex(data)
  operation.fee = CustomABIDecoder.fee(data)
  operation.save()

  return operation
}

function prepareWithdrawalOperation(
  id: string,
  data: Bytes,
  pooltx: PoolTx
): WithdrawalOperation {
  let operation = new WithdrawalOperation(id)
  operation.pooltx = pooltx.id
  operation.nullifier = CustomABIDecoder.transferNullifier(data)
  operation.index_ref = CustomABIDecoder.transferIndex(data)
  operation.energy_amount = CustomABIDecoder.transferEnergyAmount(data)
  operation.token_amount = CustomABIDecoder.transferTokenAmount(data)
  operation.fee = CustomABIDecoder.fee(data)
  operation.native_amount = CustomABIDecoder.nativeAmount(data)
  operation.receiver = CustomABIDecoder.receiver(data)
  operation.save()

  return operation
}

function preparePermittableDepositOperation(
  id: string,
  data: Bytes,
  pooltx: PoolTx
): PermittableDepositOperation {
  let operation = new PermittableDepositOperation(id)
  operation.pooltx = pooltx.id
  operation.nullifier = CustomABIDecoder.transferNullifier(data)
  operation.index_ref = CustomABIDecoder.transferIndex(data)
  operation.token_amount = CustomABIDecoder.transferTokenAmount(data)
  operation.fee = CustomABIDecoder.fee(data)
  operation.permit_deadline = CustomABIDecoder.permitDeadline(data)
  operation.permit_holder = CustomABIDecoder.permitHolder(data)
  operation.sig = CustomABIDecoder.signRvs(data)
  operation.save()

  return operation
}

function prepareDDBatchOperation(
  id: string,
  data: Bytes,
  pooltx: PoolTx,
  zk: ZkCommon
): DDBatchOperation {
  const dd_data: appendDirectDepositsArgs = CustomABIDecoder.decodeDelegatedDeposit(data)
  zk.out_commit = dd_data.out_commit
  zk.witness = dd_data.batch_proof
  zk.tree_root_after = dd_data.root_after
  zk.tree_proof = dd_data.tree_proof

  let operation = new DDBatchOperation(id)
  operation.pooltx = pooltx.id

  let dd_list = new Array<string>(dd_data.indices.length)
  for (let i: i32 = 0; i < dd_data.indices.length; i++) {
    let dd = DirectDeposit.load(dd_data.indices[i].toString())
    if (dd != null) {
      dd_list[i] = dd.id
    } else {
      log.error('Cannot discover DD: {}', [dd_data.indices[i].toString()])
    }
  }
  operation.delegated_deposits = dd_list
  operation.save()

  return operation
}

export function prepareOperation(
  id: string,
  type: u32,
  data: Bytes,
  pooltx: PoolTx,
  zk: ZkCommon
): string {
  let operation_id: string = ""
  if (type == TX_TYPE_DELEGATED_DEPOSIT) {
    const operation = prepareDDBatchOperation(id, data, pooltx, zk)
    operation_id = operation.id
  } else {
    zk.out_commit = CustomABIDecoder.transferOutCommit(data)
    zk.witness = CustomABIDecoder.transferProof(data)
    zk.tree_root_after = CustomABIDecoder.treeRootAfter(data)
    zk.tree_proof = CustomABIDecoder.treeProof(data)

    if (type == TX_TYPE_DEPOSIT) {
      const operation = prepareDepositOperation(id, data, pooltx)
      operation_id = operation.id
    } else if (type == TX_TYPE_WITHDRAWAL) {
      const operation = prepareWithdrawalOperation(id, data, pooltx) 
      operation_id = operation.id
    } else if (type == TX_TYPE_PERMITTABLE_DEPOSIT) {
      const operation = preparePermittableDepositOperation(id, data, pooltx) 
      operation_id = operation.id
    } else if (type == TX_TYPE_TRANSFER) {
      const operation = prepareTransferOperation(id, data, pooltx) 
      operation_id = operation.id
    } 
  }
  if (operation_id == "") {
    log.error('Incorrect type: {}', [type.toString()])
  }
  return operation_id
}