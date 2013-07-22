var sql = require('sql');

sql.setDialect('mysql');

exports.Food = sql.define({
    name: 'Food',
    columns: [
        { name: 'idFood' },
        { name: 'FoodName' },
        { name: 'FoodDesc' },
        { name: 'FoodImg' },
        { name: 'FoodPrice' },
        { name: 'isAvailable' },
        { name: 'VendorId' },
        { name :'createTimestamp'}
    ]
});

exports.Menu = sql.define({
    name: 'Menu',
    columns: [
        { name: 'idMenu' },
        { name: 'Date' },
        { name: 'EndDate' },
        { name: 'Status' },
        { name: 'FoodId' },
        { name: 'MenuNumber'},
        { name :'createTimestamp'}
    ]
});

exports.Order = sql.define({
    name: 'Order',
    columns: [
        { name: 'idOrder' },
        { name: 'FoodId' },
        { name: 'UserId' },
        { name: 'OrderNumber' },
        { name: 'OrderDate' },
        { name :'createTimestamp'}
    ]
});

exports.User = sql.define({
    name: 'User',
    columns: [
        { name: 'idUser' },
        { name: 'UserName' },
        { name :'createTimestamp'}
    ]
});

exports.Vendor = sql.define({
    name: 'Vendor',
    columns: [
        { name: 'idVendor' },
        { name: 'VendorName' },
        { name :'createTimestamp'}
    ]
});
