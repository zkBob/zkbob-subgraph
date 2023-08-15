import {
  CompleteDirectDepositBatch as CompleteDirectDepositBatchEvent,
  RefundDirectDeposit as RefundDirectDepositEvent,
  SubmitDirectDeposit as SubmitDirectDepositEvent,
  DD as DirectDepoistQueue
} from "../generated/DDQueue/DD"
import {
  DirectDeposit,
} from "../generated/schema"
import { log } from '@graphprotocol/graph-ts'
import { keepBlock } from "./utils"

export function handleSubmitDirectDeposit(
  event: SubmitDirectDepositEvent
): void {
  let entity = new DirectDeposit(
    event.params.nonce.toString()
  )
  entity.index = event.params.nonce
  entity.sender = event.params.sender
  entity.fallbackUser = event.params.fallbackUser
  entity.zkAddress_diversifier = event.params.zkAddress.diversifier
  entity.zkAddress_pk = event.params.zkAddress.pk
  entity.deposit = event.params.deposit

  entity.bnInit = event.block.number
  entity.tsInit = event.block.timestamp
  entity.txInit = event.transaction.hash

  entity.pending = true
  entity.completed = false
  entity.refunded = false

  let DDcontract = DirectDepoistQueue.bind(event.address);
  entity.fee = DDcontract.getDirectDeposit(event.params.nonce).fee;

  entity.save()
  
  keepBlock(event.block.number)
}

export function handleCompleteDirectDepositBatch(
  event: CompleteDirectDepositBatchEvent
): void {
  for (let i = 0; i < event.params.indices.length; i++) {
    const idx = event.params.indices[i]
    let deposit = DirectDeposit.load(idx.toString());

    if (deposit != null) {
      deposit.pending = false;
      deposit.completed = true;

      deposit.bnClosed = event.block.number
      deposit.tsClosed = event.block.timestamp
      deposit.txClosed = event.transaction.hash

      deposit.save()
    }
    else {
      log.error('Deposit {} not found', [idx.toString()]);
    }

  }

  keepBlock(event.block.number)
}

export function handleRefundDirectDeposit(
  event: RefundDirectDepositEvent
): void {
  let deposit = DirectDeposit.load(event.params.nonce.toString());

  if (deposit != null) {
    deposit.pending = false;
    deposit.refunded = true;

    deposit.bnClosed = event.block.number
    deposit.tsClosed = event.block.timestamp
    deposit.txClosed = event.transaction.hash

    deposit.save()
  }
  else {
    log.error('Deposit {} not found', [event.params.nonce.toString()]);
  }

  keepBlock(event.block.number)
}