//const Articulo = require('../models/Articulo')

class LineaDeArticulo{


    constructor({cantidad, articulo}) {
             
     this.cantidad = cantidad;
     this.articulo = articulo
     this.subTotal = 0;
     
        }
    
    
    



    calcularSubTotal() {
    
       
            this.subTotal = this.articulo.precio_venta * this.cantidad;
        
        
       
       return this.subTotal 
    
    }
    
    
    actualizarLineaDeArticulo(cantidad) {
        
    
        this.subTotal = this.articulo.precio * cantidad;
        
        
        this.cantidad = cantidad
    
        
    };

}

module.exports = LineaDeArticulo