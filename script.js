class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

class CarritoDeCompras {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
        alert(`${producto.nombre} ha sido agregado al carrito.`);
    }

    eliminarProducto(nombreProducto) {
        const index = this.productos.findIndex(prod => prod.nombre === nombreProducto);
        if (index !== -1) {
            this.productos.splice(index, 1);
            alert(`${nombreProducto} ha sido eliminado del carrito.`);
        } else {
            alert(`${nombreProducto} no se encontró en el carrito.`);
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
            return 'El carrito está vacío.';
        } else {
            let detalles = 'Productos en el carrito:\n';
            this.productos.forEach(prod => detalles += `- ${prod.nombre}: $${prod.precio}\n`);

            const subtotal1 = this.calcularSubtotal1();
            detalles += `Subtotal 1 (suma de productos): $${subtotal1}\n`;

            const descuento = this.calcularDescuento(subtotal1);
            detalles += `Descuento: $${descuento}\n`;

            const subtotal2 = subtotal1 - descuento;
            detalles += `Subtotal 2 (Subtotal 1 - Descuento): $${subtotal2}\n`;

            const igv = this.calcularIGV(subtotal2);
            detalles += `IGV (18% del Subtotal 2): $${igv}\n`;

            const total = subtotal2 + igv;
            detalles += `Total a pagar (Subtotal 2 + IGV): $${total}\n`;

            return detalles;
        }
    }
}

const carrito = new CarritoDeCompras();

function agregarProducto(nombre, precio) {
    const producto = new Producto(nombre, precio);
    carrito.agregarProducto(producto);
    mostrarCarrito();
}

function eliminarProducto(nombre) {
    carrito.eliminarProducto(nombre);
    mostrarCarrito();
}

function mostrarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = '';
    carrito.productos.forEach(prod => {
        carritoDiv.innerHTML += `
            <div>
                ${prod.nombre}: $${prod.precio}
                <button onclick="eliminarProducto('${prod.nombre}')">Eliminar</button>
            </div>
        `;
    });
}

function mostrarDetalles() {
    const detalles = carrito.mostrarDetalles();
    alert(detalles);
}
