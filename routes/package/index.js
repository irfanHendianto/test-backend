const express = require('express');
const router = express.Router();
const {addPackage,getPackage,getPackageById,deletePackage,updateDataPut,pacthDataPackage} = require('./PackageController');

router.post('/',addPackage);
router.get('/',getPackage);
router.get('/:id',getPackageById);
router.delete('/:id',deletePackage);
router.put('/:id',updateDataPut);
router.patch('/:id',pacthDataPackage)


module.exports = router