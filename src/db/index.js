import mongoose from "mongoose";
import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected! DB Host: ", connectionInstance.connection.host);
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
}

const initializeRedis = () => {
  const redisClient = createClient({url: process.env.REDIS_URL || 'redis://localhost:6379'});
  redisClient.on("connect", () => {
    console.log("Redis connected!");
  });
  redisClient.on("error", (error) => {
    console.log("Error connecting to Redis: ", error);
  });
  return redisClient;
}

export { connectDB, initializeRedis };