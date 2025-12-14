import React from 'react';
import { Link } from 'react-router-dom'; // 1. นำเข้า Link
import { Article } from '../types';

interface FeaturedPostProps {
  article: Article;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ article }) => {
  // ป้องกันกรณีข้อมูลไม่มี id ให้ใส่ค่า default ไว้ก่อน (กัน Error)
  // แต่ทางที่ดีในไฟล์ types.ts และ constants.ts ควรมี id นะครับ
  const articleId = article.id || '1';

  return (
    // 2. เปลี่ยนจาก <div> เป็น <Link> และใส่ to="..."
    // ใส่ className="block" เพื่อให้ครอบคลุมพื้นที่ทั้งหมดเหมือนเดิม
    <Link to={`/article/${articleId}`} className="block mb-8 group cursor-pointer">
      
      <div className="relative overflow-hidden rounded-lg shadow-md aspect-video">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4 right-4">
           <span className="bg-brand-yellow text-black text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
             FEATURED
           </span>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mt-4 text-gray-800 group-hover:text-brand-yellow transition leading-tight">
        {article.title}
      </h2>
      <p className="text-gray-500 mt-2 text-sm">{article.excerpt}</p>
      
    </Link>
  );
};

export default FeaturedPost;