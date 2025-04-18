import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center bg-primary text-primary-content p-10">
      <div>
        <i className="bi bi-cup-hot-fill text-4xl"></i>
        <p className="font-bold">
          CAFÉ COM PÃO
        </p>
      </div>
      <div className="w-full border-t-2 border-secondary pt-4">
        <div className="text-4xl flex gap-10 mb-4">
          <Link href="https://www.instagram.com/" target="_blank"><i className="bi bi-instagram"></i></Link>
          <Link href="https://www.facebook.com/" target="_blank"><i className="bi bi-facebook"></i></Link>
          <Link href="https://www.whatsapp.com/" target="_blank"><i className="bi bi-whatsapp"></i></Link>
        </div>
        <p>Copyright - Ribeirão Preto</p>
      </div>
    </footer>
  );
}
