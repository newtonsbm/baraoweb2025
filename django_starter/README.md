# Django Starter

Este é um projeto starter em Django do curso de Ciência da Computação - Barão de Mauá. Ele utiliza várias tecnologias modernas para fornecer uma base sólida para o desenvolvimento de aplicações web.

## Tecnologias Utilizadas

- **Django**: Framework web de alto nível que incentiva o desenvolvimento rápido e o design limpo e pragmático.
- **Tailwind CSS**: Framework CSS utilitário para criar layouts personalizados rapidamente.
- **DaisyUI**: Componentes UI para Tailwind CSS.
- **Bootstrap Icons**: Conjunto de ícones SVG gratuitos.

## Como Utilizar Este Projeto

Siga os passos abaixo para configurar e iniciar seu próprio projeto baseado neste template.

### Passo a Passo

1. **Clone o repositório:**

    ```sh
    git clone <URL_DO_REPOSITORIO>
    cd <NOME_DO_REPOSITORIO>
    ```

2. **Copie a pasta django_starter e renomeie**

    ```sh
    cp -r django_starter <NOME_DO_PROJETO>
    cd <NOME_DO_PROJETO>
    ```

3. **Instale as dependências:**

    ```sh
    pip install -r requirements.txt
    ```

4. **Realize as migrações do banco de dados:**

    ```sh
    python manage.py migrate
    ```

5. **Inicie o servidor de desenvolvimento:**

    ```sh
    python manage.py runserver
    ```

6. **Acesse o projeto no navegador:**

    Abra o navegador e vá para `http://127.0.0.1:8000/`.

### Estrutura do Projeto

- `main_app`: Aplicação principal onde você pode adicionar suas views, models, templates, etc.
- `static`: Arquivos estáticos como CSS, JavaScript e imagens.
- `templates`: Templates HTML.
- `projeto`: Configurações do projeto Django.

### Personalização

- **Templates**: Adicione ou modifique templates HTML em `templates/`.
- **Estilos**: Adicione ou modifique arquivos CSS em `static/css/`.
- **Views**: Adicione ou modifique views em `main_app/views.py`.
- **URLs**: Configure novas rotas em `projeto/urls.py`.

### Dependências

- **Django**: Framework web.
- **django-browser-reload**: Ferramenta para recarregar o navegador automaticamente durante o desenvolvimento.
- **Pillow**: Biblioteca de processamento de imagens.

### Configurações Já Realizadas

- **django_browser_reload**: Adicionado ao `INSTALLED_APPS` e `MIDDLEWARE` para recarregar o navegador automaticamente.
- **Templates**: Configurado para buscar templates na pasta `templates`.
- **Arquivos Estáticos e de Mídia**: Configurados para servir arquivos estáticos e de mídia.

