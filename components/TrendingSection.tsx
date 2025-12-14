import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Article } from '../types';

interface TrendingSectionProps {
  articles: Article[];
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ articles }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold border-l-4 border-brand-yellow pl-3">กำลังฮิต 🔥</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {articles.map((article) => (
          // ใช้ Link ครอบแทน div และส่ง id ไปที่ URL
          <Link 
            key={article.id} 
            to={`/article/${article.id}`} 
            className="flex gap-4 group cursor-pointer bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition border border-transparent hover:border-gray-100"
          >
            <div className="w-1/3 md:w-1/4 aspect-video overflow-hidden rounded-lg">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
              />
            </div>
            
            <div className="w-2/3 md:w-3/4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                   <span className="text-[10px] font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                     {article.category}
                   </span>
                   {article.date && <span className="text-xs text-gray-400">{article.date}</span>}
                </div>
                <h3 className="font-bold text-gray-900 leading-snug group-hover:text-brand-yellow transition line-clamp-2">
                  {article.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;