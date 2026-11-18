// ==========================================================
// Alaga Não — base de dados do protótipo
// Array de objetos com os pontos monitorados.
//
// ATENÇÃO: os valores são SIMULADOS para fins de protótipo.
// Os bairros de Jundiaí citados aparecem em notícias de
// alagamento da região; os limites de chuva (limiarMm) e o
// número de moradores são estimativas do grupo, não dados
// oficiais. Numa versão real, viriam da Defesa Civil/Cemaden.
//
// limiarMm = chuva (em mm por hora) a partir da qual o
//            ponto costuma alagar
// ==========================================================

const pontos = [
  {
    id: 1,
    local: "Av. Antônio Pincinato",
    bairro: "Região da Av. Pincinato",
    cidade: "Jundiaí",
    tipo: "Via",
    limiarMm: 35,
    moradores: 900,
    dica: "Evite a avenida em chuva forte. Use rotas pela parte alta do bairro."
  },
  {
    id: 2,
    local: "Ponte São João",
    bairro: "Ponte São João",
    cidade: "Jundiaí",
    tipo: "Ponte / rio",
    limiarMm: 40,
    moradores: 1200,
    dica: "Não atravesse a ponte com água sobre a pista. 30 cm de água já arrastam um carro."
  },
  {
    id: 3,
    local: "Rua de acesso à Vila Liberdade",
    bairro: "Vila Liberdade",
    cidade: "Jundiaí",
    tipo: "Via",
    limiarMm: 30,
    moradores: 650,
    dica: "Moradores de térreo: suba móveis e documentos ao receber o alerta laranja."
  },
  {
    id: 4,
    local: "Margem do córrego — Jardim Sorocabana",
    bairro: "Jardim Sorocabana",
    cidade: "Jundiaí",
    tipo: "Córrego",
    limiarMm: 25,
    moradores: 800,
    dica: "Área de transbordamento rápido. Tenha um ponto de abrigo combinado com a família."
  },
  {
    id: 5,
    local: "Centro — Rua principal",
    bairro: "Centro",
    cidade: "Louveira",
    tipo: "Via",
    limiarMm: 45,
    moradores: 500,
    dica: "Comércio: mantenha mercadorias acima de 40 cm do chão na época de chuvas."
  },
  {
    id: 6,
    local: "Margem do rio",
    bairro: "Região ribeirinha",
    cidade: "Louveira",
    tipo: "Rio",
    limiarMm: 30,
    moradores: 700,
    dica: "Acompanhe o nível do rio. Se subir rápido, saia antes de a rua encher."
  },
  {
    id: 7,
    local: "Passagem sob a rodovia",
    bairro: "Região da rodovia",
    cidade: "Louveira",
    tipo: "Túnel / passagem",
    limiarMm: 20,
    moradores: 150,
    dica: "Passagens baixas enchem primeiro. Nunca entre com o carro se não vir o chão."
  },
  {
    id: 8,
    local: "Estrada rural — sítios de uva",
    bairro: "Zona rural",
    cidade: "Louveira",
    tipo: "Estrada de terra",
    limiarMm: 50,
    moradores: 120,
    dica: "Produtores: adiem o transporte da colheita em alerta laranja; a estrada vira lama."
  },
  {
    id: 9,
    local: "Centro — região da rodoviária",
    bairro: "Centro",
    cidade: "Vinhedo",
    tipo: "Via",
    limiarMm: 40,
    moradores: 600,
    dica: "Ônibus podem mudar de trajeto. Confira o aviso antes de sair de casa."
  },
  {
    id: 10,
    local: "Margem do córrego",
    bairro: "Região do córrego",
    cidade: "Vinhedo",
    tipo: "Córrego",
    limiarMm: 28,
    moradores: 450,
    dica: "Desligue a energia da casa se a água começar a entrar."
  },
  {
    id: 11,
    local: "Avenida central",
    bairro: "Centro",
    cidade: "Itupeva",
    tipo: "Via",
    limiarMm: 38,
    moradores: 550,
    dica: "Escolas da região podem suspender aulas. Fique atento ao canal da prefeitura."
  },
  {
    id: 12,
    local: "Várzea do rio",
    bairro: "Região de várzea",
    cidade: "Itupeva",
    tipo: "Rio",
    limiarMm: 25,
    moradores: 400,
    dica: "Área de várzea: tenha uma mochila de emergência pronta (documentos, remédios, lanterna)."
  },
  {
    id: 13,
    local: "Ponte do centro",
    bairro: "Centro",
    cidade: "Valinhos",
    tipo: "Ponte / rio",
    limiarMm: 42,
    moradores: 700,
    dica: "Se a água passar da guia, procure outra ponte ou espere a chuva baixar."
  },
  {
    id: 14,
    local: "Rua baixa perto do córrego",
    bairro: "Região baixa",
    cidade: "Valinhos",
    tipo: "Córrego",
    limiarMm: 22,
    moradores: 350,
    dica: "Mantenha bueiros da sua rua livres de lixo — isso reduz o alagamento."
  }
];
