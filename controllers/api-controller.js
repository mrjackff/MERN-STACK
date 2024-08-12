const userModel = require('../models/user-model');

class apiController {
    getUser = async (req, res) => {
        try {
            let userData = await userModel.find({ age: { $gte: 15 } });
            res.send({
                data: userData,
                status: "Data Fetched Success"
            })
        }
        catch (err) {
            res.send({
                data: err,
                status: "Error"
            })
        }
    };
}


module.exports = new apiController();