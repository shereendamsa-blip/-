import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw } from 'lucide-react';

const FreeFallExp: React.FC = () => {
  const [height, setHeight] = useState<number>(50); // meters
  const [gravity] = useState<number>(9.8); // m/s^2
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [posY, setPosY] = useState<number>(0); // 0 to 100% of container
  
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const maxPixelHeight = 300; // Height of the simulation box in pixels

  const startAnimation = () => {
    setIsAnimating(true);
    setTime(0);
    setPosY(0);
    startTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(animate);
  };

  const reset = () => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    setIsAnimating(false);
    setTime(0);
    setPosY(0);
  };

  const animate = (now: number) => {
    if (!startTimeRef.current) startTimeRef.current = now;
    const elapsedSeconds = (now - startTimeRef.current) / 1000 * 2; // Speed up time 2x for UX

    // d = 0.5 * g * t^2
    const distance = 0.5 * gravity * Math.pow(elapsedSeconds, 2);
    
    // Percent falling
    let newPosPercent = (distance / height) * 100;

    if (newPosPercent >= 100) {
      newPosPercent = 100;
      setIsAnimating(false);
      // Final time calculation (real physics time)
      const realTime = Math.sqrt((2 * height) / gravity);
      setTime(realTime);
    } else {
      setTime(elapsedSeconds);
      requestRef.current = requestAnimationFrame(animate);
    }
    
    setPosY(newPosPercent);
  };

  // Theoretical calculations
  const theoreticalTime = Math.sqrt((2 * height) / gravity).toFixed(2);
  const finalVelocity = (gravity * parseFloat(theoreticalTime)).toFixed(2);

  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-4">محاكاة السقوط الحر</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md h-fit">
          <label className="block text-sm font-medium text-gray-700 mb-2">الارتفاع (متر)</label>
          <input 
            type="number" 
            min="1" 
            max="200" 
            value={height}
            onChange={(e) => {
              reset();
              setHeight(Number(e.target.value));
            }}
            className="w-full p-2 border rounded-md mb-6 text-left"
            dir="ltr"
          />

          <div className="space-y-4">
            <button 
              onClick={startAnimation}
              disabled={isAnimating || posY === 100}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg disabled:opacity-50"
            >
              <Play size={20} /> ابدأ الإسقاط
            </button>
            <button 
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg"
            >
              <RotateCcw size={20} /> إعادة تعيين
            </button>
          </div>

          <div className="mt-8 border-t pt-4">
            <h4 className="font-bold text-gray-800 mb-2">النتائج النظرية:</h4>
            <ul className="text-sm space-y-2 text-gray-600" dir="ltr">
              <li className="flex justify-between">
                <span>Time (t):</span> <span className="font-bold">{theoreticalTime} s</span>
              </li>
              <li className="flex justify-between">
                <span>Velocity (v):</span> <span className="font-bold">{finalVelocity} m/s</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Simulation Area */}
        <div className="lg:col-span-2 bg-blue-50 rounded-xl border border-blue-200 relative overflow-hidden flex justify-center" style={{ height: '400px' }}>
          {/* Ruler Marks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 border-r border-blue-300 bg-white flex flex-col justify-between text-xs text-gray-500 py-2 px-1">
            <span>{height}m</span>
            <span>{height * 0.75}m</span>
            <span>{height * 0.5}m</span>
            <span>{height * 0.25}m</span>
            <span>0m</span>
          </div>

          {/* Falling Object */}
          <div className="relative w-full ml-16">
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-500 rounded-full shadow-md"
              style={{ top: `calc(${posY}% - ${posY === 100 ? 32 : 0}px)` }}
            ></div>
            
            {/* Ground */}
            <div className="absolute bottom-0 w-full h-2 bg-green-600"></div>
          </div>

          {/* Live Data Overlay */}
          <div className="absolute top-4 right-4 bg-white/80 p-3 rounded-lg text-sm backdrop-blur-sm shadow-sm" dir="ltr">
            <p>t: <span className="font-mono font-bold text-blue-700">{time.toFixed(2)} s</span></p>
            <p>v: <span className="font-mono font-bold text-red-700">{(time * gravity).toFixed(2)} m/s</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeFallExp;