class Timer {
    constructor(exercicio) {
        this.exercicio = exercicio;
        this.tempo = 300; // Tempo inicial em segundos (5 minutos)
        this.intervalId = null; // ID do intervalo para parar o timer
    }

    // Método para iniciar o timer
    startTimer() {
        // Verifica se o timer já está em execução para evitar iniciar múltiplas instâncias
        if (!this.intervalId) {
            // Define o intervalo para diminuir o tempo a cada segundo
            this.intervalId = setInterval(() => {
                // Verifica se o tempo chegou a zero
                if (this.tempo <= 0) {
                    // Se o tempo acabou, limpa o intervalo e retorna
                    clearInterval(this.intervalId);
                    this.intervalId = null;
                    return;
                }

                // Diminui o tempo em um segundo
                this.tempo--;
            }, 1000); // Intervalo de 1 segundo
        }
    }

    // Método para parar o timer
    stopTimer() {
        // Verifica se o timer está em execução antes de pará-lo
        if (this.intervalId) {
            // Limpa o intervalo
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

// Exporta a classe Timer para uso em outros arquivos
module.exports = Timer;
