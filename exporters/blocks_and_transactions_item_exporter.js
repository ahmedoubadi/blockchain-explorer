const { CompositeItemExporter } = require("./composite_item_exporter")

BLOCK_FIELDS_TO_EXPORT = [
    'number',
    'hash',
    'parent_hash',
    'nonce',
    'sha3_uncles',
    'logs_bloom',
    'transactions_root',
    'state_root',
    'receipts_root',
    'miner',
    'difficulty',
    'total_difficulty',
    'size',
    'extra_data',
    'gas_limit',
    'gas_used',
    'timestamp',
    'transaction_count',
    'base_fee_per_gas'
]

TRANSACTION_FIELDS_TO_EXPORT = [
    'hash',
    'nonce',
    'block_hash',
    'block_number',
    'transaction_index',
    'from_address',
    'to_address',
    'value',
    'gas',
    'gas_price',
    'input',
    'block_timestamp',
    'max_fee_per_gas',
    'max_priority_fee_per_gas',
    'transaction_type'
]


function blocks_and_transactions_item_exporter(blocks_output=None, transactions_output=None){
    return new CompositeItemExporter(
        filename_mapping={
            'block': blocks_output,
            'transaction': transactions_output
        },
        field_mapping={
            'block': BLOCK_FIELDS_TO_EXPORT,
            'transaction': TRANSACTION_FIELDS_TO_EXPORT
        }
    )
}
module.exports = {blocks_and_transactions_item_exporter}
