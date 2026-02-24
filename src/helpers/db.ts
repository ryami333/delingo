import { env } from "./env.mjs";
import { MongoClient } from "mongodb";

export const db = new MongoClient(env.MONGODB_URL).db("mitchs-record-club");
