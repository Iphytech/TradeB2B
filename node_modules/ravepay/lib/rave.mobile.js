
var chargeUSSD = require('../services/rave.ussd.charge'); 

function Mobile(RaveBase){


	this.chargeUssd = function (data) {

		return chargeUSSD(data, RaveBase)
		 
	}



}
module.exports = Mobile;