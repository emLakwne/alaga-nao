// ==========================================================
// Alaga Não — script comum a todas as páginas
// 1) Menu do celular (abrir/fechar)
// 2) Alto contraste e tamanho da fonte (guardados no navegador)
// ==========================================================

// ---------- 1) Menu do celular ----------
const botaoMenu = document.querySelector(".menu-botao");
const menu = document.querySelector("#menu-principal");

if (botaoMenu && menu) {
  botaoMenu.addEventListener("click", function () {
    const aberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", aberto);
    botaoMenu.textContent = aberto ? "Fechar ✕" : "Menu ☰";
  });

  // Fecha o menu com a tecla Esc e devolve o foco ao botão
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && menu.classList.contains("aberto")) {
      menu.classList.remove("aberto");
      botaoMenu.setAttribute("aria-expanded", "false");
      botaoMenu.textContent = "Menu ☰";
      botaoMenu.focus();
    }
  });
}

// ---------- 2) Preferências de acessibilidade ----------
const html = document.documentElement;
const tamanhos = ["", "fonte-maior", "fonte-gigante"]; // níveis de fonte

// localStorage pode falhar (ex.: modo anônimo), por isso o try/catch
function lerPreferencia(chave) {
  try {
    return localStorage.getItem(chave);
  } catch (erro) {
    return null;
  }
}

function salvarPreferencia(chave, valor) {
  try {
    localStorage.setItem(chave, valor);
  } catch (erro) {
    // se não der para salvar, o site continua funcionando normalmente
  }
}

let nivelFonte = Number(lerPreferencia("alaga-fonte")) || 0;
let contraste = lerPreferencia("alaga-contraste") === "sim";

function aplicarPreferencias() {
  html.classList.remove("fonte-maior", "fonte-gigante");
  if (tamanhos[nivelFonte]) {
    html.classList.add(tamanhos[nivelFonte]);
  }
  html.classList.toggle("alto-contraste", contraste);

  const botaoContraste = document.querySelector("#btn-contraste");
  if (botaoContraste) {
    botaoContraste.setAttribute("aria-pressed", contraste);
  }
}

aplicarPreferencias();

const btnAumentar = document.querySelector("#btn-fonte-mais");
const btnDiminuir = document.querySelector("#btn-fonte-menos");
const btnContraste = document.querySelector("#btn-contraste");
const avisoAcess = document.querySelector("#aviso-acess");

function avisar(texto) {
  // região aria-live: leitores de tela anunciam a mudança
  if (avisoAcess) avisoAcess.textContent = texto;
}

if (btnAumentar) {
  btnAumentar.addEventListener("click", function () {
    if (nivelFonte < tamanhos.length - 1) nivelFonte++;
    salvarPreferencia("alaga-fonte", nivelFonte);
    aplicarPreferencias();
    avisar("Tamanho da fonte: nível " + (nivelFonte + 1) + " de 3");
  });
}

if (btnDiminuir) {
  btnDiminuir.addEventListener("click", function () {
    if (nivelFonte > 0) nivelFonte--;
    salvarPreferencia("alaga-fonte", nivelFonte);
    aplicarPreferencias();
    avisar("Tamanho da fonte: nível " + (nivelFonte + 1) + " de 3");
  });
}

if (btnContraste) {
  btnContraste.addEventListener("click", function () {
    contraste = !contraste;
    salvarPreferencia("alaga-contraste", contraste ? "sim" : "nao");
    aplicarPreferencias();
    avisar(contraste ? "Alto contraste ativado" : "Alto contraste desativado");
  });
}
