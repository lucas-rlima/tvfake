const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let state = {
  power: true,
  volume: 20,
  channel: 5,
};

let activeToken = null;

// Pareamento
app.post("/pair", (req, res) => {
  const { code } = req.body;
  if (!code || code.length !== 6) {
    return res.json({ success: false, message: "Código inválido" });
  }

  activeToken = "token123";
  console.log("📺 TV PAREADA");
  res.json({ success: true, token: activeToken });
});

// Enviar comandos
app.post("/command", (req, res) => {
  const { token, command } = req.body;

  if (token !== activeToken) {
    return res.json({ success: false, message: "Token inválido" });
  }

  switch (command) {
    case "power-toggle":
      state.power = !state.power;
      break;
    case "volume-up":
      state.volume++;
      break;
    case "volume-down":
      state.volume--;
      break;
    case "channel-up":
      state.channel++;
      break;
    case "channel-down":
      state.channel--;
      break;
  }

  console.log("▶️ Comando recebido:", command, "Estado atual:", state);
  res.json({ success: true, state });
});

// Estado da TV
app.get("/state", (req, res) => {
  res.json(state);
});

// Rota opcional para testar
app.get("/", (req, res) => {
  res.send("Servidor TV Fake Online ✔");
});

// Porta do Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta", PORT));
