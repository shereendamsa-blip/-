import React, { useState } from 'react';

const MeasurementExp: React.FC = () => {
  const [value, setValue] = useState<number>(0);

  // Vernier Scale Logic
  const mainScalePart = Math.floor(value);
  const vernierPart = Math.round((value - mainScalePart) * 10); // 0-9

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-4">محاكاة القدمة ذات الورنية</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <p className="text-gray-600 mb-4">
          حرك المؤشر أدناه لمحاكاة قياس جسم باستخدام الورنية. تعلم كيف تقرأ التدريج الثابت والمتحرك.
        </p>

        <div className="mb-10">
          <label className="block text-sm font-medium text-gray-700 mb-2">تحريك الفك المتحرك</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            step="0.1" 
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Visual Representation of Caliper */}
        <div className="relative h-32 bg-gray-100 border-2 border-gray-400 rounded-lg overflow-hidden select-none">
          {/* Main Scale (Fixed) */}
          <div className="absolute top-0 left-0 w-full h-1/2 border-b border-gray-400 bg-gray-200">
            {Array.from({ length: 110 }).map((_, i) => (
              <div 
                key={i} 
                className={`absolute bottom-0 border-l border-gray-600 ${i % 10 === 0 ? 'h-full border-gray-800 w-0.5' : i % 5 === 0 ? 'h-3/4' : 'h-1/2'}`}
                style={{ left: `${i * 10}px` }}
              >
                {i % 10 === 0 && (
                  <span className="absolute -top-1 left-1 text-xs font-bold">{i / 10}</span>
                )}
              </div>
            ))}
          </div>

          {/* Vernier Scale (Moving) */}
          <div 
            className="absolute bottom-0 h-1/2 bg-blue-100 border-r border-blue-500 opacity-90 transition-all duration-75"
            style={{ 
              left: `${value * 10}px`, // Scaling factor for visualization
              width: '100px' // 10 vernier divisions = 9 main divisions usually, simplified here
            }} 
          >
             {/* Vernier Ticks */}
             {Array.from({ length: 11 }).map((_, i) => (
              <div 
                key={i} 
                className={`absolute top-0 border-l border-blue-800 ${i % 5 === 0 ? 'h-3/4' : 'h-1/2'}`}
                style={{ left: `${i * 9}px` }} // Slightly smaller spacing for vernier effect
              >
                <span className="absolute bottom-0 -left-1 text-[10px]">{i}</span>
              </div>
            ))}
            <div className="absolute -left-2 -top-6 text-red-600 text-xl font-bold">↓</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h3 className="font-bold text-lg text-blue-900 mb-3">القراءة الحالية</h3>
          <div className="space-y-2 text-blue-800">
            <p>قراءة التدريج الثابت: <span className="font-bold text-xl">{mainScalePart} مم</span></p>
            <p>قراءة الورنية (المنطبقة): <span className="font-bold text-xl">{vernierPart} × 0.1 مم</span></p>
            <div className="mt-4 pt-4 border-t border-blue-200">
              <p>القراءة الكلية = الثابت + الورنية</p>
              <p className="text-3xl font-bold text-left" dir="ltr">
                {mainScalePart} + {(vernierPart * 0.1).toFixed(2)} = {value.toFixed(2)} mm
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
          <h3 className="font-bold text-lg text-yellow-900 mb-3">معلومة إثرائية</h3>
          <p className="text-gray-700 leading-relaxed">
            تستخدم الورنية لقياس الأبعاد الخارجية، والداخلية، والعمق بدقة عالية تصل إلى 0.1 مم أو 0.05 مم حسب نوع الورنية.
            في المنهاج الفلسطيني، نركز على كيفية قراءة التطابق بين تدريج الورنية والتدريج الثابت.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MeasurementExp;