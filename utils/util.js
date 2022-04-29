const Web3 = require('web3');
const { NODE_URL } = require('./constant');
const web3 = new Web3(NODE_URL)
function dec_to_hex(dec_number){
    if (!dec_number)
        return null
    try {
        return web3.utils.toHex(dec_number)
    } catch (error) {
        console.log(error);
        return dec_number
    }
}
function hex_to_dec(hex_string){
    if (!hex_string)
        return null
    try {
        return parseInt(hex_string, 16)
    } catch (error) {
        console.log(error);
        return hex_string
    }
}

function to_int_or_none(val){
    if (val instanceof Number){
        return val
    }
    if (!val){
        return None
    }
    try {
        parseInt(val)
    } catch (error) {
        return null
    }
}

function chunk_string (str, len) {
    const size = Math.ceil(str.length/len)
    const r = Array(size)
    let offset = 0
    
    for (let i = 0; i < size; i++) {
      r[i] = str.substr(offset, len)
      offset += len
    }
    
    return r
}
function to_normalized_address(address){
    if(!address || !address instanceof String){
        return address
    }
    return address.toLowerCase()
}

function validate_range(range_start_incl, range_end_incl){
    if (range_start_incl < 0 || range_end_incl < 0){
        console.log('range_start and range_end must be greater or equal to 0');
    }

    if (range_end_incl < range_start_incl){
        console.log('range_end must be greater or equal to range_start')
    }
}

function* rpc_response_batch_to_results(response){
    for (const key in response) {
        if (Object.hasOwnProperty.call(response, key)) {
            const response_item = response[key];
            yield rpc_response_to_result(response_item)
        }
    }
}


function rpc_response_to_result(response){
    /*console.log("rpc_response_to_result",response)
    let result = response['result']
    if (!result){
        let error_message = `result is None in response ${response}`
        if (!response['error']){
            error_message = error_message + ' Make sure Ethereum node is synced.'
            //When nodes are behind a load balancer it makes sense to retry the request in hopes it will go to other,
            //synced node
            console.log("error_message",error_message);
        }else if (is_retriable_error(response['error']['code'])){
            console.log("error_message",error_message);
        }
        console.log("error_message",error_message);
    }*/
    return response
}

function is_retriable_error(error_code){
    if (!error_code ){  
        return false
    }
    if (error_code instanceof Number){
        return false
    }

    // https://www.jsonrpc.org/specification#error_object
    if (error_code == -32603 || (-32000 >= error_code >= -32099)){
        return true
    }
    return false
}
const range = (start, stop, step= 1) => {
    if (stop === undefined) {
      [start, stop] = [0, start];
    }
    return Array.from({ length: Math.ceil((stop - start) / step) }, (_, i) => start + step * i);
};
/*function split_to_batches(start_incl, end_incl, batch_size){
    //"""start_incl and end_incl are inclusive, the returned batch ranges are also inclusive"""
    const batch = range(start_incl, end_incl + 1, batch_size)
    for batch_start in range(start_incl, end_incl + 1, batch_size):
        batch_end = min(batch_start + batch_size - 1, end_incl)
        yield batch_start, batch_end
}*/

function* dynamic_batch_iterator(iterable, batch_size_getter){
    let batch = []
    batch_size = batch_size_getter()
    for (const key in iterable) {
        if (Object.hasOwnProperty.call(iterable, key)) {
            const item = iterable[key];
            batch.push(item)
        }
    }
    if(batch.length>=batch_size){
        yield batch
        batch = []
        batch_size = batch_size_getter()    
    }
    if(batch.length>0){
        yield batch
    }
}

/*function pairwise(iterable){
    //"""s -> (s0,s1), (s1,s2), (s2, s3), ..."""
    a, b = itertools.tee(iterable)
    next(b, None)
    return zip(a, b)
}*/

function check_classic_provider_uri(chain, provider_uri){
    return provider_uri
}
module.exports = {hex_to_dec,to_int_or_none,chunk_string,to_normalized_address,validate_range,rpc_response_batch_to_results,
    rpc_response_to_result,is_retriable_error,dynamic_batch_iterator,check_classic_provider_uri,dec_to_hex
}