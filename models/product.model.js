const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    qty: {
        type: Number,
        required: false,
        default: 0
    },
    image: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
