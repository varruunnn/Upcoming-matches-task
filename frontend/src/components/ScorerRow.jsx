import React from 'react';
import { Target } from 'lucide-react';

export default function ScorerRow({ scorer, index }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-4">
        <span className={`
          w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
          ${index === 0  ? 'bg-yellow-100 text-yellow-800' :
           index < 3   ? 'bg-gray-100 text-gray-800' :
                         'bg-blue-50 text-blue-600'}
        `}>
          {index + 1}
        </span>
        <div>
          <div className="font-medium">{scorer.player?.name}</div>
          <div className="text-sm text-gray-600">{scorer.team?.name}</div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Target className="w-4 h-4 text-green-600" />
        <span className="font-bold text-lg">{scorer.goals || scorer.numberOfGoals}</span>
      </div>
    </div>
  );
}
