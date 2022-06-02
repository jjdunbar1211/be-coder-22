import express from "../services/express.js";


const loginRouter = express.Router();

let admin = false;

loginRouter.get("/login", (req, res) => {
    if (admin !== true) {
        admin = true;
    }
    res.send(`Logueado como: ${admin ? 'ADMINISTRADOR' : 'USUARIO'}`);
});

loginRouter.get("/logout", (req, res) => {
    if (admin === true) {
        admin = false;
    }
    res.send(`Logueado como: ${admin ? 'ADMINISTRADOR' : 'USUARIO'}`);
});

loginRouter.get("/isLogin", (req, res) => {
    res.send(`Logueado como: ${admin ? 'ADMINISTRADOR' : 'USUARIO'}`);
});

export { loginRouter, admin };