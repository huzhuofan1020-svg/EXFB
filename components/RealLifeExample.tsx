import React from 'react';
import { BinomialStats, DistributionData } from '../types';

interface Props {
  n: number;
  p: number;
  stats: BinomialStats;
  data: DistributionData[];
}

export const RealLifeExample: React.FC<Props> = ({ n, p, stats, data }) => {
  // 根据概率 p 选择不同的生活场景
  const getScenario = (p: number) => {
    // 替换原有的彩票案例，改为更严谨的工业质检（次品率）
    if (p < 0.05) return {
      icon: '⚙️',
      title: '工业质检',
      desc: '假设某批次产品的次品率仅为',
      action: '个零件抽检',
      success: '发现次品'
    };
    if (p < 0.20) return {
      icon: '🎮',
      title: '游戏抽卡',
      desc: '假设某款游戏中抽出SSR稀有角色的概率是',
      action: '次抽卡',
      success: '抽出SSR'
    };
    if (p < 0.45) return {
      icon: '🏀',
      title: '三分投篮',
      desc: '假设一名篮球射手的三分球命中率是',
      action: '次出手',
      success: '投进'
    };
    if (p < 0.60) return {
      icon: '🪙',
      title: '抛硬币',
      desc: '假设抛掷一枚质地不均匀的硬币，正面朝上的概率是',
      action: '次抛掷',
      success: '正面朝上'
    };
    if (p < 0.85) return {
      icon: '🎯',
      title: '罚球练习',
      desc: '假设你的篮球罚球命中率稳定在',
      action: '次罚球',
      success: '罚中'
    };
    if (p < 0.98) return {
      icon: '📦',
      title: '快递服务',
      desc: '假设某快递公司包裹准时送达的概率是',
      action: '个包裹',
      success: '准时送达'
    };
     return {
      icon: '🏭',
      title: '产品质检',
      desc: '假设某生产线产出合格品的概率高达',
      action: '个零件',
      success: '合格'
    };
  };

  const scenario = getScenario(p);
  
  // 获取众数
  const modeVal = Array.isArray(stats.mode) ? stats.mode[0] : stats.mode;
  const modeStr = Array.isArray(stats.mode) 
    ? `${stats.mode[0]} 或 ${stats.mode[1]}` 
    : stats.mode.toString();

  // 查找众数对应的概率值
  // 即使是双峰，两个峰值的概率也是相等的，取第一个即可
  const modeProb = data.find(d => d.k === modeVal)?.prob || 0;
  const modeProbPercent = (modeProb * 100).toFixed(2);

  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 shadow-sm flex flex-col gap-3 transition-all duration-300">
        <div className="flex items-center gap-2 border-b border-indigo-200 pb-2">
            <span className="text-2xl">{scenario.icon}</span>
            <h3 className="font-bold text-indigo-900 text-base">生活化例题：{scenario.title}</h3>
        </div>
        
        <div className="text-sm text-indigo-900 leading-relaxed">
            <p className="mb-2">
                {scenario.desc} <span className="font-mono font-bold text-white bg-indigo-500 px-1.5 py-0.5 rounded text-xs">{p.toFixed(2)}</span>。
            </p>
            <p>
                如果你进行了 <span className="font-mono font-bold text-white bg-indigo-500 px-1.5 py-0.5 rounded text-xs">{n}</span> {scenario.action}，
                最有可能<strong>{scenario.success}</strong> {modeStr} 次。
            </p>
        </div>

        <div className="bg-white p-3 rounded-lg border border-indigo-100 text-sm text-slate-600 shadow-sm">
            <div className="flex items-center justify-between mb-1">
                <span className="font-medium">💡 概率最大的结果：</span>
                <span className="text-indigo-600 font-bold text-lg">{modeStr} 次</span>
            </div>
            <div className="text-xs text-slate-400 text-right">
                (该结果发生的概率约为 {modeProbPercent}%)
            </div>
        </div>
    </div>
  );
};
