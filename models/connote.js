const mongoose = require('mongoose');

const ConnoteSchema = new mongoose.Schema({
    connote_id: {type: String , ref: 'package'},
    connote_number: {type: Number , required: true},
    connote_service: {type: String , required: true},
    connote_service_price:  {type: Number , required: true},
    connote_amount:  {type: Number , required: true},
    connote_code: {type: String , required: true},
    connote_booking_code: {type: String , required: true},
    connote_order:  {type: Number , required: true},
    connote_state: {type: String , required: true},
    connote_state_id:  {type: Number , required: true},
    zone_code_from: {type: String , required: true},
    zone_code_to: {type: String , required: true},
    surcharge_amount: {type: String , required: true},
    transaction_id: {type: String , required: true},
    actual_weight: {type: Number , required: true},
    volume_weight:  {type: Number , required: true},
    chargeable_weight:  {type: Number , required: true},
    organization_id:  {type: Number , required: true},
    location_id: {type: String , required: true},
    connote_total_package: {type: String , required: true},
    connote_surcharge_amount: {type: String , required: true},
    connote_sla_day: {type: String , required: true},
    location_name: {type: String , required: true},
    location_type: {type: String , required: true},
    source_tariff_db: {type: String , required: true},
    id_source_tariff: {type: String , required: true},
    pod: {type: String , required: true},
    history: [
        {type: String , required: true}
    ]
},{
    timestamps:true
})
const Connote = mongoose.model('connote', ConnoteSchema);

module.exports = {Connote}