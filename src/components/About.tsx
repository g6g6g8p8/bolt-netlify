import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, X as CloseIcon } from 'lucide-react';
import { useAbout } from '../hooks/useAbout';
import CloseButton from './CloseButton';

const About = () => {
  const { about, loading } = useAbout();

  return (
    <div className="about-page p-6">
      <Link
        to="/"
        className="fixed top-8 right-8 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-black text-foreground hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
      >
        <CloseIcon size={20} />
      </Link>
      <div className="lg:hidden flex items-center justify-between mb-8">
        <Link to="/" className="text-title-2">
          Giulio Pinotti
        </Link>
        <Link
          to="/about"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-border/10 hover:bg-border/20 transition-colors"
        >
          <UserCircle size={24} className="opacity-60" />
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-4">About</h1>
      <p className="mb-4">
        {/* Conteúdo da página About */}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
      </p>
      <div className="prose">
        {loading ? (
          <p className="text-body">Loading...</p>
        ) : about ? (
          <div dangerouslySetInnerHTML={{ __html: about.content.replace(/\n/g, '<br />') }} />
        ) : (
          <p className="text-body">No content found.</p>
        )}
      </div>
      <CloseButton />
    </div>
  );
};

export default About;
