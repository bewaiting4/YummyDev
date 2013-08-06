var schema = require("../DB/dbSchema"),
    db = require("../DB/dbQuery");

exports.list = db.getAllWhere(schema.User);

exports.update = db.updateBy(schema.User, "idUser", "id");

exports.add = db.insert(schema.User);

exports.del = db.deleteWhere(schema.User, {"id": "idUser"});