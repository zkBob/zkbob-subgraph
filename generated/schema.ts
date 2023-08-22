// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class DirectDeposit extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DirectDeposit entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type DirectDeposit must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("DirectDeposit", id.toString(), this);
    }
  }

  static loadInBlock(id: string): DirectDeposit | null {
    return changetype<DirectDeposit | null>(
      store.get_in_block("DirectDeposit", id)
    );
  }

  static load(id: string): DirectDeposit | null {
    return changetype<DirectDeposit | null>(store.get("DirectDeposit", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get index(): BigInt {
    let value = this.get("index");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set index(value: BigInt) {
    this.set("index", Value.fromBigInt(value));
  }

  get pending(): boolean {
    let value = this.get("pending");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set pending(value: boolean) {
    this.set("pending", Value.fromBoolean(value));
  }

  get completed(): boolean {
    let value = this.get("completed");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set completed(value: boolean) {
    this.set("completed", Value.fromBoolean(value));
  }

  get refunded(): boolean {
    let value = this.get("refunded");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set refunded(value: boolean) {
    this.set("refunded", Value.fromBoolean(value));
  }

  get sender(): Bytes {
    let value = this.get("sender");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set sender(value: Bytes) {
    this.set("sender", Value.fromBytes(value));
  }

  get fallbackUser(): Bytes {
    let value = this.get("fallbackUser");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set fallbackUser(value: Bytes) {
    this.set("fallbackUser", Value.fromBytes(value));
  }

  get zkAddress_diversifier(): Bytes {
    let value = this.get("zkAddress_diversifier");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set zkAddress_diversifier(value: Bytes) {
    this.set("zkAddress_diversifier", Value.fromBytes(value));
  }

  get zkAddress_pk(): Bytes {
    let value = this.get("zkAddress_pk");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set zkAddress_pk(value: Bytes) {
    this.set("zkAddress_pk", Value.fromBytes(value));
  }

  get deposit(): BigInt {
    let value = this.get("deposit");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set deposit(value: BigInt) {
    this.set("deposit", Value.fromBigInt(value));
  }

  get fee(): BigInt {
    let value = this.get("fee");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set fee(value: BigInt) {
    this.set("fee", Value.fromBigInt(value));
  }

  get bnInit(): BigInt {
    let value = this.get("bnInit");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set bnInit(value: BigInt) {
    this.set("bnInit", Value.fromBigInt(value));
  }

  get tsInit(): BigInt {
    let value = this.get("tsInit");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set tsInit(value: BigInt) {
    this.set("tsInit", Value.fromBigInt(value));
  }

  get txInit(): Bytes {
    let value = this.get("txInit");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set txInit(value: Bytes) {
    this.set("txInit", Value.fromBytes(value));
  }

  get payment(): string | null {
    let value = this.get("payment");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set payment(value: string | null) {
    if (!value) {
      this.unset("payment");
    } else {
      this.set("payment", Value.fromString(<string>value));
    }
  }

  get bnClosed(): BigInt | null {
    let value = this.get("bnClosed");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set bnClosed(value: BigInt | null) {
    if (!value) {
      this.unset("bnClosed");
    } else {
      this.set("bnClosed", Value.fromBigInt(<BigInt>value));
    }
  }

  get tsClosed(): BigInt | null {
    let value = this.get("tsClosed");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set tsClosed(value: BigInt | null) {
    if (!value) {
      this.unset("tsClosed");
    } else {
      this.set("tsClosed", Value.fromBigInt(<BigInt>value));
    }
  }

  get txClosed(): Bytes | null {
    let value = this.get("txClosed");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set txClosed(value: Bytes | null) {
    if (!value) {
      this.unset("txClosed");
    } else {
      this.set("txClosed", Value.fromBytes(<Bytes>value));
    }
  }
}

export class Payment extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Payment entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Payment must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Payment", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Payment | null {
    return changetype<Payment | null>(store.get_in_block("Payment", id));
  }

  static load(id: string): Payment | null {
    return changetype<Payment | null>(store.get("Payment", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get sender(): Bytes | null {
    let value = this.get("sender");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set sender(value: Bytes | null) {
    if (!value) {
      this.unset("sender");
    } else {
      this.set("sender", Value.fromBytes(<Bytes>value));
    }
  }

  get delegated_deposit(): string {
    let value = this.get("delegated_deposit");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set delegated_deposit(value: string) {
    this.set("delegated_deposit", Value.fromString(value));
  }

  get token(): Bytes {
    let value = this.get("token");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set token(value: Bytes) {
    this.set("token", Value.fromBytes(value));
  }

  get note(): Bytes | null {
    let value = this.get("note");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set note(value: Bytes | null) {
    if (!value) {
      this.unset("note");
    } else {
      this.set("note", Value.fromBytes(<Bytes>value));
    }
  }
}

export class ZkCommon extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ZkCommon entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ZkCommon must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ZkCommon", id.toString(), this);
    }
  }

  static loadInBlock(id: string): ZkCommon | null {
    return changetype<ZkCommon | null>(store.get_in_block("ZkCommon", id));
  }

  static load(id: string): ZkCommon | null {
    return changetype<ZkCommon | null>(store.get("ZkCommon", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pooltx(): string {
    let value = this.get("pooltx");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set pooltx(value: string) {
    this.set("pooltx", Value.fromString(value));
  }

  get out_commit(): BigInt {
    let value = this.get("out_commit");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set out_commit(value: BigInt) {
    this.set("out_commit", Value.fromBigInt(value));
  }

  get witness(): Array<BigInt> {
    let value = this.get("witness");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigIntArray();
    }
  }

  set witness(value: Array<BigInt>) {
    this.set("witness", Value.fromBigIntArray(value));
  }

  get tree_root_after(): BigInt {
    let value = this.get("tree_root_after");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set tree_root_after(value: BigInt) {
    this.set("tree_root_after", Value.fromBigInt(value));
  }

  get tree_proof(): Array<BigInt> {
    let value = this.get("tree_proof");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigIntArray();
    }
  }

  set tree_proof(value: Array<BigInt>) {
    this.set("tree_proof", Value.fromBigIntArray(value));
  }
}

export class DepositOperation extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DepositOperation entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type DepositOperation must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("DepositOperation", id.toString(), this);
    }
  }

  static loadInBlock(id: string): DepositOperation | null {
    return changetype<DepositOperation | null>(
      store.get_in_block("DepositOperation", id)
    );
  }

  static load(id: string): DepositOperation | null {
    return changetype<DepositOperation | null>(
      store.get("DepositOperation", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pooltx(): string {
    let value = this.get("pooltx");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set pooltx(value: string) {
    this.set("pooltx", Value.fromString(value));
  }

  get nullifier(): BigInt {
    let value = this.get("nullifier");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set nullifier(value: BigInt) {
    this.set("nullifier", Value.fromBigInt(value));
  }

  get index_ref(): BigInt {
    let value = this.get("index_ref");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set index_ref(value: BigInt) {
    this.set("index_ref", Value.fromBigInt(value));
  }

  get token_amount(): BigInt {
    let value = this.get("token_amount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set token_amount(value: BigInt) {
    this.set("token_amount", Value.fromBigInt(value));
  }

  get fee(): BigInt {
    let value = this.get("fee");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set fee(value: BigInt) {
    this.set("fee", Value.fromBigInt(value));
  }
}

export class TransferOperation extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TransferOperation entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TransferOperation must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("TransferOperation", id.toString(), this);
    }
  }

  static loadInBlock(id: string): TransferOperation | null {
    return changetype<TransferOperation | null>(
      store.get_in_block("TransferOperation", id)
    );
  }

  static load(id: string): TransferOperation | null {
    return changetype<TransferOperation | null>(
      store.get("TransferOperation", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pooltx(): string {
    let value = this.get("pooltx");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set pooltx(value: string) {
    this.set("pooltx", Value.fromString(value));
  }

  get nullifier(): BigInt {
    let value = this.get("nullifier");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set nullifier(value: BigInt) {
    this.set("nullifier", Value.fromBigInt(value));
  }

  get index_ref(): BigInt {
    let value = this.get("index_ref");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set index_ref(value: BigInt) {
    this.set("index_ref", Value.fromBigInt(value));
  }

  get fee(): BigInt {
    let value = this.get("fee");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set fee(value: BigInt) {
    this.set("fee", Value.fromBigInt(value));
  }
}

export class WithdrawalOperation extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save WithdrawalOperation entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type WithdrawalOperation must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("WithdrawalOperation", id.toString(), this);
    }
  }

  static loadInBlock(id: string): WithdrawalOperation | null {
    return changetype<WithdrawalOperation | null>(
      store.get_in_block("WithdrawalOperation", id)
    );
  }

  static load(id: string): WithdrawalOperation | null {
    return changetype<WithdrawalOperation | null>(
      store.get("WithdrawalOperation", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pooltx(): string {
    let value = this.get("pooltx");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set pooltx(value: string) {
    this.set("pooltx", Value.fromString(value));
  }

  get nullifier(): BigInt {
    let value = this.get("nullifier");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set nullifier(value: BigInt) {
    this.set("nullifier", Value.fromBigInt(value));
  }

  get index_ref(): BigInt {
    let value = this.get("index_ref");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set index_ref(value: BigInt) {
    this.set("index_ref", Value.fromBigInt(value));
  }

  get energy_amount(): BigInt {
    let value = this.get("energy_amount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set energy_amount(value: BigInt) {
    this.set("energy_amount", Value.fromBigInt(value));
  }

  get token_amount(): BigInt {
    let value = this.get("token_amount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set token_amount(value: BigInt) {
    this.set("token_amount", Value.fromBigInt(value));
  }

  get fee(): BigInt {
    let value = this.get("fee");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set fee(value: BigInt) {
    this.set("fee", Value.fromBigInt(value));
  }

  get native_amount(): BigInt {
    let value = this.get("native_amount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set native_amount(value: BigInt) {
    this.set("native_amount", Value.fromBigInt(value));
  }

  get receiver(): Bytes {
    let value = this.get("receiver");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set receiver(value: Bytes) {
    this.set("receiver", Value.fromBytes(value));
  }
}

export class PermittableDepositOperation extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save PermittableDepositOperation entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PermittableDepositOperation must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PermittableDepositOperation", id.toString(), this);
    }
  }

  static loadInBlock(id: string): PermittableDepositOperation | null {
    return changetype<PermittableDepositOperation | null>(
      store.get_in_block("PermittableDepositOperation", id)
    );
  }

  static load(id: string): PermittableDepositOperation | null {
    return changetype<PermittableDepositOperation | null>(
      store.get("PermittableDepositOperation", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pooltx(): string {
    let value = this.get("pooltx");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set pooltx(value: string) {
    this.set("pooltx", Value.fromString(value));
  }

  get nullifier(): BigInt {
    let value = this.get("nullifier");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set nullifier(value: BigInt) {
    this.set("nullifier", Value.fromBigInt(value));
  }

  get index_ref(): BigInt {
    let value = this.get("index_ref");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set index_ref(value: BigInt) {
    this.set("index_ref", Value.fromBigInt(value));
  }

  get token_amount(): BigInt {
    let value = this.get("token_amount");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set token_amount(value: BigInt) {
    this.set("token_amount", Value.fromBigInt(value));
  }

  get fee(): BigInt {
    let value = this.get("fee");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set fee(value: BigInt) {
    this.set("fee", Value.fromBigInt(value));
  }

  get permit_deadline(): BigInt {
    let value = this.get("permit_deadline");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set permit_deadline(value: BigInt) {
    this.set("permit_deadline", Value.fromBigInt(value));
  }

  get permit_holder(): Bytes {
    let value = this.get("permit_holder");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set permit_holder(value: Bytes) {
    this.set("permit_holder", Value.fromBytes(value));
  }

  get sig(): Bytes {
    let value = this.get("sig");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set sig(value: Bytes) {
    this.set("sig", Value.fromBytes(value));
  }
}

export class DDBatchOperation extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DDBatchOperation entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type DDBatchOperation must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("DDBatchOperation", id.toString(), this);
    }
  }

  static loadInBlock(id: string): DDBatchOperation | null {
    return changetype<DDBatchOperation | null>(
      store.get_in_block("DDBatchOperation", id)
    );
  }

  static load(id: string): DDBatchOperation | null {
    return changetype<DDBatchOperation | null>(
      store.get("DDBatchOperation", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pooltx(): string {
    let value = this.get("pooltx");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set pooltx(value: string) {
    this.set("pooltx", Value.fromString(value));
  }

  get delegated_deposits(): Array<string> {
    let value = this.get("delegated_deposits");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toStringArray();
    }
  }

  set delegated_deposits(value: Array<string>) {
    this.set("delegated_deposits", Value.fromStringArray(value));
  }
}

export class PoolTx extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PoolTx entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PoolTx must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PoolTx", id.toString(), this);
    }
  }

  static loadInBlock(id: string): PoolTx | null {
    return changetype<PoolTx | null>(store.get_in_block("PoolTx", id));
  }

  static load(id: string): PoolTx | null {
    return changetype<PoolTx | null>(store.get("PoolTx", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get index(): BigInt {
    let value = this.get("index");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set index(value: BigInt) {
    this.set("index", Value.fromBigInt(value));
  }

  get tx(): Bytes {
    let value = this.get("tx");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set tx(value: Bytes) {
    this.set("tx", Value.fromBytes(value));
  }

  get ts(): BigInt {
    let value = this.get("ts");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set ts(value: BigInt) {
    this.set("ts", Value.fromBigInt(value));
  }

  get all_messages_hash(): Bytes {
    let value = this.get("all_messages_hash");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set all_messages_hash(value: Bytes) {
    this.set("all_messages_hash", Value.fromBytes(value));
  }

  get type(): i32 {
    let value = this.get("type");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI32();
    }
  }

  set type(value: i32) {
    this.set("type", Value.fromI32(value));
  }

  get message(): Bytes {
    let value = this.get("message");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set message(value: Bytes) {
    this.set("message", Value.fromBytes(value));
  }

  get gas_used(): i32 {
    let value = this.get("gas_used");
    if (!value || value.kind == ValueKind.NULL) {
      return 0;
    } else {
      return value.toI32();
    }
  }

  set gas_used(value: i32) {
    this.set("gas_used", Value.fromI32(value));
  }

  get zk(): string {
    let value = this.get("zk");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set zk(value: string) {
    this.set("zk", Value.fromString(value));
  }

  get operation(): string {
    let value = this.get("operation");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set operation(value: string) {
    this.set("operation", Value.fromString(value));
  }

  get calldata(): Bytes {
    let value = this.get("calldata");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set calldata(value: Bytes) {
    this.set("calldata", Value.fromBytes(value));
  }
}

export class LastSyncBlock extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save LastSyncBlock entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type LastSyncBlock must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("LastSyncBlock", id.toBytes().toHexString(), this);
    }
  }

  static loadInBlock(id: Bytes): LastSyncBlock | null {
    return changetype<LastSyncBlock | null>(
      store.get_in_block("LastSyncBlock", id.toHexString())
    );
  }

  static load(id: Bytes): LastSyncBlock | null {
    return changetype<LastSyncBlock | null>(
      store.get("LastSyncBlock", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get block(): BigInt | null {
    let value = this.get("block");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set block(value: BigInt | null) {
    if (!value) {
      this.unset("block");
    } else {
      this.set("block", Value.fromBigInt(<BigInt>value));
    }
  }
}
