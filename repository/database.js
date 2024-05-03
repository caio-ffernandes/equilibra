const mysql = require("mysql2")

class Database{

    #connection 

    constructor(){
        this.#connection = mysql.createPool({
            host: "localhost",
            user:"root",
            password:"",
            database:"fitness"
        }).promise()
    }
   
    async selecionarProblema(){
       const problemasData = await this.#connection.query("select * from problemas;")
       return problemasData[0]
    } 
    async insertProblema(nome, nivel) {
      const retorno = await this.#connection.execute(`
        insert into problemas (nome_problema, nivel_problema
            ) 
            values ('${nome}','${nivel}')
        `)
    }

    async selecionarUsuario(){
        const usuariosData = await this.#connection.query("select * from usuarios;")
        return usuariosData[0]
     }
     async insertUsuario(nome, email,senha,peso,altura,idade,genero) {
      const retorno = await this.#connection.execute(`
        insert into usuarios (nome_usuario, email_usuario,senha_usuario,peso_usuario,altura_usuario,idade_usuario,genero_usuario
            ) 
            values ('${nome}','${email}','${senha}','${peso}','${altura}','${idade}','${genero}')
        `)
    }
     async selecionarExercicio(){
        const exerciciosData = await this.#connection.query("select * from exercicios;")
        return exerciciosData[0]
     }
     async insertExercicio(cardio, musculo,aerobico) {
      const retorno = await this.#connection.execute(`
        insert into exercicios (cardio_exercicio, musculo_exercicio,aerobico_exercicio
            ) 
            values ('${cardio}','${musculo}','${aerobico}')
        `)
    }
     async selecionarDias(){
        const DiasData = await this.#connection.query("select * from dias;")
        return DiasData[0]
     }
     async insertDias(nome, exercicios) {
      const retorno = await this.#connection.execute(`
        insert into dias (nome_dia, exercicios_id_exercicio
            ) 
            values ('${nome}','${exercicios}')
        `)
    }

    async obterExerciciosPorDia(diaAtual) {
        try {
            const sql = `
                SELECT exercicios.*
                FROM dias
                INNER JOIN exercicios ON dias.exercicios_id_exercicio = exercicios.id_exercicio
                WHERE dias.nome_dia = ?;
            `;
            const [exerciciosData] = await this.#connection.execute(sql, [diaAtual]);
            return exerciciosData;
        } catch (error) {
            console.error('Erro ao obter os exercícios do dia:', error);
            throw error;
        }
    }
    

    async verificarLogin(email, senha) {
        try {
            // Consulta SQL para verificar o login
            const sql = 'SELECT * FROM usuarios WHERE email_usuario = ? AND senha_usuario = ?';
            const [rows, fields] = await this.#connection.execute(sql, [email, senha]);
            
            // Retorna o resultado da consulta
            return rows;
        } catch (error) {
            // Trate os erros aqui
            console.error('Erro ao verificar login:', error);
            throw error; // Você pode tratar de forma mais apropriada de acordo com o seu contexto
        }
    }
}

module.exports = Database