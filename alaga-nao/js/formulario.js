// ==========================================================
// Alaga Não — validação do formulário de cadastro de alertas
// Sem alert(): erros aparecem embaixo de cada campo e a
// mensagem final aparece na própria página.
// ==========================================================

const form = document.querySelector("#form-alerta");
const msgForm = document.querySelector("#msg-form");

// Mostra (ou limpa) o erro de um campo
function mostrarErro(campo, texto) {
  const erro = document.querySelector("#erro-" + campo.id);
  erro.textContent = texto;
  campo.setAttribute("aria-invalid", texto ? "true" : "false");
}

// Regras de cada campo: devolvem "" se estiver tudo certo
const regras = {
  nome: function (valor) {
    if (valor === "") return "Informe seu nome.";
    if (valor.length < 3) return "O nome precisa ter pelo menos 3 letras.";
    return "";
  },
  celular: function (valor) {
    const numeros = valor.replace(/\D/g, ""); // tira parênteses, espaços e traços
    if (numeros === "") return "Informe seu celular para receber o alerta.";
    if (numeros.length !== 11) return "Digite o celular com DDD: 11 números, ex.: (19) 99999-9999.";
    return "";
  },
  email: function (valor) {
    if (valor === "") return ""; // e-mail é opcional
    const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formato.test(valor)) return "E-mail inválido. Exemplo: nome@email.com";
    return "";
  },
  "cidade-form": function (valor) {
    if (valor === "") return "Escolha sua cidade.";
    return "";
  },
  bairro: function (valor) {
    if (valor === "") return "Informe seu bairro.";
    return "";
  }
};

function validarCampo(campo) {
  const texto = regras[campo.id](campo.value.trim());
  mostrarErro(campo, texto);
  return texto === "";
}

// Grupo de checkboxes: pelo menos um canal de alerta
function validarCanais() {
  const grupo = document.querySelector("#grupo-canais");
  const marcados = form.querySelectorAll('input[name="canal"]:checked');
  const erro = document.querySelector("#erro-canais");
  const ok = marcados.length > 0;
  erro.textContent = ok ? "" : "Marque pelo menos uma forma de receber o alerta.";
  grupo.classList.toggle("invalido", !ok);
  return ok;
}

// Consentimento LGPD
function validarAceite() {
  const aceite = document.querySelector("#aceite");
  const erro = document.querySelector("#erro-aceite");
  const ok = aceite.checked;
  erro.textContent = ok ? "" : "Você precisa autorizar o uso dos dados para receber alertas.";
  aceite.setAttribute("aria-invalid", ok ? "false" : "true");
  return ok;
}

// Valida enquanto a pessoa sai de cada campo (feedback imediato)
Object.keys(regras).forEach(function (id) {
  const campo = document.querySelector("#" + id);
  campo.addEventListener("blur", function () {
    validarCampo(campo);
  });
});

form.querySelectorAll('input[name="canal"]').forEach(function (caixa) {
  caixa.addEventListener("change", validarCanais);
});
document.querySelector("#aceite").addEventListener("change", validarAceite);

// Envio
form.addEventListener("submit", function (evento) {
  evento.preventDefault(); // protótipo: não envia para servidor

  let primeiroErro = null;

  Object.keys(regras).forEach(function (id) {
    const campo = document.querySelector("#" + id);
    if (!validarCampo(campo) && !primeiroErro) primeiroErro = campo;
  });

  if (!validarCanais() && !primeiroErro) {
    primeiroErro = form.querySelector('input[name="canal"]');
  }
  if (!validarAceite() && !primeiroErro) {
    primeiroErro = document.querySelector("#aceite");
  }

  if (primeiroErro) {
    msgForm.className = "msg-form msg-form--erro";
    msgForm.textContent = "Confira os campos destacados em vermelho e tente de novo.";
    primeiroErro.focus(); // leva o teclado direto ao primeiro problema
    return;
  }

  // Tudo certo: mensagem de sucesso na própria página
  const nome = document.querySelector("#nome").value.trim().split(" ")[0];
  const bairro = document.querySelector("#bairro").value.trim();
  const cidade = document.querySelector("#cidade-form").value;

  msgForm.className = "msg-form msg-form--sucesso";
  msgForm.textContent =
    "✅ Pronto, " + nome + "! Você vai receber alertas de chuva para " +
    bairro + " (" + cidade + "). Obrigado por ajudar sua comunidade.";

  form.reset();
  form.querySelectorAll("[aria-invalid]").forEach(function (campo) {
    campo.setAttribute("aria-invalid", "false");
  });
  msgForm.focus();
});
