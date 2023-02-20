const pessoas = [];

function adicionarPessoa() {
    const nome = document.getElementById("nome").value;
    const genero = document.getElementById("genero").value;
    const nivel = document.getElementById("nivel").value;

    const pessoa = { nome, genero, nivel };
    pessoas.push(pessoa);

    document.getElementById("nome").value = "";
}

function gerarPares() {
    const numeroPares = document.getElementById("numeroPares").value;
    const paresGerados = document.getElementById("paresGerados");
    paresGerados.innerHTML = "";

    if (numeroPares < 1 || numeroPares > pessoas.length / 2) {
        paresGerados.innerHTML = "Número de pares inválido";
        return;
    }

    // Filtrar a lista de pessoas por gênero
    const homens = pessoas.filter(pessoa => pessoa.genero === "Homem");
    const mulheres = pessoas.filter(pessoa => pessoa.genero === "Mulher");

    // Embaralhar as listas de homens e mulheres separadamente
    shuffleArray(homens);
    shuffleArray(mulheres);

    // Juntar as listas embaralhadas em uma única lista com gêneros alternados
    const pessoasEmbaralhadas = [];
    for (let i = 0; i < numeroPares; i++) {
        pessoasEmbaralhadas.push(homens[i], mulheres[i]);
    }

    // Dividir a lista de pessoas em pares
    const pares = [];
    for (let i = 0; i < numeroPares; i++) {
        pares.push([pessoasEmbaralhadas[i * 2], pessoasEmbaralhadas[i * 2 + 1]]);
    }

    // Exibir os pares gerados na tela
    pares.forEach(par => {
        const li = document.createElement("li");
        li.textContent = `${par[0].nome} (${par[0].genero}, ${par[0].nivel}) e ${par[1].nome} (${par[1].genero}, ${par[1].nivel})`;
        paresGerados.appendChild(li);
    });
}