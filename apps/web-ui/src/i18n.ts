import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "app": {
        "title": "MetaHarness",
        "studio": "Studio",
        "tour": "Tour",
        "client_side": "100% client-side",
        "subtitle": "Turn any GitHub repo — or a blank slate — into a governed, branded, multi-host AI agent gemini. Recommend agents, skills, commands, MCP tools, and policy; emit a signed-ready, npm-publishable runtime. No backend, no install.",
        "features": {
          "score": { "title": "Score any repo", "desc": "gemini fit · $/run · scaffold-ready" },
          "routing": { "title": "Cost-optimal routing", "desc": "cheap model, frontier quality" },
          "security": { "title": "Default-deny tools", "desc": "auditable · witness-signed" }
        },
        "tabs": {
          "repo": "Repo → Gemini",
          "gemini": "Create gemini",
          "artifact": "Skill / Agent / Command",
          "verify": "Verify"
        },
        "footer": {
          "tagline": "Embeddings recommend · rules generate · tests prove."
        }
      }
    }
  },
  th: {
    translation: {
      "app": {
        "title": "MetaHarness",
        "studio": "สตูดิโอ",
        "tour": "แนะนำ",
        "client_side": "ฝั่งไคลเอนต์ 100%",
        "subtitle": "เปลี่ยน GitHub repo หรือโปรเจกต์เปล่า ให้เป็น AI agent gemini ที่มีการจัดการ แบรนดิ้ง และรองรับหลายโฮสต์ แนะนำ agent, skill, command, MCP tool และ policy; พร้อมสร้าง runtime สำหรับเผยแพร่ขึ้น npm ได้ทันที ไม่มีเบื้องหลัง ไม่ต้องติดตั้ง",
        "features": {
          "score": { "title": "ให้คะแนน repo", "desc": "ความเหมาะสม · ราคา/รัน · พร้อม scaffold" },
          "routing": { "title": "หาเราท์เตอร์ที่คุ้มค่า", "desc": "โมเดลราคาถูก, คุณภาพระดับแนวหน้า" },
          "security": { "title": "ปฏิเสธ tool เริ่มต้น", "desc": "ตรวจสอบได้ · ลงลายเซ็นต์พยาน" }
        },
        "tabs": {
          "repo": "Repo → Gemini",
          "gemini": "สร้าง gemini",
          "artifact": "Skill / Agent / Command",
          "verify": "ยืนยัน"
        },
        "footer": {
          "tagline": "Embeddings ช่วยแนะนำ · rules สร้างสรรค์ · tests พิสูจน์"
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
