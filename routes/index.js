
/************Template route**************/
exports.validateLogin = function(req, res, next){

    if (req.body.remember) {
        req.session.cookie.maxAge = 3600; //1 hour
    } else {
        req.session.cookie.expires = false;
    }

    if(req.body.username){
        req.session.user_id = req.body.username;
        res.redirect(req.nextUrl);
    }

};

exports.needLogin = function(req, res, next){

//    if (!req.session.user_id) {
//
//        res.redirect("/yummy");
//
//    } else {

        next();

//    }

};

exports.logout = function(req, res, next){

    if (req.session.user_id) {
        delete req.session.user_id;
        res.redirect("/yummy");
    }

};


/************RESTful API***************/

exports.food = require("../DB/Food");

exports.menu = require("../DB/Menu");

exports.order = require("../DB/Order");

exports.vendor = require("../DB/Vendor");

exports.user = require("../DB/User");
