import React, { useState } from 'react';

const ArchimedesExp: React.FC = () => {
  // Constants
  const WATER_DENSITY = 1000; // kg/m^3
  const OIL_DENSITY = 800; // kg/m^3
  const GRAVITY = 9.8;

  // State
  const [fluidType, setFluidType] = useState<'water' | 'oil'>('water');
  const [objectVolume, setObjectVolume] = useState<number>(0.005); // m^3
  const [objectMass, setObjectMass] = useState<number>(4); // kg

  const fluidDensity = fluidType === 'water' ? WATER_DENSITY : OIL_DENSITY;

  // Calculations
  const objectWeight = objectMass * GRAVITY; // Newtons (Force down)
  const buoyantForce = fluidDensity * objectVolume * GRAVITY; // Newtons (Force up)
  const apparentWeight = Math.max(0, objectWeight - buoyantForce);
  
  const isFloating = buoyantForce >= objectWeight;
  const objectDensity = objectMass / objectVolume;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-4">قاعدة أرخميدس (الطفو)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
          <h3 className="font-bold text-lg mb-4 text-gray-800">خصائص الجسم والسائل</h3>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">نوع السائل</label>
            <select 
              value={fluidType} 
              onChange={(e) => setFluidType(e.target.value as 'water' | 'oil')}
              className="w-full p-2 border rounded-md"
            >
              <option value="water">ماء (كثافة 1000 كغم/م³)</option>
              <option value="oil">زيت (كثافة 800 كغم/م³)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">كتلة الجسم (كغم): {objectMass}</label>
            <input 
              type="range" min="1" max="20" step="0.5"
              value={objectMass}
              onChange={(e) => setObjectMass(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">حجم الجسم (م³): {objectVolume}</label>
            <input 
              type="range" min="0.001" max="0.02" step="0.001"
              value={objectVolume}
              onChange={(e) => setObjectVolume(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 flex flex-col items-center justify-center relative min-h-[300px]">
          {/* Beaker */}
          <div className="relative w-48 h-64 border-l-4 border-r-4 border-b-4 border-gray-400 bg-white/50 rounded-b-lg">
            {/* Liquid */}
            <div 
              className={`absolute bottom-0 w-full h-4/5 transition-colors duration-500 ${fluidType === 'water' ? 'bg-blue-400/60' : 'bg-yellow-400/60'}`}
            ></div>

            {/* Object */}
            <div 
              className={`absolute left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gray-800 rounded-md shadow-lg flex items-center justify-center text-white text-xs font-bold transition-all duration-1000 ease-in-out z-10 border-2 border-white`}
              style={{ 
                bottom: isFloating ? '80%' : '5px' // Simple float visual
              }}
            >
              {objectMass} كغم
            </div>
            
            {/* Forces Arrows */}
            <div 
               className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-1000"
               style={{ bottom: isFloating ? 'calc(80% + 40px)' : '45px' }}
            >
               {/* Weight Vector */}
               <div className="absolute top-10 left-1/2 w-1 bg-red-600" style={{ height: '40px', transform: 'translateX(-50%)' }}></div>
               <div className="absolute top-[80px] left-1/2 text-red-600 text-xs font-bold w-32 -ml-16 text-center">الوزن: {objectWeight.toFixed(1)} N</div>

               {/* Buoyancy Vector */}
               <div className="absolute bottom-10 left-1/2 w-1 bg-green-600" style={{ height: `${Math.min(80, buoyantForce)}px`, transform: 'translateX(-50%)' }}></div>
               <div className="absolute bottom-[90px] left-1/2 text-green-700 text-xs font-bold w-32 -ml-16 text-center">قوة الطفو: {buoyantForce.toFixed(1)} N</div>
            </div>

          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center">
        <h3 className={`text-xl font-bold mb-2 ${isFloating ? 'text-green-600' : 'text-red-600'}`}>
          الجسم {isFloating ? 'يطفو' : 'ينغمر'}
        </h3>
        <p className="text-gray-700">
          كثافة الجسم: <span dir="ltr">{objectDensity.toFixed(0)} kg/m³</span> | 
          كثافة السائل: <span dir="ltr">{fluidDensity} kg/m³</span>
        </p>
        <p className="text-sm mt-2 text-gray-600">
          قاعدة: يطفو الجسم إذا كانت كثافته أقل من كثافة السائل، أو إذا كانت قوة الطفو أكبر من أو تساوي وزنه.
        </p>
      </div>
    </div>
  );
};

export default ArchimedesExp;