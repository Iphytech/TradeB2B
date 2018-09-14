var morx = require('morx');
var q = require('q');

var spec = morx.spec()
                .build('flwRef', 'required:true, eg:FLW002983839')
                .end();


function service(data, _rave) {
    var d = q.defer();

    q.fcall(() => {
        var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
        var params = validated.params;

        return params;
    })
    .then(params => {
        params.SECKEY = _rave.getSecretKey();
        return _rave.request('/flwv3-pug/getpaidx/api/capture', params);
    })
    .then(resp => {
        d.resolve(resp);
    })
    .catch(err => {
        d.reject(err);
    });

    return d.promise;
}

service.morxspc = spec;
module.exports = service;