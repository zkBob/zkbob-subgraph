import { Message as MessageEvent } from "../generated/Pool/Pool"
import { keepBlock } from "./utils"

export function handleMessage(event: MessageEvent): void {
  keepBlock(event.block.number)
}
