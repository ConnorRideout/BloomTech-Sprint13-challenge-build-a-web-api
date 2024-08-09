const express = require('express')
const server = express()

const projectRouter = require('./projects/projects-router')

server.use(express.json())

server.use('/api/projects', projectRouter)


server.use((err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({ message: err.message })
})

module.exports = server;
