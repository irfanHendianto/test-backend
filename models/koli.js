const mongoose = require('mongoose');

const KoliSchema = new mongoose.Schema({
    koli_length:  {type: Number , required: true},
    awb_url: {type: String , required: true},
    koli_chargeable_weight:  {type: Number , required: true},
    koli_width: {type: Number , required: true},
    koli_surcharge: [
        {type: Number , required: true}
    ],
    koli_height:  {type: Number , required: true},
    koli_description:{type: String , required: true},
    koli_formula_id: {type: String , required: true},
    connote_id: {type: String , required: true},
    koli_volume: {type: Number , required: true},
    koli_weight: {type: Number , required: true},
    koli_id: {type: String , required: true},
    koli_custom_field: {
        awb_sicepat: {type: String , required: true},
        harga_barang: {type: String , required: true}
    },
    koli_code: {type: String , required: true}
},{
    timestamps:true
})
const Koli = mongoose.model('koli', KoliSchema);

module.exports = {Koli}