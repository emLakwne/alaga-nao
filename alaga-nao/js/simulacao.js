// ==========================================================
// Alaga Não — simulação de risco de alagamento
// O usuário escolhe cidade, chuva prevista (mm/h) e pode buscar
// pelo bairro. O script calcula o risco de cada ponto do array
// "pontos" (js/dados.js) e mostra o resultado na página pelo DOM.
// ==========================================================

// ---------- Elementos da página ----------
const selCidade = document.querySelector("#cidade");
const inputChuva = document.querySelector("#chuva");
const saidaChuva = document.querySelector("#valor-chuva");
const inputBusca = document.querySelector("#busca");
const listaPontos = document.querySelector("#lista-pontos");
const mensagem = document.querySelector("#mensagem-sim");
const totalAlto = document.querySelector("#total-alto");
const totalAtencao = document.querySelector("#total-atencao");
const totalBaixo = document.querySelector("#total-baixo");
const botoesCenario = document.querySelectorAll("[data-chuva]");

// ---------- 1) Preenche o select de cidades a partir dos dados ----------
function preencherCidades() {
  const cidades = [];
  pontos.forEach(function (ponto) {
    if (!cidades.includes(ponto.cidade)) {
      cidades.push(ponto.cidade);
    }
  });
  cidades.sort();

  cidades.forEach(function (cidade) {
    const opcao = document.createElement("option");
    opcao.value = cidade;
    opcao.textContent = cidade;
    selCidade.appendChild(opcao);
  });
}

// ---------- 2) Regra de risco ----------
// alto:    chuva >= limite do ponto
// atenção: chuva >= 70% do limite
// baixo:   abaixo disso
function calcularRisco(ponto, chuva) {
  if (chuva >= ponto.limiarMm) return "alto";
  if (chuva >= ponto.limiarMm * 0.7) return "atencao";
  return "baixo";
}

const nomesRisco = {
  alto: "Risco alto",
  atencao: "Atenção",
  baixo: "Risco baixo"
};

const ordemRisco = { alto: 0, atencao: 1, baixo: 2 };

// Remove acentos e deixa minúsculo, para a busca funcionar com "jundiai" ou "Jundiaí"
function normalizar(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// ---------- 3) Cria o cartão de um ponto ----------
function criarCartao(ponto) {
  const item = document.createElement("li");
  item.className = "ponto ponto--" + ponto.risco;

  const titulo = document.createElement("h3");
  titulo.textContent = ponto.local;

  const etiqueta = document.createElement("span");
  etiqueta.className = "etiqueta etiqueta--" + ponto.risco;
  etiqueta.textContent = nomesRisco[ponto.risco];

  const info = document.createElement("p");
  info.className = "ponto__info";
  info.textContent =
    ponto.bairro + " · " + ponto.cidade + " · " + ponto.tipo +
    " · alaga a partir de " + ponto.limiarMm + " mm/h · cerca de " +
    ponto.moradores.toLocaleString("pt-BR") + " moradores próximos";

  // Botão que mostra/esconde a orientação (acessível pelo teclado)
  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "botao botao--contorno botao--pequeno";
  botao.textContent = "Ver orientação";
  botao.setAttribute("aria-expanded", "false");
  botao.setAttribute("aria-controls", "dica-" + ponto.id);

  const dica = document.createElement("p");
  dica.className = "ponto__dica";
  dica.id = "dica-" + ponto.id;
  const rotuloDica = document.createElement("strong");
  rotuloDica.textContent = "O que fazer: ";
  dica.append(rotuloDica, ponto.dica);
  dica.hidden = true;

  botao.addEventListener("click", function () {
    const aberto = dica.hidden;
    dica.hidden = !aberto;
    botao.setAttribute("aria-expanded", aberto);
    botao.textContent = aberto ? "Esconder orientação" : "Ver orientação";
  });

  item.append(titulo, etiqueta, info, botao, dica);
  return item;
}

// ---------- 4) Executa a simulação e atualiza a tela ----------
function simular() {
  const cidade = selCidade.value;
  const chuva = Number(inputChuva.value);
  const busca = normalizar(inputBusca.value.trim());

  saidaChuva.textContent = chuva + " mm/h";

  // filtra por cidade e pela busca de bairro/local
  const filtrados = pontos
    .filter(function (ponto) {
      return cidade === "todas" || ponto.cidade === cidade;
    })
    .filter(function (ponto) {
      if (busca === "") return true;
      return (
        normalizar(ponto.bairro).includes(busca) ||
        normalizar(ponto.local).includes(busca)
      );
    })
    // cria uma cópia de cada ponto já com o risco calculado
    .map(function (ponto) {
      return { ...ponto, risco: calcularRisco(ponto, chuva) };
    })
    // mais perigosos primeiro
    .sort(function (a, b) {
      return ordemRisco[a.risco] - ordemRisco[b.risco] || a.limiarMm - b.limiarMm;
    });

  // contagem por nível de risco
  let alto = 0;
  let atencao = 0;
  let baixo = 0;
  filtrados.forEach(function (ponto) {
    if (ponto.risco === "alto") alto++;
    else if (ponto.risco === "atencao") atencao++;
    else baixo++;
  });

  totalAlto.textContent = alto;
  totalAtencao.textContent = atencao;
  totalBaixo.textContent = baixo;

  // desenha a lista
  listaPontos.innerHTML = "";
  filtrados.forEach(function (ponto) {
    listaPontos.appendChild(criarCartao(ponto));
  });

  // mensagem de resumo (região aria-live: é lida por leitores de tela)
  mensagem.className = "mensagem-sim";
  if (filtrados.length === 0) {
    mensagem.textContent =
      "Nenhum ponto encontrado para essa busca. Tente outro bairro ou escolha \"Todas as cidades\".";
  } else if (alto > 0) {
    let pessoas = 0;
    filtrados.forEach(function (ponto) {
      if (ponto.risco === "alto") pessoas += ponto.moradores;
    });
    mensagem.classList.add("mensagem-sim--alto");
    mensagem.textContent =
      "Com " + chuva + " mm/h, " + alto + " ponto(s) devem alagar, afetando cerca de " +
      pessoas.toLocaleString("pt-BR") + " moradores. O Alaga Não enviaria alerta vermelho para eles.";
  } else if (atencao > 0) {
    mensagem.classList.add("mensagem-sim--atencao");
    mensagem.textContent =
      "Com " + chuva + " mm/h, " + atencao + " ponto(s) ficam em atenção. Os moradores receberiam um aviso preventivo.";
  } else {
    mensagem.classList.add("mensagem-sim--baixo");
    mensagem.textContent =
      "Com " + chuva + " mm/h, nenhum ponto exibido corre risco. Nenhum alerta seria enviado.";
  }
}

// ---------- 5) Eventos: a página responde a cada ação ----------
selCidade.addEventListener("change", simular);
inputChuva.addEventListener("input", simular);
inputBusca.addEventListener("input", simular);

botoesCenario.forEach(function (botao) {
  botao.addEventListener("click", function () {
    inputChuva.value = botao.dataset.chuva;
    simular();
  });
});

// Impede o recarregamento da página se o usuário apertar Enter na busca
document.querySelector("#form-simulacao").addEventListener("submit", function (evento) {
  evento.preventDefault();
  simular();
});

// ---------- Início ----------
preencherCidades();
simular();
