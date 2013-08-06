var schema = require("../DB/dbSchema"),
    db = require("../DB/dbQuery");


exports.list = db.getAllWhere(schema.Vendor);

exports.update = db.updateBy(schema.Vendor, "idVendor", "id");

exports.add = db.insert(schema.Vendor);

exports.del = db.deleteWhere(schema.Vendor, {"id": "idVendor"});