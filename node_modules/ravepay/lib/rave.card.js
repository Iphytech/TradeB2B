
var chargeCard = require('../services/rave.card.charge');
var validateCharge = require('../services/rave.card.validate');
function Card(RaveBase){


	this.charge = function (data) {

		return chargeCard(data, RaveBase);

	}

	this.validate = function (data) {

		return validateCharge(data, RaveBase);

	}


}
module.exports = Card;