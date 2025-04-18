# Projeto Café com Pão

## Iniciando o projeto

Para iniciar o projeto, siga os passos abaixo:

1. Clone o repositório
2. Instale as dependências com o comando `pip install -r requirements.txt`
3. Rode as migrations com o comando `python manage.py migrate`
4. Carregue as fixtures com o comando `python manage.py loaddata categorias produtos cestas padarias enderecos`
5. Crie um superusuário com o comando `python manage.py createsuperuser`
6. Inicie o servidor com o comando `python manage.py runserver`
7. Acesse o painel administrativo em `http://localhost:8000/admin/`
8. Acesse a aplicação em `http://localhost:8000/`