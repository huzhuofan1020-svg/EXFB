import React, { useState, useMemo } from 'react';
import { calculateBinomialDistribution } from './utils/math';
import { DistributionChart } from './components/DistributionChart';
import { DerivationPanel } from './components/DerivationPanel';
import { RealLifeExample } from './components/RealLifeExample';
import { Controls } from './components/Controls';
import { BarChart2, BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [n, setN] = useState<number>(20);
  const [p, setP] = useState<number>(0.25);

  const { data, stats } = useMemo(() => calculateBinomialDistribution(n, p), [n, p]);

  return (
    <div className="h-screen w-full flex flex-col bg-slate-50 overflow-hidden text-slate-900 font-sans">
      {/* Header */}
      <header className="flex-none h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-blue-200 shrink-0">
            <BarChart2 size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">二项分布探索器</h1>
            <p className="hidden sm:block text-xs text-slate-500 font-medium">B(n, p) 图形化演示与数学机理</p>
          </div>
        </div>
        <a 
          href="https://zh.wikipedia.org/wiki/%E4%BA%8C%E9%A1%B9%E5%88%86%E5%B8%83" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-full"
        >
          <BookOpen size={14} />
          <span className="hidden sm:inline">维基百科</span>
        </a>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden relative z-0">
        
        {/* Left: Chart Area */}
        <section className="flex-none h-[400px] lg:h-auto lg:flex-1 p-4 lg:p-6 flex flex-col min-h-0">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex-1 p-2 sm:p-4 lg:p-6 relative flex flex-col">
             <DistributionChart data={data} />
          </div>
        </section>

        {/* Right: Sidebar (Controls + Math) */}
        <aside className="flex-none w-full lg:w-[400px] xl:w-[480px] bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col lg:overflow-y-auto lg:h-full">
          <div className="p-4 lg:p-6 flex flex-col gap-4 lg:gap-6 pb-10 lg:pb-6">
            
            {/* Controls */}
            <Controls n={n} setN={setN} p={p} setP={setP} />

            {/* Real Life Example */}
            <RealLifeExample n={n} p={p} stats={stats} data={data} />

            {/* Derivation / Logic */}
            <DerivationPanel n={n} p={p} stats={stats} />
            
            {/* Footer credit */}
            <div className="text-center mt-auto py-2 text-xs text-slate-400">
              交互式数学 • React + Recharts
            </div>
          </div>
        </aside>

      </main>
    </div>
  );
};

export default App;