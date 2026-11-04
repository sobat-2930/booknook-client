import dns from "node:dns";
import { MongoClient } from "mongodb";

// Local fix: some ISPs block the Atlas SRV lookup, so use public DNS in development
if (process.env.NODE_ENV !== "production") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Please add MONGODB_URI to .env.local");
}

// Reuse one client in development so hot reload does not open many connections
const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };

const client = globalForMongo._mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = client;
}

export const db = client.db(process.env.MONGODB_DB ?? "booknook");
export default client;