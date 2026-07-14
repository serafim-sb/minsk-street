import React from "react";
import { useNavigate } from 'react-router-dom';

interface SpotData {
  id: number;
  title: string;
  type: string;
  isCovered: boolean;
  image: string;
  coordinates: [number, number];

}

interface SpotCardProps {
  spot: SpotData;
}


function SpotCard({ spot }: SpotCardProps) {
  const navigate = useNavigate();

  return (
    // 1. Заменили <Link> на <div> и добавили onClick для перехода на детальную страницу
    <div 
      onClick={() => navigate(`/spot/${spot.id}`)}
      className="cursor-pointer block relative h-72 md:h-96 max-w-sm rounded-3xl overflow-hidden shadow-2xl active:scale-[0.98] transition-transform bg-[#1C1C1E]"
    >
      
      {/* Картинка спота */}
      <img 
        src={spot.image} 
        alt={spot.title}
        className="absolute inset-0 max-w-sm h-full object-cover"
      />
     
      {/* Тень-градиент снизу */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      
      {/* Иконка погоды в углу */}
      <div className="absolute top-4 left-4">
        {spot.isCovered ? (
          <span className="bg-emerald-500/20 text-emerald-400 backdrop-blur-md text-[10px] font-bold px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
            <img src={`${import.meta.env.BASE_URL}rain_icon.png`} alt="rain" className="h-5 w-5 object-contain" />
          </span>
        ) : (
          <span className="bg-emerald-500/20 text-emerald-400 backdrop-blur-md text-[10px] font-bold px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
            <img src={`${import.meta.env.BASE_URL}sun_icon.png`} alt="sun" className="h-5 w-5 object-contain" />
          </span>
        )}
      </div>

      {/* Инфа и кнопка карты */}
      <div className="absolute bottom-0 left-0 right-0 p-3.5 md:p-5 space-y-1 flex justify-between items-end">
        <div>
          <span className="text-[9px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            {spot.type}
          </span>
          <h3 className="text-base md:text-2xl font-black tracking-tight text-white">
            {spot.title}
          </h3>
        </div>
        
        {/* Кнопка геотега */}
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Теперь это заблокирует клик по карточке!
            navigate("/map", { state: { center: spot.coordinates, zoom: 16 } });
          }}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center active:scale-90 transition-transform shadow-lg group"
        >
          <svg 
            xmlns="http://w3.org" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            className="w-4 h-4 md:w-5 md:h-5 text-white/90 group-hover:text-red-500 transition-colors"
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </button>
      </div>
    </div> 
  );
}

export default SpotCard;