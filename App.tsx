import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import { ExperimentType } from './types';
import MeasurementExp from './experiments/MeasurementExp';
import FreeFallExp from './experiments/FreeFallExp';
import ArchimedesExp from './experiments/ArchimedesExp';
import GasLawsExp from './experiments/GasLawsExp';
import AiTutor from './components/AiTutor';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [currentExperiment, setExperiment] = useState<ExperimentType>(ExperimentType.HOME);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentExperiment) {
      case ExperimentType.MEASUREMENT:
        return <MeasurementExp />;
      case ExperimentType.MOTION:
        return <FreeFallExp />;
      case ExperimentType.FLUIDS:
        return <ArchimedesExp />;
      case ExperimentType.GAS_LAWS:
        return <GasLawsExp />;
      case ExperimentType.AI_TUTOR:
        return <AiTutor />;
      case ExperimentType.HOME:
      default:
        return (
          <div className="max-w-4xl mx-auto text-center py-12">
            <h1 className="text-4xl font-bold text-slate-800 mb-6">مرحباً بك في مختبر الفيزياء</h1>
            <p className="text-xl text-gray-600 mb-12">
              تطبيق تفاعلي مصمم لطلاب الصف العاشر في فلسطين لفهم مفاهيم الفيزياء من خلال المحاكاة والتجربة.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { type: ExperimentType.MEASUREMENT, title: 'وحدة الميكانيكا', desc: 'أدوات القياس الدقيقة' },
                { type: ExperimentType.MOTION, title: 'وصف الحركة', desc: 'معادلات الحركة والسقوط الحر' },
                { type: ExperimentType.FLUIDS, title: 'وحدة الموائع', desc: 'الضغط والطفو (أرخميدس)' },
                { type: ExperimentType.GAS_LAWS, title: 'وحدة الحرارة', desc: 'قوانين الغازات (بويل وشارل)' },
              ].map((card) => (
                <button 
                  key={card.type}
                  onClick={() => setExperiment(card.type)}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow text-right border border-gray-100 group"
                >
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{card.title}</h3>
                  <p className="text-gray-500">{card.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar 
        currentExperiment={currentExperiment} 
        setExperiment={setExperiment} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="flex-1 md:mr-64 transition-all duration-300">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between md:hidden sticky top-0 z-10">
          <h1 className="font-bold text-slate-800">مختبر الفيزياء</h1>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600">
            <Menu />
          </button>
        </header>
        <div className="p-4 md:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;