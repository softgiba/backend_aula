import express from "express";
import pessoas from "./pessoasRoutes.js";
import atendimentos from "./atendimentoRoutes.js";
import rotas from "./rotasRoutes.js";
import usuarios from "./usuariosRoutes.js";
import login from "./loginRoutes.js";

const routes = (app) => {
    app.route('/').get((rep, res) => {
        res.status(200).redirect("/docs") // redirecionando para documentação
    })

    app.use(
        express.json(),
        pessoas,
        atendimentos,
        rotas,
        usuarios,
        login
    )
}

export default routes