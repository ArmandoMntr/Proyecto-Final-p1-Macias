//PARA MOSTRAR EL TIEMPO ACTUAL EN DONDE LO NECESITE

class Timestamp {
    constructor() {}

    dateTime = `${new Date().getDate().toString().padStart(2, "0")}/${(
        new Date().getMonth() + 1
    )
        .toString()
        .padStart(2, "0")}/${new Date()
        .getFullYear()
        .toString()
        .padStart(4, "0")} ${new Date()
        .getHours()
        .toString()
        .padStart(2, "0")}:${new Date()
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${new Date()
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;
}
module.exports = Timestamp;
