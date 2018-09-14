var morxcha = require('../index');
var q = require('q');
function serviceMethod(data){
	if(!data.id)
		throw ("id is required");
	if(!data.email)
		throw("email is required");
	if(!data.fullname)
		throw("fullname is required");
	if(!data.pubkey){
		//throw("pubkey is required");
	}


	return "success";
}



function serviceMethodPromise(data){
	var d = q.defer();

	q.fcall( function (){
	if(!data.id)
		throw ("id is required");
	if(!data.email)
		throw("email is required");
	if(!data.fullname)
		throw("fullname is required");
	if(!data.pubkey){
		//throw("pubkey is required");
	}

	return data;
	})
	.then( reda => { d.resolve(reda); })
	.catch( err => { d.reject(err); } )


	return d.promise;
}

var sampleSpec = {
	id:{ required:true, eg:"89", eg_invalid:"ab", eg_alreadyexists:"20"},
	email:{ required:true, eg:"89@gmail.com"},
	fullname:{ required:true, eg:"dewala Alao"},
	pubkey:{ required:false, eg:"SAM-993049-YEU"},
}

morxcha.describeThis(sampleSpec, serviceMethod, {TestName:"MorxCha FirstTest",IsPromiseMethod:false});

morxcha.describeThis(sampleSpec, serviceMethodPromise, {TestName:"MorxCha FirstTest Promises",IsPromiseMethod:true});