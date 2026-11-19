/*
 * Partes comuns às duas páginas: ícones, menu, cartões de imóvel,
 * links de contato, ano do rodapé e fallback de imagem.
 * Todos os cliques são ligados aqui no JavaScript (sem onclick inline).
 */
(function () {
  'use strict';
  var D = window.DIZ;

  var ICON = {
    bed: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18V7m0 7h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5M7 11.5a1.5 1.5 0 1 0 0-.01"/></svg>',
    bath: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3zM6 12V6a2 2 0 0 1 3.5-1.3M7 19l-1 2m11-2 1 2"/></svg>',
    car: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 16V11l2-5h10l2 5v5M5 16h14M5 16v2m14-2v2M7.5 13h.01M16.5 13h.01"/></svg>',
    area: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
    whats: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.1L4 20z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2L9 9.5z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v12H3zM3 7l9 6 9-6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>',
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m5-5-5 5 5 5"/></svg>',
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
    share: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.2 10.8 7.6-3.6m-7.6 6 7.6 3.6"/></svg>',
    expand: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></svg>',
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/><path d="m9 12 2 2 4-4"/></svg>',
    lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    chev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>'
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function tbc(label) {
    return '<span class="tbc" title="Dado a confirmar com a cliente">' +
      (label ? esc(label) + ' ' : '') + '[a confirmar]</span>';
  }

  /* Fatos do imóvel: só mostra o que existe — nunca "-". */
  function fatos(im, cls) {
    var f = [];
    if (im.dormitorios != null) f.push([ICON.bed, im.dormitorios + (im.dormitorios === 1 ? ' dorm.' : ' dorms.')]);
    if (im.banheiros != null) f.push([ICON.bath, im.banheiros + (im.banheirosMais ? '+' : '') + (im.banheiros === 1 && !im.banheirosMais ? ' banh.' : ' banhs.')]);
    if (im.vagas != null) f.push([ICON.car, im.vagas + (im.vagas === 1 ? ' vaga' : ' vagas')]);
    if (im.area != null) f.push([ICON.area, im.area + ' m²']);
    if (!f.length) return '';
    return '<ul class="' + (cls || 'facts') + '">' + f.map(function (x) {
      return '<li>' + x[0] + '<span>' + x[1] + '</span></li>';
    }).join('') + '</ul>';
  }

  /* Faixa sobre a foto: gradiente suave + ícones das características principais.
     Só aparece quando há pelo menos um dado; nada de "-". */
  function faixa(im) {
    var f = [];
    function n(v, mais) { return v + (mais ? '+' : ''); }
    if (im.dormitorios != null) f.push([ICON.bed, n(im.dormitorios), im.dormitorios === 1 ? 'dormitório' : 'dormitórios']);
    if (im.banheiros != null) f.push([ICON.bath, n(im.banheiros, im.banheirosMais), im.banheiros === 1 && !im.banheirosMais ? 'banheiro' : 'banheiros']);
    if (im.vagas != null) f.push([ICON.car, n(im.vagas), im.vagas === 1 ? 'vaga' : 'vagas']);
    if (im.area != null) f.push([ICON.area, im.area + ' m²', 'de área']);
    if (!f.length) return '';
    return '<div class="ov"><ul class="ov__facts">' + f.map(function (x) {
      return '<li>' + x[0] + '<span>' + x[1] + '</span><span class="sr-only"> ' + x[2] + '</span></li>';
    }).join('') + '</ul></div>';
  }

  function cartao(im, opts) {
    opts = opts || {};
    var foto = im.fotos && im.fotos[0];
    var badge = im.finalidade ? '<span class="badge">' + esc(im.finalidade) + '</span>' : '';
    var count = im.fotos && im.fotos.length > 2
      ? '<span class="card__count">' + im.fotos.length + ' fotos</span>' : '';
    return '' +
      '<a class="card' + (opts.big ? ' card--big' : '') + '" href="imovel.html?id=' + encodeURIComponent(im.id) + '">' +
        '<div class="card__media">' +
          (foto ? '<img data-src="' + D.foto(foto, opts.big ? 1400 : 800) + '" alt="' + esc(D.tituloDe(im)) + '">' : '') +
          badge + count + faixa(im) +
        '</div>' +
        '<div class="card__body">' +
          '<p class="card__place">' + esc(im.bairro) + ' · ' + esc(im.cidade) + '</p>' +
          '<h3 class="card__title">' + esc(D.tituloDe(im)) + '</h3>' +
          '<p class="card__price">' + D.preco(im.preco) + '</p>' +
          '<div class="card__foot">' +
            (im.codigo ? '<span class="card__code">Cód. ' + esc(im.codigo) + '</span>' : '<span></span>') +
            '<span class="card__cta">Ver imóvel ' + ICON.arrow + '</span>' +
          '</div>' +
        '</div>' +
      '</a>';
  }

  /* Imagens: carregam depois do HTML; se falharem, fica um fundo neutro elegante. */
  function carregarImagens(root) {
    var imgs = (root || document).querySelectorAll('img[data-src]');
    Array.prototype.forEach.call(imgs, function (img) {
      img.addEventListener('error', function () {
        img.classList.add('is-broken');
        if (img.parentNode) img.parentNode.classList.add('media-fallback');
      });
      img.addEventListener('load', function () { img.classList.add('is-loaded'); });
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    });
  }

  function preencherIcones(root) {
    var els = (root || document).querySelectorAll('[data-icon]');
    Array.prototype.forEach.call(els, function (el) {
      var i = ICON[el.getAttribute('data-icon')];
      if (i) el.insertAdjacentHTML('afterbegin', i);
      el.removeAttribute('data-icon');
    });
  }

  function ligarContatos(root) {
    var S = D.SITE;
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-whats]'), function (a) {
      a.href = D.linkWhats(a.getAttribute('data-whats') || null);
      a.target = '_blank';
      a.rel = 'noopener';
    });
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-tel]'), function (a) {
      a.href = S.telefoneLink;
    });
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-mail]'), function (a) {
      a.href = 'mailto:' + S.email;
    });
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-whats-numero]'), function (el) {
      el.innerHTML = S.whatsapp ? esc(S.whatsapp) : tbc('número');
    });
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-prazo]'), function (el) {
      el.innerHTML = S.prazoResposta
        ? 'Respondemos em até ' + esc(S.prazoResposta) + ', no horário de atendimento.'
        : 'Prazo de resposta ' + tbc() + ' · ' + esc(S.horario);
    });
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-tbc]'), function (el) {
      el.innerHTML = tbc(el.getAttribute('data-tbc'));
    });
  }

  function menu() {
    var btn = document.querySelector('.nav-toggle');
    var nav = document.getElementById('menu');
    if (!btn || !nav) return;
    function set(open) {
      document.body.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    btn.addEventListener('click', function () {
      set(!document.body.classList.contains('menu-open'));
    });
    Array.prototype.forEach.call(nav.querySelectorAll('a'), function (a) {
      a.addEventListener('click', function () { set(false); });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  }

  function cabecalhoAoRolar() {
    var h = document.querySelector('.site-header');
    if (!h || !h.classList.contains('site-header--over')) return;
    function f() { h.classList.toggle('is-solid', window.scrollY > 40); }
    window.addEventListener('scroll', f, { passive: true });
    f();
  }

  function ano() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-ano]'), function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  window.DIZUI = {
    ICON: ICON, esc: esc, tbc: tbc, fatos: fatos, faixa: faixa, cartao: cartao,
    carregarImagens: carregarImagens, preencherIcones: preencherIcones, ligarContatos: ligarContatos
  };

  document.addEventListener('DOMContentLoaded', function () {
    preencherIcones();
    ligarContatos();
    menu();
    cabecalhoAoRolar();
    ano();
  });
})();
