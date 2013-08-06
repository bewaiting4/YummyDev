var schema = require("../DB/dbSchema"),
    db = require("../DB/dbQuery"),
    util = require("../Utils/tool"),
    sliced = require("sliced");


exports.listByPeriod = function (req, res) {

    var order = schema.Order,
        food = schema.Food,
        user = schema.User,
        allColumns = sliced(order.columns).concat(sliced(food.columns).concat(sliced(user.columns))),
        dateParam = util.getQuery(req, {"from": "from", "to": "to"}),

        sql = order.select(allColumns)
            .from(
                order.leftJoin(food).on(order.FoodId.equals(food.idFood))
                    .leftJoin(user).on(order.UserId.equals(user.idUser))
            )
            .where(order.OrderDate.gte(dateParam.from).and(order.OrderDate.lte(dateParam.to)))
            .order(order.OrderNumber)
            .toQuery();

    db.runSql(sql.text, sql.values, function (err, rows, fields) {
        if(!err) res.json(rows);
    });
};

exports.listByUserPeriod = function (req, res) {

    var order = schema.Order,
        food = schema.Food,
        user = schema.User,
        allColumns = sliced(order.columns).concat(sliced(food.columns).concat(sliced(user.columns))),
        dateParam = util.getQuery(req, {"from": "from", "to": "to", "user": "user"}),

        sql = order.select(allColumns)
            .from(
                order.leftJoin(food).on(order.FoodId.equals(food.idFood))
                    .leftJoin(user).on(order.UserId.equals(user.idUser))
            )
            .where(order.OrderDate.gte(dateParam.from)
                .and(order.OrderDate.lte(dateParam.to))
                .and(order.UserId.equals(dateParam.user)))
            .order(order.OrderNumber)
            .toQuery();

    db.runSql(sql.text, sql.values, function (err, rows, fields) {
        if(!err) res.json(rows);
    });

};

exports.listByUser = db.getAllWhere(schema.Order, {}, {"user": "UserId"});

exports.userSubmitOrder = function (req, res) {

};

exports.userCancelOrder = function (req, res) {

    /**
     * TODO if all the menu in this order number are before endDate. allow user to delete
     */

};