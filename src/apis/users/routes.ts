import express from "express"
import { registerUser, loginUser, sendNewTokens, updateUser, logoutUser, getUsers, getMe, getUserById, addAvatar } from "./index"
import { JWTAuthMiddleware } from "../../lib/JWTMiddleware"
import { cloudinaryUploader } from "../../lib/fileUpload"
import { } from "../../lib/fileUpload.js"


const userRouter = express.Router()


userRouter.post("/account", registerUser)

userRouter.post("/session", loginUser)

userRouter.post("/me/avatar", JWTAuthMiddleware, cloudinaryUploader, addAvatar)

userRouter.post("/session/refresh", sendNewTokens)

userRouter.put("/me", JWTAuthMiddleware, updateUser)

userRouter.delete("/session", logoutUser)

userRouter.get("/", getUsers)

userRouter.get("/me", JWTAuthMiddleware, getMe)

userRouter.get("/:id", getUserById)

export default userRouter