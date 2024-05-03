const path = require('path')
const ProblemaDAO = require('../../DAO/problemaDAO')

module.exports= (app) =>{
    app.get("/problemas", async (req, res) => {
        
        const problemaDAO = new ProblemaDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        res.status(201).json(await problemaDAO.consultarProblema())

    })
    app.get("/problema", (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        
        res.sendFile(path.resolve("mvc/views/ctrldev/problemas/problemas.html"))
    })
    app.post("/registrarproblema",(req,res) =>{
        const problemaDAO = new ProblemaDAO();
        res.setHeader("Acess-Control-Allow-Origin","*")
        const {txtnome, txtnivel} = req.body;

        problemaDAO.registrarProblema(txtnome, txtnivel)

        res.status(201).json({ 
            msg: "ok"
        })
    })
}