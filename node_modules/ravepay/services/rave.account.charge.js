var morx = require('morx');
var charge = require('./rave.charge');
var q = require('q');

var spec =  morx.spec()
				.build('currency', 'required:false, eg:NGN') 
				.build('country', 'required:false, eg:NG')    
				.build('amount', 'required:true, eg:10') 
				.build('phonenumber', 'required:false, eg:10')
				.build('billingzip', 'required:false, eg:10')    
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
				.build('accountbank', 'required:true, eg:044')
				.build('accountnumber', 'required:true,validators:isNumeric, eg:06900021')
				.build('payment_type', 'required:false,eg:2017-05-10')
				.build('is_internet_banking', 'required:false,eg:2017-05-10')
				.build('include_integrity_hash', 'required:false,eg:2017-05-10')		
				.end();


function service(data, _rave){

	var d = q.defer();
	q.fcall( () => {

		var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
		var params = validated.params;

		params.country = params.country || "NG";
		params.payment_type = "account";

		return charge(params, _rave);

	})
	.then( resp => {

		d.resolve(resp);

	})
	.catch( err => {

		d.reject(err);

	});

	return d.promise;

}
service.morxspc = spec;
module.exports = service;