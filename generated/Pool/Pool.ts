// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Message extends ethereum.Event {
  get params(): Message__Params {
    return new Message__Params(this);
  }
}

export class Message__Params {
  _event: Message;

  constructor(event: Message) {
    this._event = event;
  }

  get index(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get hash(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get message(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }
}

export class Pool extends ethereum.SmartContract {
  static bind(address: Address): Pool {
    return new Pool("Pool", address);
  }
}
