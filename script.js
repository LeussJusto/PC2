class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Clase CarritoDeCompras
class CarritoDeCompras {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
        document.write(`${producto.nombre} ha sido agregado al carrito.<br>`);
    }

    eliminarProducto(nombreProducto) {
        const index = this.productos.findIndex(prod => prod.nombre === nombreProducto);
        if (index !== -1) {
            this.productos.splice(index, 1);
            document.write(`${nombreProducto} ha sido eliminado del carrito.<br>`);
        } else {
            document.write(`${nombreProducto} no se encontró en el carrito.<br>`);
        }
    }

    calcularSubtotal1() {
        return this.productos.reduce((acc, prod) => acc + prod.precio, 0);
    }

    calcularDescuento(subtotal1) {
        return subtotal1 > 3000 ? subtotal1 * 0.10 : 0;
    }

    calcularIGV(subtotal2) {
        return subtotal2 * 0.18;
    }

    mostrarDetalles() {
        if (this.productos.length === 0) {
            document.write('El carrito está vacío.<br>');
        } else {
            document.write('Productos en el carrito:<br>');
            this.productos.forEach(prod => document.write(`- ${prod.nombre}: $${prod.precio}<br>`));

            const subtotal1 = this.calcularSubtotal1();
            document.write(`Subtotal 1 (suma de productos): $${subtotal1}<br>`);

            const descuento = this.calcularDescuento(subtotal1);
            document.write(`Descuento: $${descuento}<br>`);

            const subtotal2 = subtotal1 - descuento;
            document.write(`Subtotal 2 (Subtotal 1 - Descuento): $${subtotal2}<br>`);

            const igv = this.calcularIGV(subtotal2);
            document.write(`IGV (18% del Subtotal 2): $${igv}<br>`);

            const total = subtotal2 + igv;
            document.write(`Total a pagar (Subtotal 2 + IGV): $${total}<br>`);
        }
    }
}

const carrito = new CarritoDeCompras();

const producto1 = new Producto('Laptop', 1200);
const producto2 = new Producto('Mouse', 25);
const producto3 = new Producto('Teclado', 45);
const producto4 = new Producto('Monitor', 1800); 

carrito.agregarProducto(producto1);
carrito.agregarProducto(producto2);
carrito.agregarProducto(producto3);
carrito.agregarProducto(producto4);

carrito.mostrarDetalles(); 
