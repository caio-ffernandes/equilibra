class Exercicio{
    #id
    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

    #cardio
    get cardio() {
        return this.#cardio
    }
    set cardio(value) {
        this.#cardio = value
    }
    #musculo
    get musculo() {
        return this.#musculo
    }
    set musculo(value) {
        this.#musculo = value
    }
    #aerobico
    get aerobico() {
        return this.#aerobico
    }
    set aerobico(value) {
        this.#aerobico = value
    }
    constructor(id, cardio, musculo,aerobico){
        this.#id = id
        this.#cardio = cardio
        this.#musculo = musculo
        this.#aerobico = aerobico
    }
    toJson(){
        return {
            "id": this.#id,
            "cardio": this.#cardio,
            "musculo": this.#musculo,
            "aerobico": this.#aerobico

        }
    }
}
module.exports= Exercicio