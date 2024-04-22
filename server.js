import express from "express"
import mongoose from "mongoose"
import apiRegister from "./api-register.js"
import rateLimit from "express-rate-limit"

const server = express()

const port = 3000

server.use(express.json())

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour",
});

server.use("/api", limiter);

mongoose.connect("mongodb+srv://charlotteblomqvistsvanhall:abc123%40%40@cluster0.dqz80mc.mongodb.net/PVT23-SeedData")

apiRegister(server, mongoose)

server.listen(port, () => console.log(`Listening on port http://localhost:${port}`))