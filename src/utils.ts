import { LastSyncBlock } from "../generated/schema"
import { BigInt, Bytes } from '@graphprotocol/graph-ts'

export function keepBlock(
  block: BigInt
): void {
  // keccak256('zkbob.operations-last-block')
  const lb_id = Bytes.fromHexString('0x7c4094d0a7f0084b32f81ba62f2813a564893ae84c891571087195dc4adc398d')
  let lastBlock = LastSyncBlock.load(lb_id); 
  if (lastBlock == null) {
    lastBlock = new LastSyncBlock(lb_id)
  }
  lastBlock.block = block
  lastBlock.save()
}
