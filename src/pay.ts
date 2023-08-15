import {
  Pay as PayEvent
} from "../generated/Payment/Payment"
import {
  Payment,
  DirectDeposit
} from "../generated/schema"
import { log } from '@graphprotocol/graph-ts'

export function handlePayment(
  event: PayEvent
): void {
  let entity = new Payment(
    event.params.id.toString()
  )
  entity.sender = event.params.sender
  entity.token = event.params.inToken
  if (event.params.note.length > 0) {
    entity.note = event.params.note
  }

  let deposit = DirectDeposit.load(entity.id)
  if (deposit != null) {
    deposit.payment = entity.id
    deposit.save()

    entity.delegated_deposit = deposit.id
    entity.save()
  }
  else {
    log.error('Deposit {} not found', [entity.id])
  }
}
