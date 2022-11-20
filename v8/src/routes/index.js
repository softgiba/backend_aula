import express from "express";
import grupos from "./gruposRoutes.js";
import unidades from "./unidadesRoutes.js";
import rotas from "./rotasRoutes.js";
import usuarios from "./usuariosRoutes.js";
import login from "./loginRoutes.js";

const routes = (app) => {
    app.route('/').get((rep, res) => {
        res.status(200).redirect("/docs") // redirecionando para documentação
    })

    app.use(
        express.json(),
        grupos,
        unidades,
        rotas,
        usuarios,
        login
    )
}

export default routes