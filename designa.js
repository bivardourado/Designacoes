const nomesMasculinos = ["João", "Pedro", "Lucas", "Miguel", "Gabriel", "Enzo", "Arthur", "Heitor"];
const nomesFemininos = ["Maria", "Ana", "Beatriz", "Lara", "Julia", "Sophia", "Isabella", "Valentina"];

function gerarPares(semanaAnterior) {
    let pares = [];
    let homensDisponiveis = nomesMasculinos.slice();
    let mulheresDisponiveis = nomesFemininos.slice();
    let homensSemanaAnterior = semanaAnterior ? semanaAnterior.map(par => par.homem) : [];
    let mulheresSemanaAnterior = semanaAnterior ? semanaAnterior.map(par => par.mulher) : [];

    // Garantir que o primeiro par seja de homens
    let primeiroHomem = homensDisponiveis[Math.floor(Math.random() * homensDisponiveis.length)];
    let primeiraMulher;
    do {
        primeiraMulher = mulheresDisponiveis[Math.floor(Math.random() * mulheresDisponiveis.length)];
    } while (primeiraMulher.charAt(0) === primeiroHomem.charAt(0));

    homensDisponiveis = homensDisponiveis.filter(nome => nome !== primeiroHomem);
    mulheresDisponiveis = mulheresDisponiveis.filter(nome => nome !== primeiraMulher);

    pares.push({
        homem: primeiroHomem,
        mulher: primeiraMulher,
        nivel: Math.floor(Math.random() * 10) + 1
    });

    for (let i = 1; i < 8; i++) {
        let homem;
        let mulher;

        do {
            homem = homensDisponiveis[Math.floor(Math.random() * homensDisponiveis.length)];
        } while (homensSemanaAnterior.includes(homem) || homem.charAt(0) !== pares[i - 1].homem.charAt(0));

        do {
            mulher = mulheresDisponiveis[Math.floor(Math.random() * mulheresDisponiveis.length)];
        } while (mulheresSemanaAnterior.includes(mulher) || mulher.charAt(0) !== pares[i - 1].mulher.charAt(0));

        homensDisponiveis = homensDisponiveis.filter(nome => nome !== homem);
        mulheresDisponiveis = mulheresDisponiveis.filter(nome => nome !== mulher);

        pares.push({
            homem: homem,
            mulher: mulher,
            nivel: Math.floor(Math.random() * 10) + 1
        });
    }

    return pares;
}

function ordenarPares(pares) {
    pares.sort((a, b) => b.nivel - a.nivel);

    let principais = pares.filter(par => par.homem === pares[0].homem);
    let secundarias = pares.filter(par => par.homem !== pares[0].homem);

    principais.sort((a, b) => a.nivel - b.nivel);
    secundarias.sort((a, b) => b.nivel - a.nivel);

    return principais.concat(secundarias);
}