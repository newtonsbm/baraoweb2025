import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* INICIO DO HERO */}
      <div className="hero min-h-screen" style={{ backgroundImage: "url('/images/padaria1.png')" }}>
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-2xl">
            <h1 className="mb-5 text-5xl font-bold">Assine sua manhã perfeita!</h1>
            <p className="mb-5 text-xl">
              Comece suas manhãs com sabor e praticidade
              <br />Assine o <strong>Café com Pão!</strong>
            </p>
          </div>
        </div>
      </div>
      {/* FIM DO HERO */}
      {/* INICIO DO MAIN HOME */}
      <div className="max-w-4xl mx-auto my-10">
        <article className="flex gap-8 my-20">
          <Image src="/images/cesta2.png" className="w-1/2" alt="Cesta de produtos" width={500} height={400} />
          <section className="prose">
            <h2>Cestas com produtos perfeitos!</h2>
            <p>Nosso compromisso com a qualidade e a conveniência torna cada entrega uma experiência única. Experimente o
              que temos a oferecer</p>
            <ul>
              <li>Variedade premium</li>
              <li>Personalização flexível</li>
              <li>Entrega confiável</li>
            </ul>
          </section>
        </article>
        <blockquote className="w-3/4 mx-auto text-center my-20">
          <p>
            Adoro receber minha cesta de café da manhã do Café com Pão toda semana!
            A variedade de itens frescos e a qualidade dos produtos superam minhas expectativas.
            Começo cada manhã com um sorriso graças a essa delícia.
            Recomendo a todos que buscam praticidade e sabor na primeira refeição do dia!
          </p>
          <cite>Maria da Silva</cite>
        </blockquote>
      </div>
      {/* FIM DO MAIN HOME */}
    </main>
  );
}
