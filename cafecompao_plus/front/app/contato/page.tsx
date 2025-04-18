'use client';

import { useState } from 'react';

export default function Contato() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    rating: '5',
    message: ''
  });

  const [formMessage, setFormMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form data:', formData);
    setFormMessage(`Obrigado por entrar em contato, ${formData.name}! Recebemos sua mensagem e em breve entraremos em contato.`);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      rating: '5',
      message: ''
    });
  };

  return (
    <main className="max-w-4xl mx-auto my-10 p-4">
      <h1 className="text-4xl font-bold mb-6">Entre em contato</h1>
      
      {formMessage && (
        <div className="alert alert-success mb-6">
          <i className="bi bi-check-circle"></i>
          <span>{formMessage}</span>
        </div>
      )}
      
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nome</span>
                </label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered" 
                  required 
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered" 
                  required 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Assunto</span>
                </label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input input-bordered" 
                  required 
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Avaliação</span>
                </label>
                <select 
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="select select-bordered"
                >
                  <option value="5">5 estrelas</option>
                  <option value="4">4 estrelas</option>
                  <option value="3">3 estrelas</option>
                  <option value="2">2 estrelas</option>
                  <option value="1">1 estrela</option>
                </select>
              </div>
            </div>
            
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Mensagem</span>
              </label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="textarea textarea-bordered h-32" 
                required
              ></textarea>
            </div>
            
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Enviar mensagem</button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Outras formas de contato</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title">
                <i className="bi bi-geo-alt text-primary"></i>
                Endereço
              </h3>
              <p>Rua das Flores, 123</p>
              <p>São Paulo - SP</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title">
                <i className="bi bi-telephone text-primary"></i>
                Telefone
              </h3>
              <p>(11) 9999-9999</p>
              <p>(11) 8888-8888</p>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title">
                <i className="bi bi-envelope text-primary"></i>
                Email
              </h3>
              <p>contato@cafecompao.com.br</p>
              <p>suporte@cafecompao.com.br</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
