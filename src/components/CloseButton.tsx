import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CloseButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className="flex items-center text-red-500 hover:text-red-700 transition-colors"
    >
      <ArrowRight className="mr-2" />
      Fechar
    </button>
  );
};

export default CloseButton;