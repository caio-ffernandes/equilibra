const path = require('path');
const DiasDAO = require('../../DAO/diasDAO');
const ExercicioDAO = require('../../DAO/exerciciosDAO');

module.exports = (app) => {
    app.get("/dias", async (req, res) => {
        const diaDAO = new DiasDAO();
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(201).json(await diaDAO.consultarDia());
    });

    app.get("/dia", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const exercicioDAO = new ExercicioDAO();
        const lista_exercicios = await exercicioDAO.consultarExercicio();
        res.render("dias/dias", { exercicios: lista_exercicios });
    });
    
    app.post("/registrardia", (req, res) => {
        const diaDAO = new DiasDAO();
        res.setHeader("Acess-Control-Allow-Origin", "*");
        const { txtnome, selexercicio} = req.body;
        
        diaDAO.registrarDia( txtnome, selexercicio);
        res.redirect("/home");
    });
    
};
