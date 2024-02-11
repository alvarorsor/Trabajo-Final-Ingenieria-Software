/*const {Transport} = require('winston')
const Incident = require('../../models_mongo/Incident')


//transporte personalizado que extiende de wiston.Transport

class IncidentTransport extends Transport{

    constructor(opts)
    {
        super(opts)
    }


//override del metodo log() para personalizar el comportamiento del transporte

log(info, callback) {
    if(info.level === 'error'){
   

    setInmediate(async () =>{

        //hacer algo con el registro info aqui
        //info tiene propiedades como info.level, info.message , etc
            const incident = new Incident({
                message: JSON.stringify({
                    date: new Date().toLocaleDateString(),
                    error: info.message
                })
            })
            await incident.save()

        //llama al callback despues de haber prpocesado el registro
        callback()

    })

}
}
 
}


module.exports = IncidentTransport*/