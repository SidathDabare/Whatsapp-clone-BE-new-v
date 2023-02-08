import mongoose from "mongoose" 
import { v2 as cloudinary} from "cloudinary"
 export interface User {
	name: string
	email: string
	avatar?: string
}

 export interface Chat {
	members: User[]
	messages: Message[]
}

 export interface Message {
	sender: User
	content: {
		text?: string
		media?: string
	}
	timestamp: number
}

 export interface UserDocument extends mongoose.Document,User {}
  

 export interface UsersModel extends mongoose.Model<UserDocument> {
    checkCredentials(email:string, plainPw:string):Promise< UserDocument | null>
}

 export type TokenPayload = {
    _id: mongoose.ObjectId
}

export interface ParamsFoler extends cloudinary.