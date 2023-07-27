import { BigInt } from '@graphprotocol/graph-ts'

export const TX_TYPE_DEPOSIT = 0
export const TX_TYPE_TRANSFER = 1
export const TX_TYPE_WITHDRAWAL = 2
export const TX_TYPE_PERMITTABLE_DEPOSIT = 3
export const TX_TYPE_DELEGATED_DEPOSIT = 100

export const BI_ZERO = BigInt.fromU32(0)