var ethers = require('ethers'); 
const Web3 = require('web3');
var DEFAULT_TIMEOUT = 60


function get_provider_from_uri(uri_string, timeout=DEFAULT_TIMEOUT, batch=false){
    /*uri = urlparse(uri_string)
    if uri.scheme == 'file':
        if batch:
            return BatchIPCProvider(uri.path, timeout=timeout)
        else:
            return IPCProvider(uri.path, timeout=timeout)
    elif uri.scheme == 'http' or uri.scheme == 'https':
        request_kwargs = {'timeout': timeout}
        if batch:
            return BatchHTTPProvider(uri_string, request_kwargs=request_kwargs)
        else:
            return HTTPProvider(uri_string, request_kwargs=request_kwargs)
    else:
        raise ValueError('Unknown uri scheme {}'.format(uri_string))*/
    //new ethers.providers.JsonRpcProvider(uri_string)
    const web3 = new Web3(uri_string)
    return web3
}
module.exports = {get_provider_from_uri }