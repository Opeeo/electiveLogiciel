const { response } = require('express')
const express = require('express')
const router = express.Router()
const {getSensors, getSensorsId, setSensors, deleteSensors, updateSensor} = require('../controller/sensorsController')


module.exports = router

router.get('/', getSensors)

router.get('/:id', getSensorsId)

router.post('/', setSensors)

router.delete('/:id', deleteSensors)

router.put('/:id', updateSensor)