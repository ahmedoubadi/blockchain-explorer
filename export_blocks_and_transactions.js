//http://localhost:8545/

const { blocks_and_transactions_item_exporter } = require("./exporters/blocks_and_transactions_item_exporter")
const { ExportBlocksJob } = require("./jobs/export_blocks_job")
const { get_provider_from_uri } = require("./providers/auto")

async function export_blocks_and_transactions(start_block, end_block, batch_size, provider_uri, max_workers, blocks_output,
    transactions_output){
    //"""Exports blocks and transactions."""
    if (!blocks_output && !transactions_output){
        console.warn('Either --blocks-output or --transactions-output options must be provided')
        return
    }
    let job = new ExportBlocksJob(
        start_block=start_block,
        end_block=end_block,
        batch_size=batch_size,
        batch_web3_provider=get_provider_from_uri(provider_uri, batch=true),
        max_workers=max_workers,
        item_exporter=blocks_and_transactions_item_exporter(blocks_output, transactions_output),
        export_blocks=blocks_output?blocks_output:false,
        export_transactions=transactions_output?transactions_output:false
    )
    const blocks = await job._export_batch()
    return blocks
}
module.exports = {export_blocks_and_transactions }