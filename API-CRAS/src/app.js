import express from "express";
import db from "./config/dbConect.js";
import routes from "./routes/index.js";
import cors from "cors";

// estabelecendo e testando a conexão
function conectaDatabase(params) {
	db.on("error", console.log.bind(console, "Conexão com o banco falhou!"));
	db.once("open", () => {
	  console.log('Conexão com o banco estabelecida!')
	});
}
conectaDatabase();

const app = express();  // instanciando express 

app.use(express.json()); // habilitando o uso de json pelo express

app.use(cors()); // habilitando o uso de cors pelo express

routes(app); // Passando para o arquivo de rotas o app, que envia junto uma instância do express


// exportando para o server.js fazer uso
export default app
