import { spotsData } from "./spotsData"
import React, { useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';

// Выносим шапку в отдельный чистый компонент
import Header from "./components/Header";
import SpotCard from './components/SpotCard';
import WeatherCard, {Weather} from './components/WeatherCard';
import  BtnFiltr from './components/BtnFiltr';
import SpotsMap from "./components/SpotsMap";
import SpotDetails from './components/SpotDetails';
import FilterModal from './components/FilterModal';

function App() {
  const [rain,setRain] = useState(false);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false); 
  const [selectedFeatures,setSelectedFeatures] = useState({ hasStairs: false, hasLedge: false, hasRail: false });
  const [checkSpot, setCheckSpot] = useState<number[]>([]);
  
  function handleToggleCheckIn(spotId: number){
    if(checkSpot.includes(spotId)){setCheckSpot(checkSpot.filter(id => id !== spotId)), console.log(checkSpot)}
    else{setCheckSpot([...checkSpot, spotId]),console.log(checkSpot)}
  }
  
    const [spots, setSpots] = useState([]);
    useEffect(()=> {
      fetch('http://localhost:5000/api/spots')
      .then(res => res.json())
      .then(data => setSpots(data))
      .catch(err => console.error(""))
    }, []);
  useEffect(() =>{
    fetch("https://api.open-meteo.com/v1/forecast?latitude=53.9000&longitude=27.5667&current_weather=true&daily=precipitation_sum&timezone=auto")
      .then((response) => response.json())
      .then((data) => {
        const tempNow = data.current_weather.temperature;
        const rainToday = data.daily.precipitation_sum[0];

        setWeather({
          temp: tempNow,
          hasRain: rainToday > 0,
        })       
      });
  }, []);
  const filteredSpots = spotsData.filter((spot) =>{
    if(rain && !searchQuery && !spot.isCovered){
      return false
    }

    if(selectedFeatures.hasStairs && !spot.feature.hasStairs){
      return false;
    }
    if(selectedFeatures.hasLedge && !spot.feature.hasLedge){
      return false;
    }
    if(selectedFeatures.hasRail && !spot.feature.hasRail){
      return false;
    }
    
    
    const matchesSearch = spot.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch
  })
  return (
    <div className="min-h-screen bg-[#0B0C10] text-slate-50 pb-10">
      
      {/* ШАПКА */}
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />

      {/* Контейнер для контента */}
      <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
        <FilterModal 
          modalOpen={modalOpen} 
          setModalOpen={setModalOpen} 
          selectedFeatures={selectedFeatures}
          setSelectedFeatures={setSelectedFeatures}
        />
        <Routes>
          {/* Главная страница со списком спотов и погодой */}
          <Route path="/" element={
            <>
              <WeatherCard weather={weather}/>
              <BtnFiltr rain={rain} setRain={setRain} setModalOpen={setModalOpen}/>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
                {filteredSpots.map((spot) => <SpotCard key={spot.id} spot={spot} />)}
              </div>
            </>
          } />

          {/* Страница с интерактивной картой */}
          <Route path="/map" element={<SpotsMap checkSpot={checkSpot} handleToggleCheckIn={handleToggleCheckIn}/>} />

          {/* Страница конкретного спота. :id — это динамический параметр (1, 2, 3 и т.д.) */}
          <Route path="/spot/:id" element={<SpotDetails  />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
