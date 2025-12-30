const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let messages = [];

// Enviar mensaje
app.post("/send", (req, res) => {
  const { from, to, msg } = req.body;

  if (!from || !to || !msg) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  messages.push({
    from,
    to,
    msg,
    time: Date.now()
  });

  res.json({ success: true });
});

// Obtener mensajes para un dispositivo
app.get("/messages/:id", (req, res) => {
  const id = req.params.id;
  const userMessages = messages.filter(m => m.to === id);
  messages = messages.filter(m => m.to !== id);
  res.json(userMessages);
});

// Test
app.get("/", (req, res) => {
  res.send("Servidor activo 🔥");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
