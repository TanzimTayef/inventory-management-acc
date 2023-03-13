const Stock = require('../model/Stock');

exports.createStockService = async (data) => {
    const result = await Stock.create(data);
    return result;
}

exports.getStockService = async () => {
    const stocks = await Stock.find({});
    return stocks;
}

exports.getStockByIdService = async (id) => {
    const stock = await Stock.findOne({_id: id});
    return stock;
}

exports.updateStockByIdService = async (stockId, data) => {
    const stock = await Stock.updateOne({_id: stockId}, {$set: data},{
        runValidators: true
    });
    return stock;
}