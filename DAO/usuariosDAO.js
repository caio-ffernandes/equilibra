const Usuario = require ("../mvc/models/usuariosModel");
const Database = require ("../repository/database");

class UsuarioDAO {
    #conexao
    constructor(){
        this.#conexao= new Database();
    }
    async consultarUsuario(){
        const lista_usuarios = []
        const usuarios = await this.#conexao.selecionarUsuario()

        if (usuarios) {
            for (const usuario of usuarios) {
                const objUsuario = new Usuario()
                objUsuario.nome = usuario.nome_usuario
                objUsuario.email = usuario.email_usuario
                objUsuario.senha = usuario.senha_usuario
                objUsuario.peso = usuario.peso_usuario
                objUsuario.altura = usuario.altura_usuario
                objUsuario.idade = usuario.idade_usuario
                objUsuario.genero = usuario.genero_usuario
                lista_usuarios.push(objUsuario.toJson())
            }
        }

        return lista_usuarios
    }
    registrarUsuario(nome, email,senha,peso,altura,idade,genero){
    
        const usuario = new Usuario()
    
        usuario.nome = nome
        usuario.email = email
        usuario.senha = senha
        usuario.peso = peso
        usuario.altura = altura
        usuario.idade = idade
        usuario.genero = genero

        this.#conexao.insertUsuario( usuario.nome,usuario.email,usuario.senha,usuario.peso,usuario.altura,usuario.idade,usuario.genero)
    }
}

module.exports = UsuarioDAO