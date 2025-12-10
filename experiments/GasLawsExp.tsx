import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GasLawsExp: React.FC = () => {
  const [volume, setVolume] = useState<number>(5); // Liters
  const temperature = 300; // Kelvin (Fixed for Boyle's Law)
  const constant = 100; // k = P*V

  const pressure = constant / volume; // Boyle's law: P = k/V

  // Generate data for the graph
  const data = Array.from({ length: 20 }, (_, i) => {
    const v = i + 1;
    return {
      v: v,
      p: constant / v
    };
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-4">قانون بويل (الغازات)</h2>
      <p className="text-gray-600 mb-6">العلاقة عكسية بين ضغط الغاز وحجمه عند ثبوت درجة الحرارة.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Visualization */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-8">
            <div className="text-center">
              <span className="block text-gray-500 text-sm">الحجم (V)</span>
              <span className="text-2xl font-bold text-blue-600">{volume} L</span>
            </div>
            <div className="text-2xl text-gray-400">×</div>
            <div className="text-center">
              <span className="block text-gray-500 text-sm">الضغط (P)</span>
              <span className="text-2xl font-bold text-red-600">{pressure.toFixed(2)} atm</span>
            </div>
            <div className="text-2xl text-gray-400">=</div>
            <div className="text-center">
              <span className="block text-gray-500 text-sm">الثابت (k)</span>
              <span className="text-xl font-bold text-gray-800">{constant}</span>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">غيّر حجم المكبس</label>
            <input 
              type="range" min="1" max="20" step="0.5"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Piston Visual */}
          <div className="flex justify-center">
            <div className="w-32 bg-gray-200 border-2 border-gray-400 rounded-b-lg relative overflow-hidden transition-all" style={{ height: '300px' }}>
              {/* Gas Particles (Density visual) */}
              <div 
                className="absolute bottom-0 w-full bg-blue-100 transition-all duration-300 flex flex-wrap content-end justify-center p-1 gap-1 overflow-hidden"
                style={{ height: `${volume * 10}px` }} 
              >
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDuration: `${0.5 + Math.random()}s` }}></div>
                ))}
              </div>
              
              {/* Piston Head */}
              <div 
                className="absolute w-full h-4 bg-gray-600 border-b-2 border-gray-800 transition-all duration-300"
                style={{ bottom: `${volume * 10}px` }}
              >
                <div className="w-full text-center text-[10px] text-white">↓↓↓</div>
              </div>
            </div>
          </div>
        </div>

        {/* Graph */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-bold text-gray-800 mb-4 text-center">الرسم البياني (الضغط مقابل الحجم)</h3>
          <div className="h-64 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="v" label={{ value: 'Volume (L)', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Pressure (atm)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line type="monotone" dataKey="p" stroke="#dc2626" strokeWidth={2} dot={false} />
                {/* Current Point */}
                <Line data={[{v: volume, p: pressure}]} dataKey="p" stroke="#2563eb" strokeWidth={0} dot={{ r: 6, fill: '#2563eb' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            لاحظ كيف يقل الضغط كلما زاد الحجم (علاقة عكسية)
          </p>
        </div>
      </div>
    </div>
  );
};

export default GasLawsExp;