import mongoose from "mongoose"

mongoose.connect("mongodb+srv://<USER>:<PASSWORDS>@cluster0aula.traeq.mongodb.net/UserManager");

let db = mongoose.connection;

export default db;