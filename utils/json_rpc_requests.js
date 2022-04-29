const { ethers } = require("ethers");
const { dec_to_hex } = require("./util");

function generate_get_block_by_number_json_rpc(block_numbers, include_transactions){
    let blocks_rpc = []
    for (const idx in block_numbers) {
        if (Object.hasOwnProperty.call(block_numbers, idx)) {
            const block_number = block_numbers[idx];
            const single_rpc =  generate_json_rpc(
                method='eth_getBlockByNumber',
                params=[dec_to_hex(block_number), true],
                request_id=idx
            )
            blocks_rpc.push(single_rpc)
        }
    }
    return blocks_rpc
}


function* generate_trace_block_by_number_json_rpc(block_numbers){
    for (const key in block_numbers) {
        if (Object.hasOwnProperty.call(block_numbers, key)) {
            const block_number = block_numbers[key];
            yield generate_json_rpc(
                method='debug_traceBlockByNumber',
                params=[dec_to_hex(block_number), {'tracer': 'callTracer'}],
                //save block_number in request ID, so later we can identify block number in response
                request_id=block_number,
            )
        }
    }
}

function* generate_get_receipt_json_rpc(transaction_hashes){
    for (const idx in transaction_hashes) {
        if (Object.hasOwnProperty.call(transaction_hashes, idx)) {
            const transaction_hash = transaction_hashes[idx];
            yield generate_json_rpc(
                method='eth_getTransactionReceipt',
                params=[transaction_hash],
                request_id=idx
            )        
        }
    }
}

function* generate_get_code_json_rpc(contract_addresses, block='latest'){
    for (const idx in contract_addresses) {
        if (Object.hasOwnProperty.call(contract_addresses, idx)) {
            const contract_address = contract_addresses[idx];
            yield generate_json_rpc(
                method='eth_getCode',
                params=[contract_address,block instanceof Number? ethers.utils.hexlify(block) : block],
                request_id=idx
            )
        }
    }
}


function generate_json_rpc(method, params, request_id=1){
    return {
        'jsonrpc': '2.0',
        'method': method,
        'params': params,
        'id': request_id,
    }
}

module.exports = {generate_get_block_by_number_json_rpc, generate_trace_block_by_number_json_rpc,generate_get_receipt_json_rpc,generate_get_code_json_rpc}