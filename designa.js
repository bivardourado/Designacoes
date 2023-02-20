// Obtém os nomes dos participantes a partir dos campos de entrada de texto no formulário
let nomeHomemPrincipal = document.getElementById("homemPrincipal").value;
let nomeHomemSecundario = document.getElementById("homemSecundario").value;
let nomeMulherPrincipal = document.getElementById("mulherPrincipal").value;
let nomeMulherSecundaria = document.getElementById("mulherSecundaria").value;

// Define a lista de nomes de participantes
let participantes = [{
        nome: nomeHomemPrincipal,
        sexo: "M",
        nivel: 4
    },
    {
        nome: nomeHomemSecundario,
        sexo: "M",
        nivel: 2
    },
    {
        nome: nomeMulherPrincipal,
        sexo: "F",
        nivel: 4
    },
    {
        nome: nomeMulherSecundaria,
        sexo: "F",
        nivel: 2
    }
];

// Define o número máximo de semanas permitido
const maxSemanas = 4;

// Define a lista de pares e a lista de participantes utilizados em cada semana
let pares = [];
let participantesUsados = [];

// Define a função para obter um participante aleatório de uma lista
function obterParticipanteAleatorio(lista) {
    let index = Math.floor(Math.random() * lista.length);
    return lista[index];
}

// Define a função para verificar se um participante já foi utilizado em uma semana
function participanteFoiUtilizado(participante, participantesUsados) {
    for (let i = 0; i < participantesUsados.length; i++) {
        if (participantesUsados[i].nome === participante.nome) {
            return true;
        }
    }
    return false;
}

// Define a função para verificar se um participante já participou na semana atual
function participanteJaParticipou(participante, pares) {
    for (let i = 0; i < pares.length; i++) {
        if (pares[i].participante1.nome === participante.nome || pares[i].participante2.nome === participante.nome) {
            return true;
        }
    }
    return false;
}

// Define a função para verificar se um participante é do mesmo sexo que outro participante
function participantesDoMesmoSexo(participante1, participante2) {
    return participante1.sexo === participante2.sexo;
}

// Define a função para verificar se um participante tem um nível maior ou igual a outro participante
function participanteComNivelMaiorOuIgual(participante1, participante2) {
    return participante1.nivel >= participante2.nivel;
}

// Define a função para gerar um par aleatório de participantes que atendam aos critérios
function gerarPar(participantes, participantesUsados, pares, primeiroParMasculino) {
    let participante1, participante2;

    // Obtém um participante masculino aleatório que ainda não foi utilizado na semana
    do {
        participante1 = obterParticipanteAleatorio(participantes.filter(p => p.sexo === "M" && !participanteFoiUtilizado(p, participantesUsados) && (!primeiroParMasculino || p.nivel === 4)));