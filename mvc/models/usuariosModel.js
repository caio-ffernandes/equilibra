class Usuario{
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
    #email
    get email() {
        return this.#email
    }
    set email(value) {
        this.#email = value
    }
    #senha
    get senha() {
        return this.#senha
    }
    set senha(value) {
        this.#senha = value
    }
    #peso
    get peso() {
        return this.#peso
    }
    set peso(value) {
        this.#peso = value
    }
    #altura
    get altura() {
        return this.#altura
    }
    set altura(value) {
        this.#altura = value
    }
    #idade
    get idade() {
        return this.#idade
    }
    set idade(value) {
        this.#idade = value
    }
    #genero
    get genero() {
        return this.#genero
    }
    set genero(value) {
        this.#genero = value
    }
    constructor(id, nome, email,senha,peso,altura,idade,genero){
        this.#id = id
        this.#nome = nome
        this.#email = email
        this.#senha = senha
        this.#peso = peso
        this.#altura = altura
        this.#idade = idade
        this.#genero = genero
    }
    toJson(){
        return {
            "id": this.#id,
            "nome": this.#nome,
            "email": this.#email,
            "senha": this.#senha,
            "peso": this.#peso,
            "altura": this.#altura,
            "idade": this.#idade,
            "genero": this.#genero

        }
    }
}
module.exports= Usuario