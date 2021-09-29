const mongoose = require('mongoose');
const PackageSchema = new mongoose.Schema({
    
    transaction_id: {type: String,required: true,},
    customer_name : {type: String,required: true,},
    customer_code: {type: String,required: true,},
    transaction_amount : {type: String,required: true,},
    transaction_discount: {type:String, required: true},
    transaction_additional_field: {type:String} ,
    transaction_payment_type:  {type:String, required: true},
    transaction_state: {type:String, required: true},
    transaction_code:  {type:String, required: true},
    transaction_order:  {type:Number, required: true},
    location_id:  {type:String, required: true},
    organization_id:  {type:Number, required: true},
    transaction_payment_type_name: {type:String, required: true},
    transaction_cash_amount: {type:Number, required: true},
    transaction_cash_change:{type:Number, required: true},
    customer_attribute: {
        Nama_Sales: {type:String, required: true},
        TOP: {type:String, required: true},
        Jenis_Pelanggan: {type:String, required: true}
    },
    connote_id:{type: String},
    origin_data:{
        customer_name: {type: String},
        customer_address: {type: String},
        customer_email: {type: String},
        customer_phone: {type: String},
        customer_address_detail: {type: String},
        customer_zip_code: {type: String},
        zone_code: {type: String},
        organization_id: {type: Number},
        location_id: {type: String}
    },
    destination_data: {
        customer_name: {type: String},
        customer_address: {type: String},
        customer_email: {type: String},
        customer_phone: {type: String},
        customer_address_detail: {type: String},
        customer_zip_code: {type: String},
        zone_code: {type: String},
        organization_id: {type: Number},
        location_id: {type: String}
    },
    koli_data:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'koli'
        }
    ],
    custom_field: {
        catatan_tambahan: {type: String}
    },
    currentLocation: {
        name: {type: String},
        code: {type: String},
        type: {type: String}
    }
},{
    timestamps:true
})
const Package = mongoose.model('package', PackageSchema);

module.exports = {Package}