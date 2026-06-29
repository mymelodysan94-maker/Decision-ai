import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

console.log("SERVER INICIOU");
console.log("CHAVE:", process.env.GEMINI_API_KEY ? "OK (carregada)" : "NÃO ENCONTRADA");

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
  console.log("📩 CHEGOU UMA REQUISIÇÃO! Mensagem recebida:", req.body.message);
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite"  });
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: req.body.message }]
        }
      ]
    });

    const text = result.response.text();

    res.json({ reply: text });

  } catch (err) {
    console.error("ERRO GEMINI:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});