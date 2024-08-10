const Actions = require('./actions-model')


async function validateId(req, res, next) {
    try {
        const { id } = req.params
        const action = await Actions.get(id)
        if (action) {
            req.action = action
            next()
        } else {
            next({ status: 404, message: `There is no action with an ID of ${id}` })
        }
    } catch (err) {
        next(err)
    }
}

function validateBody(validateCompleted = false) {
    return async function (req, res, next) {
        const validate = item => {
            return (
                item &&
                typeof item === 'string' &&
                item.trim()
            )
        }
        const { project_id, description, notes, completed } = req.body
        // add the project_id to params so the projects middleware validateId works
        req.params.id = project_id
        if (
            validate(description) &&
            validate(notes) &&
            (validateCompleted ? typeof completed === 'boolean' : true)
        ) {
            if (description.length <= 128) {
                next()
            } else {
                next({ status: 400, message: "description cannot be longer than 128 characters" })
            }
        } else {
            next({ status: 400, message: `'description' and 'notes'${validateCompleted ? " and 'completed'" : ""} are required` })
        }
    }
}


module.exports = {
    validateId,
    validateBody,
}