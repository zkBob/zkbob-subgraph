import { BigInt, Bytes, ethereum, log } from '@graphprotocol/graph-ts'
import { 
  TX_TYPE_DEPOSIT,
  TX_TYPE_TRANSFER,
  TX_TYPE_WITHDRAWAL,
  TX_TYPE_PERMITTABLE_DEPOSIT,
  BI_ZERO
} from './constants'

export class appendDirectDepositsArgs {
  public root_after: BigInt
  public indices: Array<BigInt>
  public out_commit: BigInt
  public batch_proof: Array<BigInt>
  public tree_proof: Array<BigInt>

  constructor(
    _root_after: BigInt,
    _indices: Array<BigInt>,
    _out_commit: BigInt,
    _batch_proof: Array<BigInt>,
    _tree_proof: Array<BigInt>
  ) {
    this.root_after = _root_after
    this.indices = _indices
    this.out_commit = _out_commit
    this.batch_proof = _batch_proof
    this.tree_proof = _tree_proof
  } // !
}

export class CustomABIDecoder {
  static loadUint256(data: Bytes, pos: i32, length: i32 = 32): BigInt {
    let value: BigInt = BI_ZERO;
    for (let i: i32 = pos; i < pos + length; i++) {
      value = value.leftShift(8).bitOr(BigInt.fromI32(data[i]));
    }
    return value;
  }

  static loadInt(data: Bytes, pos: i32, length: i32 = 4): i32 {
    let value: i32 = 0;
    for (let i: i32 = pos; i < pos + length; i++) {
      value = (value << 8) | data[i];
    }
    return value;
  }

  static start_position: i32 = 4;
  static transfer_nullifier_size: i32 = 32;

  static transferNullifier(data: Bytes): BigInt {
    return CustomABIDecoder.loadUint256(data, CustomABIDecoder.start_position);
  }

  static transfer_out_commit_size: i32 = 32;
  static out_commit_size_position: i32 = CustomABIDecoder.start_position + CustomABIDecoder.transfer_nullifier_size;

  static transferOutCommit(data: Bytes): BigInt {
    return CustomABIDecoder.loadUint256(data, CustomABIDecoder.out_commit_size_position);
  }

  static transfer_index_size: i32 = 6;
  static index_position: i32 = CustomABIDecoder.out_commit_size_position + CustomABIDecoder.transfer_out_commit_size;

  static transferIndex(data: Bytes): BigInt {
    return CustomABIDecoder.loadUint256(data, CustomABIDecoder.index_position, CustomABIDecoder.transfer_index_size);
  }

  static transfer_energy_amount_size: i32 = 14;
  static energy_amount_position: i32 = CustomABIDecoder.index_position + CustomABIDecoder.transfer_index_size;

  static transferEnergyAmount(data: Bytes): BigInt {
    return CustomABIDecoder.loadUint256(data, CustomABIDecoder.energy_amount_position, CustomABIDecoder.transfer_energy_amount_size);
  }

  static transfer_token_amount_size: i32 = 8;
  static token_amount_position: i32 = CustomABIDecoder.energy_amount_position + CustomABIDecoder.transfer_energy_amount_size;

  static transferTokenAmount(data: Bytes): BigInt {
    // requires conversion to i64 and from i64 to preserve sign
    let value: BigInt = BigInt.fromI64(CustomABIDecoder.loadUint256(data, CustomABIDecoder.token_amount_position, CustomABIDecoder.transfer_token_amount_size).toI64());
    return value;
  }

  static transfer_proof_size: i32 = 256;
  static transfer_proof_position: i32 = CustomABIDecoder.token_amount_position + CustomABIDecoder.transfer_token_amount_size;
  
  static transferProof(data: Bytes): Array<BigInt> {
    let retval = new Array<BigInt>(8)
    for (let i: i32 = 0; i < 8; i++) {
      retval[i] = CustomABIDecoder.loadUint256(data, CustomABIDecoder.transfer_proof_position + i * 32)
    }
    // return Bytes.fromHexString(data.toHexString().substr(2 + CustomABIDecoder.transfer_proof_position * 2, CustomABIDecoder.transfer_proof_size * 2))
    return retval
  }

  static tree_root_after_size: i32 = 32;
  static tree_root_position: i32 = CustomABIDecoder.transfer_proof_position + CustomABIDecoder.transfer_proof_size;

  static treeRootAfter(data: Bytes): BigInt {
    return CustomABIDecoder.loadUint256(data, CustomABIDecoder.tree_root_position);
  }

  static tree_proof_size: i32 = 256;
  static tree_proof_position: i32 = CustomABIDecoder.tree_root_position + CustomABIDecoder.tree_root_after_size;

  static treeProof(data: Bytes): Array<BigInt> {
    let retval = new Array<BigInt>(8)
    for (let i: i32 = 0; i < 8; i++) {
      retval[i] = CustomABIDecoder.loadUint256(data, CustomABIDecoder.tree_proof_position + i * 32)
    }
    // return Bytes.fromHexString(data.toHexString().substr(2 + CustomABIDecoder.tree_proof_position * 2, CustomABIDecoder.tree_proof_size * 2))
    return retval
  }

  static tx_type_size: i32 = 2;
  static tx_type_position: i32 = CustomABIDecoder.tree_proof_position + CustomABIDecoder.tree_proof_size;

  static txType(data: Bytes): u32 {
    return CustomABIDecoder.loadInt(data, CustomABIDecoder.tx_type_position, CustomABIDecoder.tx_type_size);
  }

  static memo_data_size: i32 = 2;
  static memo_data_size_position: i32 = CustomABIDecoder.tx_type_position + CustomABIDecoder.tx_type_size;

  static memoDataSize(data: Bytes): u32 {
    return CustomABIDecoder.loadInt(data, CustomABIDecoder.memo_data_size_position, CustomABIDecoder.memo_data_size);
  }

  static memo_position: i32 = CustomABIDecoder.memo_data_size_position + CustomABIDecoder.memo_data_size;

  // static memoData(data: Bytes): Bytes {
  //   let memoDataSize: u32 = CustomABIDecoder.memoDataSize(data);
  //   return Bytes.fromHexString(data.toHexString().substr(2 + CustomABIDecoder.memo_position * 2, CustomABIDecoder.memoDataSize(data) * 2))
  // }

  static signRvs(data: Bytes): Bytes {
    let signRvsPos: u32 = CustomABIDecoder.memo_position + CustomABIDecoder.memoDataSize(data);
    return Bytes.fromHexString(data.toHexString().substr(2 + signRvsPos * 2, 64 * 2))
  }

  static memoFixedSize(txType: u32): u32 {
    if (txType == TX_TYPE_DEPOSIT || txType == TX_TYPE_TRANSFER) {
      // fee
      // 8
      return 8;
    } else if (txType == TX_TYPE_WITHDRAWAL) {
      // fee + native amount + recipient
      // 8 + 8 + 20
      return 36;
    } else if (txType == TX_TYPE_PERMITTABLE_DEPOSIT) {
      // fee + deadline + address
      // 8 + 8 + 20
      return 36;
    } else {
      return u32.MAX_VALUE;
    }
  }

  static memoMessage(data: Bytes, tx_type: u32): Bytes {
    let memoFixedSize: i32 = CustomABIDecoder.memoFixedSize(tx_type);
    return Bytes.fromHexString(data.toHexString().substr(2 + (CustomABIDecoder.memo_position + memoFixedSize) * 2, (CustomABIDecoder.memoDataSize(data) - memoFixedSize) * 2))
  }

  static fee_size: i32 = 8;
  static fee_pos: i32 = CustomABIDecoder.memo_position;

  static fee(data: Bytes): BigInt {
    return CustomABIDecoder.loadUint256(data, CustomABIDecoder.fee_pos, CustomABIDecoder.fee_size);
  }

  // Withdraw specific data

  static native_amount_size: i32 = 8;
  static native_amount_position: i32 = CustomABIDecoder.fee_pos + CustomABIDecoder.fee_size;

  static nativeAmount(data: Bytes): BigInt {
    return CustomABIDecoder.loadUint256(data, CustomABIDecoder.native_amount_position, CustomABIDecoder.native_amount_size);
  }

  static receiver_size: i32 = 20;
  static receiver_position: i32 = CustomABIDecoder.native_amount_position + CustomABIDecoder.native_amount_size;

  static receiver(data: Bytes): Bytes {
    return Bytes.fromHexString(data.toHexString().substr(2 + (CustomABIDecoder.receiver_position) * 2, CustomABIDecoder.receiver_size * 2))
  }

  // Permittable token deposit specific data

  static memo_permit_deadline_size: i32 = 8;
  static deadline_position: i32 = CustomABIDecoder.fee_pos + CustomABIDecoder.fee_size;

  static permitDeadline(data: Bytes): BigInt {
    return CustomABIDecoder.loadUint256(data, CustomABIDecoder.deadline_position, CustomABIDecoder.memo_permit_deadline_size);
  }

  static memo_permit_holder_size: i32 = 20;
  static holder_position: i32 = CustomABIDecoder.deadline_position + CustomABIDecoder.memo_permit_deadline_size;

  static permitHolder(data: Bytes): Bytes {
    return Bytes.fromHexString(data.toHexString().substr(2 + (CustomABIDecoder.holder_position) * 2, CustomABIDecoder.memo_permit_holder_size * 2))
  }

  static decodeDelegatedDeposit(data: Bytes): appendDirectDepositsArgs {
    let decoded = ethereum.decode(
      '(uint256,uint256,uint256,uint256[8],uint256[8])',
      Bytes.fromHexString(data.toHexString().substr(10))
    );
    if (decoded == null) {
      log.error('Cannot decode appendDirectDepositsArgs args: {}', [data.toHexString()])
    } else {
      // log.info('decoded length: {}', [decoded.toTuple().length.toString()])
      const decoded_as_tuple = decoded.toTuple()
      const dec_root = decoded_as_tuple[0].toBigInt()
      const dec_out_commit = decoded_as_tuple[2].toBigInt()
      const dec_witness = decoded_as_tuple[3].toBigIntArray()
      const dec_tree_proof = decoded_as_tuple[4].toBigIntArray()
      // log.info('decoded shift: {}', [decoded_as_tuple[1].toBigInt().toString()])
      const indices_encoded = data.toHexString().substr(10).substr(decoded_as_tuple[1].toI32() * 2)
      decoded = ethereum.decode(
        '(uint256)',
        Bytes.fromHexString(indices_encoded)
      );
      if (decoded == null) {
        log.error('Cannot get indices length: {}', [indices_encoded])
      } else {
        const indices_array_hex = indices_encoded.substr(32 * 2)
        // log.info('indices_array_hex: {}', [indices_array_hex])
        const abi_string = '(uint256[' + decoded.toTuple()[0].toI32().toString() + '])'
        decoded = ethereum.decode(
          abi_string,
          Bytes.fromHexString(indices_array_hex)
        );
        if (decoded == null) {
          log.error('Cannot get indices: {}', [indices_array_hex])
        } else {
          // log.info('decoded length: {}', [decoded.toTuple().length.toString()])
          const indices_array = decoded.toTuple()[0].toBigIntArray()
          // log.info('decoded #0: {}', [indices_array[0].toString()])
          return new appendDirectDepositsArgs(
            dec_root,
            indices_array,
            dec_out_commit,
            dec_witness,
            dec_tree_proof
          )
        }        
      }
    }
    let ids = new Array<BigInt>(1)
    ids[0] = BI_ZERO
    let proof = new Array<BigInt>(8)
    proof[0] = BI_ZERO
    proof[1] = BI_ZERO
    proof[2] = BI_ZERO
    proof[3] = BI_ZERO
    proof[4] = BI_ZERO
    proof[5] = BI_ZERO
    proof[6] = BI_ZERO
    proof[7] = BI_ZERO
    let retval: appendDirectDepositsArgs = new appendDirectDepositsArgs(
      BI_ZERO,
      ids,
      BI_ZERO,
      proof,
      proof
    )
    // log.info('appendDirectDepositsArgs: {}', [retval.indices[0].toString()])
    return retval
  }
}