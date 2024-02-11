class Devolucion{


    constructor() {
             
     this.fecha = Date.now()   
     this.lineaDevolucion = null
     this.lineaCambio = null
     this.pago = null;
     this.estado = "EN PROCESO";
     this.cliente = null;
     this.total = 0
     this.tipoComprobante = null
        }
    
    

      calcularTotal =  function () {
   
        for (const linea of this.lineasDeArticulo){

            this.total += linea.subTotal

        }
 
            return this.total  
        
      }



    agregarLineaDeDevolucion(articulo) {
    
        
            
            // linea = new LineaDeArticulo( 1, articulo, "DEVOLUCION");


          // this.total = linea.calcularSubTotal();
                
                
              //  this.lineaDevolucion = linea
                this.total = articulo.precio_venta

               // this.calcularTotal();  

  }



  agregarLineaDeCambio(articulo) {
    
   
   

    if(this.total>= articulo.precio_venta){
      

        

    // linea = new LineaDeArticulo( 1,articulo, "CAMBIO" );


    //   linea.calcularSubTotal();
      
       

    //    this.lineaCambio = linea
     

       this.total = articulo.precio_venta - this.total  


     

    }else{
        throw new Error('El precio del articulo a cambiar debe ser igual o mayor que el articulo con devolucion');
    }

}



/*
    eliminarLineaDeArticulo = function(linea) {
       
        // Utilizando filter para excluir la línea de venta específica
        this.lineasDeArticulo = this.lineasDeArticulo.filter((l) => l !== linea);

        this.total -=  linea.subTotal;  

       
    }



    actualizarLineaDeArticulo =  function(linea) {

   

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



*/


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


    getLineasDeArticulo = function(){

        return this.lineasDeArticulo
    }






    finalizarDevolucion() {
   
        try {
    
           
       /*
        await Stock.updateOne(
            {
                talle: lineaDevolucion.talle,
                color: lineaDevolucion.color,
                articulo: lineaDevolucion.articulo
            },
            {
                $inc: { cantidad: +1 }
            }
        );
    
    
        await Stock.updateOne(
            {
                talle: lineaCambio.talle,
                color: lineaCambio.color,
                articulo: lineaCambio.articulo
            },
            {
                $inc: { cantidad: -1 }
            }
        );
    */
    
            this.estado = "FINALIZADA"
    
           
          
        } catch (error) {
            throw new Error('Error al finalizar la devolucion: ' + error.message);
        }
    
    };

   


}


module.exports = Devolucion