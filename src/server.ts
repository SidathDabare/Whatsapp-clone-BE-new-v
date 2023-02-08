import express from "express";
import { createServer } from "http";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";
import userRouter from "./apis/users/routes";
import chatRouter from "./apis/users/chats/routes";
import filesRouter from "./apis/files/index";
import { badRequestHandler, forbiddenErrorHandler, genericServerErrorHandler, notFoundHandler, unauthorizedHandler } from "./lib/errorHandlers";
import {newConnectionHandler} from "./socket/socket"


const port = process.env.PORT || 3001;

const expressServer = express();
const httpServer = createServer(expressServer);

const io = new Server(httpServer, {
  cors: {
    origin:"http://localhost:3000"
  }
});

expressServer.use(cors());
expressServer.use(express.json())

expressServer.use("/users", userRouter)
expressServer.use("/chat", chatRouter)
expressServer.use("/files", filesRouter)

io.on("connection", newConnectionHandler)


expressServer.use(badRequestHandler)
expressServer.use(unauthorizedHandler)
expressServer.use(forbiddenErrorHandler)
expressServer.use(notFoundHandler)
expressServer.use(genericServerErrorHandler)

mongoose.connect(process.env.MONGO_CON_URL!);

mongoose.connection.on("connected", () => {
  httpServer.listen(port, () => {
    console.table(listEndpoints(expressServer));
    console.log(`server is listening on port:${port}`);
  })
});
