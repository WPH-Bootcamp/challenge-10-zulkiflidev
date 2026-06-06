import React from 'react';

import { Button } from '@/components/ui/button';

interface OrderTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function OrderTabs({ activeTab, onTabChange }: OrderTabsProps) {

  return (

    <div className="flex gap-4 mb-8">

      <Button
        variant={activeTab === 'done' ? 'default' : 'outline'}
        onClick={() => onTabChange('done')}
        className={`rounded-full px-8 py-5 font-bold ${
        
          activeTab === 'done' 
            ? 'bg-primary-100 text-white shadow-md shadow-primary-100/20' 
            : 'bg-white border-gray-200 text-gray-500 hover:text-primary-100'
        
        }`}
      
      >

        Completed

      </Button>


      <Button
        variant={activeTab === 'process' ? 'default' : 'outline'}
        onClick={() => onTabChange('process')}
        className={`rounded-full px-8 py-5 font-bold ${
          activeTab === 'process' 
            ? 'bg-primary-100 text-white shadow-md shadow-primary-100/20' 
            : 'bg-white border-gray-200 text-gray-500 hover:text-primary-100'
        }`}
      >

        In Progress
      
      </Button>


    </div>
  );
}
