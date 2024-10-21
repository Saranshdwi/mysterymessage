import mongoose from "mongoose";

type ConnectionObject = {
  isconnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isconnected) {
    console.log("Already Connected to DataBase");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    connection.isconnected = db.connections[0].readyState;

    console.log("DB Connected Succesfully");
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
}

export default dbConnect;
