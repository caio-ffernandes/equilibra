const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const banco = require('./repository/database');
const session = require("express-session");
const crypto = require("crypto");
const consign = require("consign");
const app = express();
const UsuarioDAO = require('./DAO/usuariosDAO')
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs')
const db = new banco();
app.use(express.static('mvc/views/public'))
const Timer = require('./mvc/models/Timer');
app.get("/timer/:exercicio", async (req, res) => {
    try {
        
        const exercicio = req.params.exercicio;

     
        const timer = new Timer(exercicio);

       
        res.render('timer', { exercicio: timer.exercicio, tempo: timer.tempo });
    } catch (error) {
        console.error('Erro ao renderizar o timer:', error);
        res.status(500).send('Erro ao renderizar o timer');
    }
});


app.get("/logar", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.resolve(__dirname, "./mvc/views/ctrldev", "login.html"));
});


app.get("/cadastrar", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.resolve(__dirname, "./mvc/views/ctrldev", "cadastro.html"));
});

app.post("/cadastrausuario",(req,res) =>{
    const usuariodao = new UsuarioDAO();
    res.setHeader("Acess-Control-Allow-Origin","*")
    const {txtnome, txtemail,txtsenha,txtpeso,txtaltura,txtidade,txtgenero} = req.body;

    usuariodao.registrarUsuario(txtnome, txtemail,txtsenha,txtpeso,txtaltura,txtidade,txtgenero)

    res.redirect("/admin");
})

const generateRandomSecret = () => {
    return crypto.randomBytes(64).toString('hex');
}


app.use(session({
    secret:generateRandomSecret(),
    resave:false,
    saveUninitialized:true
}))
function verificarAutenticacao(req, res, next) {
    // Verifica se o usuário está autenticado
    if (req.session.user && req.session.user.email) {
        // Se estiver autenticado, prossiga para a próxima middleware
        next();
    } else {
        // Se não estiver autenticado, redirecione para a página de login
        res.redirect('/admin');
    }
}
app.get("/admin", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.resolve(__dirname, "./mvc/views/ctrldev", "index.html"));
});




app.get("/error", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.resolve(__dirname, "./mvc/views/ctrldev", "error.html"));
});
app.get("/logout", (req, res) => {
    
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao destruir a sessão:', err);
            res.redirect('/error');
        } else {
            
            res.send('<script>alert("Você saiu com sucesso!"); window.location.href = "/admin";</script>');
        }
    });
});
app.post('/login', async (req, res) => {
    const email = req.body.txtctrllogin;
    const senha = req.body.txtctrlpass;
  
    // Consulta SQL para verificar o login usando método da classe Database
    try {
        const result = await db.verificarLogin(email, senha);
        if (result.length > 0) {
            // Se o login for bem-sucedido, redirecione para home.html
            req.session.user = { email: email };
            res.redirect('/home');
             
        } else {
            // Se o login falhar, redirecione para error.html
           
            res.redirect('/error');
        }
    } catch (error) {
        console.error('Erro ao verificar o login:', error);
        res.redirect('/error');
    }
});
app.use(verificarAutenticacao)
app.get("/home", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
  
        res.render('home',{userEmail: req.session.user.email});
    
});
app.set('views','mvc/views/ctrldev')
app.use(express.static('mvc/views/public'))
consign()
.include("mvc/controllers")
.into(app)
app.listen(3000, () => console.log("Online Server at port 3000"))
module.exports = app