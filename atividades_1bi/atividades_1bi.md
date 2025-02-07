# Programação Web - Atividades Práticas do 1 Bi

Prof. Newton Miyoshi - newton.miyoshi@baraodemaua.br

## TLDR

- 1. [A1 - Git](#a1---git): Compreender como funciona o git e aplicar conceitos de versionamento de código

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