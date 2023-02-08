import mongoose from "mongoose";
import { RequestHandler } from "express";
import ChatModel from "./model"
import { IUserRequest } from "../../../lib/JWTMiddleware";
import createHttpError from "http-errors";


export const createChat: RequestHandler = async (req: IUserRequest, res, next) => {
  try {
    //    const chats = await ChatModel.find()

    //    const existingChat = chats.filter( chat => chat.members.includes(req.user?._id) && chat.members.includes(req.body.recipient))
    // if(existingChat){
    //     res.status(200).send(existingChat)

    // } else {
    const newChat = new ChatModel()

    newChat.members = [req.user?._id, ...req.body.recipient,]

    newChat.memberIds = [req.user?._id, ...req.body.recipient,]

    const { members } = await newChat.save()

    res.status(201).send(members)
    // }


  } catch (error) {
    next(error)
  }
}

export const getMyChats: RequestHandler = async (req: IUserRequest, res, next) => {
  try {

    const chats = await ChatModel.find().populate({
      path: 'members',
      select:
        'username email avatar'
    }).populate({
      path: 'messages',
      select:
        'sender content.text'
    })

    const myChats = chats.filter(chat => chat.memberIds.includes(req.user?._id))



    res.send({ MyChats: myChats })

    res.send(myChats)

  } catch (error) {
    next(error)
  }
}

export const getMessageHistory: RequestHandler = async (req, res, next) => {
  try {

    const chat = await ChatModel.findById(req.params.id).populate({
      path: 'messages',
      select:
        'sender content.text'
    })

    if (!chat) next(createHttpError(404, ` chat with id:${req.params.id} not found`))

    res.send(chat)
  } catch (error) {
    next(error)
  }
}