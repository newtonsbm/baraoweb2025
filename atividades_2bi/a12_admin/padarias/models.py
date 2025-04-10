from django.db import models


class Feedback(models.Model):
    nome = models.CharField("Nome", max_length=100)
    email = models.EmailField("Email")
    assunto = models.CharField("Assunto", max_length=100)
    avaliacao = models.PositiveSmallIntegerField("Avaliação", default=1)
    mensagem = models.TextField("Mensagem", blank=True, null=True)
    telefone = models.CharField("Telefone", max_length=15, blank=True, null=True)

    def __str__(self):
        return f"Feedback de {self.nome} ({self.email})"