const userModel = require('../models/user-model');

class apiController {
    getUser = async (req, res) => {
        try {
            let userData = await userModel.find({ age: { $eq: 20 } });

            res.status(200).send({
                data: userData,
                status: "Data fetched success"
            });
        } catch (err) {
            console.log(err)
            res.send({
                data: err,
                status: "Error"
            })
        }
    };

    addUser = async (req, res) => {
        try {
            // console.log(req.body, '+++===+++')
            let User = new userModel();

            req.body.password = User.generateHash(req.body.password);
            let userData = new userModel(req.body);
            let saveData = await userData.save();

            res.send({
                data: saveData,
                status: "Data updated success"
            })
        } catch (err) {
            res.send({
                data: err,
                status: "Error"
            })
        }
    }

    getSingleUser = async (req, res) => {
        try {
            // console.log(req.params,'req.params')
            let userData = await userModel.findOne({ _id: req.params.id });

            res.status(200).send({
                data: userData,
                status: "Data fetched success"
            });
        } catch (err) {
            console.log(err)
            res.send({
                data: err,
                status: "Error"
            })
        }
    }

    updateUser = async (req, res) => {
        try {
            let updateData = await userModel.findByIdAndUpdate(req.body.id, req.body);
            let userData = await userModel.findOne({ _id: req.body.id });

            res.send({
                data: userData,
                status: "Data updated success"
            })
        } catch (err) {
            res.send({
                data: err,
                status: "Error"
            })
        }
    }

    deleteUser = async (req, res) => {
        try {
            let reqData = {
                "delete_status": true
            }
            let updateData = await userModel.findByIdAndUpdate(req.params.id, reqData);

            res.send({
                data: {},
                status: "Data updated success"
            })
        } catch (err) {
            res.send({
                data: err,
                status: "Error"
            })
        }
    }
}

module.exports = new apiController();