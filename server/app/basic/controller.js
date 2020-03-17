var constants = require('../../services/constants');
function BasicController() {
    this.responseCodes =  constants.responseCodes;
}

BasicController.prototype = {
    check: function(req, res) {
        res.send(this.responseCodes.success.successWithoutContent);
    }
}

module.exports = new BasicController();