import Image from "next/image";
import { API_BASE_URL } from "@/config/api";


interface Endereco {
  id: number;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  padaria: number;
}

interface Padaria {
  id: number;
  cestas: any[];
  endereco: Endereco;
  nome: string;
  descricao: string;
  imagem: string;
  telefone: string;
  email: string;
}

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Padaria[];
}

async function getPadarias(): Promise<PaginatedResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/padarias/?limit=1000`, { 
      cache: 'no-store'  
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch padarias');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error loading padarias:', error);
    return { count: 0, next: null, previous: null, results: [] }; 
  }
}

export default async function PadariasList() {

  const response = await getPadarias();
  const padarias = response.results;
  
  return (
    <main>
      {/* INICIO DO HERO */}
      <div className="hero min-h-[70vh]" style={{ backgroundImage: "url('/images/padaria2.png')" }}>
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-2xl">
            <h1 className="mb-5 text-5xl font-bold">Conheça nossa rede de Padarias!</h1>
          </div>
        </div>
      </div>
      {/* FIM DO HERO */}
      {/* INICIO DO MAIN HOME */}
      <div className="max-w-4xl mx-auto my-20 p-2">
        <h1 className="text-4xl">Padarias Conveniadas</h1>
        <section className="my-10 flex flex-col gap-10 ">
          {padarias.length > 0 ? (
            padarias.map(padaria => (
              <div key={padaria.id} className="card lg:card-side bg-base-100 shadow-sm">
                <figure className="lg:w-1/2">
                  <Image 
                    className="aspect-video" 
                    src={padaria.imagem} 
                    alt={padaria.nome} 
                    width={600} 
                    height={400} 
                  />
                </figure>
                <div className="card-body lg:w-1/2">
                  <h2 className="card-title">{padaria.nome}</h2>
                  <p>{padaria.descricao}</p>
                  <ul>
                    <li><i className="bi bi-map"></i> {padaria.endereco.cidade} / {padaria.endereco.estado}</li>
                    <li><i className="bi bi-envelope"></i> {padaria.email} </li>
                    <li><i className="bi bi-phone"></i> {padaria.telefone}</li>
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-info">
              <i className="bi bi-info-circle"></i>
              <span>Nenhuma padaria encontrada.</span>
            </div>
          )}
        </section>
      </div>
      {/* FIM DO MAIN HOME */}
    </main>
  );
}
