const express = require("express");
const routerProducts = express.Router();

const ContenedorProductos = require("../Containers/containerProds");
const productos = new ContenedorProductos("productos");

//VARIABLE ADMIN BOOLEAN QUE HACE DE SWITCH ENTRE USER/ADMIN
let admin = true;
// Router de los metodos para Productos.

//MUESTRA TODOS LOS PRODUCTOS

routerProducts.get("/productos", async function (req, res) {
    res.json(await productos.getAll());
});

//MUESTRA PRODUCTOS SEGUN EL ID
routerProducts.get("/productos/:id", async function (req, res) {
    const id = req.params.id;
    res.json(await productos.getById(id));
});

//AÑADE NUEVO PRODUCTO  (SOLO PARA ADMINISTRADORES)
routerProducts.post("/productos", async function (req, res) {
    if (admin === false) {
        res.send({
            error: "NO TIENES LOS PERMISOS PARA REALIZAR LA SIGUIENTE ACCION",
        });
    }
    res.json(await productos.save(req.body));
});

//ACTUALIZA UN PRODUCTO SEGUN SU ID (SOLO PARA ADMINISTRADORES)
routerProducts.put("/productos/:id", async function (req, res) {
    if (admin === false) {
        res.send({
            error: "NO TIENES LOS PERMISOS PARA REALIZAR LA SIGUIENTE ACCION",
        });
    }
    const id = req.params.id;
    res.json(await productos.updateById(id, req.body));
});

//ELIMINA UN PRODUCTO SEGUN SU ID (SOLO PARA ADMINISTRADORES)
routerProducts.delete("/productos/:id", async function (req, res) {
    if (admin === false) {
        res.send({
            error: "NO TIENES LOS PERMISOS PARA REALIZAR LA SIGUIENTE ACCION",
        });
    }
    const id = req.params.id;
    res.json(await productos.deleteById(id, req.body));
});

module.exports = routerProducts;
