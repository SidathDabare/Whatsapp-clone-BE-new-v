import mongoose from 'mongoose'
import {ErrorRequestHandler} from 'express'

export const badRequestHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.status === 400 || err instanceof mongoose.Error.ValidationError) {
      res.status(400).send({ message: err.message, errorsList: err.errorsList })
    } else if( err instanceof mongoose.Error.CastError){
      console.log(err)
      res.status(400).send({ message:"Wrong id!"})
    } else {
      next(err)
    }
  }
  
  export const unauthorizedHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.status === 401) {
      res.status(401).send({ message: err.message })
    } else {
      next(err)
    }
  }

  export const forbiddenErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.status === 403) {
      res.status(403).send({ success: false, message: err.message })
    } else {
      next(err)
    }
  }
  
  export const notFoundHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.status === 404) {
      res.status(404).send({ success: false, message: err })
    } else {
      next(err)
    }
  }
  
  export const genericServerErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log("ERR: ", err)
    res.status(500).send({ message: "An error occurred on our side! We are gonna fix this ASAP!" })
  }