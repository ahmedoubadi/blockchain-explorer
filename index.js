const { export_blocks_and_transactions } = require("./export_blocks_and_transactions");
async function getblocks(){
    const blocks = await export_blocks_and_transactions(100,110,5,"http://localhost:8545/",5,true,true)
    if(blocks.length>0){
        console.log("blocks",blocks);
    } else {
        console.error("couldn't fetch any block")
    }
}
getblocks()


