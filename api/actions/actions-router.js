const express = require('express')
const Actions = require('./actions-model')

const {
    validateId,
    validateBody
} = require('./actions-middlware')
const { validateId: validateProjId } = require('../projects/projects-middleware')

const router = express.Router()


router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get()
        res.status(200).json(actions)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', validateId, (req, res, next) => {
    try {
        res.status(200).json(req.action)
    } catch (err) {
        next(err)
    }
})

router.post('/', validateBody(), validateProjId, async (req, res, next) => {
    try {
        const newAction = await Actions.insert(req.body)
        res.status(201).json(newAction)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', validateId, validateBody(true), validateProjId, async (req, res, next) => {
    try {
        const updatedAction = await Actions.update(req.params.id, req.body)
        res.status(200).json(updatedAction)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', validateId, async (req, res, next) => {
    try {
        const del = await Actions.remove(req.params.id)
        res.status(200).send()
    } catch (err) {
        next(err)
    }
})


module.exports = router