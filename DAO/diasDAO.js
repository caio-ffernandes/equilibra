const Dias = require("../mvc/models/diasModel");
const Database = require("../repository/database");

class DiaDAO {
    #conexao;

    constructor() {
        this.#conexao = new Database();
    }

    async consultarDia() {
        try {
            const diaAtual = new Date().toLocaleString('pt-br', { weekday: 'long' });
            const exerciciosDoDia = await this.#conexao.obterExerciciosPorDia(diaAtual);
            return exerciciosDoDia;
        } catch (error) {
            console.error('Erro ao consultar o dia:', error);
            throw error;
        }
    }

    registrarDia(nome, exercicio) {
        const dia = new Dias();
        dia.dias = nome;
        dia.exercicios = exercicio;
        this.#conexao.insertDias(dia.dias, dia.exercicios);
    }
}

module.exports = DiaDAO;
