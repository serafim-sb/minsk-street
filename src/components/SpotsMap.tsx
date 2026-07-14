import React from "react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { spotsData } from "../spotsData";
import { useLocation, useNavigate, Link, useParams} from 'react-router-dom';
import { useEffect } from 'react';

interface SpotsMapProps {
  checkSpot: number[]; 
  handleToggleCheckIn: (id: number) => void;
}

function SpotsMap({ checkSpot, handleToggleCheckIn }: SpotsMapProps) {
  const location = useLocation();
  
  const defaultCenter: LatLngExpression = [53.9000, 27.5667];
  const defaultZoom = 12;

  const center = location.state?.center || defaultCenter;
  const zoom = location.state?.zoom || defaultZoom;
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  return (

    
    <div className="absolute rounded-3xl overflow-hidden w-full max-w-[360px] md:max-w-4xl lg:max-w-6xl h-[85vh] md:h-[75vh] border border-red-600 shadow-2xl">
      <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-4 right-4 z-[1000] bg-[#1C1C1E] border border-red-600/80 text-white/90 text-xs md:text-sm font-bold p-2 rounded-xl shadow-md hover:text-red-500 hover:border-red-600/40 active:scale-95 transition-all"
          >
            Назад
        </button>
      </div>
       
      <MapContainer 
        className="h-full w-full z-[400]" 
        center={center} 
        zoom={zoom}
        key={`${center[0]}-${zoom}`} 
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {spotsData.map((spot) => {
          const count = checkSpot.includes(spot.id) ? spot.skatersNow + 1 : spot.skatersNow;

          const base = import.meta.env.BASE_URL

          const customIcon = L.divIcon({
            className: "rounded-full border-2 border-red-600 bg-[#1C1C1E] shadow-lg flex items-center justify-center",
            html: `
              <img src="${base}spidfire.png" class="w-full h-full object-contain p-0.5 rounded-full" />
              ${count > 0 ? `
                <div class="absolute -top-2 -right-2 bg-red-600 border border-[#1C1C1E] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  ${count}
                </div>
              ` : ''}
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -10]
          });
          return (
            <Marker key={spot.id} position={spot.coordinates} icon={customIcon}>
              <Popup className="custom-popup" closeButton={false}  offset={[0, -20]} >
                  <div onClick={() => navigate(`/spot/${spot.id}`)} className="w-56 bg-[#1C1C1E] border border-slate-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.8)] rounded-2xl overflow-hidden shadow-2xl flex flex-col text-white">
                   <img src={spot.image} className="w-full h-28 object-cover" alt="" />

                    <div className="p-4 space-y-2">
                      <h3 className="font-black text-sm uppercase tracking-tight text-white">{spot.title}</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{spot.type}</p>
                      
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); 
                          handleToggleCheckIn(spot.id); 
                        }}
                        className="w-full mt-4 py-2.5 bg-red-600 hover:bg-red-700 active:scale-[0.97] text-white transition-all rounded-xl font-black text-[12px] uppercase tracking-widest  shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
                      >
                        Я тут
                      </button>
                      
                      <a
                       onClick={(e) => e.stopPropagation()}
                       href={`https://yandex.ru/maps/?rtext=~${spot.coordinates[0]},${spot.coordinates[1]}&rtt=auto&pt=${spot.coordinates[1]},${spot.coordinates[0]},pm2rdm`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full mt-2 py-2.5 bg-[#1C1C1E] hover:bg-slate-800 border border-slate-700/60 text-white transition-all rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5 text-red-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                         Маршрут
                      </a>
                    </div>

                  </div>
                </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      
    </div>
    
  );
}

export default SpotsMap;
