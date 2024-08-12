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
    addUser = async (req ,res) => {
        console.log(req.body, '+++===+++')

        req.body.password = User.generateHash(req.body.password);
        let userData = new userModel(req.body);
        let saveData = await userData.save();

        res.send({
            data: saveData,
            status: "Data updated success"
        })
    }
}


module.exports = new apiController();