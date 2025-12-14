import React, { useState } from 'react';
import { searchGameInfo } from '../services/geminiService';
import { GeminiStatus } from '../types';

interface GeminiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GeminiModal: React.FC<GeminiModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [status, setStatus] = useState<GeminiStatus>(GeminiStatus.IDLE);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setStatus(GeminiStatus.LOADING);
    const answer = await searchGameInfo(query);
    setResult(answer);
    setStatus(GeminiStatus.SUCCESS);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-zinc-700">
        <div className="p-4 bg-gradient-to-r from-brand-dark to-zinc-900 border-b border-zinc-700 flex justify-between items-center">
          <div className="flex items-center space-x-2">
             <span className="text-brand-yellow text-xl">✨</span>
             <h3 className="text-white font-bold">GameDay Assistant</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ถามเกี่ยวกับเกม (e.g. ข่าว Elden Ring ล่าสุด)..."
                className="w-full pl-4 pr-12 py-3 bg-gray-100 dark:bg-zinc-800 border-none rounded-lg focus:ring-2 focus:ring-brand-yellow text-gray-800 dark:text-white"
              />
              <button 
                type="submit"
                disabled={status === GeminiStatus.LOADING}
                className="absolute right-2 top-2 p-1.5 bg-brand-yellow text-black rounded-md hover:bg-yellow-400 transition disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </button>
            </div>
          </form>

          <div className="min-h-[150px] bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-4">
            {status === GeminiStatus.IDLE && (
              <p className="text-gray-400 text-center mt-8 text-sm">พิมพ์ชื่อเกมหรือหัวข้อที่อยากรู้</p>
            )}
            {status === GeminiStatus.LOADING && (
              <div className="flex flex-col items-center justify-center mt-8 space-y-2">
                <div className="w-6 h-6 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs text-gray-500">กำลังประมวลผลด้วย Gemini...</p>
              </div>
            )}
            {status === GeminiStatus.SUCCESS && (
              <div className="prose prose-sm dark:prose-invert">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{result}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiModal;