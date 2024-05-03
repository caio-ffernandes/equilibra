const Exercicio = require ("../mvc/models/exerciciosModel");
const Database = require ("../repository/database");

class ExercicioDAO {
    #conexao
    constructor(){
        this.#conexao= new Database();
    }
    async consultarExercicio(){
        const lista_exercicios = []
        const exercicios = await this.#conexao.selecionarExercicio()

        if (exercicios) {
            for (const exercicio of exercicios) {
                const objExercicio = new Exercicio()
                objExercicio.id = exercicio.id_exercicio
                objExercicio.cardio = exercicio.cardio_exercicio
                objExercicio.musculo = exercicio.musculo_exercicio
                objExercicio.aerobico = exercicio.aerobico_exercicio
                lista_exercicios.push(objExercicio.toJson())
            }
        }

        return lista_exercicios
    }
    registrarExercicio(cardio, musculo,aerobico){
    
        const exercicio = new Exercicio()
    
        exercicio.cardio = cardio
        exercicio.musculo = musculo
        exercicio.aerobico = aerobico
        
    
    
        this.#conexao.insertExercicio( exercicio.cardio, exercicio.musculo,exercicio.aerobico)
    }
}

module.exports=ExercicioDAO