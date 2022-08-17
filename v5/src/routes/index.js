import express from "express";
import grupos from "./gruposRoutes.js";
import unidades from "./unidadesRoutes.js";
import rotas from "./rotasRoutes.js";
import usuarios from "./usuariosRoutes.js";

const routes = (app) => {
    app.route('/').get((rep, res) => {
        res.status(200).send({ título: "Gerenciador de usuários" })
    })

    app.use(
        express.json(),
        grupos,
        unidades,
        rotas,
        usuarios
    )
}

export default routes