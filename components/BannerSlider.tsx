import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// กำหนดหน้าตาข้อมูลข่าวที่จะรับมา
interface Article {
  id: string;
  title: string;
  image: string;
  excerpt?: string;
  category?: string;
}

interface BannerSliderProps {
  articles: Article[]; // รับเป็น "รายการ" ข่าวหลายๆ อัน
}

const BannerSlider: React.FC<BannerSliderProps> = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // สั่งให้เลื่อนอัตโนมัติทุก 5 วินาที
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer); // ล้างเวลาเมื่อเปลี่ยนหน้า
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  if (!articles || articles.length === 0) return null;

  return (
    <div className="relative w-full h-[350px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg group bg-gray-900">
      
      {/* ส่วนแสดงรูปภาพและเนื้อหา */}
      {articles.map((article, index) => (
        <div 
          key={article.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* รูปพื้นหลัง */}
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover opacity-80"
          />
          
          {/* เงาดำๆ ด้านล่างเพื่อให้ตัวหนังสืออ่านง่าย */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

          {/* ข้อความบนภาพ */}
          <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full max-w-3xl">
            {article.category && (
              <span className="inline-block bg-brand-yellow text-black px-3 py-1 rounded text-xs font-bold mb-3 uppercase tracking-wider">
                {article.category}
              </span>
            )}
            <Link to={`/article/${article.id}`}>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 hover:text-brand-yellow transition leading-tight drop-shadow-md">
                {article.title}
              </h2>
            </Link>
            <p className="text-gray-300 text-sm md:text-lg line-clamp-2 hidden md:block">
              {article.excerpt}
            </p>
          </div>
        </div>
      ))}

      {/* ปุ่มกดซ้าย-ขวา (จะโผล่เมื่อเอาเมาส์ชี้) */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-brand-yellow hover:text-black transition opacity-0 group-hover:opacity-100"
      >
        ❮
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-brand-yellow hover:text-black transition opacity-0 group-hover:opacity-100"
      >
        ❯
      </button>

      {/* จุดไข่ปลาบอกตำแหน่ง (Dots) */}
      <div className="absolute bottom-4 right-6 z-20 flex space-x-2">
        {articles.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-brand-yellow w-6' : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;