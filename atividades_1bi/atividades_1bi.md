# Programação Web - Atividades Práticas do 1 Bi

Prof. Newton Miyoshi - newton.miyoshi@baraodemaua.br

## TLDR

- [1. A1 Git - Compreender como funciona o git e aplicar conceitos de versionamento de código](#a1---git)
- [2. A2 Introdução ao HTML e CSS - Desenvolver uma página HTML simples com estilização básica](#a2---introdução-ao-html-e-css)
- [3. A3 Tags Semânticas e Layout HTML - Utilizar tags semânticas e box model do CSS para reproduzir diferentes tipos de layout](#a3---tags-semânticas-e-layout-html)
- [4. A4 Flexbox e Responsividade - Implementar um layout de página utilizando flexbox e torná-lo responsivo](#a4---flexbox-e-responsividade)
- [5. A5 Frameworks CSS e Formulários - Implementar um formulário utilizando um framework CSS](#a5---frameworks-css-e-formulários)
- [6. A6 Javascript DOM e Eventos - Implementar um jogo simples utilizando javascript e manipulação do DOM](#a6---javascript-dom-e-eventos)

## A1 - Git

### Resumo dos Conceitos Importantes

Git é um sistema de controle de versão distribuído, gratuito e de código aberto, projetado para lidar com tudo, desde projetos pequenos a muito grandes, com velocidade e eficiência.
GitHub é uma plataforma de hospedagem de código-fonte e arquivos com controle de versão usando o Git.
Existem outras plataformas de hospedagem de código-fonte, como GitLab, Bitbucket, SourceForge, etc.
GitFlow é um modelo de ramificação para o Git. Ele é leve e fácil de seguir, e é ótimo para colaboração, ajuda a organizar o fluxo de trabalho e a garantir que o código seja revisado e testado antes de ser integrado ao projeto principal.
Existem outras estratégias de ramificação, como GitLab Flow, GitHub Flow, etc.

### Principais Comandos

- `git init`: Inicializa um repositório Git em um diretório.
- `git clone`: Clona um repositório Git.
- `git add`: Adiciona arquivos em staging.
- `git commit -m "mensagem do git" `: Registra as alterações no repositório local.
- `git push`: Envia as alterações para o repositório remoto.
- `git pull`: Atualiza o repositório local com as alterações do repositório remoto.
- `git status`: Mostra o status do repositório.
- `git log`: Mostra o histórico de commits.
- `git branch`: Lista as branches do repositório.
- `git checkout`: Muda de branch.
- `git merge`: Mescla branches.

### Atividades

#### Parte 1 

- Instale o Git e o Github Desktop
- Instale o Visual Studio Code 
- Clonar também o repositório do professor que fornecerá os arquivos base para todas as aulas, materiais extra, tarefas: https://github.com/newtonsbm/baraoweb2025
- Entrar no github classroom pelo link: https://classroom.github.com/a/KbLwYlw8
- Crie um grupo de até 4 pessoas no classroom
- Clonar o repositório do classroom do link acima
- Criar um arquivo markdown com seu nome (ex: Newton.md) e faça um pequeno curriculo com sua experiencia em desenvolvimento web realizar o add, commit e push (enviar para o arquivo para o repositório remoto no GitHub) - Eventualmente será necessário fazer o `git pull` e `git merge` por conta de versões não atualizadas

#### Parte 2

- Cada um no grupo deve criar uma branch com seu nome `git checkout -b seunome`
- Altere o arquivo incluindo novas informações como hobbies, series, jogos, etc
- Vá até a página do GitHub e abra um Pull Request para branch main marcando o seu outro colega de grupo como revisor
- Faça `git fetch --all` e observe o que mudou
- Avalie o PR do seu amigo! faça um comentário amigável e, se estiver tudo certo, aprove e faça o merge!
- Mude sua branch ativa para main e faça o `git pull` 

Desafio:
- Procure outros comandos interessantes do git veja o que eles fazem
- Algumas dicas: `reflog`, `cherry pick`, `revert`
- Quebre seu repositório brincando com os comandos!
- Conheça melhor o markdown, inclua imagens, links, tabelas, listas, etc.
    - [Markdown Guide](https://www.markdownguide.org/)
    - [GitHub Markdown Guide](https://docs.github.com/pt/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) 

## A2 - Introdução ao HTML e CSS

### Resumo dos Conceitos Importantes

- Sistemas web são, na maioria das vezes, compostos por um cliente e servidor que se comunicam usando o protocolo HTTP e por meio de tecnologias Web como HTML, CSS e JavaScript.
- O servidor web nada mais é que um processo de software que aceita solicitações via protocolo HTTP (a partir de uma determinada porta) e serve arquivos em resposta a essas solicitações. 
- O cliente web geralmente é um navegador que faz solicitações HTTP para um servidor web e exibe o conteúdo recebido.
- Esse conteúdo são páginas HTML, mas também podem ser imagens, scripts, arquivos css, fontes, dados serializados em JSON, entre outros.
- HTML é uma linguagem de marcação que define a estrutura de uma página web.
- CSS é uma linguagem de estilo que define a aparência de uma página web.
- JavaScript é uma linguagem de programação que permite a criação de páginas web interativas por meio de APIs do navegador.

### HTML - HyperText Markup Language
- HTML é uma linguagem de marcação, assim como o Markdown
- Essa marcação é feita por meio de tags, que são elementos que definem a estrutura e o conteúdo de uma página web
- As tags são compostas por um nome e podem ter atributos
- As tags podem ser aninhadas, ou seja, uma dentro da outra, formando uma árvore de elementos HTML.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Minha Página</title>
</head>
<body>
    <h1>Curso de Programação Web</h1>
    <p>Bem vindo querida ou querido 
        <a href="https://pt.wikipedia.org/wiki/Jedi#A_estrutura_da_Ordem_Jedi">
            Padawan!
        </a>
    </p>
</body>
</html>
```
#### Marcação Textual e de Conteúdo
- Uma das principais funções do HTML é marcar o texto, ou seja, definir o tipo de conteúdo que está sendo exibido
- A seguir as principais tags de marcação de texto
    - `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`: títulos
    - `<p>`: parágrafos
    - `<a>`: hiperlinks
    - `<ul>`, `<ol>`: listas não ordenadas e ordenadas
    - `<li>`: itens de lista
    - `<img>`: imagens

### CSS - Cascading Style Sheets
- CSS é uma linguagem de estilo que define a aparência de uma página web
- O CSS é composto por regras de estilo que são aplicadas a elementos HTML
- As regras CSS são compostas por um seletor e um bloco de declarações
- As declarações são compostas por uma propriedade e um valor
- As propriedades definem *o que* será estilizado e os valores definem *como* será estilizado

```css
h1 {
    color: blue;
    font-size: 2rem;
    font-weight: bold;
    font-family: Arial, sans-serif;
}
```

#### Estilizando Elementos Textuais

- As principais propriedades de estilo de texto são:
    - `color`: cor do texto
    - `font-size`: tamanho da fonte
    - `font-weight`: peso da fonte
    - `font-family`: família da fonte
    - `text-align`: alinhamento do texto
    - `text-decoration`: decoração do texto
    - `text-transform`: transformação do texto
    - `line-height`: altura da linha
    - `letter-spacing`: espaçamento entre letras
    - `word-spacing`: espaçamento entre palavras

#### Estilizando Imagens

- As principais propriedades de estilo de imagem são:
    - `width`: largura da imagem
    - `height`: altura da imagem
    - `max-width`: largura máxima da imagem
    - `max-height`: altura máxima da imagem
- Na próxima aula veremos mais propriedades de estilo e como posicionar elementos na página assim como imagens a partir do box model e do normal flow no CSS


### Atividades

- Instale a extensão `Live Server` no Visual Studio Code ou utilize algum outro servidor local para visualizar a página (ex: `http-server`, `python -m http.server`, etc)
- Cada aluno deve ser responsável por desenvolver uma página HTML simples
- A página deve conter no mínimo 3 elementos HTML diferentes como títulos (`h1`, `h2`, `h3`), parágrafos (`p`), listas (`ul`, `ol`), imagens (`img`), links (`a`), etc.
    - Você pode transformar em HTML a página do seu currículo, desenvolvido em Markdown, na atividade anterior
    - Vocês, como grupo, podem definir um tema para as páginas como `séries`, `jogos`, `receitas`, `animes`, `locais`, etc. 
- Incluir css na tag `<style>` no próprio arquivo HTML
- Estilize os elementos textuais da forma como desejar
- Caso utilizem imagens, crie uma pasta a parte nomeada como, por exemplo, `img` (ou `images`) e coloque as imagens lá
- Não é necessáro se preocupar com o layout (posicionamento, margem, preenchimento, etc), mas sim com a estruturação do conteúdo e estilo desses
- Crie um arquivo `index.html` e links para as páginas individuais realizadas 
- Realizar o add, commit e push para subir para o repositorio no github

## Opcional Recomendado

- Cada aluno deve criar uma branch com seu nome `git checkout -b seunome` 
- Abrir um **Pull Request** para a branch `main` marcando o seu outro colega de grupo como revisor
- Faça `git fetch --all` e observe o que mudou

## Desafio

- Procure outros elementos textuas e de dados do HTML e inclua na página
- Veja, por exemplo, os elementos: `summary`, `dd`, `blockquote`, `cite`, `abbr`, `code`, `kbd`, `sub`, `sup`, `small`, `strong`, `em`, `time`, `address`, `pre`, `hr`, `br`, `wbr`, `meter`, `progress`

## A3 - Tags Semânticas e Layout HTML

### Resumo dos Conceitos Importantes
- As tags semânticas do HTML são elementos que representam o significado do conteúdo
- Na prática, visualmente, não há diferença entre uma tag semântica e uma tag genérica como `div` ou `span`
- No entanto, as tags semânticas são importantes para a acessibilidade, SEO e organização do conteúdo
- As tags semânticas mais comuns são: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`
- Layout é a forma como os elementos de uma página web são organizados e dispostos (renderizados) na tela
- Todos os elementos HTML seguem o Box Model além de um fluxo de renderização padrão chamado Normal Flow, esse fluxo pode ser alterado com propriedades CSS como `float`, `position` e `display`.
- Box Model é o modelo de caixa em que todos os elementos são representados como caixas retangulares com conteúdo, preenchimento, borda e margem
- Normal Flow é o fluxo padrão de renderização dos elementos HTML na página web
- Normalmente os elementos seguem dois modos de renderização: `block` e `inline`
- Elementos `block` ocupam toda a largura disponível e são posicionados um abaixo do outro
- Elementos `inline` ocupam apenas o espaço necessário e são posicionados um ao lado do outro

### Box Model
- As principais propriedades do Box Model são:
    - `width`, `height`, `min-width`, `min-height`, `max-width`, `max-height`: para definir as dimensões dos elementos
    - `margin`: para definir o espaçamento entre os elementos, ou seja, a distância entre as bordas dos elementos
    - `padding`: para definir o preenchimento interno dos elementos, ou seja, a distância entre o conteúdo e a borda
    - `border`: para definir a borda dos elementos, ou seja, a linha que separa o conteúdo do preenchimento
- As propriedades `margin`, `padding` e `border` podem ser definidas individualmente para cada lado do elemento (top, right, bottom, left) ou de uma só vez 

### Normal Flow
- Elementos HTML em geral são renderizados como `block` ou `inline`
- Exemplos de elementos `block` são: `div`, `p`, `h1`, `ul`, `ol`, `li`, `table`, `form`
- Exemplos de elementos `inline` são: `span`, `a`, `strong`, `em`, `i`, `b`
- Elementos `block` ocupam toda a largura disponível e são posicionados um abaixo do outro, mas podemos definir a largura e altura desses elementos
- Elementos `inline` ocupam apenas o espaço necessário e são posicionados um ao lado do outro e não podemos definir a largura e altura desses elementos já que são definidos pelo conteúdo
- É comum utilizarmos o modo `display: inline-block`: para alinhar elementos `block` horizontalmente de modo que a largura e altura possam ser definidas e o elemento ainda seja tratado como `inline` no fluxo de renderização

### Atividades
Vamos utilizar as tags estruturais semânticas do HTML e box model do CSS, assim como o Normal Flow, para reproduzir diferentes tipos de layout.

- Cada um do grupo pode escolher um dos seguintes layouts para reproduzir (lembre de nomear os arquivos com nomes diferentes) ou criar outro próprio:
    - [Layouts de Exemplo](https://www.figma.com/design/Fzpxk9W4nwNlPKzARlRDxS/Web---Layouts?node-id=3106-6930&t=yNxN7zw411rUlxIU-1)
- Primeiro defina a estrutura do HTML utilizando tags semânticas como:
    - `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`
    - Evite o uso de `div` e `span` 
- Depois, utilize o CSS para montar o layout
    - `width`, `height`, `min-width`, `min-height`, `max-width`, `max-height`: para definir as dimensões dos elementos
    - `margin`, `padding`, `border`: para definir o espaçamento entre os elementos
    - `display: inline-block`: para alinhar elementos `block` horizontalmente 
    - evite o uso de `float`, `position`, `flex` e `grid` para posicionar os elementos
- Não é necessário se preocupar com o conteúdo, mas sim com a estrutura e layout, mas se preferir aproveite e crie um conteúdo fictício para o layout
- Realizar o add, commit e push das alterações

#### Dicas
 
- Centralizando elementos horizontalmente:
    - Utilize `margin: 0 auto` para centralizar elementos com `width` definido
- Centralizando elementos verticalmente:
    - `align-content: center` em um elemento com `display: block` e `height` definido 

## A4 - Flexbox e Responsividade

### Resumo dos Conceitos Importantes

- Flexbox é um modelo de layout bidimensional que permite a criação de layouts complexos e flexíveis
- Flexbox é baseado em um container e seus itens filhos (flex items)
- O container é definido com `display: flex` 
- Os itens filhos são dispostos em uma linha (row) ou coluna (column) por meio da propriedade `flex-direction` e podem ser alinhados e distribuídos de diversas formas
- Layouts responsivos são aqueles que se adaptam a diferentes tamanhos de tela e dispositivos
- Para criar layouts responsivos, podemos utilizar media queries, que são regras CSS que se aplicam apenas quando determinadas condições são atendidas
- As media queries são definidas com `@media` e podem ser usadas para alterar o layout, estilo e comportamento dos elementos em diferentes tamanhos de tela

### Flexbox
- Para utilizar Flexbox, primeiro definimos um container pai com `display: flex`
- Os itens filhos do container são chamados de flex items
- A seguir, um exemplo de container com as propriedades mais comuns do Flexbox e seus valores default:

```css
.container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
}
```

```html
<div class="container">
    <div class="item">Item 1</div>
    <div class="item">Item 2</div>
    <div class="item">Item 3</div>
</div>
```

- As principais propriedades do Flexbox, aplicadas ao elemento pai (container), são:
    - `display`: define o container como um flex container
    - `flex-direction`: define a direção dos itens no container (row, row-reverse, column, column-reverse)
    - `flex-wrap`: define se os itens devem quebrar ou não em várias linhas (nowrap, wrap, wrap-reverse)
    - `justify-content`: alinha os itens ao longo do eixo principal (flex-start, flex-end, center, space-between, space-around, space-evenly)
    - `align-items`: alinha os itens ao longo do eixo transversal (stretch, flex-start, flex-end, center, baseline)
    - `align-content`: alinha as linhas de itens ao longo do eixo transversal (stretch, flex-start, flex-end, center, space-between, space-around)
- As principais propriedades do Flexbox, aplicadas aos elementos filhos (flex items), são:
    - `flex-grow`: define a capacidade de crescimento do item
    - `flex-shrink`: define a capacidade de encolhimento do item
    - `flex-basis`: define o tamanho base do item
    - `flex`: atalho para `flex-grow`, `flex-shrink` e `flex-basis`
    - `order`: define a ordem dos itens no container

### Responsividade
- Para criar layouts responsivos, podemos utilizar media queries
- As media queries são regras CSS que se aplicam apenas quando determinadas condições são atendidas
- As media queries são definidas com `@media` e podem ser usadas para alterar o layout, estilo e comportamento dos elementos em diferentes tamanhos de tela
- A seguir, um exemplo de media query que altera a cor do texto para vermelho em telas menores que 600px:

```css
@media (width < 600px) {
    body {
        color: red;
    }
}
```

### Atividades

- Escolha 1 layout de página para implementar utilizando flexbox
- Pode se basear em um dos layouts seguintes: https://www.figma.com/design/Fzpxk9W4nwNlPKzARlRDxS/Web---Layouts?node-id=3209-679
- Construa o layout utilizando Flexbox (`display: flex` no elemento pai)
- Lembre-se de utilizar TAGS SEMÂNTICAS	para a construção do layout (`<header>`, `<nav>`, `<main>`, `<footer>`, etc)
- Torne o layout responsivo para tela de celulares utilizando media queries: dessa forma o layout tera duas versões, a versão desktop e a mobile
- Criar o arquivo do layout com seu nome (ex: Newton.html), commitar o arquivo e subir

### Desafio
- Veja o material sobre Grid Layout: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout 
- Tente implementar o mesmo layout utilizando Grid Layout

## A5 - Frameworks CSS e Formulários

### Resumo dos Conceitos Importantes

- Frameworks CSS são conjuntos de estilos pré-definidos que facilitam a criação de páginas web
- Alguns frameworks CSS mais populares são: Bootstrap, Tailwind, DaisyUI, Semantic CSS, etc
- Além de estilos prontos, os frameworks CSS também oferecem componentes prontos como botões, formulários, cards, etc
- Muitos frameworks também permitem a utilização de temas personalizados, sendo um ótimo recurso para padronização de estilos
- Formulários são elementos HTML que permitem a coleta de informações dos usuários
- Por meio de formulários, os usuários podem inserir, enviar e editar dados 

### Frameworks CSS

- A vantagem de utilizar um framework CSS é a economia de tempo e esforço na criação de estilos
- Além disso, muitos os frameworks CSS são responsivos por padrão, ou seja, os estilos se adaptam a diferentes tamanhos de tela
- Podemos categorizar frameworks CSS em dois tipos: semânticos e utilities (utilitários)
- Frameworks Semânticos são aqueles que utilizam classes com nomes significativos para estilizar os elementos HTML
    - Exemplos de frameworks semânticos são: Bootstrap, Semantic CSS, Foundation, etc
    - Cada classe tem um significado específico por exemplo `btn` para botões, `container` para containers, `row` para linhas, `col` para colunas, etc
    - As classes são aplicadas diretamente nos elementos HTML
    - Exemplo de uso do Bootstrap: `<button class="btn btn-primary">Primary</button>`
    - A desvantagem dos frameworks semânticos é a dificuldade de customização e a possibilidade de conflitos de estilos
    - A vantagem é a facilidade de uso, documentação e padronização de estilos
- Frameworks Utilitários são aqueles que utilizam classes com nomes abreviados para propriedades CSS específicas como cores, tamanhos, espaçamentos, etc
    - Exemplos de frameworks utilitários são: Tailwind, TacoCSS, etc
    - Cada classe aplica uma propriedade CSS específica, por exemplo `bg-blue-500` para cor de fundo azul, `text-white` para texto branco, `font-bold` para fonte negrito, etc
    - Exemplo de uso do Tailwind: `<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Primary</button>`
    - A desvantagem dos frameworks utilitários é a dificuldade de leitura e manutenção do código
    - A vantagem é a flexibilidade, rápida prototipação e localização de estilos (locality of behavior)
- Muitos frameworks CSS oferecem uma mistura de classes semânticas e utilitárias, permitindo a escolha do melhor estilo para cada situação 
    - O próprio Bootstrap oferece classes utilitárias como `text-center`, `m-4`, `p-4`, etc. Embora tenha nascido como um framework semântico
    - DaisyUI é um framework que se baseia no Tailwind, proporcionando diversos componentes prontos e oferecendo classes semânticas como `btn`, `container`, `row`, `col`, etc.

### Formulários

- Forms HTML são elementos que permitem a coleta de informações dos usuários
- Existem vários tipos de elementos para entrada de dados tais como:
    - `input`: para entrada de texto, senha, email, número, etc
    - `textarea`: para entrada de texto longo
    - `select`: para seleção de opções
    - `radio`: para seleção de opções em botões de rádio
    - `checkbox`: para seleção de opções em caixas de seleção
    - `button`: para envio de formulários
- Além dos elementos de entrada de dados, os formulários também podem conter elementos de agrupamento como:
    - `fieldset`: para agrupar elementos relacionados
    - `legend`: para descrever o agrupamento
- Um atributo do elemento de entrada super importante para capturar os dados do formulário é o `name`, que é o nome do campo que será enviado para o servidor

```html 
    <label for="name">Name:</label>
    <input type="text" id="name" name="name_user">
```
- No exemplo acima o campo de entrada de texto tem o nome `name_user` que será enviado para o servidor

- Outro atributo importante, porém do form, é o `action`, que é o endereço para onde os dados do formulário serão enviados
- O atributo `method` define o método de envio dos dados, podendo ser `GET` ou `POST`
- O método `GET` envia os dados do formulário como uma string anexada à URL
- O método `POST` envia os dados do formulário no corpo da requisição

```html
    <form action="/cadastrar_user" method="POST">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name_user">
        <button type="submit">Submit</button>
    </form>
```
- No exemplo acima, o formulário será enviado para a rota `/cadastrar_user` via método `POST` com o campo `name_user` preenchido

### Atividades

- Escolha um framework CSS (Bootstrap, Tailwind, DaisyUI, Semantic UI, Pure CSS, etc) e implemente um formulário utilizando o framework escolhido
- Cada pessoa do grupo deve implementar um formulário diferente
- Pode-se utilizar o seguinte figma como referência: https://www.figma.com/design/Fzpxk9W4nwNlPKzARlRDxS/Web---Layouts?node-id=3259-13239 
- Criar o arquivo do formulário com seu nome (ex: Newton.html), commitar o arquivo e subir

## Desafio
- Tente submeter esse formulário para o serviço gratuito: https://formsubmit.co/
- Verifique como os dados chegam no seu email dependendo do tipo de formulário que você implementou

## A6 - Javascript DOM e Eventos

### Resumo dos Conceitos Importantes

Javascript é uma linguagem de programação de alto nível, interpretada, orientada a objetos e multi-paradigma. Ela é a linguagem padrão executada nos navegadores web e permite a criação de páginas web interativas.
DOM (Document Object Model) é uma interface de programação que representa a estrutura de um documento HTML como uma árvore de objetos.
A manipulação do DOM é feita por meio de métodos e propriedades que permitem a criação, remoção, alteração e leitura de elementos HTML.
Eventos são ações que ocorrem em um documento HTML, como cliques, teclas pressionadas, movimentos do mouse, etc.
Os eventos são tratados por meio de event handlers, que são funções que são executadas quando um evento ocorre.

### Introdução ao Javascript

- ECMA Script é a especificação padrão da linguagem Javascript
- Javascript pode ser executada no navegador ou no servidor (Node.js)
- Vamos focar em Javascript no navegador, ou seja, no client-side principalmente para manipulação do DOM e eventos
- Podemos incluir o Javascript de três formas: inline, interno e externo
- Inline é quando o código Javascript é incluído diretamente no HTML:

```html
    <button onclick="alert('Hello World!')">Click me</button>
```

- Interno é quando o código Javascript é incluído dentro de uma tag `<script>` no HTML:

```html
    <script>
        alert('Hello World!');
    </script>
```

- Externo é quando o código Javascript é incluído em um arquivo separado e referenciado no HTML:

```html
    <script src="script.js"></script>
```
```javascript
    alert('Hello World!');
```

### Manipulando o DOM

- Para manipular o DOM, utilizamos o objeto `document` que representa o documento HTML
- Podemos acessar elementos HTML por meio de métodos como `getElementById`, `getElementsByClassName`, `getElementsByTagName`, `querySelector`, `querySelectorAll`
- Exemplo:

```html
    <div id="div1">Hello World!</div>
    <div class="div2">Div com Class!</div>
    <div class="container">
        <p>Parágrafo 1</p>
        <p>Parágrafo 2</p>
    </div>
    <script>
        const div1 = document.getElementById('div1');
        const div2 = document.getElementsByClassName('div2');
        const ps_container = document.querySelectorAll('.container p');
    </script>
```	

- Podemos alterar o conteúdo, estilo e atributos dos elementos HTML por meio de propriedades como `innerHTML`, `innerText`, `style`, `setAttribute`, etc
- Exemplo:

```html
    <div id="div1">Hello World!</div>
    <script>
        const div1 = document.getElementById('div1');
        div1.innerHTML = 'Olá Mundo!';
        div1.style.color = 'red';
        div1.setAttribute('class', 'nova-classe');
    </script>
```

- Podemos criar, adicionar e remover elementos HTML por meio de métodos como `createElement`, `appendChild`, `removeChild`, etc
- Exemplo:

```html
    <div id="container"></div>
    <script>
        const container = document.getElementById('container');
        const p = document.createElement('p');
        p.innerText = 'Novo Parágrafo';
        container.appendChild(p);
    </script>
```

### Eventos

- Eventos são ações que ocorrem em um documento HTML, como cliques, teclas pressionadas, movimentos do mouse, etc
- Podemos tratar eventos por meio de event handlers, que são funções que são executadas quando um evento ocorre
- Exemplo:

```html
    <button id="btn">Click me</button>
    <script>
        const btn = document.getElementById('btn');
        btn.addEventListener('click', function() {
            alert('Hello World!');
        });
    </script>
```

### Atividades

- Essa atividade pode ser feita em duplas e somente 1 dos integrantes precisa submeter mas ambos precisam ter entrado no repositório do classroom 
- Vamos realizar um pequeno gamejam e criar um jogo simples utilizando javascript e manipulação do DOM
- Pode ser super simples ou mais complexo o importante é treinar a manipulação do DOM e eventos em javascript
- Veja os exemplos disponíveis na pasta "exemplos"

### Desafios 
- Suba e hospede o seu jogo no github pages, mostre para todos no final da aula

