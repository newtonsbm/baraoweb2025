'use client';

import { useState } from 'react';

export default function Contato() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    rating: '', 
    message: ''
  });

  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMessage(null);
    setFormError(null);

    const djangoContactUrl = 'http://localhost:8000/contato/'; 

    const body = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      body.append(key, value);
    });

    try {
      const response = await fetch(djangoContactUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      if (response.ok) {
        const result = await response.json();
        setFormMessage(result.message || `Sua mensagem de ${result.name || formData.name} foi enviada com sucesso!`);
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          rating: '',
          message: ''
        });
      } else {
        const errorResult = await response.json().catch(() => ({ error: 'Erro ao enviar formulário. Status: ' + response.status }));
        console.error('Form submission error:', errorResult);
        setFormError(errorResult.error || 'Não foi possível enviar sua mensagem. Tente novamente.');
      }
    } catch (error) {
      setFormError('Erro de conexão. Verifique sua internet e tente novamente.');
    }
  };

  const handleNewMessage = () => {
    setFormMessage(null);
    setFormError(null);
  };

  return (
    <>
      {/* INICIO DO HERO */}
      <div className="hero min-h-[70vh]" style={{ backgroundImage: "url('/images/padaria2.png')" }}>
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-2xl">
            <h1 className="mb-5 text-5xl font-bold">Venha nos Conhecer!</h1>
            <p className="mb-5 text-xl">
              Sua opinião é essencial para nós!
            </p>
          </div>
        </div>
      </div>
      {/* FIM DO HERO */}
      
      {/* INICIO DO MAIN HOME */}
      <main className="max-w-4xl mx-auto my-20 p-2">
        {formMessage && !formError && (
          <div className="p-10 mb-4 text-green-800 bg-green-50 border-l-4 border-green-300 rounded-lg shadow-md" role="alert">
            <h2 className="text-2xl font-bold">Muito Obrigado!</h2>
            <p className="text-lg">{formMessage}</p>
            <div className="text-center text-9xl">
              🎉
            </div>
            <button className="btn mt-4" onClick={handleNewMessage}>Enviar nova mensagem</button>
          </div>
        )}
        {formError && (
           <div className="p-10 mb-4 text-red-800 bg-red-50 border-l-4 border-red-300 rounded-lg shadow-md" role="alert">
            <h2 className="text-2xl font-bold">Erro!</h2>
            <p className="text-lg">{formError}</p>
            <button className="btn mt-4" onClick={handleNewMessage}>Tentar Novamente</button>
          </div>
        )}
        
        {!formMessage && !formError && (
          <>
            <h1 className="text-4xl">Fale Conosco</h1>
            <form onSubmit={handleSubmit} className="my-10">
              {/* CSRF token is not used in this client-side form handling approach unless explicitly added */}
              
              <fieldset className="fieldset"> {/* Ensure 'fieldset' class is styled in your project */}
                <legend className="fieldset-legend">Qual seu nome?</legend> {/* Ensure 'fieldset-legend' class is styled */}
                <input 
                  type="text" 
                  className="input" // Using 'input' class from Django template
                  name="name" 
                  placeholder="Digite aqui" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Qual seu email?</legend>
                <input 
                  type="email" 
                  className="input" 
                  name="email" 
                  placeholder="Digite um email válido" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Qual o assunto?</legend>
                <input 
                  type="text" 
                  className="input" 
                  name="subject" 
                  placeholder="Digite o assunto" 
                  value={formData.subject}
                  onChange={handleChange}
                  required 
                />
              </fieldset>
              
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Qual a sua avaliação da nossa proposta?</legend>
                <div className="rating"> {/* DaisyUI rating component classes */}
                  {[1, 2, 3, 4, 5].map(star => (
                    <input 
                      key={star}
                      type="radio" 
                      name="rating" 
                      className="mask mask-star-2 bg-orange-400" 
                      aria-label={`${star} star`} 
                      value={String(star)}
                      checked={formData.rating === String(star)}
                      onChange={handleChange}
                    />
                  ))}
                </div>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Mensagem</legend>
                <textarea 
                  maxLength={512} 
                  className="textarea h-24" // Using 'textarea h-24' from Django template
                  name="message" 
                  placeholder="Mensagem" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </fieldset>

              <button type="submit" className="btn btn-primary my-4">Enviar</button>
            </form>
          </>
        )}
      </main>
      {/* FIM DO MAIN HOME */}
    </>
  );
}
