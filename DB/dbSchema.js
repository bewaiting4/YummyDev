(function () {

    var sql = require('sql');

    sql.setDialect('mysql');

    var schema = {};

    schema.Food = sql.define({
        name: 'Food',
        columns: [
            { name: 'idFood' },
            { name: 'FoodName' },
            { name: 'FoodDesc' },
            { name: 'FoodImg' },
            { name: 'FoodPrice' },
            { name: 'isAvailable' },
            { name: 'VendorId' }
        ]
    });

    schema.Menu = sql.define({
        name: 'Menu',
        columns: [
            { name: 'idMenu' },
            { name: 'Date' },
            { name: 'EndDate' },
            { name: 'Status' },
            { name: 'FoodId' }
        ]
    });

    schema.Order = sql.define({
        name: 'Order',
        columns: [
            { name: 'idOrder' },
            { name: 'MenuId' },
            { name: 'UserId' },
            { name: 'OrderTime' }
        ]
    });

    schema.User = sql.define({
        name: 'User',
        columns: [
            { name: 'idUser' },
            { name: 'UserName' }
        ]
    });

    schema.Vendor = sql.define({
        name: 'Vendor',
        columns: [
            { name: 'idVendor' },
            { name: 'VendorName' }
        ]
    });

    module.exports = schema;

})();