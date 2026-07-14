import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { spotsData, Feature } from '../spotsData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface MediaItem {
  type: "photo" | "video"; // union из литералов, как со `status` в Person
  url: string;
}



function SpotDetails() {
  
  const labels = {
  hasStairs: "Ступени",
  hasLedge: "Грань",
  hasRail: "Перила",
  hasKiker: "Кикер"
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentType,setCurrentType] = useState('photo')
  // Находим нужный спот по ID
  const spot = spotsData.find((s) => s.id === Number(id));
  if (!spot) {
    return <div>Спот не найден</div>; 
  }
  const activeFeatures = spot.feature 
  ? (Object.keys(spot.feature) as (keyof Omit<Feature, "stairsCount">)[])
      .filter(key => spot.feature[key] === true)
  : [];

  // Скроллим страницу вверх при открытии спота
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);


  return (
    <div    className="max-w-4xl mx-auto space-y-6 px-2 md:px-0 animate-fade-in">
      
      {/* ВЕРХНЯЯ ПАНЕЛЬ: Кнопка назад и тип спота */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1C1C1E] border border-red-600/80 text-xs md:text-sm font-bold text-white/90 hover:text-red-500 hover:border-red-600/40 transition-all active:scale-95 shadow-md"
        >
          <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 transition-transform group-hover:-translate-x-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Назад
        </button>
        
        <span className="text-[10px] md:text-xs font-black text-slate-400 bg-slate-800/40 px-3 py-1.5 rounded-full uppercase tracking-widest border border-slate-800/50">
          {spot.type}
        </span>
      </div>

      <div className="relative h-64 md:h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-800/60 bg-[#1C1C1E]">
        <Swiper onInit={(swiper) => {const currentMedia = spot.media?.[swiper.activeIndex]; setCurrentType(currentMedia?.type || 'photo');}} onSlideChange={(swiper) => {const currentMedia = spot.media?.[swiper.activeIndex]; setCurrentType(currentMedia?.type || 'photo');}} modules={[Navigation]} navigation={{nextEl:'.swiper-button-next-custom',prevEl:'.swiper-button-prev-custom'}}  className='w-full h-full' >
          {spot.media?.map((item, index) => (
            <SwiperSlide key={index}>
              {item.type === "photo" ? (
                <img 
                  
                  src={item.url} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <video 
                  
                  src={item.url} 
                  controls 
                  className="w-full h-full object-cover" 
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
          
        
          {currentType === 'photo' && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 pointer-events-none">
                <h1 className="z-20 relative text-2xl md:text-4xl font-black tracking-tight text-white uppercase drop-shadow-md">
                  {spot.title}
                </h1>
              </div>
            </>
          )}
           <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 bg-[#1C1C1E]/80 border border-slate-800 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:text-red-500 hover:border-red-600/50 active:scale-90 transition-all cursor-pointer">
              <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 bg-[#1C1C1E]/80 border border-slate-800 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:text-red-500 hover:border-red-600/50 active:scale-90 transition-all cursor-pointer">
              <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
        
      </div>
      {/* СЕТКА С ХАРАКТЕРИСТИКАМИ СПОТА */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Левая колонка: Описание (занимает 2 колонки на десктопе) */}
        <div className="md:col-span-2 bg-[#1C1C1E] rounded-3xl p-5 md:p-6 border border-slate-800/80 space-y-3 shadow-xl">
          <h3 className="text-xs font-black uppercase tracking-widest text-red-500">О споте</h3>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium tracking-wide">
            {spot.description || "Отличный локальный спот для катки. Качество покрытия хорошее, можно круто провести время и пофлетить."}
          </p>
        </div>

        {/* Правая колонка: Фичи и Быстрые параметры */}
        <div className="bg-[#1C1C1E] rounded-3xl p-5 md:p-6 border border-slate-800/80 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-1.5">
            <h3 className="text-xs font-black uppercase tracking-widest text-red-500">Параметры</h3>
            
            {/* Список параметров (можно расширять в spotsData) */}
            <div className="space-y-2 text-xs md:text-sm">
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Покрытие</span>
                <span className="font-bold text-white">{spot.surface || "Мрамор / Асфальт"}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Освещение</span>
                <span className="font-bold text-white">{spot.hasLight ? "Есть 💡" : "Нет 🌙"}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Выгоняют</span>
                <span className="font-bold text-white">{spot.hasSecurity || "Спокойно"}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Крыша</span>
                <span className="font-bold text-white">{spot.isCovered ? "Крытый" : "Открытый"}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {activeFeatures.map((key, index) => (
                <span 
                  key={index} 
                  className="bg-slate-800/60 text-white/80 border border-slate-700/50 text-xs px-2.5 py-1 rounded-full font-medium"
                >
                  {/* Магия перевода: берем имя ключа и ищем его русскую версию в labels */}
                  {labels[key]} 
                  
                  {/* Бонус для про: если это ступени, допишем количество из соседнего поля */}
                  {key === 'hasStairs' && spot.feature.stairsCount && ` (${spot.feature.stairsCount})`}
                </span>
              ))}
            </div>

          </div>

          {/* Кнопка "Погнать на карту" */}
          <button 
            onClick={() => navigate("/map", { state: { center: spot.coordinates, zoom: 16 } })}
            className="w-full mt-4 py-3 bg-red-600 hover:bg-red-700 active:scale-[0.97] transition-all rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742c1.002-.722 2.607-1.993 3.967-3.925C19.45 15.394 20.75 12.69 20.75 9.75c0-4.833-3.917-8.75-8.75-8.75S3.25 4.917 3.25 9.75c0 2.94 1.3 5.644 2.572 7.934 1.36 1.932 2.965 3.203 3.967 3.925a16.974 16.974 0 0 0 1.144.742ZM12 12.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
            </svg>
            Показать на карте
          </button>
        </div>

      </div>
    </div>
  );
}

export default SpotDetails;