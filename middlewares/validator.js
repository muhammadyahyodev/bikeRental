const Validators = require('../validators')

module.exports = function  (validator){
    if(!Validators.hasOwnProperty(validator)){
        throw new Error(`${validator} does not exists`)
    }
    return async function (ctx, next){
        try {
            const validated = await Validators[validator].validateAsync(ctx.request.body)
            ctx.request.body = validated
            return next()
        } catch (error) {
            if(error.isJoi){
                return ctx.body = {error: error.message, Smoothresponse: "Error on validating entities"}
            }
            return ctx.request.body = {error: error.message, message: "internal error occured"}
        }
    }
    
}
