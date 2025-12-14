import { GoogleGenAI } from "@google/genai";

// Fix: Initialize GoogleGenAI directly with process.env.API_KEY as per guidelines.
// Assume process.env.API_KEY is pre-configured and valid.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const searchGameInfo = async (query: string): Promise<string> => {
  // Fix: Removed the explicit API key check as per guidelines
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a helpful gaming news assistant for a website called GameMonday. 
      The user is searching for: "${query}". 
      Provide a short, engaging summary or news snippet about this topic in Thai language (max 100 words).`,
    });
    
    // Fix: Access response.text property directly
    return response.text || "ขออภัย ไม่พบข้อมูลเกี่ยวกับเรื่องนี้";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI";
  }
};