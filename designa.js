const pessoas = [];

function adicionarPessoa() {
    // Obter valores do formulário
    const nome = document.getElementById("nome").value;
    const genero = document.getElementById("genero").value;
    const nivel = document.getElementById("nivel").value;

    // Verificar se o nome foi preenchido
    if (nome === "") {
        alert("Por favor, digite um nome.");
        return;
    }

    // Criar objeto pessoa
    const pessoa = {
        nome: nome,
        genero: genero,
        nivel: nivel
    };

    // Adicionar pessoa à lista de pessoas
    pessoas.push(pessoa);
    console.log(pessoa);

    // Limpar valores do formulário
    document.getElementById("nome").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("nivel").value = "";

    // Exibir mensagem de sucesso
    alert("Pessoa adicionada com sucesso!");
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function gerarPares() {
    const numeroPares = document.getElementById("numeroPares").value;
    const paresGerados = document.getElementById("paresGerados");

    paresGerados.innerHTML = "";

    if (numeroPares !== "") {
        shuffle(pessoas);

        console.log(pessoas); // novo console.log adicionado

        const pares = [];

        for (let i = 0; i < pessoas.length; i += 2) {
            const par = {
                pessoa1: pessoas[i],
                pessoa2: pessoas[i + 1]
            };

            pares.push(par);
        }

        for (let i = 0; i < pares.length; i++) {
            const li = document.createElement("li");
            li.innerHTML = `${pares[i].pessoa1.nome} e ${pares[i].pessoa2.nome}`;

            paresGerados.appendChild(li);
        }
    }
}