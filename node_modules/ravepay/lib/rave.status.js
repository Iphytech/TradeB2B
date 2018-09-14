
var requery = require('../services/rave.status');
var xrequery = require('../services/rave.xstatus');
function Status(RaveBase){


	this.requery = function (data) {

		return requery(data, RaveBase);

	}

	this.xrequery = function (data) {

		return xrequery(data, RaveBase);

	}


}
module.exports = Status;