(function () {

    var schema = require("../DB/dbSchema"),
        db = require("../DB/dbQuery"),
        util = require("../Utils/tool"),
        sliced = require("sliced"),
        async = require("async");

    var orderCls = {};

    var order = schema.Order,
        food = schema.Food,
        menu = schema.Menu,
        user = schema.User;

    var getJoinedTable = function getJoinedTable() {

        var allColumns = sliced(order.columns).concat(sliced(menu.columns).concat(sliced(food.columns).concat(sliced(user.columns)))),

            sql = order.select(allColumns)
                .from(
                    order.leftJoin(menu).on(order.MenuId.equals(menu.idMenu))
                        .leftJoin(user).on(order.UserId.equals(user.idUser))
                        .leftJoin(food).on(menu.FoodId.equals(food.idFood))
                );

        return sql;

    };

    orderCls.listByPeriod = function (req, res) {

        var dateParam = util.getQuery(req, {"from": "from", "to": "to"}),

            sql = getJoinedTable()
                .where(menu.Date.gte(dateParam.from).and(menu.Date.lte(dateParam.to)))
                .order(order.OrderTime)
                .toQuery();

        db.runSql(sql.text, sql.values, function (err, rows, fields) {
            if (!err) res.json(rows);
        });

    };

    orderCls.listByUserPeriod = function (req, res) {

        var dateParam = util.getQuery(req, {"from": "from", "to": "to", "user": "user"}),

            sql = getJoinedTable()
                .where(menu.Date.gte(dateParam.from)
                    .and(menu.Date.lte(dateParam.to))
                    .and(order.UserId.equals(dateParam.user)))
                .order(order.OrderTime)
                .toQuery();

        db.runSql(sql.text, sql.values, function (err, rows, fields) {
            if (!err) res.json(rows);
        });

    };

    orderCls.listByUser = function (req, res) {

        var dateParam = util.getQuery(req, { "user": "user"}),

            sql = getJoinedTable()
                .where(order.UserId.equals(dateParam.user))
                .order(order.OrderTime)
                .toQuery();

        db.runSql(sql.text, sql.values, function (err, rows, fields) {
            if (!err) res.json(rows);
        });

    };

    orderCls.userAddOrder = function (req, res) {

        var dateParam = util.getQuery(req, { "user": "UserId", "menus": "menus"});


    };

    orderCls.userCancelOrder = function (req, res) {

        var dateParam = util.getQuery(req, { "user": "UserId", "orderNumber": "idOrder"});

        //if the now() < menu.endDate, continue to delete
        async.series([
            function(cb){

                var  sql = order.select(["idOrder", "endDate"])
                    .from(order.join(menu).on(order.MenuId.equals(menu.idMenu)))
                    .where(dateParam).toQuery();

                db.runSql(sql.text, sql.values, function (err, rows, fields) {
                    if (!err){

                       if(rows.length > 0){
                            if(new Date(rows[0]["endDate"]) < new Date()){
                                err = {"ERROR": "The menu is closed, the order cannot be changed now."};
                            }
                       } else {
                           err = {"ERROR": "There is no such order."};
                       }

                    }
                    cb(err, rows);
                });

            },
            function(cb){

                var  sql = order.delete().where(dateParam).toQuery();

                db.runSql(sql.text, sql.values, function (err, results) {
                        cb(err, results);
                });

            }
        ],
        function (err, results) {

            res.json(results && results[1] || err);

        });

    };

    module.exports = orderCls;





})();