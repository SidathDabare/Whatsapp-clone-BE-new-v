import express from "express"
import { JWTAuthMiddleware } from "../../../lib/JWTMiddleware"
import { createChat, getMyChats, getMessageHistory } from "./index"


const chatRouter = express.Router()

chatRouter.get("/", JWTAuthMiddleware, getMyChats)

chatRouter.post("/", JWTAuthMiddleware, createChat)

chatRouter.get("/:id", getMessageHistory )


export default chatRouter