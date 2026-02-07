# 🚀 RDDev Portfolio Website

Portfolio profissional completo com página de projetos avançada.

## 📁 Estrutura de Arquivos

```
/
├── index.html              # Página inicial
├── portfolio.html          # Página completa de projetos
├── style.css              # CSS principal (compartilhado)
├── portfolio.css          # CSS específico da página de projetos
├── portfolio-data.js      # Base de dados dos projetos
├── portfolio.js           # JavaScript da página de projetos
└── README.md             # Este arquivo
```

## ✨ Recursos da Página de Projetos

### 🎯 Funcionalidades Principais

1. **Infinite Scroll**
   - Carrega 9 projetos inicialmente
   - Carrega mais 9 ao rolar a página
   - Indicador de loading suave
   - Mensagem ao chegar no final

2. **Filtros Avançados**
   - **Categoria**: Websites, E-commerce, Sistemas, Mobile
   - **Tecnologia**: React, Vue, Angular, Node.js, Laravel, etc.
   - **Ano**: 2022 a 2026
   - **Busca**: Por nome, cliente, descrição ou tecnologia

3. **Modal Detalhado**
   - Informações completas do projeto
   - Desafio, solução e resultados
   - Stack tecnológico completo
   - Duração e tamanho da equipe
   - CTA para contato

## 🎨 Personalização

### Adicionar Novos Projetos

Edite o arquivo `portfolio-data.js` e adicione um novo objeto ao array:

```javascript
{
  id: 25,  // Próximo ID disponível
  title: "Nome do Projeto",
  client: "Nome do Cliente",
  category: "web", // ou "ecommerce", "system", "mobile"
  year: 2026,
  technologies: ["react", "node"], // IDs das tecnologias
  image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  icon: "🚀", // Emoji representativo
  shortDescription: "Descrição curta para o card",
  fullDescription: "Descrição completa para o modal",
  challenge: "Qual era o desafio do cliente",
  solution: "Como vocês resolveram",
  results: [
    "Resultado 1",
    "Resultado 2",
    "Resultado 3"
  ],
  techStack: ["React", "Node.js", "MongoDB"],
  duration: "4 meses",
  team: "6 desenvolvedores",
  link: "#" // Link do projeto (opcional)
}
```

### Mudar Cores dos Gradientes

Cada projeto tem um gradiente único no campo `image`. Você pode gerar novos gradientes em:
- https://cssgradient.io/
- https://uigradients.com/

Exemplo:
```javascript
image: "linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)"
```

### Adicionar Novas Tecnologias ao Filtro

1. Edite `portfolio.html` e adicione a opção no select:

```html
<option value="sua-tech">Sua Tecnologia</option>
```

2. Use o mesmo ID nos projetos em `portfolio-data.js`:

```javascript
technologies: ["sua-tech", "outras-techs"]
```

### Customizar Número de Projetos por Página

Edite `portfolio.js`, linha 6:

```javascript
const projectsPerPage = 12; // Mude de 9 para o número desejado
```

## 🎯 Como Usar

1. **Navegação**: Abra `index.html` no navegador
2. **Ver Portfólio**: Clique em "Ver Portfólio" ou "Projetos" no menu
3. **Filtrar**: Use os filtros no topo da página
4. **Buscar**: Digite no campo de busca
5. **Ver Detalhes**: Clique em qualquer projeto
6. **Rolar**: Role para baixo para carregar mais projetos

## 📱 Responsividade

O site é 100% responsivo:
- **Desktop**: 3 colunas de projetos
- **Tablet**: 2 colunas
- **Mobile**: 1 coluna

## 🔧 Tecnologias Utilizadas

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript Vanilla (ES6+)
- Google Fonts (Montserrat, Libre Baskerville)

## 💡 Dicas de Personalização

### 1. Adicionar Imagens Reais

Substitua os emojis por imagens reais:

```javascript
// Ao invés de usar gradiente e emoji
image: "url('caminho/para/imagem.jpg')"
icon: "" // Deixe vazio
```

E no CSS adicione:
```css
.portfolio-item-image {
  background-size: cover;
  background-position: center;
}
```

### 2. Integrar com Backend

Para carregar projetos de uma API:

```javascript
// portfolio.js
async function loadProjectsFromAPI() {
  const response = await fetch('https://sua-api.com/projetos');
  const projectsData = await response.json();
  return projectsData;
}
```

### 3. Adicionar Analytics

Rastreie cliques nos projetos:

```javascript
function openModal(project) {
  // Google Analytics
  gtag('event', 'project_view', {
    'project_name': project.title,
    'project_category': project.category
  });
  
  // ... resto do código
}
```

## 🎨 Esquema de Cores

```css
Primária: #4a90e2 (Azul)
Secundária: #5fc3e4 (Azul Claro)
Dark: #0a1929
Background: #efefef
Cards: #ffffff
```

## 📞 Suporte

Para dúvidas ou customizações:
- Email: contato@rddev.com.br
- WhatsApp: (11) 9999-9999

## 📝 Licença

Este template foi desenvolvido pela RDDev Web Solutions.

---

**Desenvolvido com ❤️ pela RDDev**
