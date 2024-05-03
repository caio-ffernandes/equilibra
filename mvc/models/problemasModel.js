class Problema{
    #id
    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

    #nome
    get nome() {
        return this.#nome
    }
    set nome(value) {
        this.#nome = value
    }
    #nivel
    get nivel() {
        return this.#nivel
    }
    set nivel(value) {
        this.#nivel = value
    }
    constructor(id, nome, nivel){
        this.#id = id
        this.#nome = nome
        this.#nivel = nivel
    }
    toJson(){
        return {
            "id": this.#id,
            "nome": this.#nome,
            "nivel": this.#nivel

        }
    }
}
module.exports= Problema