const Venta = require('../models/Venta');
const LineaDeArticulo = require('../models/LineaDeArticulo');
const Articulo = require('../models/Articulo');

describe('Venta', () => {
    let venta;

    beforeEach(() => {
        venta = new Venta();
    });

    describe('calcularTotal()', () => {
        it('debería devolver cero para una venta sin líneas de artículo', () => {
            expect(venta.calcularTotal()).toBe(0);
        });

        it('debería calcular correctamente el total para una venta con líneas de artículo', () => {
         
            const articulo1 = new Articulo(123, "adidas terrex", 10000, 1.20);
            const articulo2 = new Articulo(123, "adidas running", 15000, 1.10);
           
            const linea1 = new LineaDeArticulo({ cantidad: 2, articulo: articulo1 }); //26620 precio_venta
            const linea2 = new LineaDeArticulo({ cantidad: 3, articulo: articulo2 }); //38115 precio_venta
            
            venta.agregarLineaDeVenta(linea1.cantidad,linea1.articulo)
            venta.agregarLineaDeVenta(linea2.cantidad,linea2.articulo)

            // Calculamos el total esperado
    const totalEsperado = 2 * articulo1.precio_venta + 3 * articulo2.precio_venta;

            expect(venta.calcularTotal()).toBe(totalEsperado);
    });

    describe('agregarLineaDeVenta(cantidad, articulo)', () => {
        it('debería agregar una línea de venta correctamente', () => {
            const cantidad = 2;
            const articulo = 'Articulo de prueba';

            venta.agregarLineaDeVenta(cantidad, articulo);

            expect(venta.lineasDeArticulo.length).toBe(1);
            expect(venta.lineasDeArticulo[0].cantidad).toBe(cantidad);
            expect(venta.lineasDeArticulo[0].articulo).toBe(articulo);
        });
    });

    it('debería asociar un pago correctamente', () => {
        // Creamos un objeto de pago
        const pago = { metodo: 'efectivo', monto: 5000 };

        // Asociamos el pago a la venta
        venta.asociarPago(pago);

        // Verificamos que el pago se haya asociado correctamente
        expect(venta.pago).toEqual(pago);
    });


    it('debería asociar un cliente correctamente', () => {
        // Creamos un objeto de cliente
        const cliente = { nombre: 'Juan', condicionTributaria: 'RESPONSABLE INSCRIPTO' };

        // Asociamos el cliente a la venta
        venta.asociarCliente(cliente);

        // Verificamos que el cliente se haya asociado correctamente
        expect(venta.cliente).toEqual(cliente);
        expect(venta.tipoComprobante).toBe('FACTURA A');
    });
    
});

})