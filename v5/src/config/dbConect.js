import mongoose from "mongoose"

mongoose.connect("mongodb+srv://admin:CpoqwOeste@cluster0aula.traeq.mongodb.net/UserManager");

let db = mongoose.connection;

export default db;