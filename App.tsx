import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Firebase
import { db } from './firebase'; 
import { collection, getDocs } from 'firebase/firestore'; 

import { FEATURED_ARTICLE, TRENDING_ARTICLES } from './constants';

import Header from './components/Header';
import BannerSlider from './components/BannerSlider'; 
import TrendingSection from './components/TrendingSection';
import Sidebar from './components/Sidebar';
import GeminiModal from './components/GeminiModal';
import ArticlePage from './components/ArticlePage';

// 👇 1. อย่าลืม Import หน้านี้เข้ามาครับ (ถ้ายังไม่มีไฟล์นี้ ให้ไปสร้างก่อนนะครับ)
import AddBannerPage from './components/AddBannerPage'; 

const Home = () => {
  const [sliderArticles, setSliderArticles] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        console.log("📡 กำลังดึงข้อมูล Slider จาก Firebase...");
        const querySnapshot = await getDocs(collection(db, "articles"));
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        if (items.length > 0) {
          setSliderArticles(items);
        } else {
          setSliderArticles([FEATURED_ARTICLE, ...TRENDING_ARTICLES]);
        }
      } catch (error) {
        console.error("❌ Error:", error);
        setSliderArticles([FEATURED_ARTICLE, ...TRENDING_ARTICLES]);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderData();
  }, []);

  if (loading) {
    return <div className="h-screen flex items-center justify-center text-xl text-gray-500">⏳ กำลังโหลด Slider...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-2/3">
        <BannerSlider articles={sliderArticles} />
        <TrendingSection articles={TRENDING_ARTICLES} />
        <div className="mt-8 flex justify-center">
          <button className="bg-white border border-gray-300 text-gray-600 px-6 py-2 rounded-full hover:bg-brand-yellow hover:text-black hover:border-transparent transition shadow-sm font-medium text-sm">
            ดูข่าวทั้งหมด
          </button>
        </div>
      </div>
      <div className="lg:w-1/3"><Sidebar /></div>
    </div>
  );
};

const TrendingPage = () => <div className="text-center py-20 text-2xl">🔥 หน้ากำลังฮิต</div>;
const NewsPage = () => <div className="text-center py-20 text-2xl">📰 หน้าข่าวเกม</div>;
const MobileGamePage = () => <div className="text-center py-20 text-2xl">📱 หน้าเกมมือถือ</div>;
const ReviewPage = () => <div className="text-center py-20 text-2xl">⭐ หน้ารีวิวเกม (รออัปเดต)</div>;
const NotFound = () => <div className="text-center py-20 text-red-500 text-2xl">❌ ไม่พบหน้านี้ (404)</div>;

const App: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#F8F9FA] text-gray-900 font-sans">
        <Header onSearchClick={() => setIsSearchOpen(true)} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            
            {/* 👇 2. เพิ่ม Route สำหรับหน้า Admin ตรงนี้ครับ */}
            <Route path="/add-banner" element={<AddBannerPage />} />
            
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/mobile" element={<MobileGamePage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="bg-zinc-900 text-gray-400 py-12 mt-12 border-t border-zinc-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">GameDay</h2>
            <p className="text-xs">&copy; 2024 GameMonday. All rights reserved.</p>
          </div>
        </footer>
        <GeminiModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>
    </Router>
  );
};

export default App;