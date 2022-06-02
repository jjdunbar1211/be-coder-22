import express from "../services/express.js";
import ProductContainer from "../classes/ProductContainer.js";
import { __dirname, authMiddleware } from "../utils.js";


const router = express.Router();
const productContainer = new ProductContainer(__dirname + "/data/products.txt");

// admin y usuarios
router.get("/", async (req, res) => {
  const result = await productContainer.getAll();
  res.json(result);
});

// admin y usuarios
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await productContainer.getById(id);
  res.json(result);
});

// admin
router.post("/", authMiddleware, async (req, res) => {
  const product = req.body;
  const result = await productContainer.save(product);
  res.json(result);
});

//admin
router.put("/:id", authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id);
  const product = req.body;
  const result = await productContainer.updateById(id, product);
  res.json(result);
});

//admin
router.delete("/:id", authMiddleware, async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await productContainer.deleteById(id);
  res.json(result);
});

export default router;
