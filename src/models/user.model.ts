import mongoose, { Schema, Document } from "mongoose";

export interface message extends Document {
  content: string;
  craetedAt: number;
}

export interface user extends Document {
  username: string;
  email: string;
  password: string;
  verifycode: string;
  verfiycodeexpiry: Date;
  isAcceptingMessage: boolean;
  message: message[];
}

const MessageSchema: Schema<message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  craetedAt: {
    type: Number,
    required: true,
  },
});

const UserSchema: Schema<user> = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type:String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verifycode: {
    type: String,
  },
  verfiycodeexpiry: {
    type: Date,
  },
   isAcceptingMessage: {
    type: Boolean,
  }, 
  message: {
    type: [MessageSchema],
  },
});



const UserModel=(mongoose.models.User as mongoose.Model<user>)||mongoose.model<user>('User',UserSchema)


export default UserModel