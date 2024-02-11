class Articulo {
    constructor(codigo, descripcion, costo, margen_ganancia) {
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.costo = costo;
        this.margen_ganancia = margen_ganancia;
        this.neto_gravado = 0;
        this.IVA = 0;
        this.precio_venta = 0;

        

        this.calcularNetoGravado();
       

        this.calcularIVA();
       

        this.calcularPrecioVenta();
       
    }

    calcularNetoGravado() {
        this.neto_gravado = parseFloat((this.costo + this.costo * this.margen_ganancia).toFixed(2));
        
    }

    calcularIVA() {
        this.IVA = parseFloat((this.neto_gravado * 0.21).toFixed(2));
       
    }

    calcularPrecioVenta() {
        this.precio_venta = parseFloat((this.neto_gravado + this.IVA).toFixed(2));
       
    }
}

module.exports = Articulo;


