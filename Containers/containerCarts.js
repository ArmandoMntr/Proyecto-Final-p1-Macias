const fs = require("fs");
const Timestamp = require("../utils/timestamp");

const timestamp = new Timestamp();
class ContenedorCarritos {
    constructor(fileName) {
        this.fileName = `db/${fileName}.txt`;
    }

    //MOSTRAR TODOS LOS CARRITOS
    async getAll() {
        try {
            let getCarts = await fs.promises.readFile(
                `${this.fileName}`,
                "utf-8"
            );

            return JSON.parse(getCarts);
        } catch (err) {
            console.log(`error al leer los carritos: ${err}`);
            return [];
        }
    }
    //GUARDAR EL CARRITO CREADO
    async save(data) {
        try {
            let carrito = await this.getAll();

            let id = 1;
            let productos = [];
            if (carrito.length > 0) {
                id = carrito[carrito.length - 1].id + 1;
            }

            carrito.push({
                id: id,
                timestamp: timestamp.dateTime,
                ...data,
                productos: productos,
            });

            await fs.promises.writeFile(
                `${this.fileName}`,
                JSON.stringify(carrito, null, 2)
            );
            console.log(
                ` Carrito con ID: ${id} generado de forma satisfactoria`
            );
            return id;
        } catch (error) {
            console.log(`Se ha encontrado el siguiente error: ${error}`);
        }
    }

    //MUESTRA LOS PRODUCTOS DE DICHO CARRITO

    async getById(id) {
        try {
            const array = await fs.promises.readFile(
                `${this.fileName}`,
                "utf-8"
            );

            const array3 = JSON.parse(array);
            console.log(array3);
            const array2 = array3.filter(
                (elemento) => elemento.id === Number(id)
            )[0] || {
                error: `No se ha encontrado ningún artículo con el código ${id} `,
            };

            return array2.productos;
        } catch (error) {
            console.log(`Error al buscar elemento por ID. ${error}`);
        }
    }

    //ELIMINAR PRODUCTO DE DICHO CARRITO

    async deleteById(id, idProd) {
        const idCart = await this.getAll();
        const index = idCart.findIndex((o) => o.id === Number(id));
        if (index == -1) {
            throw new Error(
                `Error al borrar: no se encontró el carrito id ${id}`
            );
        }

        const prodToDel = idCart[index].productos;
        const index2 = prodToDel.findIndex((o) => o.id === Number(idProd));
        if (index2 == -1) {
            throw new Error(
                `Error al borrar: no se encontró el Producto con id: ${idProd}`
            );
        }
        prodToDel.splice(index2, 1);

        try {
            fs.promises.writeFile(
                this.fileName,
                JSON.stringify(idCart, null, 2)
            );
            console.log(`Se ha eliminado el producto correctamente`);
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`);
        }
    }
    //ELIMINAR UN CARRITO SEGUN ID
    async deleteCartById(id) {
        const idCart = await this.getAll();
        const index = idCart.findIndex((o) => o.id === Number(id));
        if (index == -1) {
            throw new Error(
                `Error al borrar: no se encontró el carrito id ${id}`
            );
        }
        idCart.splice(index, 1);

        try {
            fs.promises.writeFile(
                this.fileName,
                JSON.stringify(idCart, null, 2)
            );
            console.log(`Se ha eliminado el carrito correctamente`);
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`);
        }
    }

    //AGREGAR PRODUCTO A UN CARRITO SEGUN ID
    async addProdToCartById(id, body) {
        const idCart = await this.getAll();
        console.log(`IdCart = ${idCart}`);
        const index = idCart.findIndex((o) => o.id === Number(id));
        console.log(`index = ${index}`);
        if (index == -1) {
            throw new Error(
                `Error al borrar: no se encontró el carrito id ${id}`
            );
        }

        const prodToFind = idCart[index];
        console.log(prodToFind);
        let getProds = await fs.promises.readFile(`db/productos.txt`, "utf-8");
        const arrayProds = JSON.parse(getProds);
        const index2 = arrayProds.findIndex((o) => o.id === Number(body));
        if (index2 == -1) {
            throw new Error(
                `Error al intentar añadir. No se encontró el Producto con id: ${body}`
            );
        }
        const prodToAdd = arrayProds[index2];
        console.log(`PRODTOADD : ${prodToAdd.productos}`);
        console.log(`PRODTOFIND.productos : ${prodToFind.productos}`);
        prodToFind.productos.push(prodToAdd);

        try {
            fs.promises.writeFile(
                this.fileName,
                JSON.stringify(idCart, null, 2)
            );
            console.log(
                `Se ha añadido el producto de id ${body} correctamente al carrito con id ${id}`
            );
        } catch (error) {
            throw new Error(`Error al añadir: ${error}`);
        }
    }
}
module.exports = ContenedorCarritos;
