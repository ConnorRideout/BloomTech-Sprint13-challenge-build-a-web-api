const Projects = require('./projects-model')

async function validateId(req, res, next) {
    try {
        const { id } = req.params
        const proj = await Projects.get(id)
        if (proj) {
            req.project = proj
            next()
        } else {
            next({ status: 404, message: `There is no project with an ID of ${id}` })
        }
    } catch (err) {
        next(err)
    }
}

function validateBody(validateCompleted = false) {
    return function (req, res, next) {
        const validate = item => {
            return (
                item &&
                typeof item === 'string' &&
                item.trim()
            )
        }
        const { name, description, completed } = req.body
        if (validate(name) && validate(description) && (validateCompleted ? typeof completed === 'boolean' : true)) {
            next()
        } else {
            next({ status: 400, message: `'name' and 'description'${validateCompleted ? " and 'completed'" : ""} are required` })
        }
    }
}


module.exports = {
    validateId,
    validateBody,
}