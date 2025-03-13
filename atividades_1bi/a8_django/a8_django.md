# A8 - Projeto Django e Rotas 

- Instalar o django a partir do `requirements.txt` do projeto
- `pip install -r requirements.txt`
ou caso de erro Windows, tentar:
- `py -m pip install -r requirements.txt`
- Criar o projeto e subir a pasta ‘cafecompao’
- `django-admin startproject cafecompao .`
ou caso de erro Windows, tentar:
- `py -m django-admin startproject cafecompao .`
- A atividade consiste em realizar os passos de criação da aplicação ‘padarias’ vistas na aula
- `python manage.py startapp padarias`
- Comando alternativo: `py manage.py startapp padarias`
- Criar uma nova view 'sobre' na aplicação padarias que retorna a string 'Página em construção' e realizar a configuração da rota para a url /catalogo/sobre 
- `python manage.py run_server`
- Testar a aplicação ver se esta tudo OK acessando ‘localhost:8000/padarias  e localhost:8000/padarias/sobre

