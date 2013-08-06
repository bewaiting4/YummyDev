var schema = require("../DB/dbSchema"),
    util = require("../Utils/tool"),
    db = require("../DB/dbQuery"),
    sliced = require("sliced");

exports.list = function(req, res){

    var food = schema.Food,
        vendor = schema.Vendor,
        allColumns =  sliced(food.columns).concat(sliced(vendor.columns)),

        sql = food.select(allColumns)
            .from(food.join(vendor).on(food.VendorId.equals(vendor.idVendor)))
            .where(food.isAvailable.equals("use"))
            .order(food.VendorId)
            .toQuery();

    db.runSql(sql.text, sql.values, function(err, rows, fields){
        if(!err)  res.json(rows);
    });

};

exports.update   =  db.updateBy(schema.Food, "idFood", "id");

exports.add = db.insert(schema.Food);

exports.del = db.deleteWhere(schema.Menu, {"isAvailable": "use"}, {"id": "idFood"});

exports.searchByVendorId = db.getAllWhere(schema.Food, {"isAvailable": "use"}, {"id": "VendorId"});