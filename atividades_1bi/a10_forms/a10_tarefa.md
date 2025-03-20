## A10 - Formulários e Envio de Dados

### Resumo dos Conceitos Importantes

- Formulários são elementos HTML que permitem a coleta de informações dos usuários
- Existem vários tipos de elementos para entrada de dados tais como: `input`, `textarea`, `select`, `radio`, `checkbox`, `button`, etc
- Os formulários são enviados para o servidor por meio de requisições HTTP geralmente utilizando o método POST mas também pode ser utilizado o método GET
- Cada campo do formulário tem um nome (atributo `name`) que é enviado para o servidor como uma chave de um dicionário com o valor do campo como valor da chave
- Na `view` do Django, os dados do formulário são acessados por meio do objeto `request.POST` que é um dicionário com os dados do formulário
- O Django, assim como outros frameworks web, possui um sistema de formulários que facilita a criação, validação e processamento de formulários (ver mais sobre formulários em Django)

### Criar Template do Contato

- Criar o arquivo `templates/contato.html` para herdar do template base `base.html`
- Sobrescrever o bloco de conteúdo `{% block content %}` com o conteúdo da página de contato em `prototipos/contato.html`
- Corrigir os links das imagens e das URLs para os arquivos estáticos usando a tag `{% static %}` e `{% url %}`
- Verificar se o link em `templates/components/header.html` para a página de contato está correto

### Configuração de Action e de Segurança do Formulário

- CSRF (Cross-Site Request Forgery) é um tipo de ataque que ocorre quando um invasor envia uma requisição maliciosa 
- CSRF pode acontecer por meio formulários que não possuem proteção contra CSRF
- O Django possui um sistema de proteção contra CSRF que é ativado por padrão
- Para utilizar o sistema de proteção CSRF, é necessário incluir o token CSRF no formulário
- O token CSRF é gerado dinamicamente pelo Django e é incluído no formulário por meio da template tag `{% csrf_token %}` 
- Incluir o token CSRF no formulário em `templates/contato.html`
- Alterar action do formulário para apontar para view 'contato' e o method para POST

```html
<form action="{% url 'contato' %}" method="post" class="my-10">
    {% csrf_token %}

```

### Alterar a view para Processar o Formulário

- No arquivo `padarias/views.py` alterar a view `contato` para processar o formulário enviado pelo usuário
- Caso a requisição não for do tipo POST, retornar o template `contato.html` com o formulário vazio
- Caso a requisição for do tipo POST, acessar os dados do formulário por meio do objeto `request.POST`, printar os valores no console e retornar o template `contato.html` com uma mensagem de sucesso
- Para enviar uma mensagem de sucesso para o template, podemos utilizar o método `render` que recebe um dicionário com os dados que queremos enviar para o template como contexto
- Essa é uma forma de enviar variáveis da `view` para o `template` de modo a tornar o template dinâmico
- O método `render` recebe o objeto `request`, o nome do template e um dicionário com os dados que queremos enviar para o template como contexto

```python

def contato(request):

    form_message = None

    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        rating = request.POST.get('rating')
        message = request.POST.get('message')

        # Simular o processamento do email printando no console
        print(f"Email de {name} ({email})")
        print(f"Assunto: {subject}")
        print(f"Avaliação: {rating} estrelas")
        print(f"Mensagem: {message}")

        form_message = f"Obrigado pelo seu feedback, {name}! Recebemos sua mensagem e em breve entraremos em contato."

    context = {
        'form_message': form_message
    }
    return render(request, 'contato.html', context)

```

### Alterar o Template para Exibir a Mensagem de Sucesso

- No arquivo `templates/contato.html` adicionar um bloco de código para exibir a mensagem de sucesso

```html
  <!-- INICIO DO MAIN HOME -->
  <main class="max-w-4xl mx-auto my-20 p-2">
    {% if form_message %}
      <div class="p-10 mb-4 text-green-800 bg-green-50 border-l-4 border-green-300 rounded-lg shadow-md" role="alert">
        <h2 class="text-2xl font-bold">Muito Obrigado!</h2>
        <p class="text-lg">{{ form_message }}</p>
        <div class="text-center text-9xl">
          🎉
        </div>
        <a class="btn mt-4" href="{% url 'contato' %}">Enviar nova mensagem</a>
      </div>
    {% else %}
      <h1 class="text-4xl">Fale Conosco</h1>
      <form action="{% url 'contato' %}" method="post" class="my-10">
        {% csrf_token %}
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Qual seu nome?</legend>
          <input type="text" class="input" name="name" placeholder="Digite aqui" required />
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Qual seu email?</legend>
          <input type="email" class="input" name="email" placeholder="Digite um email válido" required />
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Qual o assunto?</legend>
          <input type="text" class="input" name="subject" placeholder="Digite o assunto" required />
        </fieldset>
        
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Qual a sua avaliação da nossa proposta?</legend>
          <div class="rating">
            <input type="radio" name="rating" class="mask mask-star-2 bg-orange-400" aria-label="1 star" value="1" required />
            <input type="radio" name="rating" class="mask mask-star-2 bg-orange-400" aria-label="2 star" value="2" required />
            <input type="radio" name="rating" class="mask mask-star-2 bg-orange-400" aria-label="3 star" value="3" required />
            <input type="radio" name="rating" class="mask mask-star-2 bg-orange-400" aria-label="4 star" value="4" required />
            <input type="radio" name="rating" class="mask mask-star-2 bg-orange-400" aria-label="5 star" value="5" required />
          </div>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">Mensagem</legend>
          <textarea maxlength="512" class="textarea h-24" name="message" placeholder="Mensagem" required></textarea>
        </fieldset>

        <button class="btn btn-primary my-4">Enviar</button>
      </form>
    {% endif %}
  </main>
  <!-- FIM DO MAIN HOME -->
```

### Execute e Verifique

- Rodar o servidor de desenvolvimento `python manage.py runserver` e acessar a página `http://localhost:8000/contato` no navegador
- Preencher o formulário e enviar
- Verifique se os dados do formulário são exibidos corretamente no console do servidor
- Verifique se a página de contato é exibida corretamente com o formulário e a mensagem de sucesso

### Atividade na Aula

- Reproduzir os passos acima
- Adicione um novo campo no formulário de contato para receber o telefone do usuário
- Altere a view para processar o campo do telefone e exibir a mensagem de sucesso
- Crie as páginas de listagem de padarias a partir do protótipo `padarias_list.html`, é necessário criar a view `padarias_list` e a rota para essa view
