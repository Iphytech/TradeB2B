var createHash = require('sha.js');

function getKey(seckey){
    var md5 = require('md5');
    var keymd5 = md5(seckey);
    var keymd5last12 = keymd5.substr(-12);

    var seckeyadjusted = seckey.replace('FLWSECK-', '');
    var seckeyadjustedfirst12 = seckeyadjusted.substr(0, 12);

    return seckeyadjustedfirst12 + keymd5last12;
}

function encrypt(key, text)
{
    var forge    = require('node-forge'); 
    var cipher   = forge.cipher.createCipher('3DES-ECB', forge.util.createBuffer(key));
    cipher.start({iv:''});
    cipher.update(forge.util.createBuffer(text, 'utf-8'));
    cipher.finish();
    var encrypted = cipher.output;
    return ( forge.util.encode64(encrypted.getBytes()) );
}

function getIntegrityHash(data, pubkey, seckey){

    var objectKeys = Object.keys(data);
    objectKeys.sort();
    var hashString = "";
    objectKeys
    .forEach( function(ok) {

        if(ok == 'integrity_hash') return; // don't include int hash
        hashString += data[ok];

    });
    hashString += seckey;
    var hash = createHash('sha256').update(hashString, 'utf8').digest('hex');
    return hash;
}


module.exports = {
    getEncryptionKey:getKey,
    encrypt:encrypt,
    getIntegrityHash:getIntegrityHash
}
