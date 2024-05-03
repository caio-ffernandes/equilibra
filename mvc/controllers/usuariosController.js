const path = require('path')
const UsuarioDAO = require('../../DAO/usuariosDAO')

module.exports= (app) =>{
    app.get("/usuarios", async (req, res) => {
        
        const usuarioDAO = new UsuarioDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        res.status(201).json(await usuarioDAO.consultarUsuario())

    })
    app.get("/usuario", (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        
        res.sendFile(path.resolve("mvc/views/ctrldev/usuario/usuario.html"))
    })
    app.post("/registrarusuario",(req,res) =>{
        const usuariodao = new UsuarioDAO();
        res.setHeader("Acess-Control-Allow-Origin","*")
        const {txtnome, txtemail,txtsenha,txtpeso,txtaltura,txtidade,txtgenero} = req.body;

        usuariodao.registrarUsuario(txtnome, txtemail,txtsenha,txtpeso,txtaltura,txtidade,txtgenero)

        res.redirect("/home");
    })
}