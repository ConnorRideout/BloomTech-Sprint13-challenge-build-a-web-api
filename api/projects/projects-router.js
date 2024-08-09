const express = require('express')
const Projects = require('./projects-model')
const {
    validateId,
    validateBody
} = require('./projects-middleware')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const projs = await Projects.get()
        res.status(200).json(projs)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', validateId, (req, res, next) => {
    try {
        res.status(200).json(req.project)
    } catch (err) {
        next(err)
    }
})

router.post('/', validateBody(), async (req, res, next) => {
    try {
        const newProj = await Projects.insert(req.body)
        res.status(201).json(newProj)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', validateId, validateBody(true), async (req, res, next) => {
    try {
        const updatedProj = await Projects.update(req.params.id, req.body)
        res.status(200).json(updatedProj)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', validateId, async (req, res, next) => {
    try {
        const del = await Projects.remove(req.params.id)
        res.status(200).send()
    } catch (err) {
        next(err)
    }
})

router.get('/:id/actions', validateId, async (req, res, next) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id)
        res.status(200).json(actions)
    } catch (err) {
        next(err)
    }
})


module.exports = router