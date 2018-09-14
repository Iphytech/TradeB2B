
var fee   = require('../services/rave.fee'); 
var banks = require('../services/rave.banks');
var disburse = require('../services/rave.disburse');

function Misc(RaveBase){


	this.getFee = function (data) {

		return fee(data, RaveBase)
		 
	}

	this.getBanks = function (){
		return banks(null, RaveBase);
	}


	this.disburse = function (data){
		return disburse(data, RaveBase);
	}



}
module.exports = Misc;