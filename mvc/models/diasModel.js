class Dias{
    #id
    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

    #dias
    get dias() {
        return this.#dias
    }
    set dias(value) {
        this.#dias = value
    }
    #exercicios
    get exercicios() {
        return this.#exercicios
    }
    set exercicios(value) {
        this.#exercicios = value
    }
    constructor(id, dias, exercicios){
        this.#id = id
        this.#dias = dias
        this.#exercicios = exercicios
    }
    toJson(){
        return {
            "id": this.#id,
            "dias": this.#dias,
            "exercicios": this.#exercicios
        }
    }
}
module.exports= Dias