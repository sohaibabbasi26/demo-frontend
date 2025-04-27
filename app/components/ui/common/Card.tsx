import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="bg-white  rounded-lg p-10 h-[50vh] w-80 lg:w-96 border border-[#B098E5]">
      {children}
    </div>
  );
};

export default Card;
