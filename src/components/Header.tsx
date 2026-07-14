import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  
  
}

function Header({ searchQuery, setSearchQuery, setModalOpen, modalOpen }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Проверяем текущие пути в адресной строке для подсветки кнопок
  const isHomePage = location.pathname === "/";
  const isMapPage = location.pathname === "/map";

  return (
    <header className="gap-4 sticky top-0 z-50 bg-[#1C1C1E]/80 backdrop-blur-md p-4 flex justify-between items-center border-b border-red-600">

      {/* ЛОГОТИП (Клик возвращает на главную) */}
      <div
        onClick={() => navigate("/")}
        className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
      >
        <img src={`${import.meta.env.BASE_URL}spidfire.png`}alt="logo" className="max-h-full object-contain" />
      </div>

      {/* СТРОКА ПОИСКА */}
      <div className="relative max-w-xs w-full">
      <input
        type="search"
        className="bg-[#0B0C10] text-white p-2 px-4 rounded-xl border border-red-600 text-sm focus:outline-none focus:border-red-600 max-w-xs w-full"
        placeholder="Поиск спота..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        
      />
      </div>
      

      {/* БЛОК КНОПОК НАВИГАЦИИ */}
      <div className="gap-3 md:gap-5 flex">

        {/* КНОПКА: СПИСОК СПОТОВ */}
        {isHomePage && (
          <button
            type="button"
            onClick={() => setModalOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://w3.org"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className={`w-6 h-6 md:w-5 md:h-5 transition-colors ${modalOpen ? 'text-red-500' : 'text-white/90 hover:text-red-500'}`}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
          </button>
        )}

        {/* КНОПКА: КАРТА (С умным тогглом назад при повторном клике) */}
        <button type="button" onClick={() => { if (modalOpen) { setModalOpen(false) } navigate(isMapPage ? "/" : "/map") }} >
          <svg
            xmlns="http://w3.org"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className={`w-6 h-6 md:w-5 md:h-5 transition-colors ${isMapPage ? 'text-red-500' : 'text-white/90 hover:text-red-500'}`}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </button>

      </div>

    </header>
  );
}

export default Header;
