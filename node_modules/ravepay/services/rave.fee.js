var morx = require('morx');
var q = require('q');

var spec =  morx.spec() 
				.build('amount', 'required:true, eg:NGN') 
				.build('card6', 'required:false, eg:NGN') 
				.build('ptype', 'required:false, eg:NGN')
				.build('currency', 'required:false, eg:NGN') 
				.end();

function service(data, _rave){

	var d = q.defer();

	q.fcall( () => {

		var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
		var params = validated.params;

		params.currency = params.currency || "NGN";
		params.ptype = params.ptype || 1;


		return params;

	})
	.then( params  => {

		 
		params.PBFPubKey = _rave.getPublicKey();  
		return _rave.request('flwv3-pug/getpaidx/api/fee', params)
	})
	.then( response => {

		//console.log(response);
		d.resolve(response);

	})
	.catch( err => {

		d.reject(err);

	})

	return d.promise;
	
	

}
service.morxspc = spec;
module.exports = service;