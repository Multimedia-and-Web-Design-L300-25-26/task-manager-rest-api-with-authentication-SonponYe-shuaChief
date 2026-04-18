import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { jest } from "@jest/globals";

let mongoServer;

jest.setTimeout(120000);

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create({
		instance: {
			launchTimeout: 60000,
		},
	});
	process.env.NODE_ENV = "test";
	process.env.MONGO_URI = mongoServer.getUri();
	process.env.JWT_SECRET = process.env.JWT_SECRET || "test_secret";
});

afterAll(async () => {
	await mongoose.connection.close();

	if (mongoServer) {
		await mongoServer.stop();
	}
});