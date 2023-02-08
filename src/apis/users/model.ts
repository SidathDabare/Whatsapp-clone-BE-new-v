import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { UserDocument, UsersModel } from "../../types";

const {model, Schema} = mongoose

const userSchema = new Schema ({
    username: {type: String, required:true},
    email: {type: String, required:true},
    socketId:{type: String},
    password: {type:String,required:true},
    avatar:{type:String}

})

userSchema.pre("save", async function(next){

    const currentUser = this

    const plainPW = currentUser.password

    if(currentUser.isModified("password")){

        const hash = await bcrypt.hash(plainPW as string, 10)

        currentUser.password = hash
    }

    next()
})

userSchema.methods.toJSON = function () {

    const userDocument = this
    const user = userDocument.toObject()

    delete user.password
    delete user.__v
    return user
}

userSchema.static("checkCredentials", async function (email, plainPW){

    const user = await this.findOne({email})

    if(user) {

        const isMatch = await bcrypt.compare(plainPW, user.password)

        if(isMatch) {
            return user
        } else {
            return null
        }
    } else {
        return null
    }
}) 

export default model<UserDocument,UsersModel>("User",userSchema)
