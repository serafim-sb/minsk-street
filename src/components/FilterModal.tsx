import React from 'react';

interface SelectedFeatures {
  hasStairs: boolean;
  hasLedge: boolean;
  hasRail: boolean;
}


interface FilterModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedFeatures: React.Dispatch<React.SetStateAction<SelectedFeatures>>
  selectedFeatures: SelectedFeatures;

}


function FilterModal({ modalOpen, setModalOpen, selectedFeatures, setSelectedFeatures }: FilterModalProps) {

  if (!modalOpen) return null;

const handleCheckboxChange = (featureName: "hasStairs" | "hasLedge" | "hasRail") =>  {
    setSelectedFeatures({
      ...selectedFeatures,
      [featureName]: !selectedFeatures[featureName]
    });
  };

  return (
    <>

      <div 
        className="fixed top-[80px] inset-x-0 bottom-0 z-40 bg-black/20 backdrop-blur-sm" 
        onClick={() => setModalOpen(false)}
      />


      <div 
        className="fixed top-20 right-4 md:right-8 z-50 w-80 bg-[#111218] border border-red-600 p-5 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Чтобы клики внутри окна не закрывали его
      >
        <h3 className="text-sm font-semibold text-red-400 mb-4 tracking-wide uppercase">
          Фильтры спотов
        </h3>


        <div className="space-y-3">
          
   
          <label className="flex items-center justify-between p-3 rounded-xl bg-[#222430] hover:bg-[#2b2d3d] transition-colors cursor-pointer select-none">
            <span className="text-sm font-medium">Ступеньки</span>
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded accent-red-500 cursor-pointer"
              checked={selectedFeatures.hasStairs}
              onChange={() => handleCheckboxChange('hasStairs')}
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-[#222430] hover:bg-[#2b2d3d] transition-colors cursor-pointer select-none">
            <span className="text-sm font-medium">Грани / Боксы</span>
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded accent-red-500 cursor-pointer"
              checked={selectedFeatures.hasLedge}
              onChange={() => handleCheckboxChange('hasLedge')}
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-[#222430] hover:bg-[#2b2d3d] transition-colors cursor-pointer select-none">
            <span className="text-sm font-medium">Перила</span>
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded accent-red-500 cursor-pointer"
              checked={selectedFeatures.hasRail}
              onChange={() => handleCheckboxChange('hasRail')}
            />
          </label>

        </div>

        <button 
          onClick={() => setSelectedFeatures({ hasStairs: false, hasLedge: false, hasRail: false})}
          className="w-full mt-4 py-2 text-xs text-center text-slate-400 hover:text-slate-200 transition-colors"
        >
          Сбросить все фильтры
        </button>
      </div>
    </>
  );
}

export default FilterModal;
