import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AddBannerPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // สร้างตัวแปรเก็บค่าจากฟอร์ม
  const [formData, setFormData] = useState({
    title: '',
    image: '', // รับเป็น URL รูปภาพ (เช่น ก๊อปมาจากเว็บอื่น หรือฝากรูปไว้ที่อื่น)
    category: '',
    excerpt: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.image) {
      alert("กรุณากรอกชื่อเรื่องและลิงก์รูปภาพ");
      return;
    }

    setLoading(true);

    try {
      // บันทึกลง Firebase (Collection 'articles')
      await addDoc(collection(db, "articles"), {
        ...formData,
        date: new Date().toLocaleDateString('th-TH'), // ใส่วันที่ปัจจุบัน
        type: 'banner' // ระบุว่าเป็นแบนเนอร์ (เผื่อเอาไปใช้แยกประเภท)
      });

      alert("✅ เพิ่ม Banner สำเร็จเรียบร้อย!");
      navigate('/'); // บันทึกเสร็จให้เด้งกลับหน้าแรก
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("❌ เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">เพิ่ม Banner ใหม่</h2>
          <p className="mt-2 text-sm text-gray-600">กรอกข้อมูลเพื่อนำไปแสดงบน Slider หน้าแรก</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* 1. ชื่อเรื่อง */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อเรื่อง (Title)</label>
              <input
                name="title"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow sm:text-sm"
                placeholder="เช่น เปิดตัวเกมใหม่..."
                onChange={handleChange}
              />
            </div>

            {/* 2. หมวดหมู่ */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">หมวดหมู่ (Category)</label>
              <input
                name="category"
                type="text"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow sm:text-sm"
                placeholder="เช่น PR / REVIEW / MOBILE"
                onChange={handleChange}
              />
            </div>

            {/* 3. ลิงก์รูปภาพ */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">ลิงก์รูปภาพ (Image URL)</label>
              <input
                name="image"
                type="url"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow sm:text-sm"
                placeholder="https://..."
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-1">*ใส่เป็น Link รูปภาพ (คลิกขวา Copy Image Address จากเว็บอื่นมาลองก่อนได้)</p>
            </div>

            {/* 4. เนื้อหาย่อ */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">เนื้อหาย่อ (Excerpt)</label>
              <textarea
                name="excerpt"
                rows={3}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow sm:text-sm"
                placeholder="รายละเอียดสั้นๆ..."
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-brand-dark hover:bg-black'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow transition`}
            >
              {loading ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBannerPage;