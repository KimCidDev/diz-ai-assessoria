/*
 * Página de detalhe do imóvel (imovel.html?id=D1NO).
 * Monta tudo a partir de data.js — um único bloco de dados, sem duplicatas.
 */
(function () {
  'use strict';
  var D = window.DIZ;
  var UI = window.DIZUI;
  function $(id) { return document.getElementById(id); }

  function idDaUrl() {
    var m = /[?&]id=([^&#]+)/.exec(window.location.search);
    return m ? decodeURIComponent(m[1]) : 'D1NO';
  }

  var im = D.porId(idDaUrl()) || D.porId('D1NO');

  function msgWhats() {
    var ref = im.codigo ? 'o imóvel ' + im.codigo : 'o imóvel ' + D.noBairro(im.bairro);
    return 'Olá, tenho interesse n' + ref + ' (' + im.bairro + ', ' + D.preco(im.preco) + '). Pode me passar mais informações?';
  }

  function resumoAuto() {
    var p = [D.tituloDe(im)];
    var d = [];
    if (im.banheiros != null) d.push(im.banheiros + (im.banheirosMais ? '+' : '') + (im.banheiros === 1 && !im.banheirosMais ? ' banheiro' : ' banheiros'));
    if (im.vagas != null) d.push(im.vagas + (im.vagas === 1 ? ' vaga de garagem' : ' vagas de garagem'));
    if (im.area != null) d.push(im.area + ' m²');
    return p[0] + (d.length ? ', com ' + d.join(', ').replace(/, ([^,]*)$/, ' e $1') : '') + '.';
  }

  function cabecalho() {
    var tipo = im.tipo ? ' · ' + UI.esc(im.tipo) : '';
    $('detailHead').innerHTML =
      '<p class="detail__tags"><span class="badge badge--solid">' + UI.esc(im.finalidade) + '</span>' +
        '<span class="detail__type">Residencial' + tipo + '</span></p>' +
      '<h1 class="detail__title">' + UI.esc(D.tituloDe(im)) + '</h1>' +
      '<p class="detail__place">' + UI.ICON.pin + UI.esc(im.bairro) + ', ' + UI.esc(im.cidade) + ' – RS</p>' +
      '<div class="detail__pricebar">' +
        '<p class="detail__price">' + D.preco(im.preco) + '</p>' +
        (im.codigo ? '<p class="detail__code">Código <strong>' + UI.esc(im.codigo) + '</strong></p>' : '') +
      '</div>' +
      UI.fatos(im, 'facts facts--big');
    document.title = D.tituloDe(im) + ' · Diz Assessoria Imobiliária';
  }

  function valores() {
    // Só mostra o que existe: condomínio e IPTU aparecem quando informados.
    var linhas = [['Valor de ' + (im.finalidade === 'Aluguel' ? 'aluguel' : 'venda'), D.preco(im.preco)]];
    if (im.condominio != null) linhas.push(['Condomínio', D.preco(im.condominio)]);
    if (im.iptu != null) linhas.push(['IPTU', D.preco(im.iptu)]);
    (im.extras || []).forEach(function (e) { linhas.push(e); });
    $('valores').innerHTML = '<dl class="kvs">' + linhas.map(function (l) {
      return '<div class="kv"><dt>' + UI.esc(l[0]) + '</dt><dd>' + UI.esc(l[1]) + '</dd></div>';
    }).join('') + '</dl>';
  }

  function descricao() {
    $('descricao').innerHTML = im.descricao
      ? im.descricao.map(function (p) { return '<p>' + UI.esc(p) + '</p>'; }).join('')
      : '<p>' + UI.esc(resumoAuto()) + '</p><p>Fale com a nossa equipe para receber a ficha completa, as fotos e os valores deste imóvel — e para agendar uma visita.</p>';
  }

  function caracteristicas() {
    var c = im.caracteristicas;
    if (!c) {
      $('caracteristicas').hidden = true;
      return;
    }
    var html = '<h2 class="h3">Características</h2><div class="feat-groups">';
    Object.keys(c).forEach(function (grupo) {
      html += '<div class="feat-group"><h3>' + UI.esc(grupo) + '</h3><ul class="feat-list">' +
        c[grupo].map(function (x) { return '<li>' + UI.esc(x) + '</li>'; }).join('') + '</ul></div>';
    });
    $('caracteristicas').innerHTML = html + '</div>';
  }

  function localizacao() {
    var q = (im.endereco ? im.endereco + ', ' : '') + im.bairro + ', Porto Alegre - RS';
    $('endereco').innerHTML = UI.ICON.pin + '<span>' +
      (im.endereco ? UI.esc(im.endereco) + ' · ' : '') + UI.esc(im.bairro) + ', Porto Alegre – RS' +
      (im.endereco ? '' : '<small>Endereço completo informado no agendamento da visita.</small>') + '</span>';
    $('mapa').src = 'https://maps.google.com/maps?q=' + encodeURIComponent(q) + '&z=' + (im.endereco ? 16 : 14) + '&output=embed';
    $('mapaLink').href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
    if (im.bairroTexto) $('bairroTexto').innerHTML = '<h3>O bairro</h3><p>' + UI.esc(im.bairroTexto) + '</p>';
    else $('bairroTexto').hidden = true;
  }

  function contato() {
    $('sidePrice').textContent = D.preco(im.preco);
    $('sideCode').textContent = im.codigo ? 'Código ' + im.codigo : im.bairro + ' · Porto Alegre';
    [$('sideWhats'), $('stickyWhats')].forEach(function (a) {
      a.href = D.linkWhats(msgWhats());
      a.target = '_blank'; a.rel = 'noopener';
    });
    $('mMsg').value = 'Olá, tenho interesse ' + (im.codigo ? 'no imóvel ' + im.codigo : 'neste imóvel') + '. Quando podemos conversar?';
    $('miniForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = $('mNome').value.trim(), cont = $('mContato').value.trim();
      $('mErr').hidden = !!(nome && cont);
      if (!nome || !cont) return;
      var assunto = 'Interesse no imóvel ' + (im.codigo || im.bairro);
      var corpo = $('mMsg').value + '\n\nNome: ' + nome + '\nContato: ' + cont + '\nImóvel: ' + window.location.href;
      window.location.href = 'mailto:' + D.SITE.email + '?subject=' + encodeURIComponent(assunto) + '&body=' + encodeURIComponent(corpo);
    });
  }

  /* Similares: mesmo bairro primeiro, depois a faixa de preço mais próxima. */
  function similares() {
    var outros = D.IMOVEIS.filter(function (x) { return x !== im && x.finalidade === im.finalidade; });
    outros.sort(function (a, b) {
      var ba = a.bairro === im.bairro ? 0 : 1, bb = b.bairro === im.bairro ? 0 : 1;
      if (ba !== bb) return ba - bb;
      return Math.abs(a.preco - im.preco) - Math.abs(b.preco - im.preco);
    });
    $('similaresGrid').innerHTML = outros.slice(0, 3).map(function (x) { return UI.cartao(x); }).join('');
    UI.carregarImagens($('similaresGrid'));
  }

  function galeria() {
    var track = $('galleryTrack');
    var fotos = im.fotos || [];
    track.innerHTML = fotos.map(function (f, i) {
      return '<figure class="gallery__slide"><img data-src="' + D.foto(f, 1400) + '" alt="Foto ' + (i + 1) + ' de ' + fotos.length + ' — ' + UI.esc(D.tituloDe(im)) + '"></figure>';
    }).join('');
    // Faixa com as características sobre a foto, igual aos cartões.
    track.insertAdjacentHTML('afterend', UI.faixa(im));
    UI.carregarImagens(track);
    // A primeira foto carrega já, sem esperar o lazy-load.
    var first = track.querySelector('img');
    if (first) first.setAttribute('loading', 'eager');

    var total = fotos.length;
    function atual() { return Math.round(track.scrollLeft / Math.max(track.clientWidth, 1)); }
    function contar() { $('gCount').textContent = Math.min(atual() + 1, total) + ' / ' + total; }
    function ir(d) { track.scrollTo({ left: (atual() + d) * track.clientWidth, behavior: 'smooth' }); }
    track.addEventListener('scroll', function () { window.requestAnimationFrame(contar); }, { passive: true });
    $('gPrev').addEventListener('click', function () { ir(-1); });
    $('gNext').addEventListener('click', function () { ir(1); });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') ir(1);
      if (e.key === 'ArrowLeft') ir(-1);
    });

    var g = $('gallery');
    function tela(full) {
      var i = atual();
      g.classList.toggle('is-full', full);
      document.body.classList.toggle('no-scroll', full);
      window.requestAnimationFrame(function () { track.scrollLeft = i * track.clientWidth; contar(); });
    }
    $('gFull').addEventListener('click', function () { tela(true); });
    $('gClose').addEventListener('click', function () { tela(false); });
    track.addEventListener('click', function () { if (!g.classList.contains('is-full')) tela(true); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') tela(false); });
    window.addEventListener('resize', contar);
    contar();
  }

  function toast(txt) {
    var t = document.createElement('div');
    t.className = 'toast'; t.textContent = txt;
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add('is-on'); }, 10);
    setTimeout(function () { t.classList.remove('is-on'); setTimeout(function () { t.remove(); }, 300); }, 2200);
  }

  function ferramentas() {
    var chave = 'diz-favoritos';
    function lerFav() { try { return JSON.parse(localStorage.getItem(chave) || '[]'); } catch (e) { return []; } }
    function gravarFav(l) { try { localStorage.setItem(chave, JSON.stringify(l)); } catch (e) { /* sem storage */ } }
    var fav = $('btnFav');
    function pintar() {
      var on = lerFav().indexOf(im.id) > -1;
      fav.classList.toggle('is-on', on);
      fav.setAttribute('aria-pressed', on ? 'true' : 'false');
    }
    fav.addEventListener('click', function () {
      var l = lerFav(), i = l.indexOf(im.id);
      if (i > -1) { l.splice(i, 1); toast('Removido dos favoritos'); } else { l.push(im.id); toast('Salvo nos favoritos'); }
      gravarFav(l); pintar();
    });
    pintar();

    $('btnShare').addEventListener('click', function () {
      var dados = { title: D.tituloDe(im), text: D.tituloDe(im) + ' — ' + D.preco(im.preco), url: window.location.href };
      if (navigator.share) { navigator.share(dados).catch(function () {}); return; }
      if (navigator.clipboard) {
        navigator.clipboard.writeText(dados.url).then(function () { toast('Link copiado'); }, function () { toast(dados.url); });
      } else { toast(dados.url); }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    cabecalho();
    valores();
    descricao();
    caracteristicas();
    localizacao();
    contato();
    galeria();
    similares();
    ferramentas();
  });
})();
