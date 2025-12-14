import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FEATURED_ARTICLE, TRENDING_ARTICLES } from '../constants';

const ArticlePage = () => {
  const { id } = useParams(); // รับค่า id จาก URL

  const allArticles = [FEATURED_ARTICLE, ...TRENDING_ARTICLES];
  const article = allArticles.find(item => item.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">ไม่พบข่าวนะจ๊ะ</h2>
        <Link to="/" className="bg-brand-yellow text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-400 transition">
          กลับหน้าแรก
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ปุ่มย้อนกลับ */}
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-brand-yellow mb-6 transition">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        ย้อนกลับไปหน้าแรก
      </Link>

      <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="w-full h-[300px] md:h-[500px]">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6 md:p-10">
          <div className="flex items-center space-x-3 text-sm mb-6">
            <span className="bg-brand-yellow text-black px-3 py-1 rounded font-bold text-xs uppercase tracking-wider">
              {article.category || 'NEWS'}
            </span>
            {article.date && <span className="text-gray-400">• {article.date}</span>}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            {article.title}
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {/* ส่วนหัวข้อรอง (Excerpt) */}
            <p className="font-semibold text-xl mb-6 text-gray-800 border-l-4 border-brand-yellow pl-4">
              {article.excerpt}
            </p>
            
            {/* เนื้อหาข่าว (Content) */}
            <div className="whitespace-pre-line text-lg">
               {article.content ? article.content : (
                 <p className="text-gray-400 italic">
                   (ยังไม่มีรายละเอียดเนื้อหาสำหรับข่าวนี้)
                 </p>
               )}
            </div>

            {/* --- แก้ไขตรงนี้: ดึง Summary มาแสดงจริง --- */}
            {article.summary && article.summary.length > 0 && (
              <div className="bg-gray-50 p-6 rounded-lg my-8 border border-gray-200">
                <h3 className="font-bold text-lg mb-3 text-gray-900">
                   📌 สรุปประเด็นสำคัญ:
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {article.summary.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
      </article>

      <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-gray-200">
         <h3 className="text-2xl font-bold mb-6">ข่าวอื่นๆ ที่น่าสนใจ</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRENDING_ARTICLES.filter(a => a.id !== article.id).slice(0, 2).map(other => (
                <Link key={other.id} to={`/article/${other.id}`} className="flex gap-4 group">
                    <img src={other.image} className="w-24 h-24 object-cover rounded-lg" alt={other.title}/>
                    <div>
                        <h4 className="font-bold group-hover:text-brand-yellow transition line-clamp-2">{other.title}</h4>
                        <span className="text-sm text-gray-500">{other.date}</span>
                    </div>
                </Link>
            ))}
         </div>
      </div>
    </div>
  );
};

export default ArticlePage;