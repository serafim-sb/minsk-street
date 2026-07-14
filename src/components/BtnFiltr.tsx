import React from "react";

interface BtnFiltrProps{
    rain: boolean;
    setRain: React.Dispatch<React.SetStateAction<boolean>>;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function BtnFiltr({rain, setRain, setModalOpen }: BtnFiltrProps){
    return(
    <div className="flex gap-4 ">
            <button onClick={() => setRain(false)} className={`px-4 py-2 rounded-xl text-sm font-bold   ${!rain ? 'bg-[#F5F5F7] text-black' : 'bg-[#1C1C1E] text-[#F5F5F7]'}`}>Все</button>
            <button onClick={() => setRain(true)} className={`px-4 py-2 rounded-xl text-sm font-bold  ${!rain ?  'bg-[#1C1C1E] text-[#F5F5F7]':'bg-[#F5F5F7] text-black' }`}> Крытые</button>
    </div>)
}
export default BtnFiltr