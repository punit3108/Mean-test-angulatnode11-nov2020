
var mongoose = require('mongoose');
var userMasterModel = require('./../model/user')


exports.add = function (req, res) {


    if (req.body._id) {
        var id = req.body._id
        delete req.body._id
        userMasterModel.update({ _id: id }, { $set: req.body }, function (err, doc) {
            if (err) {
                console.log(err)
                res.json({ status: false, message: "something went worng" })
            } else {
                res.json({ status: true, data: doc })
            }
        })

    } else {
        userMasterModel.find({ Email_id: req.body.Email_id,is_deleted : false }, function (err, doc) {

            console.log('jhgdsjf',doc)
            if (err) {
                res.json({ status: false, message: "something went worng" })
            } else if (doc.length > 0) {
                res.json({ status: false, message: "email id is already exist." })
            } else {

                userMasterModel.create(req.body, function (err, doc) {
                    if (err) {
                        console.log(err)
                        res.json({ status: false, message: "something went worng" })
                    } else {
                        res.json({ status: true, data: doc })
                    }
                })
            }
        })
    }
}

exports.list = function (req, res) {
    userMasterModel.find({is_deleted : false} , function (err, doc) {
        if (err) {
            res.json({ status: false, message: "something went worng" })
        } else {
            res.json({ status: true, data: doc })
        }
    })

}

exports.edit = function (req, res) {
    userMasterModel.find({ _id: req.params['id'] }, function (err, doc) {
        if (err) {
            res.json({ status: false, message: "something went worng" })
        } else {
            res.json({ status: true, data: doc })
        }
    })
    //res.json({status:true, data:req.params})
}

exports.delete = function(req,res){
    var id = req.params['id']
    userMasterModel.update({ _id: id }, { $set: {is_deleted : true} }, function (err, doc) {
        if (err) {
            console.log(err)
            res.json({ status: false, message: "something went worng" })
        } else {
            res.json({ status: true, data: doc })
        }
    })
}