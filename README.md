# Diz Assessoria Imobiliária — novo site (prévia)

Prévia ao vivo do novo site da **Diz Assessoria Imobiliária** (Porto Alegre – RS), feita pela Femik.
Esta primeira versão tem só a **homepage** e a **página de detalhe de imóvel** (exemplo: D1NO, Nonoai).

- **Estado:** protótipo — prévia para vídeo, ainda não validada pela cliente
- **Link público:** https://kimciddev.github.io/diz-ai-assessoria/
- **Imóvel de exemplo:** https://kimciddev.github.io/diz-ai-assessoria/imovel.html?id=D1NO

## Como abrir

Site estático (HTML, CSS e JavaScript, sem build). Para testar no computador:

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## Arquivos

| Arquivo | O que faz |
|---|---|
| `index.html` | Homepage: posicionamento, busca completa, vitrine, serviços, sobre, contato |
| `imovel.html` | Detalhe do imóvel (`?id=D1NO`): galeria, preço, descrição, mapa, similares, contato |
| `assets/css/style.css` | Estilos, mobile-first |
| `assets/js/data.js` | **Dados** da empresa e dos imóveis — o único lugar para editar conteúdo |
| `assets/js/common.js` | Ícones, menu, cartões, links de WhatsApp/telefone |
| `assets/js/home.js` | Vitrine e busca (filtra de verdade) |
| `assets/js/imovel.js` | Montagem da página de detalhe |

## Dados

Os preços e o D1NO vêm do site atual (dizassessoria.com.br, lido em 18 nov 2026). A prévia é um
**mock-up representativo**: não mostra anotações de desenvolvedor; o que falta é escondido.

Em `assets/js/data.js`, marcado nos comentários:
- **FICTÍCIO / exemplo:** tipos dos 5 imóveis; dorm./banh./vagas/área do Jardim Botânico, Menino Deus R$ 590 mil e R$ 980 mil; área da Azenha
- **Falta da cliente:** número do WhatsApp (`SITE.whatsapp` — sem ele, o botão abre o WhatsApp com a mensagem pronta para escolher o contato), condomínio/IPTU/endereço do D1NO, área do D1NO (detalhe diz 50 m², cartão diz 43 m²), foto da equipe, logotipo oficial, Instagram, significado do selo "COMPRA"
- **Fotos:** Unsplash, ilustrativas; a página tem `noindex` para não aparecer em buscadores
