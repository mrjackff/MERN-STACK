const userModel = require('../models/user-model');

var jwt = require('jsonwebtoken');

class apiController {
    login = async (req, res) => {
        try {
            console.log(req.body)
            let userData = await userModel.findOne({ email: req.body.email });
            console.log(userData)
            if (userData) {
                let User = new userModel();
                let checkPassword = User.compareHash(req.body.password, userData.password);
                console.log(checkPassword)

                if (checkPassword == true) {
                    let payload = {
                        id: userData._id,
                        email: userData.email,
                    }
                    let expTime = '12h';

                    var token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:expTime});

                    res.status(200).send({
                        data:userData,
                        message : "Login Successful",
                        token: token,
                    })
                }
                else {
                    res.status(200).send({
                        status:"Email or Password is Wrong"
                    });
                }
            }else{
                res.status(200).send({status: "User not found"});
            }
        }catch (err) {
            console.log(err)
            res.send({
                data: err,
                status: "Failed to connect with server please try again later !"
            })
        }
    }

    signup = async (req, res) => {
        try {
            console.log(req.body);
            let existingUser = await userModel.findOne({
                $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }]
            });
            if (existingUser) {
                return res.status(200).send({
                    status: "User already exists with the given email or phone number"
                });
            }

            let newUser = new userModel();
            newUser.email = req.body.email;
            newUser.phoneNumber = req.body.phoneNumber; 
            newUser.password = newUser.generateHash(req.body.password);
            newUser.name = req.body.name; 

            let savedUser = await newUser.save();
            console.log(savedUser);
            let payload = {
                email: savedUser.email,
                phoneNumber: savedUser.phoneNumber,
            };
            let expTime = '12h';
            var token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expTime });
            res.status(200).send({
                data: savedUser,
                message: "Signup Successful",
                token: token,
            });
        } catch (err) {
            console.log(err);
            res.send({
                data: err,
                status: "Failed to connect with server, please try again later!"
            });
        }
    };
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