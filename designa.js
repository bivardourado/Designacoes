// Definir as listas de homens e mulheres
let homens = [];
let mulheres = [];

// Permitir que o usuário insira os nomes nas listas
document.getElementById("homens").addEventListener("submit", (event) => {
    event.preventDefault();
    homens.push(event.target.elements.nome.value);
    event.target.elements.nome.value = "";
});

document.getElementById("mulheres").addEventListener("submit", (event) => {
    event.preventDefault();
    mulheres.push(event.target.elements.nome.value);
    event.target.elements.nome.value = "";
});

// Definir a matriz de níveis de habilidade
const niveis = [
    [4, 3],
    [4, 2],
    [3, 2],
    [3, 1],
    [2, 1],
];

// Função para selecionar uma pessoa aleatória de uma lista, que atenda às restrições
function selecionarPessoa(lista, semanaAtual, semanaAnterior, sexo, nivelMax) {
    let candidatos = lista.filter((pessoa) => {
        return (
            semanaAtual.indexOf(pessoa) === -1 &&
            semanaAnterior.indexOf(pessoa) === -1 &&
            (sexo === "M" ? homens : mulheres).indexOf(pessoa) !== -1
        );
    });

    let selecionados = candidatos.filter((pessoa) => {
        return niveis.indexOf([nivelMax, pessoa.nivel]) !== -1;
    });

    if (selecionados.length > 0) {
        return selecionados[Math.floor(Math.random() * selecionados.length)];
    } else if (candidatos.length > 0) {
        return candidatos[Math.floor(Math.random() * candidatos.length)];
    } else {
        return null;
    }
}

// Função para gerar um par a partir de duas pessoas selecionadas aleatoriamente
function gerarPar(semanaAtual, semanaAnterior, nivelMax) {
    let homemPrincipal = selecionarPessoa(homens, semanaAtual, semanaAnterior, "M", nivelMax);
    let homemSecundario = selecionarPessoa(homens, semanaAtual, semanaAnterior, "M", nivelMax, [homemPrincipal]);
    let mulherPrincipal = selecionarPessoa(mulheres, semanaAtual, semanaAnterior, "F", nivelMax);
    let mulherSecundaria = selecionarPessoa(mulheres, semanaAtual, semanaAnterior, "F", nivelMax, [mulherPrincipal]);

    return {
        homemPrincipal,
        homemSecundario,
        mulherPrincipal,
        mulherSecundaria
    };
}

function gerarPares(listaNomes) {
    const homens = listaNomes.homens;
    const mulheres = listaNomes.mulheres;

    // ordena as listas por nível, do maior para o menor
    const homensOrdenados = homens.sort((a, b) => b.nivel - a.nivel);
    const mulheresOrdenadas = mulheres.sort((a, b) => b.nivel - a.nivel);

    const pares = [];

    // gera os pares aleatoriamente
    while (homensOrdenados.length > 0 && mulheresOrdenadas.length > 0) {
        const indexHomem = Math.floor(Math.random() * homensOrdenados.length);
        const indexMulher = Math.floor(Math.random() * mulheresOrdenadas.length);
        const homem = homensOrdenados.splice(indexHomem, 1)[0];
        const mulher = mulheresOrdenadas.splice(indexMulher, 1)[0];
        pares.push({
            homemPrincipal: homem,
            homemSecundario: homensOrdenados.shift(),
            mulherPrincipal: mulher,
            mulherSecundaria: mulheresOrdenadas.shift(),
        });
    }

    return pares;
}