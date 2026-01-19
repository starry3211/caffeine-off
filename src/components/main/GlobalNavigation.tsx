import React from 'react';
import { BiSearch, BiUser } from 'react-icons/bi';
import './GlobalNavigation.css';

const GlobalNavigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`gnb ${isScrolled ? 'scrolled' : ''}`}>
      <div className="gnb-logo">Caffeine Off</div>
      <div className="gnb-actions">
        <button aria-label="Search" className="icon-btn">
          <BiSearch size={24} color="#10353A" />
        </button>
        <button aria-label="My Profile" className="icon-btn">
          <BiUser size={24} color="#10353A" />
        </button>
      </div>
    </nav>
  );
};

export default GlobalNavigation;
