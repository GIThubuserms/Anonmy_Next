import mongoose from "mongoose";

type connection={
  isconnection?:number
}

const myconnections:connection={}

async function dbconnection(): Promise<void> {
 if(myconnections.isconnection) return

  try {
   const db= await mongoose.connect(process.env.MONGO_URL||"");
   myconnections.isconnection=db.connections[0].readyState
  } catch (error) {
    console.log(error);
    console.log("Db connection failed");
    process.exit(1)
  }
}

export default dbconnection