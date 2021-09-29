const {Package} = require('../../models/packageModels');
const {Koli} = require('../../models/koli');
const {Connote} = require('../../models/connote');
const mongoose = require('mongoose');


const addPackage = async (req,res,next) =>{
    try {
        let dataKoli = req.body.koli_data;
        let array = [];
        const connote = new Connote({
            connote_id: req.body.connote.connote_id,
            connote_number: req.body.connote.connote_number,
            connote_service: req.body.connote.connote_service,
            connote_service_price:  req.body.connote.connote_service_price,
            connote_amount:  req.body.connote.connote_amount,
            connote_code: req.body.connote.connote_code,
            connote_booking_code: req.body.connote.connote_booking_code || "null",
            connote_order:  req.body.connote.connote_order,
            connote_state: req.body.connote.connote_state,
            connote_state_id:  req.body.connote.connote_state_id,
            zone_code_from: req.body.connote.zone_code_from,
            zone_code_to: req.body.connote.zone_code_to,
            surcharge_amount: req.body.connote.surcharge_amount || "null",
            transaction_id: req.body.transaction_id,
            actual_weight: req.body.connote.actual_weight,
            volume_weight:  req.body.connote.volume_weight,
            chargeable_weight:  req.body.connote.chargeable_weight,
            organization_id:  req.body.connote.organization_id,
            location_id: req.body.location_id,
            connote_total_package: req.body.connote.connote_total_package,
            connote_surcharge_amount: req.body.connote.connote_surcharge_amount,
            connote_sla_day: req.body.connote.connote_sla_day,
            location_name: req.body.connote.location_name,
            location_type: req.body.connote.location_type,
            source_tariff_db: req.body.connote.source_tariff_db,
            id_source_tariff: req.body.connote.id_source_tariff,
            pod: req.body.connote.pod || "null",
            history: req.body.connote.history
        });
    
        dataKoli.forEach(element => {
            const koli = new Koli ({
                koli_length:  element.koli_length,
                awb_url: element.awb_url,
                koli_chargeable_weight:  element.koli_chargeable_weight,
                koli_width: element.koli_width,
                koli_surcharge: element.koli_surcharge,
                koli_height:  element.koli_height,
                koli_description:element.koli_description,
                koli_formula_id: element.koli_formula_id || "null",
                connote_id: req.body.connote.connote_id,
                koli_volume: element.koli_volume,
                koli_weight: element.koli_weight,
                koli_id: element.koli_id,
                koli_custom_field: {
                    awb_sicepat: element.koli_custom_field.awb_sicepat || "null",
                    harga_barang:  element.koli_custom_field.harga_barang || "null"
                },
                koli_code: element.koli_code
            });
            koli.save();
            array.push(koli._id)
        });
    
        const package = new Package({
            transaction_id: req.body.transaction_id,
            customer_name : req.body.customer_name,
            customer_code: req.body.customer_code,
            transaction_amount : req.body.transaction_amount,
            transaction_discount: req.body.transaction_discount,
            transaction_additional_field: req.body.transaction_additional_field ,
            transaction_payment_type:  req.body.transaction_payment_type,
            transaction_state: req.body.transaction_state,
            transaction_code:  req.body.transaction_code,
            transaction_order:  req.body.transaction_order,
            location_id:  req.body.location_id,
            organization_id:  req.body.organization_id,
            transaction_payment_type_name: req.body.transaction_payment_type_name,
            transaction_cash_amount: req.body.transaction_cash_amount,
            transaction_cash_change:req.body.transaction_cash_change,
            customer_attribute: {
                Nama_Sales: req.body.customer_attribute.Nama_Sales,
                TOP: req.body.customer_attribute.TOP,
                Jenis_Pelanggan: req.body.customer_attribute.Jenis_Pelanggan
            },
            origin_data:{
                customer_name: req.body.origin_data.customer_name,
                customer_address: req.body.origin_data.customer_address,
                customer_email: req.body.origin_data.customer_email,
                customer_phone: req.body.origin_data.customer_phone,
                customer_address_detail: req.body.origin_data.customer_address_detail,
                customer_zip_code: req.body.origin_data.customer_zip_code,
                zone_code: req.body.origin_data.zone_code,
                organization_id: req.body.origin_data.organization_id,
                location_id:  req.body.location_id
            },
            destination_data: {
                customer_name: req.body.destination_data.customer_name,
                customer_address: req.body.destination_data.customer_address,
                customer_email: req.body.destination_data.customer_email,
                customer_phone: req.body.destination_data.customer_phone,
                customer_address_detail: req.body.destination_data.customer_address_detail,
                customer_zip_code: req.body.destination_data.customer_zip_code,
                zone_code: req.body.destination_data.zone_code,
                organization_id: req.body.destination_data.organization_id,
                location_id:  req.body.location_id
            },
            connote_id: req.body.connote.connote_id,
            koli_data: array,
            custom_field: {
                catatan_tambahan: req.body.custom_field.catatan_tambahan
            },
            currentLocation: {
                name: req.body.currentLocation.name,
                code: req.body.currentLocation.code,
                type: req.body.currentLocation.type
            }
        });
        package.save();
        connote.save();

        res.status(200).send({
            status:200,
            message: "Success"
        })
    } catch (error) {
        res.status(400).send({
            status:400,
            message: error.message
        })
    }
   
}

const getPackage = async (req,res,next) =>{

    Package.aggregate([
        {
          $lookup: {
            from: "connotes",
            localField: "connote_id",
            foreignField: "connote_id",
            as: "connote",
          },
        },
        { $unwind: "$connote" },
        {
            $lookup: {
              from: "kolis",
              localField: "koli_data",
              foreignField: "_id",
              as: "koli_data",
            },
          },
      ])
        .then((result) => {
            res.json({
                data: result
            })
        })
        .catch((error) => {
            res.send(error)
        });
}

const getPackageById = async (req,res,next) =>{
    const idToSearch = req.params.id
    Package.aggregate([
        { $match : {transaction_id: idToSearch}},
        {
          $lookup: {
            from: "connotes",
            localField: "connote_id",
            foreignField: "connote_id",
            as: "connote",
          },
        },
        { $unwind: "$connote" },
        {
            $lookup: {
              from: "kolis",
              localField: "koli_data",
              foreignField: "_id",
              as: "koli_data",
            },
          },
      ])
        .then((result) => {
            res.json({
                data: result
            })
        })
        .catch((error) => {
            res.send(error)
        });
}

const deletePackage = async (req,res,next) =>{

    try {
        const idToSearch = req.params.id
    
        let dataPackage = await Package.findOne({transaction_id:idToSearch});
        let dataKoli = dataPackage.koli_data;
        let dataConnote = dataPackage.connote_id;
        
        dataKoli.forEach(async (element) => {
            await Koli.findByIdAndDelete({_id:element})
        });
    
        await Connote.findOneAndDelete({connote_id:dataConnote});
        await Package.findOneAndDelete({transaction_id:idToSearch});
        res.status(200).send({
            status:200,
            message: "Success"
        })
    } catch (error) {
        res.status(400).send({
            status:400,
            message: error.message
        })
    }

}

const updateDataPut = async (req,res,next) =>{
    try {
        var package = 
            {
                transaction_id: req.body.transaction_id,
                customer_name : req.body.customer_name,
                customer_code: req.body.customer_code,
                transaction_amount : req.body.transaction_amount,
                transaction_discount: req.body.transaction_discount,
                transaction_additional_field: req.body.transaction_additional_field ,
                transaction_payment_type:  req.body.transaction_payment_type,
                transaction_state: req.body.transaction_state,
                transaction_code:  req.body.transaction_code,
                transaction_order:  req.body.transaction_order,
                location_id:  req.body.location_id,
                organization_id:  req.body.organization_id,
                transaction_payment_type_name: req.body.transaction_payment_type_name,
                transaction_cash_amount: req.body.transaction_cash_amount,
                transaction_cash_change:req.body.transaction_cash_change,
                customer_attribute: {
                    Nama_Sales: req.body.customer_attribute.Nama_Sales,
                    TOP: req.body.customer_attribute.TOP,
                    Jenis_Pelanggan: req.body.customer_attribute.Jenis_Pelanggan
                },
                origin_data:{
                    customer_name: req.body.origin_data.customer_name,
                    customer_address: req.body.origin_data.customer_address,
                    customer_email: req.body.origin_data.customer_email,
                    customer_phone: req.body.origin_data.customer_phone,
                    customer_address_detail: req.body.origin_data.customer_address_detail,
                    customer_zip_code: req.body.origin_data.customer_zip_code,
                    zone_code: req.body.origin_data.zone_code,
                    organization_id: req.body.origin_data.organization_id,
                    location_id:  req.body.location_id
                },
                destination_data: {
                    customer_name: req.body.destination_data.customer_name,
                    customer_address: req.body.destination_data.customer_address,
                    customer_email: req.body.destination_data.customer_email,
                    customer_phone: req.body.destination_data.customer_phone,
                    customer_address_detail: req.body.destination_data.customer_address_detail,
                    customer_zip_code: req.body.destination_data.customer_zip_code,
                    zone_code: req.body.destination_data.zone_code,
                    organization_id: req.body.destination_data.organization_id,
                    location_id:  req.body.location_id
                },
                custom_field: {
                    catatan_tambahan: req.body.custom_field.catatan_tambahan
                },
                currentLocation: {
                    name: req.body.currentLocation.name,
                    code: req.body.currentLocation.code,
                    type: req.body.currentLocation.type
                }
     
            }
            Package.findOneAndUpdate({transaction_id: req.params.id}, {$set: package}, {new:true}).
            then(()=>{
                res.status(200).send({
                    status:200,
                    message: "Success"
                })
            });
    } catch (error) {
        res.status(400).send({
            status:400,
            message: error.message
        })
    }
}

const pacthDataPackage = async (req,res,next) =>{
    try {
        var package = {};

        for(let i in req.body){
            package[i] = req.body[i];
        }

        Package.findOneAndUpdate({transaction_id: req.params.id}, {$set: package}, {new:true}).
        then(()=>{
            res.status(200).send({
                status:200,
                message: "Success"
            })
        });
    } catch (error) {
        res.status(400).send({
            status:400,
            message: error.message
        })
    }
}

module.exports = {
    addPackage,
    getPackage,
    getPackageById,
    deletePackage,
    updateDataPut,
    pacthDataPackage
}