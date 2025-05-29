import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function ApiNavCard({ endpointObj, isActive, onClick }) {
  const IconComponent = endpointObj.icon;

  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer 
        rounded-xl 
        p-6 
        transition-all 
        duration-200 
        hover:scale-105 
        ${isActive 
          ? 'bg-white shadow-lg ring-2 ring-blue-500 ring-opacity-50' 
          : 'bg-white hover:shadow-md'}
      `}
    >
      <div className="flex items-center space-x-4">
        <div className={`${endpointObj.color} p-3 rounded-lg`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{endpointObj.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{endpointObj.description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
}
