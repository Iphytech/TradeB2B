var morx = require('morx');
var q = require('q');

var spec =  morx.spec()
				.build('cardno', 'required:false,validators:isNumeric, eg:5590131743294314')
				.build('currency', 'required:false, eg:NGN')
				.build('suggested_auth', 'required:false, eg:VBVSECURECODE') 
				.build('country', 'required:false, eg:NG')
				.build('settlement_token', 'required:false, eg:NG')
				.build('cvv', 'required:false, eg:544')   
				.build('amount', 'required:true, eg:10') 
				.build('phonenumber', 'required:false, eg:10')
				.build('billingzip', 'required:false, eg:10') 
				.build('expiryyear', 'required:false, eg:18') 
				.build('expirymonth', 'required:false, eg:02')  
				.build('email', 'required:true, eg:debowalefaulkner@gmail.com')
				.build('firstname', 'required:false, eg:lawal')
				.build('lastname', 'required:false, eg:garuba')
				.build('IP', 'required:true, eg:127.0.0.1')
				.build('narration', 'required:false, eg:89938910') 
				.build('txRef', 'required:true, eg:443342') 
				.build('meta', 'required:false') 
				.build('pin', 'required:false, eg:3321') 
				.build('bvn', 'required:false, eg:1234567890') 
				.build('charge_type', 'required:false, eg:recurring-monthly')  
				.build('device_fingerprint', 'required:false,eg:12233') 
				.build('recurring_stop', 'required:false,eg:2017-05-10')
				.build('accountbank', 'required:false, eg:044')
				.build('accountnumber', 'required:false,validators:isNumeric, eg:06900021')
				.build('payment_type', 'required:false,eg:2017-05-10')
				.build('is_internet_banking', 'required:false,eg:2017-05-10')
				.build('is_ussd', 'required:false,eg:2017-05-10')
				.build('is_mpesa', 'required:false,eg:2017-05-10')
				.build('is_qr', 'required:false,eg:2017-05-10')
				.build('is_mcash', 'required:false,eg:2017-05-10')
				.build('include_integrity_hash', 'required:false,eg:2017-05-10')
				.build('orderRef', 'required:false,eg:2017-05-10')
				.end();

function service(data, _rave){

	var d = q.defer();

	q.fcall( () => {

		var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
		var params = validated.params;

		return params;

	})
	.then( params  => {


		if(params.include_integrity_hash){

			delete params.include_integrity_hash;
			var integrity_hash = _rave.getIntegrityHash(params, _rave.getPublicKey(), _rave.getSecretKey());
			params.QUERY_STRING_DATA = JSON.parse(JSON.stringify(params));
			params.QUERY_STRING_DATA.integrity_hash = integrity_hash;

			//console.log(params);
			
			
		}
		//console.log(params);
		var encrypted = _rave.encrypt(params);
		var payload = {};
		payload.PBFPubKey = _rave.getPublicKey();
		payload.client = encrypted;
		payload.alg = '3DES-24';
		//console.log(payload);
		return _rave.request('flwv3-pug/getpaidx/api/charge', payload)
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