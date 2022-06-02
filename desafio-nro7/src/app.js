import { app } from "./services/express.js";
import cors from "cors";
import productRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import { loginRouter, admin } from "./routes/login.js"
import express from "./services/express.js";
import { __dirname } from "./utils.js";


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.auth = admin;
  next();
});

app.use("/api", loginRouter);
app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);

app.use((req, res) => {
  res.json({ error: -2, descripcion: `ruta ${req.originalUrl}, método ${req.method} NO IMPLEMENTADA` });
});

