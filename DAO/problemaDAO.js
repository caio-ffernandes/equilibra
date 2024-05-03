const Problema = require ("../mvc/models/problemasModel");
const Database = require ("../repository/database");

class ProblemaDAO {
    #conexao
    constructor(){
        this.#conexao= new Database();
    }
    async consultarProblema(){
        const lista_problemas = []
        const problemas = await this.#conexao.selecionarProblema()

        if (problemas) {
            for (const problema of problemas) {
                const objProblemas = new Problema()
                objProblemas.id = problema.id_problema
                objProblemas.nome = problema.nome_problema
                objProblemas.nivel = problema.nivel_problema
                lista_problemas.push(objProblemas.toJson())
            }
        }

        return lista_problemas
    }

    registrarProblema(nome, nivel){
    
        const proble = new Problema()
    
        proble.nome = nome
        proble.nivel = nivel
        
    
    
        this.#conexao.insertProblema( proble.nome,proble.nivel)
    }
}

module.exports=ProblemaDAO