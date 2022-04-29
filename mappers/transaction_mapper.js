const { TRANSACTION } = require("../domain/transaction")
const { hex_to_dec, to_normalized_address } = require("../utils/util")
const Web3 = require('web3');
class KYNNOTransactionMapper{
    constructor() {
        this.web3 = new Web3()
    }
    decode_input(input_data){
        console.log("input_data",input_data);
        const ascii_data = this.web3.utils.hexToAscii(input_data)
        return ascii_data
    }
    json_dict_to_transaction(json_dict,blocktimestamp){
        console.log("json_dict",json_dict);
        let transaction = TRANSACTION
        transaction.hash = json_dict['hash']
        transaction.nonce = hex_to_dec(json_dict['nonce'])
        transaction.block_hash = json_dict['blockHash']
        transaction.block_number = hex_to_dec(json_dict['blockNumber'])
        transaction.block_timestamp = blocktimestamp
        transaction.transaction_index = hex_to_dec(json_dict['transactionIndex'])
        transaction.from_address = to_normalized_address(json_dict['from'])
        transaction.to_address = to_normalized_address(json_dict['to'])
        transaction.value = hex_to_dec(json_dict['value'])
        transaction.gas = hex_to_dec(json_dict['gas'])
        transaction.gas_price = hex_to_dec(json_dict['gasPrice'])
        transaction.input = json_dict['input']
        transaction.max_fee_per_gas = hex_to_dec(json_dict['maxFeePerGas'])
        transaction.max_priority_fee_per_gas = hex_to_dec(json_dict['maxPriorityFeePerGas'])
        transaction.transaction_type = hex_to_dec(json_dict['type'])
        return transaction
    }

    transaction_to_dict(transaction){
        return {
            'type': 'transaction',
            'hash': transaction.hash,
            'nonce': transaction.nonce,
            'block_hash': transaction.block_hash,
            'block_number': transaction.block_number,
            'block_timestamp': transaction.block_timestamp,
            'transaction_index': transaction.transaction_index,
            'from_address': transaction.from_address,
            'to_address': transaction.to_address,
            'value': transaction.value,
            'gas': transaction.gas,
            'gas_price': transaction.gas_price,
            'input': transaction.input,
            'max_fee_per_gas': transaction.max_fee_per_gas,
            'max_priority_fee_per_gas': transaction.max_priority_fee_per_gas,
            'transaction_type': transaction.transaction_type
        }
    }
}
module.exports = {KYNNOTransactionMapper }