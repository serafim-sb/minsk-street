import React from "react"
const base = import.meta.env.BASE_URL

export  interface Weather {
  temp: number;
  hasRain: boolean;
}
interface WeatherCardProps {
   weather: Weather | null;
}

function WeatherCard({weather}: WeatherCardProps){
    return (<div>{!weather ? (<div className="bg-[#1C1C1E] p-4 rounded-3xl text-[#F5F5F7] text-sm">Загрузка...</div>):(
        <div className="relative md:mx-0 max-w-sm overflow-hidden h-24 rounded-3xl flex justify-between items-center p-5 border border-white/10 shadow-xl">
  
        {/* 1. БЭКГРАУНД: Картинка, которая меняется в зависимости от дождя */}
        <img 
          src={weather?.hasRain 
            ? `${import.meta.env.BASE_URL}rain_2.jpg`
            : `${import.meta.env.BASE_URL}sun.jpg`
          }
          alt="weather bg" 
          className="absolute  inset-0 w-full h-full object-cover scale-105 blur-[1px] opacity-40"
        />

        {/* 2. ТЕКСТ (Поверх картинки, поэтому оборачиваем в relative, чтобы не утонул) */}
        <div className="relative z-10 space-y-0.5">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block opacity-75">
            Погода Минск
          </span>
          <p className="text-sm font-bold text-white tracking-tight flex">
           {weather?.hasRain ? (
              <>
                <span>Сегодня дождь</span>
                <img src={`${base}rain_icon.png`} alt="rain" className="h-5 w-5 object-contain" />
              </>
            ) : (
              <>
                <span>Сегодня сухо </span>
                <img src={`${base}sun_icon.png`} alt="sun" className="h-5 w-5 object-contain" />
              </>
            )}
          </p>
        </div>

        {/* 3. ГРАДУСЫ (Тоже поверх картинки) */}
        <div className="relative z-10 text-3xl font-black text-white tracking-tighter">
          {weather?.temp}°C
        </div>

      </div>)}</div>)
}

export default WeatherCard