import mongoose from "mongoose";

const {model, Schema} = mongoose

const messageSchema = new Schema({
     sender:{type:String, required:true},
     content:{
        text:{type:String},
        media:{type:String}
     }

},

{timestamps: true}
)

export default model("Message", messageSchema)