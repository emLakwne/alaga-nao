# Alaga Não 🌧️

**Global Solution 2026/2 · CitizenTech · FIAP · Engenharia de Software (1º ano)**

## Descrição

O **Alaga Não** é uma CitizenTech de alerta de alagamento **por bairro** para Louveira e região (Jundiaí, Vinhedo, Itupeva e Valinhos).

- **Cidadão beneficiado:** moradores de bairros baixos e próximos a rios e córregos, quem precisa se deslocar em dias de chuva e pequenos produtores rurais que dependem de estradas de terra.
- **Problema:** as chuvas fortes chegam rápido e a maioria das pessoas só descobre que a rua alagou quando a água já está na porta. Os avisos que existem valem para a cidade toda e não dizem qual rua está em risco nem o que fazer.
- **Dado real:** em 2010, 8,3 milhões de brasileiros moravam em áreas de risco de enchentes e deslizamentos, segundo o IBGE e o Cemaden.
- **Solução:** o sistema cruza a chuva prevista (em mm/h) com o limite em que cada ponto costuma alagar e manda alerta por SMS ou WhatsApp só para quem está perto do ponto em risco, junto com orientações do que fazer.
- **ODS:** 11 (Cidades sustentáveis), 13 (Ação climática), 3 (Saúde e bem-estar) e 10 (Redução das desigualdades).

## Páginas

| Página | Conteúdo |
|---|---|
| `index.html` | Cidadão, problema com dado real e fonte, proposta da solução e ODS |
| `solucao.html` | **Simulação interativa**: filtro por cidade, busca por bairro e barra de chuva. O risco de cada ponto é recalculado na hora |
| `impacto.html` | Quem ganha, indicadores de impacto, ecossistema e como ampliar |
| `participe.html` | Formulário de cadastro de alertas, validado em JavaScript |
| `equipe.html` | Integrantes, link do pitch e fontes |

## Como abrir e executar

1. Descompacte o arquivo `.zip`.
2. Dê dois cliques em **`index.html`** para abrir no navegador (Chrome, Edge ou Firefox).
3. Não é preciso instalar nada nem rodar servidor.

> Site publicado: **https://alaga-nao-alaga-nao.vercel.app/**

## Requisitos atendidos

- **Navegação:** 5 páginas com o mesmo menu e HTML semântico (`header`, `nav`, `main`, `section`, `article`, `footer`).
- **Simulação:** array de objetos `pontos` em `js/dados.js` com 14 registros, exibidos pelo DOM em `js/simulacao.js`. Regra de risco: **alto** quando a chuva chega ao limite do ponto; **atenção** quando chega a 70% do limite; **baixo** abaixo disso.
- **Formulário:** campos obrigatórios validados em `js/formulario.js`, com mensagens de erro embaixo de cada campo e mensagem de sucesso na página, sem `alert()`.
- **Responsividade:** media queries em 900px e 700px, layout em grid e flexbox e menu "gaveta" no celular.
- **Acessibilidade:** tags semânticas, `alt` nas imagens, `label` em todos os campos, foco visível, link "pular para o conteúdo", regiões `aria-live`, navegação completa por teclado (Tab, Enter, setas e Esc fecha o menu), **alto contraste** e **ajuste do tamanho da fonte**.
- **Organização:** pastas `css`, `js` e `img`, sem CSS inline.

## Estrutura

```
alaga-nao/
├── index.html
├── solucao.html
├── impacto.html
├── participe.html
├── equipe.html
├── README.md
├── css/style.css
├── js/acessibilidade.js   (menu do celular, contraste e fonte, usado em todas as páginas)
├── js/dados.js            (array de objetos com os pontos de alagamento)
├── js/simulacao.js        (simulação interativa)
├── js/formulario.js       (validação do formulário)
└── img/logo.svg, img/hero.svg
```

## Observação sobre os dados

Os pontos de alagamento, os limites de chuva e o número de moradores da simulação são **dados simulados** pelo grupo para demonstrar o protótipo. Os números do problema na página inicial são reais e têm fonte.

## Integrantes

| Nome | RM |
|---|---|
| Enzo Colasanta de Almeida | 571308 |
| Arthur Barrio Garcia | 572745 |
| Guilherme Biondo Schunck da Silva | 568954 |
| Lucas Henrique Dionizio Torres | 568977 |

## Vídeo pitch

🎥 **https://youtu.be/k6MMAmPnBCo**

## Fontes

- IBGE e Cemaden: [População em áreas de risco no Brasil](https://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/21565-em-2010-brasil-tinha-8-3-milhoes-de-pessoas-morando-em-areas-com-risco-de-desastres-naturais.html)
- Tribuna de Jundiaí: [Chuvas derrubam muro e deixam famílias desabrigadas em Jundiaí](https://tribunadejundiai.com.br/cidades/jundiai/chuvas-derrubam-muro-e-deixa-familias-desabrigadas-em-jundiai/)
- ONU: [Objetivos de Desenvolvimento Sustentável](https://sdgs.un.org/goals)

## Uso de IA generativa

| Ferramenta | Para quê |
|---|---|
| Claude (Anthropic) | Leitura e organização dos requisitos do enunciado, pesquisa de fontes, apoio na estrutura do código HTML/CSS/JS, explicação dos trechos de código e revisão de texto |

Todo o código foi revisado e testado pelo grupo. Os integrantes sabem explicar como funcionam a simulação (filtro, cálculo de risco e montagem dos cartões pelo DOM) e a validação do formulário.
