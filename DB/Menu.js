var schema = require("../DB/dbSchema"),
    db = require("../DB/dbQuery"),
    util = require("../Utils/tool"),
    sliced = require("sliced");

var menu = schema.Menu,
    food = schema.Food,
    vendor = schema.Vendor;

var getJoinTable = function () {

    var allColumns = sliced(menu.columns).concat(sliced(food.columns).concat(sliced(vendor.columns))),

        sql = menu.select(allColumns)
            .from(
                menu.leftJoin(food).on(menu.FoodId.equals(food.idFood))
                    .leftJoin(vendor).on(food.VendorId.equals(vendor.idVendor))
            );

    return sql;

}

exports.list = function (req, res) {

    var sql = getJoinTable()
        .order(menu.Date)
        .toQuery();

    db.runSql(sql.text, sql.values, function (err, rows, fields) {
        if (!err) res.json(rows);
    });

};

exports.listByDate = function (req, res) {

    var dateParam = util.getQuery(req, {"date": "Date"}),

        sql = getJoinTable()
            .where(menu.Date.equals(dateParam.Date))
            .order(menu.Date)
            .toQuery();

    db.runSql(sql.text, sql.values, function (err, rows, fields) {
        if (!err) res.json(rows);
    });

};

exports.del = db.deleteWhere(schema.Menu, {"Status": "saved"}, {"date": "Date"});

exports.submit = function (req, res) {

    var parsedQuery = util.getQuery(req),
        sql = p.schema.update({"Status": "published"}).where({"idMenu": parsedQuery.id}).toQuery();

    db.runSql(sql.text, sql.values, function (err, result) {
        if (!err) res.json(result);
    });

};

exports.updateItem = db.updateBy(schema.Menu, "idMenu", "id", {"Status": "saved"});

exports.delItem = db.deleteWhere(schema.Menu, {"Status": "saved"}, {"id": "idMenu", "date": "Date"});

exports.addItem = db.insert(schema.Menu, {"Status": "saved"}, {"id": "idMenu"});