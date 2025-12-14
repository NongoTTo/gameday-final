import React from 'react';
import { Link } from 'react-router-dom'; // 1. เพิ่มบรรทัดนี้ด้านบนสุด

const Sidebar: React.FC = () => {
  return (
    <aside className="space-y-6">

      {/* 2. เปลี่ยน <div ...> เป็น <Link to="/article/s1" ...> */}
      <Link 
        to="/article/s1" 
        className="block bg-gray-800 rounded-lg overflow-hidden shadow-md aspect-[4/5] relative group cursor-pointer"
      >
        <img 
          src="https://media.online-station.net/images/2025/11/413097cbc803545eb7a3c44d0bce0b19.jpg" 
          alt="Ad" 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
        />
        <div className="absolute bottom-0 w-full bg-black/70 p-4">
           <h4 className="text-brand-yellow font-bold text-center">Teamfight Tactics พาเหล่า Little Legends...</h4>
        </div>
      </Link> {/* 3. อย่าลืมเปลี่ยนแท็กปิดเป็น </Link> ด้วย */}
      
    </aside>
  );
};

export default Sidebar;