const LineaDeArticulo = require('../models/LineaDeArticulo')

class Venta{


    constructor() {
             
     this.fecha = null  
     this.lineasDeArticulo = [];
     this.pago = null;
     this.estado = "EN PROCESO";
     this.cliente = null;
     this.total = 0
     this.tipoComprobante = null
        }
    
    

      calcularTotal() {
   
        for (const linea of this.lineasDeArticulo){

            this.total += linea.subTotal

        }
 
            return this.total  
        
      };



    agregarLineaDeVenta(cantidad,articulo) {
    
        
            
            /*  const lineaExistente = this.lineasDeArticulo.some((linea) =>
              linea.talle.equals(talle) &&
              linea.color.equals(color) &&
              linea.articulo.equals(articulo)
            );
          
            if (lineaExistente) {
              throw new Error('Ya existe esta línea de venta en la venta');
            }*/
              
            let linea


             linea = new LineaDeArticulo({cantidad, articulo});

              let subtotal =  linea.calcularSubTotal();
                
              console.log(subtotal)  

                this.lineasDeArticulo.push(linea);
                

                //this.calcularTotal();  

  }




    eliminarLineaDeArticulo(linea) {
       
        // Utilizando filter para excluir la línea de venta específica
        this.lineasDeArticulo = this.lineasDeArticulo.filter((l) => l !== linea);

        this.total -=  linea.subTotal;  

       
    }



    actualizarLineaDeArticulo(linea) {

   

        // Encuentra la línea de articulo por su ID
        const lineaDeArticuloExistente = this.lineasDeArticulo.find(l => l.equals(linea));
    
        if (!lineaDeArticuloExistente) {
            // La línea de articulo no existe
            throw new Error('La línea de articulo no fue encontrada.');
        }

        let cantidad_anterior = lineaDeArticuloExistente.cantidad

        for (const lineaArticulo of this.lineasDeArticulo){

            if(lineaArticulo.equals(linea)){

                lineaArticulo.cantidad = linea.cantidad

                if(cantidad_anterior < linea.cantidad){
    
                    this.total =  this.total + (linea.subTotal - this.total); 
            
                   
                }else if (cantidad_anterior > linea.cantidad){
            
                    this.total =  this.total - (this.total - linea.subTotal); 
                   
                }
            }


        }
    
    
    };






    asociarPago(pago) {
   
        
      
           try{
            
            // Asociar el pago 
            this.pago =  pago;
    
           
          
        } catch (error) {
            throw new Error('Error al agregar el pago: ' + error.message);
        }
    
    };




    asociarCliente(cliente) {
   
        try {
            
           // Verificar si el cliente tiene una condición tributaria específica
        if (cliente.condicionTributaria === "RESPONSABLE INSCRIPTO" || cliente.condicionTributaria === "MONOTRIBUTO") {
            
    
            this.tipoComprobante = "FACTURA A"
    
          }else{
            this.tipoComprobante = "FACTURA B"
          }
      
          // Asociar el cliente 
          this.cliente = cliente
      
         
          
        } catch (error) {
            throw new Error('Error al asociar al cliente: ' + error.message);
        }




    }


    getLineasDeArticulo(){

        return this.lineasDeArticulo
    }





    finalizarVenta() {
   

        this.estado = 'FINALIZADA'

        this.fecha = Date.now()

       /* try {
            
       
            // Recorro todo mi listado de productos en mi venta
            for (const linea of this.lineasDeArticulo) {
       
                await Stock.updateOne(
            {
                talle: linea.talle,
                color: linea.color,
                articulo: linea.articulo
            },
            {
                $inc: { cantidad: -linea.cantidad }
            }
        );
    }
    
           
    
           
          
        } catch (error) {
            throw new Error('Error al finalizar la venta: ' + error.message);
        }*/
    
    };


}


module.exports = Venta;