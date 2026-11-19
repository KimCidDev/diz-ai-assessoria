/*
 * Dados da prévia — Diz Assessoria Imobiliária
 * --------------------------------------------------------------
 * Tudo aqui vem do site atual (dizassessoria.com.br, lido em
 * 18 nov 2026). O que não aparece no site fica como null e o
 * site esconde o campo (sem anotações visíveis).
 *
 * Fotos: imagens ilustrativas (Unsplash), só para a prévia.
 * As fotos reais de cada imóvel entram depois, com a cliente.
 */

window.DIZ = (function () {
  'use strict';

  var SITE = {
    nome: 'Diz Assessoria Imobiliária',
    telefone: '(51) 3028-3188',
    telefoneLink: 'tel:+555130283188',
    // Número do WhatsApp não aparece no texto do site atual.
    // Quando a cliente confirmar, preencha só os dígitos, ex.: '5551999999999'.
    whatsapp: '', // número a receber da cliente
    instagram: '', // endereço a receber da cliente
    // Prova de conceito: botões de WhatsApp e Instagram aparecem, mas não redirecionam.
    // Com o número e o perfil confirmados, troque para true.
    redirecionarContatos: false,
    email: 'web@dizassessoria.com.br',
    endereco: 'Av. Getúlio Vargas, 1410/204',
    bairro: 'Menino Deus',
    cidade: 'Porto Alegre – RS',
    creci: '32490',
    horario: 'Seg. a sex., 09:00–12:00 e 13:30–17:00',
    portal: 'https://diz.virtualimobi.com',
    // Prazo de resposta: não informado no site atual.
    prazoResposta: null // [a confirmar]
  };

  function foto(id, w) {
    return 'https://images.unsplash.com/photo-' + id +
      '?auto=format&fit=crop&w=' + (w || 1200) + '&q=72';
  }

  var IMOVEIS = [
    {
      id: 'D1NO',
      codigo: 'D1NO',
      finalidade: 'Venda',
      tipo: 'Apartamento',
      bairro: 'Nonoai',
      cidade: 'Porto Alegre',
      preco: 190000,
      dormitorios: 1,
      banheiros: 1,
      vagas: 1,
      area: 50, // vale o que diz a página de detalhe do site atual (o cartão da home dizia 43)
      condominio: null, // [a confirmar]
      iptu: null,       // [a confirmar]
      endereco: null,   // rua e número [a confirmar]
      titulo: 'Apartamento de 1 dormitório no Nonoai',
      resumo: 'Arejado, ensolarado, em prédio com elevador e jardim.',
      descricao: [
        'Um apartamento original, arejado e ensolarado, com boa ventilação — pronto para receber o seu jeito de morar. São 50 m² com living, cozinha, área de serviço, um dormitório e um banheiro.',
        'O prédio é recuado da rua, com jardim na frente, elevador e salão de festas com churrasqueira para receber a família e os amigos. A vaga de garagem é escriturada e o imóvel está quitado, o que deixa a negociação mais simples.'
      ],
      // Uma única lista, sem duplicatas, só com o que o anúncio confirma.
      caracteristicas: {
        'O apartamento': ['Living', 'Cozinha', 'Área de serviço', 'Ensolarado', 'Arejado e ventilado'],
        'O prédio': ['Elevador', 'Salão de festas com churrasqueira', 'Recuado, com jardim'],
        'Documentação': ['Box escriturado', 'Imóvel quitado']
      },
      extras: [['Documentação', 'Imóvel quitado'], ['Garagem', 'Box escriturado']],
      fotos: [
        '1502672260266-1c1ef2d93688',
        '1560448204-e02f11c3d0e2',
        '1484154218962-a197022b5858',
        '1505691938895-1758d7feb511',
        '1493809842364-78817add7ffb',
        '1554995207-c18c203602cb',
        '1522708323590-d24dbb6b0267'
      ],
      bairroTexto: 'O Nonoai fica na Zona Sul de Porto Alegre. A Avenida Nonoai concentra o comércio e os serviços do bairro, e a região é servida por linhas de ônibus e lotação, com acesso às principais vias da cidade.'
    },
    {
      id: 'azenha-220',
      codigo: null,
      finalidade: 'Venda',
      tipo: 'Apartamento', // tipo: exemplo para a prévia
      bairro: 'Azenha',
      cidade: 'Porto Alegre',
      preco: 220000,
      // Cartão do site atual: 2 dorm., 1 banh. Área FICTÍCIA (exemplo para a prévia).
      dormitorios: 2, banheiros: 1, vagas: null, area: 58,
      fotos: ['1600566753190-17f0baa2a6c3', '1586023492125-27b2c045efd7']
    },
    {
      id: 'jardim-botanico-265',
      codigo: null,
      finalidade: 'Venda',
      tipo: 'Apartamento', // tipo: exemplo para a prévia
      bairro: 'Jardim Botânico',
      cidade: 'Porto Alegre',
      preco: 265000,
      // FICTÍCIO (exemplo para a prévia, a pedido do Kim) — substituir pelos dados reais.
      dormitorios: 2, banheiros: 1, vagas: 1, area: 62,
      fotos: ['1586023492125-27b2c045efd7', '1600566753190-17f0baa2a6c3']
    },
    {
      id: 'menino-deus-590',
      codigo: null,
      finalidade: 'Venda',
      tipo: 'Apartamento', // tipo: exemplo para a prévia
      bairro: 'Menino Deus',
      cidade: 'Porto Alegre',
      preco: 590000,
      // FICTÍCIO (exemplo para a prévia, a pedido do Kim) — substituir pelos dados reais.
      dormitorios: 3, banheiros: 2, vagas: 1, area: 98,
      fotos: ['1600607687939-ce8a6c25118c', '1600210492486-724fe5c67fb0']
    },
    {
      id: 'menino-deus-980',
      codigo: null,
      // No site atual este cartão traz o selo "COMPRA" — significado [a confirmar].
      // Na prévia o selo foi retirado em vez de mostrar algo ambíguo.
      finalidade: 'Venda',
      selo: null,
      tipo: 'Casa', // tipo: exemplo para a prévia
      bairro: 'Menino Deus',
      cidade: 'Porto Alegre',
      preco: 980000,
      // FICTÍCIO (exemplo para a prévia, a pedido do Kim) — substituir pelos dados reais.
      dormitorios: 3, banheiros: 3, vagas: 2, area: 156,
      fotos: ['1600596542815-ffad4c1539a9', '1600585154340-be6161a56a0c']
    },
    {
      id: 'menino-deus-1200',
      codigo: null,
      finalidade: 'Venda',
      destaque: true,
      tipo: 'Casa', // tipo: exemplo para a prévia
      bairro: 'Menino Deus',
      cidade: 'Porto Alegre',
      preco: 1200000,
      // Cartão do site atual: 4 dorm., 5+ banh., 4 vagas, 340 m².
      dormitorios: 4, banheiros: 5, banheirosMais: true, vagas: 4, area: 340,
      fotos: ['1512917774080-9991f1c4c750', '1600585154340-be6161a56a0c']
    }
  ];

  // ALUGUÉIS — FICTÍCIOS (exemplos para a prévia, a pedido do Kim).
  IMOVEIS.push(
    {
      id: 'aluguel-menino-deus', codigo: null, finalidade: 'Aluguel', tipo: 'Apartamento',
      bairro: 'Menino Deus', cidade: 'Porto Alegre',
      preco: 2400, condominio: 520, iptu: null,
      dormitorios: 2, banheiros: 1, vagas: 1, area: 68,
      fotos: ['1493809842364-78817add7ffb', '1484154218962-a197022b5858', '1505691938895-1758d7feb511']
    },
    {
      id: 'aluguel-cidade-baixa', codigo: null, finalidade: 'Aluguel', tipo: 'Apartamento',
      bairro: 'Cidade Baixa', cidade: 'Porto Alegre',
      preco: 1650, condominio: 380, iptu: null,
      dormitorios: 1, banheiros: 1, vagas: null, area: 42,
      fotos: ['1554995207-c18c203602cb', '1560448204-e02f11c3d0e2', '1502672260266-1c1ef2d93688']
    },
    {
      id: 'aluguel-petropolis', codigo: null, finalidade: 'Aluguel', tipo: 'Apartamento',
      bairro: 'Petrópolis', cidade: 'Porto Alegre',
      preco: 3800, condominio: 890, iptu: null,
      dormitorios: 3, banheiros: 2, vagas: 2, area: 112,
      fotos: ['1600607687939-ce8a6c25118c', '1600566753190-17f0baa2a6c3', '1600210492486-724fe5c67fb0']
    }
  );

  var IMAGENS = {
    hero: '1600210492486-724fe5c67fb0',
    comprar: '1600585154340-be6161a56a0c',
    alugar: '1522708323590-d24dbb6b0267',
    condominios: '1545324418-cc1a3fa10c00',
    escritorio: '1497366216548-37526070297c' // ambiente, sem pessoas; trocar por foto real da equipe
  };

  function preco(v) {
    if (v == null) return null;
    return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // Preposição correta por bairro (em Porto Alegre se diz "na Azenha").
  var NA = { 'Azenha': 'na', 'Cidade Baixa': 'na' };
  function noBairro(b) { return (NA[b] || 'no') + ' ' + b; }

  function precoDe(im) {
    return preco(im.preco) + (im.finalidade === 'Aluguel' ? '/mês' : '');
  }

  function tituloDe(im) {
    if (im.titulo) return im.titulo;
    var t = im.tipo || 'Imóvel';
    if (im.dormitorios != null) t += ' de ' + im.dormitorios + (im.dormitorios === 1 ? ' dormitório' : ' dormitórios');
    return t + ' ' + noBairro(im.bairro);
  }

  function linkWhats(msg) {
    if (!SITE.redirecionarContatos) return '#';
    var texto = encodeURIComponent(msg || 'Olá, vim pelo site da Diz e gostaria de atendimento.');
    // Sem número confirmado, o WhatsApp abre com a mensagem pronta para escolher o contato.
    return SITE.whatsapp
      ? 'https://wa.me/' + SITE.whatsapp + '?text=' + texto
      : 'https://wa.me/?text=' + texto;
  }

  function porId(id) {
    for (var i = 0; i < IMOVEIS.length; i++) {
      if (IMOVEIS[i].id.toLowerCase() === String(id).toLowerCase() ||
          (IMOVEIS[i].codigo && IMOVEIS[i].codigo.toLowerCase() === String(id).toLowerCase())) {
        return IMOVEIS[i];
      }
    }
    return null;
  }

  return {
    SITE: SITE,
    IMOVEIS: IMOVEIS,
    IMAGENS: IMAGENS,
    foto: foto,
    preco: preco,
    tituloDe: tituloDe,
    precoDe: precoDe,
    noBairro: noBairro,
    linkWhats: linkWhats,
    porId: porId
  };
})();
