const fs = require("fs");
const Timestamp = require("../utils/timestamp");

const timestamp = new Timestamp();
class ContenedorProductos {
    constructor(fileName) {
        this.fileName = `db/${fileName}.txt`;
    }

    async save(data) {
        try {
            let products = await this.getAll();

            let id = 1;
            if (products.length > 0) {
                id = products[products.length - 1].id + 1;
            }

            products.push({ id: id, timestamp: timestamp.dateTime, ...data });

            await fs.promises.writeFile(
                `${this.fileName}`,
                JSON.stringify(products, null, 2)
            );
            console.log(`Item de ID: ${id} generado de forma satisfactoria`);
            return id;
        } catch (error) {
            console.log(`Se ha encontrado el siguiente error: ${error}`);
        }
    }

    async updateById(id, data) {
        const array = await fs.promises.readFile(this.fileName);
        const array3 = JSON.parse(array);
        const current = array3.find((item) => item.id === Number(id));

        const currentIndex = array3.indexOf(current);

        array3[currentIndex] = { ...current, ...data };

        fs.promises.writeFile(this.fileName, JSON.stringify(array3, null, 2));

        return array3[currentIndex];
    }

    async getById(id) {
        try {
            const array = await fs.promises.readFile(`${this.fileName}`);

            const array3 = JSON.parse(array);

            const array2 = array3.filter(
                (elemento) => elemento.id === Number(id)
            )[0] || {
                error: `No se ha encontrado ningún artículo con el código ${id}`,
            };

            return array2;
        } catch (error) {
            console.log(`Error al buscar elemento por ID. ${error}`);
        }
    }
    async getAll() {
        try {
            let getProducts = await fs.promises.readFile(
                `${this.fileName}`,
                "utf-8"
            );

            return JSON.parse(getProducts);
        } catch (err) {
            console.log(`error al leer los productos: ${err}`);
            return [];
        }
    }

    async deleteById(id) {
        const delProds = await this.getAll();
        const index = delProds.findIndex((o) => o.id == id);

        if (index == -1) {
            throw new Error(`Error al borrar: no se encontró el id ${id}`);
        }

        delProds.splice(index, 1);

        try {
            fs.promises.writeFile(
                this.fileName,
                JSON.stringify(delProds, null, 2)
            );
            console.log(`Se ha eliminado el producto con el ID: ${index}`);
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`);
        }
    }

    async deleteAll() {
        await fs.promises.writeFile(`${this.fileName}`, "", (error) => {
            error
                ? console.log(
                      `Error al eliminar datos del archivo ${this.fileName} bajo el siguiente error: ${error}`
                  )
                : console.log(`Archivo ${this.fileName} vaciado correctamente`);
        });
    }
}

module.exports = ContenedorProductos;
