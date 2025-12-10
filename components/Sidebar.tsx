import React from 'react';
import { ExperimentType } from '../types';
import { Home, Ruler, ArrowDown, Droplets, Flame, BrainCircuit } from 'lucide-react';

interface SidebarProps {
  currentExperiment: ExperimentType;
  setExperiment: (exp: ExperimentType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentExperiment, setExperiment, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: ExperimentType.HOME, label: 'الرئيسية', icon: Home },
    { id: ExperimentType.MEASUREMENT, label: 'القياس (الورنية)', icon: Ruler },
    { id: ExperimentType.MOTION, label: 'السقوط الحر', icon: ArrowDown },
    { id: ExperimentType.FLUIDS, label: 'قاعدة أرخميدس', icon: Droplets },
    { id: ExperimentType.GAS_LAWS, label: 'قوانين الغازات', icon: Flame },
    { id: ExperimentType.AI_TUTOR, label: 'المعلم الذكي', icon: BrainCircuit },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed top-0 right-0 h-full w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out z-30 ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0`}>
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-blue-400">⚛</span> فيزياء 10
          </h1>
          <p className="text-xs text-slate-400 mt-1">المنهاج الفلسطيني</p>
        </div>
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setExperiment(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    currentExperiment === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;