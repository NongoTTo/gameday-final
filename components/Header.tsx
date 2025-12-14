import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSearchClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-brand-dark text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center space-x-2">
          <div className="flex flex-col items-center justify-center bg-transparent">
            <h1 className="text-3xl font-bold tracking-tighter text-brand-yellow">GD</h1>
            <span className="text-[10px] tracking-widest -mt-2 text-white">GAMEDAY</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className="text-brand-yellow hover:text-white transition">หน้าแรก</Link>
          <Link to="/trending" className="hover:text-brand-yellow transition">กำลังฮิต</Link>
          <Link to="/news" className="hover:text-brand-yellow transition">ข่าวเกม</Link>
          
          {/* 👇 เพิ่มเมนูใหม่ตรงนี้ครับ */}
          <Link to="/review" className="hover:text-brand-yellow transition">รีวิวเกม</Link>
          
          <Link to="/mobile" className="hover:text-brand-yellow transition">#เกมมือถือ</Link>
          <Link to="/codes" className="hover:text-brand-yellow transition">#รวมโค้ดเกม</Link>
        </nav>

        {/* Tools */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={onSearchClick}
            className="hover:text-brand-yellow transition p-2"
            aria-label="AI Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
          <button className="hover:text-brand-yellow transition p-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-800 p-4 space-y-3 text-sm">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-brand-yellow">หน้าแรก</Link>
          <Link to="/trending" onClick={() => setIsMenuOpen(false)} className="block text-white">กำลังฮิต</Link>
          <Link to="/news" onClick={() => setIsMenuOpen(false)} className="block text-white">ข่าวเกม</Link>
          
          {/* 👇 เพิ่มเมนูมือถือด้วยครับ */}
          <Link to="/review" onClick={() => setIsMenuOpen(false)} className="block text-white">รีวิวเกม</Link>
          
          <Link to="/mobile" onClick={() => setIsMenuOpen(false)} className="block text-white">#เกมมือถือ</Link>
          <Link to="/codes" onClick={() => setIsMenuOpen(false)} className="block text-white">#รวมโค้ดเกม</Link>
        </div>
      )}
    </header>
  );
};

export default Header;