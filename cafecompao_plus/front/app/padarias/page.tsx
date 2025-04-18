"use client";

import Image from "next/image";
import { API_BASE_URL } from "@/config/api";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

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

async function getPadarias(page: number = 1): Promise<PaginatedResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/padarias/?page=${page}`, { 
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

export default function PadariasList() {
  const [padarias, setPadarias] = useState<Padaria[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const loadMorePadarias = async () => {
    if (!hasMore || loading) return;
    
    setLoading(true);
    try {
      const data = await getPadarias(page);
      setPadarias(prev => [...prev, ...data.results]);
      setTotalCount(data.count);
      setHasMore(!!data.next);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error("Failed to fetch more padarias:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    console.log("Loading padarias...");
    loadMorePadarias();
  }, []);

  useEffect(() => {
    if (inView) {
      loadMorePadarias();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

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
        <p className="mt-4 text-gray-500">Mostrando {padarias.length} de {totalCount} padarias</p>
        
        <section className="my-10 flex flex-col gap-10">
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
                    {padaria.endereco ? (
                      <li><i className="bi bi-map"></i> {padaria.endereco.cidade} / {padaria.endereco.estado}</li>
                    ) : (
                      <li><i className="bi bi-map"></i> Endereço não disponível</li>
                    )}
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
          
          {/* Loading indicator and intersection observer sentinel */}
          {hasMore && (
            <div ref={ref} className="flex justify-center py-4">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          )}
          
          {/* End of results message */}
          {!hasMore && padarias.length > 0 && (
            <div className="text-center text-gray-500 py-4">
              Você chegou ao fim da lista
            </div>
          )}
        </section>
      </div>
      {/* FIM DO MAIN HOME */}
    </main>
  );
}
