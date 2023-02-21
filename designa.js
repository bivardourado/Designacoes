// Definir as listas de homens e mulheres com seus níveis de habilidade
let homens = [
    { nome: "Homem 1", nivel: "iniciante" },
    { nome: "Homem 2", nivel: "intermediário" },
    { nome: "Homem 3", nivel: "avançado" },
    { nome: "Homem 4", nivel: "intermediário" },
    { nome: "Homem 5", nivel: "iniciante" },
];
let mulheres = [
    { nome: "Mulher 1", nivel: "iniciante" },
    { nome: "Mulher 2", nivel: "intermediário" },
    { nome: "Mulher 3", nivel: "avançado" },
    { nome: "Mulher 4", nivel: "avançado" },
    { nome: "Mulher 5", nivel: "intermediário" },
];

// Função para selecionar uma pessoa aleatória de uma lista, que atenda às restrições
function selecionarPessoa(lista, semanaAtual, semanaAnterior, nivelMax) {
    let candidatos = lista.filter((pessoa) => {
        return (
            semanaAtual.indexOf(pessoa) === -1 &&
            semanaAnterior.indexOf(pessoa) === -1 &&
            pessoa.nivel === nivelMax
        );
    });

    if (candidatos.length > 0) {
        return candidatos[Math.floor(Math.random() * candidatos.length)];
    } else {
        return null;
    }
}

// Função para gerar um par a partir de duas pessoas selecionadas aleatoriamente
function gerarPar(semanaAtual, semanaAnterior, nivelMax) {
    let pessoaPrincipal = selecionarPessoa(homens, semanaAtual, semanaAnterior, nivelMax);
    let pessoaSecundaria = selecionarPessoa(homens, semanaAtual, semanaAnterior, nivelMax);
    if (!pessoaPrincipal || !pessoaSecundaria) {
        pessoaPrincipal = selecionarPessoa(mulheres, semanaAtual, semanaAnterior, nivelMax);
        pessoaSecundaria = selecionarPessoa(mulheres, semanaAtual, semanaAnterior, nivelMax);
    }

    return {
        pessoaPrincipal,
        pessoaSecundaria
    };
}

function gerarPares(listaNomes) {
    const homens = listaNomes.homens;
    const mulheres = listaNomes.mulheres;
    const pares = [];

    // seleciona os níveis existentes na lista de homens e mulheres
    const niveis = [...new Set([...homens, ...mulheres].map((pessoa) => pessoa.nivel))];

    // gera um par para cada nível
    for (let nivel of niveis) {
        const semanaAtual = pares.flatMap((par) => [par.pessoaPrincipal, par.pessoaSecundaria]);
        const semanaAnterior = homens.concat(mulheres).filter((pessoa) => semanaAtual.indexOf(pessoa) === -1);

        const par = gerarPar(semanaAtual, semanaAnterior, nivel);
        if (par) {
            pares.push(par);
        }
    }

    return pares;
}