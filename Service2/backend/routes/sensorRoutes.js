const { response } = require('express')
const express = require('express')
const router = express.Router()
const {getSensors, getSensorsId, setSensors, deleteSensors, updateSensor} = require('../controller/sensorsController')

const {protect} = require('../middleware/authMiddleware')

module.exports = router

router.get('/', protect, getSensors)

router.get('/:id', protect, getSensorsId)

router.post('/', protect, setSensors)

router.delete('/:id', protect, deleteSensors)

router.put('/:id', protect, updateSensor)