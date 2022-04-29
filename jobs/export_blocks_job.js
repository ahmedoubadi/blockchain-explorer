const { KYNNOBlockMapper } = require("../mappers/block_mapper")
const { KYNNOTransactionMapper } = require("../mappers/transaction_mapper")
const { validate_range } = require("../utils/util")
const { PromisifyBatchRequest } = require("../utils/batch_request");

class ExportBlocksJob{
    constructor(
            start_block,
            end_block,
            batch_size,
            batch_web3_provider,
            max_workers,
            item_exporter,
            export_blocks=True,
            export_transactions=True
        ){
        validate_range(start_block, end_block)
        this.start_block = start_block
        this.end_block = end_block

        this.batch_web3_provider = batch_web3_provider

        this.item_exporter = item_exporter

        this.export_blocks = export_blocks
        this.export_transactions = export_transactions
        if (!this.export_blocks && !this.export_transactions){
            console.warn("At least one of export_blocks or export_transactions must be True");
        }
        this.block_mapper = new KYNNOBlockMapper(true)
        this.transaction_mapper = new KYNNOTransactionMapper()
    }

    _start(){
        this.item_exporter.open()
    }
    
    async _export_batch(){
        let batch = new PromisifyBatchRequest(this.batch_web3_provider);
        try {
            for (let index = this.start_block; index < this.end_block; index++) {
                batch.add(this.batch_web3_provider.eth.getBlock.request,index+1,true)
            }
            let results = await batch.execute();            
            let blocks = []
            for (const key in results) {
                if (Object.hasOwnProperty.call(results, key)) {
                    const result = results[key];
                    try {
                        const blockData = this.block_mapper.json_dict_to_block(result)
                        console.log("blockData",blockData);
                        blocks.push({...blockData})
                    } catch (error) {
                        
                    }
                }
            }
            /*for (const key in blocks) {
                if (Object.hasOwnProperty.call(blocks, key)) {
                    const block = blocks[key];
                    this._export_block(block)
                }
            }     */
            return blocks
        } catch (error) {
            console.log("error",error)
            return null
        }
            
    }

    _export_block(block){
        if (this.export_blocks){
            this.item_exporter.export_item(this.block_mapper.block_to_dict(block))
        }
        if (this.export_transactions){
            for (const key in block.transactions) {
                if (Object.hasOwnProperty.call(block.transactions, key)) {
                    const tx = block.transactions[key];
                    this.item_exporter.export_item(this.transaction_mapper.transaction_to_dict(tx))
                }
            }
        }
    }
    _end(){
        this.batch_work_executor.shutdown()
        this.item_exporter.close()
    }
}
module.exports = {ExportBlocksJob }