import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center h-[calc(100vh-170px)] justify-center  bg-gray-200 ">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-xl text-gray-600">Sayfa Bulunamadı</p>
        <p className="mt-2 text-gray-500">Aradığınız sayfa mevcut değil.</p>
        <Link
          to="/"
          className="mt-6 inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
