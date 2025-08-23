import React from 'react';

const InfoCard = ({ title, value, label, icone}) => {
  return (
    <div className='bg-[#242424] p-4 rounded-lg flex flex-col items-start justify-center text-white'>
      <div className='text-sm text-gray-400 mb-2'></div>
      {title}

      <div className='flex iterms-end'>
        <div className='text-3xl front-bold mr-2'>
          {value}
        </div>
      
      {label &&  (
        <div className='text-sm text-gray-400'>
          {label}
        </div>
      )}
      </div>
      {icone && (
        <div className='mt-2'>
          <img src="{icon}" alt={`${title} icon`} className='w-10 h-10' />
        </div>
      )}
    </div>
    
  );
};

export default InfoCard;