import { fileURLToPath } from "url";
import { dirname } from "path";


const filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(filename);

export const authMiddleware = (req, res, next) => {
  if (!req.auth) {
    res.status(403).send({ error: -1, descripcion: `ruta ${req.originalUrl}, método ${req.method} NO AUTORIZADA` });
  } else {
    next();
  }
};

export const returnMessage = (isError, message, payload) => {
  if (payload) {
    return { status: isError ? "error" : "success", message, payload };
  } else {
    return { status: isError ? "error" : "success", message }
  }
}