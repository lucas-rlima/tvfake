const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let lastCommand = null;
let paired = false;

// Rota de pareamento
app.post("/pair", (req, res) => {
  paired = true;
  console.log("TV PAREADA");
  res.json({ success: true, message: "TV pareada com sucesso" });
});

// Enviar comando para a TV
app.post("/command", (req, res) => {
  if (!paired) return res.status(400).json({ error: "TV não está pareada" });

  const { command } = req.body;
  lastCommand = command;

  console.log("Comando recebido:", command);

  res.json({ success: true });
});

// TV busca o último comando
app.get("/state", (req, res) => {
  res.json({ command: lastCommand });
  lastCommand = null; // limpa depois de enviado
});

// Porta do Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta", PORT));
