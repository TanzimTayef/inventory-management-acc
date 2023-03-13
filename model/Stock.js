const mongoose = require('mongoose');
const validator = require('validator');
const {ObjectId} = mongoose.Schema.Types;

const stockSchema = mongoose.Schema({
   productId: {
    type: ObjectId,
    required: true,
    ref: "Product"
   },
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Please provide a name for stock"],
        // unique: [true, "Name must be unique"],
        minLength: [3, "Name must be at least 3 character"],
        maxLength: [100, "Name is too learg."]
    },
    descripiton: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values : ["kg", "pcs", "liter", "bag"],
            message: "{VALUE} can't be kg/pcs/liter/bag"
        }
    },
    imageULRs: [{
        type:String,
        required: true,
        validate: [validator.isURL, "Please provide a valid URL(s)"]
    }],
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative."]
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Porduct quantity can't be negative."]
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: ObjectId,
            ref: "Brand",
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: {
                values: ["in-stock", "out-of-stcok", "discontinued"],
                messsage: "Status can't be {VALUE}"
            }
        },
        store: {
            name: {
                type: String,
                trim: true,
                required: [true, "Please provide a name"],
                lowercase: true,
                enum: {
                    values: ["dhaka","chattogram", "rajshahi", "sylhet", "khulna", "barisal", "ranpur"],
                    message: "{VALUE} is not a valid name"
                }
            },
            id: {
                type: ObjectId,
                required: true,
                ref: "Store"
            }
        },
        suppliedBy: {
            name: {
                type: String,
                trim: true,
                required: [true, "Please provide supplier a name"],
                
            },
            id: {
                type: ObjectId,
                ref: "Supplier"
            }
        },
        sellCount: {
            type: Number,
            default: 0,
            min: 0
        }
    }

}, {timestamps: true});

const Stock = mongoose.model("Stock", stockSchema);
 
module.exports = Stock;