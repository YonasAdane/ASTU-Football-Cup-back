import { BaseError } from "../error/customError.js";

export function errorHandler(err,req,res,next){
    if(err){
        if(err instanceof BaseError){
            return res.status(err.statusCode).json({message:err.message})
        }
        return res.status(400).json({message:err.message})
    }
    next()
}