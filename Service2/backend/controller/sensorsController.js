const asyncHandler = require('express-async-handler')

const Sensor = require('../models/sensorsModel')
const User = require('../models/usersModel')


const sensors = [
    {id:1, type:'alpha', datas:[1,2,3]},
    {id:2, type:'beta', datas:[1,2,3], metrics:false},
    {id:3, type:'omega', datas:{a:1,b:2}},
]

// @desc  Get all sensors
//@route GET /api/sensors
//@access Private
const getSensors = asyncHandler(async(req, res) => {
    const sensors = await Sensor.find({user: req.user.id})
    res.status(200).json(sensors)
})

// @desc  Get a specific sensor by id
//@route GET /api/sensors/:id
//@access Private
const getSensorsId = asyncHandler(async(req, res) => {
    const sensor = await Sensor.findById(req.params.id)
    if(!sensor){
        res.status(400)
        throw new Error('Sensor not found')
    }
    res.status(200).json(sensor)
})

// @desc  Create a new sensor
//@route POST /api/sensors
//@access Private
const setSensors = asyncHandler(async(req, res) => {
    if (!req.body.type){
        res.status(400)
        throw new Error('Add a type')
    }
    const sensor = await Sensor.create({
        type: req.body.type,
        datas: req.body.datas,
        metrics: req.body.metrics,
        user: req.user.id
    })
    res.status(201).json(sensor)
})


// @desc  Update a sensor
//@route PUT /api/sensors/:id
//@access Private
const updateSensor = asyncHandler(async(req, res) => {
    const sensor = await Sensor.findById(req.params.id)
    if(!sensor){
        res.status(400)
        throw new Error('Sensor not found')
    }

    //const user = await User.findById(req.user.id)
    //Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    //Make sur the logged in user matches the sensor user
    if(sensor.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedSensor = await Sensor.findByIdAndUpdate(req.params.id, req.body, {new: true,})
    res.status(200).json(updatedSensor)
})

// @desc  Delete a sensor
//@route DELETE /api/sensors/:id
//@access Private
const deleteSensors = asyncHandler(async(req, res) => {
    const sensor = await Sensor.findById(req.params.id)
    if(!sensor){
        res.status(400)
        throw new Error('Sensor not found')
    }

    //const user = await User.findById(req.user.id)
    //Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    //Make sur the logged in user matches the sensor user
    if(sensor.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await sensor.remove()
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getSensors,
    getSensorsId,
    setSensors,
    updateSensor,
    deleteSensors,
}