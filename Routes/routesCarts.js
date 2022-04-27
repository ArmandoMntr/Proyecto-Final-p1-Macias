const express = require("express");
const routerCarts = express.Router();

const ContenedorCarritos = require("../Containers/containerCarts");
const carritos = new ContenedorCarritos("carritos");

// Router utilizando los metodos para Carrito.

// CREA CARRITO NUEVO
routerCarts.post("/carrito", async function (req, res) {
    res.json(await carritos.save(req.body));
});

//MUESTRA CARRITOS EXISTENTES Y SU DETALLE
routerCarts.get("/carrito", async function (req, res) {
    res.json(await carritos.getAll());
});

//MUESTRA PRODUCTOS DE UN CARRITO SEGUN EL ID DEL CART
routerCarts.get("/carrito/:id/productos", async function (req, res) {
    const id = req.params.id;

    res.json(await carritos.getById(id));
});

// AÑADE PRODUCTOS AL CARRITO SEGUN ID
routerCarts.post("/carrito/:id/productos", async function (req, res) {
    const id = req.params.id;
    const body = req.body.id;
    // res.json(await carritos.save(id, req.body));
    res.json(await carritos.addProdToCartById(id, body));
});

//ELIMINA UN PRODUCTO DE UN CARRITO SEGUN SU ID
routerCarts.delete(
    "/carrito/:id/productos/:id_prod",
    async function (req, res) {
        const idProd = req.params.id_prod;
        const id = req.params.id;

        res.json(await carritos.deleteById(id, idProd));
    }
);

//ELIMINA UN CARRITO Y VACIA SU CONTENIDO

routerCarts.delete("/carrito/:id", async function (req, res) {
    const id = req.params.id;
    res.json(await carritos.deleteCartById(id));
});
module.exports = routerCarts;
