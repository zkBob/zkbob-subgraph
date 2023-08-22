import { Bytes } from '@graphprotocol/graph-ts'
import { Message as MessageEvent } from "../generated/Pool/Pool"
import { keepBlock,
  isDelegatedDeposit,
  prepareOperation,
} from "./utils"
import { CustomABIDecoder } from "./abiDecoder"
import { 
  PoolTx,
  ZkCommon
} from "../generated/schema"
import { 
  TREE_INDEX_STEP,
  TX_TYPE_DELEGATED_DEPOSIT
} from './constants'

export function handleMessage(event: MessageEvent): void {
  const common_id = event.params.index.toString()
  let data: Bytes = event.transaction.input
  let entity = new PoolTx(common_id)
  entity.index = event.params.index.minus(TREE_INDEX_STEP)
  entity.tx = event.transaction.hash
  entity.ts = event.block.timestamp
  entity.all_messages_hash = event.params.hash
  entity.gas_used = event.receipt ? event.receipt!.gasUsed.toI32() : 0
  entity.message = event.params.message
  entity.calldata = data

  let zk = new ZkCommon(common_id)
  zk.pooltx = entity.id

  let type: u32
  if (isDelegatedDeposit(data)) {
    type = TX_TYPE_DELEGATED_DEPOSIT
  } else {
    type = CustomABIDecoder.txType(data)
  }
  let operation_id: string = prepareOperation(common_id, type, data, entity, zk)
  zk.save()

  entity.type = type
  entity.operation = operation_id

  entity.zk = zk.id
  entity.save()

  keepBlock(event.block.number);
}
