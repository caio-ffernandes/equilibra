const path = require('path')
const ExercicioDAO = require('../../DAO/exerciciosDAO')

module.exports= (app) =>{
    app.get("/exercicios", async (req, res) => {
        
        const exercicioDAO = new ExercicioDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        res.status(201).json(await exercicioDAO.consultarExercicio())

    })
    app.get("/exercicio", (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        
        res.sendFile(path.resolve("mvc/views/ctrldev/exercicio/exercicio.html"))
    })
    app.post("/registrarexercicio",(req,res) =>{
        const exercicioDAO = new ExercicioDAO();
        res.setHeader("Acess-Control-Allow-Origin","*")
        const {txtcardio,txtmusculo,txtaerobico} = req.body;

        exercicioDAO.registrarExercicio(txtcardio,txtmusculo,txtaerobico)

        res.redirect("/home");
    })
}