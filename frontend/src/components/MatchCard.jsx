import React from 'react';
import { Clock } from 'lucide-react';

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    month:   'short',
    day:     'numeric',
    hour:    '2-digit',
    minute:  '2-digit'
  });
}

export default function MatchCard({ match }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">{match.competition}</span>
        <span className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${match.status === 'SCHEDULED' ? 'bg-blue-100 text-blue-800' :
           match.status === 'LIVE'      ? 'bg-red-100 text-red-800' :
                                          'bg-gray-100 text-gray-800'}
        `}>
          {match.status}
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {match.homeTeamCrest && (
            <img src={match.homeTeamCrest} alt="" className="w-8 h-8" />
          )}
          <span className="font-semibold text-gray-900">{match.homeTeam}</span>
        </div>

        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">VS</div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="font-semibold text-gray-900">{match.awayTeam}</span>
          {match.awayTeamCrest && (
            <img src={match.awayTeamCrest} alt="" className="w-8 h-8" />
          )}
        </div>
      </div>

      <div className="text-center text-sm text-gray-600">
        <Clock className="inline w-4 h-4 mr-1" />
        {formatDate(match.date)}
      </div>
    </div>
  );
}
