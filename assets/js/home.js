/*
 * Homepage: hero, vitrine sem repetição e busca que filtra de verdade.
 */
(function () {
  'use strict';
  var D = window.DIZ;
  var UI = window.DIZUI;

  var estado = { finalidade: 'Venda', dorm: '', vagas: '' };

  function $(id) { return document.getElementById(id); }

  function hero() {
    var el = $('heroImg');
    if (!el) return;
    var url = D.foto(D.IMAGENS.hero, window.innerWidth > 900 ? 2000 : 1100);
    var probe = new Image();
    probe.addEventListener('load', function () {
      el.style.backgroundImage = 'url("' + url + '")';
      el.classList.add('is-loaded');
    });
    probe.src = url;
  }

  function imagensEstaticas() {
    Array.prototype.forEach.call(document.querySelectorAll('img[data-img]'), function (img) {
      var id = D.IMAGENS[img.getAttribute('data-img')];
      if (id) img.setAttribute('data-src', D.foto(id, 900));
    });
  }

  function opcoesDeBairro() {
    var sel = $('fBairro');
    var vistos = {};
    D.IMOVEIS.map(function (i) { return i.bairro; }).sort(function (a, b) {
      return a.localeCompare(b, 'pt-BR');
    }).forEach(function (b) {
      if (vistos[b]) return;
      vistos[b] = true;
      var o = document.createElement('option');
      o.value = b; o.textContent = b;
      sel.appendChild(o);
    });
  }

  /* Vitrine: um destaque + os demais, cada imóvel aparece uma vez só. */
  function vitrine() {
    var destaque = D.IMOVEIS.filter(function (i) { return i.destaque; })[0];
    var resto = D.IMOVEIS.filter(function (i) { return i !== destaque; });
    if (destaque) $('featured').innerHTML = UI.cartao(destaque, { big: true });
    $('latest').innerHTML = resto.map(function (i) { return UI.cartao(i); }).join('');
    UI.carregarImagens($('vitrine'));
    UI.carregarImagens($('imoveis'));
  }

  function setFinalidade(f) {
    estado.finalidade = f;
    $('fFinalidade').value = f;
    Array.prototype.forEach.call(document.querySelectorAll('.search__tab'), function (t) {
      var on = t.getAttribute('data-finalidade') === f;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  function chips() {
    Array.prototype.forEach.call(document.querySelectorAll('.chips'), function (grupo) {
      var nome = grupo.getAttribute('data-name');
      grupo.addEventListener('click', function (e) {
        var b = e.target.closest('.chip');
        if (!b) return;
        estado[nome] = b.getAttribute('data-v');
        Array.prototype.forEach.call(grupo.querySelectorAll('.chip'), function (c) {
          c.classList.toggle('is-active', c === b);
        });
      });
    });
  }

  function filtrar() {
    var bairro = $('fBairro').value;
    var cidade = $('fCidade').value;
    var min = parseInt($('fMin').value, 10);
    var max = parseInt($('fMax').value, 10);
    var dorm = parseInt(estado.dorm, 10);
    var vagas = parseInt(estado.vagas, 10);
    return D.IMOVEIS.filter(function (i) {
      if (estado.finalidade && i.finalidade !== estado.finalidade) return false;
      if (cidade && i.cidade !== cidade) return false;
      if (bairro && i.bairro !== bairro) return false;
      if (!isNaN(min) && i.preco < min) return false;
      if (!isNaN(max) && i.preco > max) return false;
      // Se o imóvel não tem o dado, não entra num filtro que exige o dado.
      if (!isNaN(dorm) && (i.dormitorios == null || i.dormitorios < dorm)) return false;
      if (!isNaN(vagas) && (i.vagas == null || i.vagas < vagas)) return false;
      return true;
    }).sort(function (a, b) { return a.preco - b.preco; });
  }

  function resumo() {
    var p = [estado.finalidade === 'Aluguel' ? 'Para alugar' : 'À venda'];
    var b = $('fBairro').value; if (b) p.push(b);
    var mn = $('fMin'), mx = $('fMax');
    if (mn.value) p.push('a partir de ' + mn.options[mn.selectedIndex].text);
    if (mx.value) p.push('até ' + mx.options[mx.selectedIndex].text);
    if (estado.dorm) p.push(estado.dorm + '+ dorm.');
    if (estado.vagas) p.push(estado.vagas + '+ vaga' + (estado.vagas === '1' ? '' : 's'));
    return p.join(' · ');
  }

  function buscar(e) {
    if (e) e.preventDefault();
    var cod = $('fCodigo').value.trim();
    if (cod) {
      var achado = D.porId(cod);
      if (achado) { window.location.href = 'imovel.html?id=' + encodeURIComponent(achado.id); return; }
    }
    var lista = cod ? [] : filtrar();
    $('resultados').hidden = false;
    $('vitrine').hidden = true;
    $('imoveis').hidden = true;
    $('resultsTitle').textContent = lista.length === 1 ? '1 imóvel encontrado'
      : lista.length + ' imóveis encontrados';
    $('resultsSummary').textContent = cod ? 'Código "' + cod.toUpperCase() + '"' : resumo();
    $('resultsGrid').innerHTML = lista.map(function (i) { return UI.cartao(i); }).join('');
    $('resultsEmpty').hidden = lista.length > 0;
    UI.carregarImagens($('resultsGrid'));
    $('resultados').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function limpar() {
    $('searchForm').reset();
    setFinalidade('Venda');
    estado.dorm = ''; estado.vagas = '';
    Array.prototype.forEach.call(document.querySelectorAll('.chips'), function (g) {
      Array.prototype.forEach.call(g.querySelectorAll('.chip'), function (c, idx) {
        c.classList.toggle('is-active', idx === 0);
      });
    });
    $('resultados').hidden = true;
    $('vitrine').hidden = false;
    $('imoveis').hidden = false;
    $('busca').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function ligar() {
    Array.prototype.forEach.call(document.querySelectorAll('.search__tab'), function (t) {
      t.addEventListener('click', function () { setFinalidade(t.getAttribute('data-finalidade')); });
    });
    Array.prototype.forEach.call(document.querySelectorAll('.js-tab-link'), function (a) {
      a.addEventListener('click', function () { setFinalidade(a.getAttribute('data-finalidade') || 'Venda'); });
    });
    $('searchForm').addEventListener('submit', buscar);
    $('clearSearch').addEventListener('click', limpar);
    $('clearSearch2').addEventListener('click', limpar);
    chips();
  }

  document.addEventListener('DOMContentLoaded', function () {
    hero();
    imagensEstaticas();
    opcoesDeBairro();
    vitrine();
    UI.carregarImagens(document);
    ligar();
  });
})();
