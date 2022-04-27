const express = require("express");
const app = express();

const routerProducts = require("./Routes/routesProducts");
const routerCarts = require("./Routes/routesCarts");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Usamos ruta API como base y luego añadidmos los Routers para productos y carritos
app.use("/api", routerProducts, routerCarts);

app.get("*", function (req, res) {
    res.send("Error 404 - Ruta incorrecta");
});
// Declaramos el puerto para Glitch, sino el 8080
const PORT = process.env.PORT || 8080;

// Levantamos el Servidor
const server = app.listen(PORT, () => {
    console.log(
        `El servidor HTTP en el puerto ${PORT} funcionando correctamente.`
    );
});

server.on("error", (error) => console.log(`Error en el servidor ${error}.`));
