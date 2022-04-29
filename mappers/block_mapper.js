const { BLOCK } = require("../domain/block")
const { hex_to_dec, to_normalized_address } = require("../utils/util")
const { KYNNOTransactionMapper } = require("./transaction_mapper")

class KYNNOBlockMapper {
    constructor(transaction_mapper=false) {
        if (transaction_mapper){
            this.transaction_mapper = new KYNNOTransactionMapper()
        }else{
            this.transaction_mapper = null
        }
    }
    json_dict_to_block(json_dict){
        let block = BLOCK
        block.number = json_dict['number']
        block.hash = json_dict['hash']
        block.parent_hash = json_dict['parentHash']
        block.nonce = json_dict['nonce']
        block.sha3_uncles = json_dict['sha3Uncles']
        block.logs_bloom = json_dict['logsBloom']
        block.transactions_root = json_dict['transactionsRoot']
        block.state_root = json_dict['stateRoot']
        block.receipts_root = json_dict['receiptsRoot']
        block.miner = to_normalized_address(json_dict['miner'])
        block.difficulty = hex_to_dec(json_dict['difficulty'])
        block.total_difficulty = hex_to_dec(json_dict['totalDifficulty'])
        block.size = hex_to_dec(json_dict['size'])
        block.extra_data = json_dict['extraData']
        block.gas_limit = hex_to_dec(json_dict['gasLimit'])
        block.gas_used = hex_to_dec(json_dict['gasUsed'])
        block.timestamp = hex_to_dec(json_dict['timestamp'])
        block.base_fee_per_gas = hex_to_dec(json_dict['baseFeePerGas'])
        if (json_dict['transactions'].length>0){
            let transactions_data = []
            for (const key in json_dict['transactions']) {
                if (Object.hasOwnProperty.call(json_dict['transactions'], key)) {
                    const tx = json_dict['transactions'][key];
                    const tx_js = this.transaction_mapper.json_dict_to_transaction(tx, block.timestamp)
                    transactions_data.push(tx_js)
                }
                
            }
            block.transactions = transactions_data
            block.transaction_count = json_dict['transactions'].length
        }
        return block
    }
    block_to_dict(self, block){
        return {
            'type': 'block',
            'number': block.number,
            'hash': block.hash,
            'parent_hash': block.parent_hash,
            'nonce': block.nonce,
            'sha3_uncles': block.sha3_uncles,
            'logs_bloom': block.logs_bloom,
            'transactions_root': block.transactions_root,
            'state_root': block.state_root,
            'receipts_root': block.receipts_root,
            'miner': block.miner,
            'difficulty': block.difficulty,
            'total_difficulty': block.total_difficulty,
            'size': block.size,
            'extra_data': block.extra_data,
            'gas_limit': block.gas_limit,
            'gas_used': block.gas_used,
            'timestamp': block.timestamp,
            'transaction_count': block.transaction_count,
            'base_fee_per_gas': block.base_fee_per_gas
        }
    }
}
module.exports = {KYNNOBlockMapper }