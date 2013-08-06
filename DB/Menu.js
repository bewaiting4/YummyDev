var schema = require("../DB/dbSchema"),
    db = require("../DB/dbQuery"),
    util = require("../Utils/tool"),
    sliced = require("sliced");


exports.list = function (req, res) {

    var menu = schema.Menu,
        food = schema.Food,
        vendor = schema.Vendor,
        allColumns = sliced(menu.columns).concat(sliced(food.columns).concat(sliced(vendor.columns))),

        sql = menu.select(allColumns)
            .from(
                menu.leftJoin(food).on(menu.FoodId.equals(food.idFood))
                    .leftJoin(vendor).on(food.VendorId.equals(vendor.idVendor))
            )
            .where(food.isAvailable.equals("use"))
            .order(menu.Date)
            .toQuery();

    db.runSql(sql.text, sql.values, function (err, rows, fields) {
        if(!err) res.json(rows);
    });

};

exports.listByDate = function (req, res) {

    var menu = schema.Menu,
        food = schema.Food,
        vendor = schema.Vendor,
        allColumns = sliced(menu.columns).concat(sliced(food.columns).concat(sliced(vendor.columns))),
        dateParam = util.getQuery(req, {"date": "Date"}),

        sql = menu.select(allColumns)
            .from(
                menu.leftJoin(food).on(menu.FoodId.equals(food.idFood))
                    .leftJoin(vendor).on(food.VendorId.equals(vendor.idVendor))
            )
            .where(food.isAvailable.equals("use").and(menu.Date.equals(dateParam.Date)))
            .order(menu.Date)
            .toQuery();

    db.runSql(sql.text, sql.values, function (err, rows, fields) {
        if(!err) res.json(rows);
    });
};

exports.del = db.deleteWhere(schema.Menu, {"status": "saved"}, {"date": "Date"});

exports.add = function (req, res) {

    var dateParam = util.getQuery(req, {"date": "Date", "foods": "foods"});


};

exports.submit = function (req, res) {

};

exports.updateItem = function (req, res) {

};

exports.delItem = db.deleteWhere(schema.Menu, {"status": "saved"}, {"id": "idMenu"});


exports.addItem = db.insert(schema.Menu, {"status": "saved"}, {"id": "idMenu"});