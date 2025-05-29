import React, { useState } from 'react';
import { Home, Search, RefreshCw } from 'lucide-react';

import { competitions } from './constants/competitions';
import { teams }        from './constants/teams';
import { getApiEndpoints } from './constants/apiEndpoints';

import useFetchData      from './hooks/useFetchData';
import ApiNavCard        from './components/ApiNavCard';
import Controls          from './components/Controls';
import MatchCard         from './components/MatchCard';
import StandingRow       from './components/StandingRow';
import ScorerRow         from './components/ScorerRow';

export default function App() {
  const [activeTab, setActiveTab] = useState('matches');
  const [selectedCompetition, setSelectedCompetition] = useState('PL');
  const [selectedTeam,        setSelectedTeam]        = useState('86');
  const [selectedStatus,      setSelectedStatus]      = useState('ALL');
  const [selectedMatchday,    setSelectedMatchday]    = useState('1');

  const { data, loading, error, fetchData } = useFetchData();
  const apiEndpoints = getApiEndpoints({
    selectedCompetition,
    selectedTeam,
    selectedStatus,
    selectedMatchday,
  });

  const currentEndpointObj = apiEndpoints.find((e) => e.id === activeTab);

  const handleCardClick = (endpointObj) => {
    setActiveTab(endpointObj.id);
    fetchData(endpointObj.endpoint);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Home className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Football Data</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Live Football Data</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {apiEndpoints.map((endpointObj) => (
            <ApiNavCard
              key={endpointObj.id}
              endpointObj={endpointObj}
              isActive={endpointObj.id === activeTab}
              onClick={() => handleCardClick(endpointObj)}
            />
          ))}
        </div>
        <Controls
          selectedCompetition={selectedCompetition}
          setSelectedCompetition={setSelectedCompetition}
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedMatchday={selectedMatchday}
          setSelectedMatchday={setSelectedMatchday}
          onFetch={() => currentEndpointObj && fetchData(currentEndpointObj.endpoint)}
          loading={loading}
        />
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {currentEndpointObj?.title || 'Results'}
            </h2>
            <span className="text-sm text-gray-500">
              {data.length} {' '}
              {activeTab === 'standings'
                ? 'teams'
                : activeTab === 'scorers'
                ? 'players'
                : 'matches'}
            </span>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-red-800 font-medium">Error:</span>
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
              <span className="ml-3 text-gray-600">Loading data...</span>
            </div>
          ) : data.length === 0 && !error ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                No data available. Try adjusting your filters or fetch data.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeTab === 'standings' ? (
                <div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4 text-sm font-medium text-gray-600">
                    <span>Team</span>
                    <div className="flex space-x-6">
                      <span className="w-8 text-center">GP</span>
                      <span className="w-8 text-center">W</span>
                      <span className="w-8 text-center">D</span>
                      <span className="w-8 text-center">L</span>
                      <span className="w-12 text-center">PTS</span>
                    </div>
                  </div>
                  {data.map((teamEntry, idx) => (
                    <StandingRow key={teamEntry.team?.id || idx} teamEntry={teamEntry} index={idx} />
                  ))}
                </div>
              ) : activeTab === 'scorers' ? (
                <div className="space-y-2">
                  {data.map((scorer, idx) => (
                    <ScorerRow key={scorer.player?.id || idx} scorer={scorer} index={idx} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {data.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
