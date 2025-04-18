import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Updated interface based on the provided payload
interface Produto {
  id: number;
  categoria_nome: string;
  nome: string;
  descricao: string;
  preco: number | string;
  categoria: number;
}

interface CestaDetail {
  id: number;
  produtos: Produto[];
  nivel_display: string;
  nome: string;
  descricao: string;
  preco: number | string;
  nivel: number;
  imagem: string;
}

async function getCestaById(id: string): Promise<CestaDetail | null> {
  try {
    const res = await fetch(`http://localhost:8000/api/cestas/${id}/`, { 
      cache: 'no-store' 
    });
    
    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch cesta ${id}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error(`Error loading cesta ${id}:`, error);
    return null;
  }
}

export default async function CestaDetail({ params }: { params: { id: string } }) {
  const cesta = await getCestaById(params.id);
  
  if (!cesta) {
    notFound();
  }

  return (
    <>
      <div className="hero bg-base-200 min-h-[50vh]">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image 
            src={cesta.imagem} 
            className="max-w-lg rounded-lg shadow-2xl" 
            alt={cesta.nome}
            width={500}
            height={400} 
          />
          <div>
            <h1 className="text-5xl font-bold">{cesta.nome}</h1>
            <p className="py-6">{cesta.descricao}</p>
            <span className="text-2xl font-bold">
              R$ {typeof cesta.preco === 'number' 
                ? cesta.preco.toFixed(2) 
                : parseFloat(String(cesta.preco)).toFixed(2)}
            </span>
            <p className="mt-2">Nível: {cesta.nivel_display}</p>
          </div>
        </div>
      </div>
      <main className="max-w-4xl mx-auto my-20">
        <h1 className="text-4xl">Produtos da Cesta</h1>
        <table className="table w-full my-10">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {cesta.produtos && cesta.produtos.map(produto => (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>R$ {typeof produto.preco === 'number' 
                  ? produto.preco.toFixed(2) 
                  : parseFloat(String(produto.preco)).toFixed(2)}
                </td>
                <td>{produto.categoria_nome}</td>
                <td>{produto.descricao}</td>
              </tr>
            ))}
            {(!cesta.produtos || cesta.produtos.length === 0) && (
              <tr>
                <td colSpan={4} className="text-center">Nenhum produto encontrado nesta cesta</td>
              </tr>
            )}
          </tbody>
        </table>
        <Link href="/cestas" className="btn">Ver todas as cestas</Link>
      </main>
    </>
  );
}
