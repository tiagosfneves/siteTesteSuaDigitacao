const texto = document.querySelector("#texto");
const entrada = document.querySelector("#entrada");
const reiniciar = document.querySelector("#reiniciar");
const resultado = document.querySelector("#resultado");
const historico = document.querySelector("#historico");
const alternarTemaBtn = document.querySelector("#alternarTema");

const textos = [
  `O sol brilha intensamente`,
    `Eu gosto de sorvete`,
    `Estou muito cansado hoje`,
    `A comida está deliciosa`,
    `Vamos sair para jantar`,
    `O filme foi emocionante`,
    `Ela tem um gato`,
    `Ele é um bom amigo`,
    `Comprei um novo celular`,
    `Estou indo para casa`,
    `Preciso de um café`,
    `Estou feliz por você`,
    `A música é relaxante`,
    `Tenho uma reunião importante`,
    `Amo viajar pelo mundo`,
    `Vamos ao parque hoje`,
    `Estou aprendendo a cozinhar`,
    `Ela é muito talentosa`,
    `Tenho uma ideia interessante`,
    `O livro é muito interessante`,
    `Gosto de caminhar ao ar livre`,
    `Meu cachorro é brincalhão`,
    `A chuva está caindo suavemente`,

];

function novoTexto() {
  const index = Math.floor(Math.random() * textos.length);
  texto.textContent = textos[index];
}

function atualizarTeste() {
  iniciar();

  if (entrada.value === texto.textContent) {
    verificar();
  }
}

function iniciar() {
  const statusDoTeste = JSON.parse(localStorage.getItem("testeEmAndamento"));

  if (!statusDoTeste) {
    localStorage.setItem("tempoInicial", new Date().getTime());
    localStorage.setItem("testeEmAndamento", true);
  }
}

function verificar() {
  const tempoFinal = new Date().getTime();
  const tempoInicial = parseInt(localStorage.getItem("tempoInicial"));
  const tempoGasto = (tempoFinal - tempoInicial) / 1000;

  resultado.textContent = `Parabéns! Você levou "${tempoGasto}" segundos.`;

  adicionarAoHistorico(texto.textContent, tempoGasto);

  localStorage.setItem("testeEmAndamento", false);
  entrada.value = "";
  novoTexto();
}

function adicionarAoHistorico(textoDigitado, tempoGasto) {
  const itemHistorico = document.createElement("p");

  itemHistorico.textContent = `Texto: "${textoDigitado}" - Tempo: "${tempoGasto}".`;

  historico.appendChild(itemHistorico);
}

function reiniciarTeste() {
  entrada.value = "";
  resultado.textContent = "";
  novoTexto();
  localStorage.setItem("testeEmAndamento", false);
  historico.innerHTML = "";
}

function alternarTema() {
  const body = document.body;

  body.classList.toggle("claro");
  body.classList.toggle("escuro");
}

entrada.addEventListener("keyup", atualizarTeste);
reiniciar.addEventListener("click", reiniciarTeste);
alternarTemaBtn.addEventListener("click", alternarTema);

novoTexto();