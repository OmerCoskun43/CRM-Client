const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-1 pb-2">
      <div className="container mx-auto text-center">
        <h2 className="text-xl font-bold text-red-500 animate-pulse">
          CSKN CRM
        </h2>
        <p className="mt-1 text-sm">
          © {new Date().getFullYear()} Tüm Hakları Saklıdır.
        </p>
        <div className="mt-1">
          <a href="#" className="mx-4 hover:underline hover:text-red-500">
            Gizlilik Politikası
          </a>
          <a href="#" className="mx-4 hover:underline hover:text-red-500">
            Kullanım Şartları
          </a>
          <a href="#" className="mx-4 hover:underline hover:text-red-500">
            İletişim
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
