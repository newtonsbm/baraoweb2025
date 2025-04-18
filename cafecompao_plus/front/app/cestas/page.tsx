import Image from "next/image";
import Link from "next/link";
import { API_BASE_URL } from "@/config/api";

// Define the cesta type
interface Cesta {
  id: number;
  nome: string;
  descricao: string;
  preco: number | string;
  imagem: string;
}

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Cesta[];
}

// Fetch data from API
async function getCestas(page: number = 1): Promise<PaginatedResponse> {
  try {
    // Fetch data from Django REST API
    const res = await fetch(`${API_BASE_URL}/api/cestas/?page=${page}`, { 
      cache: 'no-store'  // Don't cache this data
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch cestas');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error loading cestas:', error);
    return { count: 0, next: null, previous: null, results: [] }; 
  }
}

export default async function CestasList({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const response = await getCestas(currentPage);
  const cestas = response.results;
  
  const totalPages = Math.ceil(response.count / (cestas.length || 1));
  const hasNextPage = response.next !== null;
  const hasPreviousPage = response.previous !== null;
  
  return (
    <main>
      {/* INICIO DO HERO */}
      <div className="hero min-h-[70vh]" style={{ backgroundImage: "url('/images/cesta1.png')" }}>
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-2xl">
            <h1 className="mb-5 text-5xl font-bold">Nossas Cestas</h1>
            <p className="mb-5 text-xl">
              Conheça nossas opções de cestas para o seu café da manhã
            </p>
          </div>
        </div>
      </div>
      {/* FIM DO HERO */}
      
      {/* INICIO DO MAIN CESTAS */}
      <div className="max-w-4xl mx-auto my-20 p-2">
        <h1 className="text-4xl mb-5">Cestas Disponíveis</h1>
        <p className="mb-5 text-gray-500">Mostrando {cestas.length} de {response.count} cestas</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cestas.length > 0 ? (
            cestas.map(cesta => (
              <div key={cesta.id} className="card bg-base-100 shadow-xl">
                <figure>
                  <Image 
                    src={cesta.imagem} 
                    alt={cesta.nome} 
                    width={400} 
                    height={300} 
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{cesta.nome}</h2>
                  <p>{cesta.descricao}</p>
                  <div className="text-lg font-bold">
                    R$ {typeof cesta.preco === 'number' 
                      ? cesta.preco.toFixed(2) 
                      : parseFloat(String(cesta.preco)).toFixed(2)}
                  </div>
                  <div className="card-actions justify-end">
                    <Link href={`/cestas/${cesta.id}`} className="btn btn-primary">
                      Ver detalhes
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 alert alert-info">
              <i className="bi bi-info-circle"></i>
              <span>Nenhuma cesta encontrada.</span>
            </div>
          )}
        </div>
        
        {/* Pagination Controls */}
        {response.count > 0 && (
          <div className="flex justify-center my-10">
            <div className="join">
              {hasPreviousPage && (
                <Link href={`/cestas?page=${currentPage - 1}`} className="join-item btn">
                  «
                </Link>
              )}
              
              <button className="join-item btn">
                Página {currentPage} de {totalPages}
              </button>
              
              {hasNextPage && (
                <Link href={`/cestas?page=${currentPage + 1}`} className="join-item btn">
                  »
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
      {/* FIM DO MAIN CESTAS */}
    </main>
  );
}
