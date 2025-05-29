import React from 'react';

export default function StandingRow({ teamEntry, index }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-4">
        <span className={`
          w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
          ${index < 4  ? 'bg-green-100 text-green-800' :
           index < 6  ? 'bg-blue-100 text-blue-800'  :
           index > 16 ? 'bg-red-100 text-red-800'    :
                        'bg-gray-100 text-gray-800'}
        `}>
          {teamEntry.position}
        </span>
        {teamEntry.team?.crest && (
          <img src={teamEntry.team.crest} alt="" className="w-6 h-6" />
        )}
        <span className="font-medium">{teamEntry.team?.name}</span>
      </div>

      <div className="flex space-x-6 text-sm text-gray-600">
        <span className="w-8 text-center">{teamEntry.playedGames}</span>
        <span className="w-8 text-center font-semibold text-green-600">{teamEntry.won}</span>
        <span className="w-8 text-center text-yellow-600">{teamEntry.draw}</span>
        <span className="w-8 text-center text-red-600">{teamEntry.lost}</span>
        <span className="w-12 text-center font-bold">{teamEntry.points}</span>
      </div>
    </div>
  );
}
