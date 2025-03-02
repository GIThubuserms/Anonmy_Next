import mongoose from "mongoose";

type connection = {
  isConnected?: number;
};

const myconnection: connection = {};

async function dbconnection(): Promise<void> {
  if (myconnection.isConnected) {
    console.log("DB Already Connected");
  }

  try {
   const db= await mongoose.connect(process.env.MONGO_URL||"");
   console.log(db.connections);
   
   myconnection.isConnected=db.connections[0].readyState
  } catch (error) {
    console.log(error);
    console.log("Db connection failed");
    process.exit(1)
  }
}

export default dbconnection