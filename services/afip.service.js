const fetch = require('node-fetch');
const xml2js = require('xml2js');
const db = require('../repositorio/models')
const { format } = require('date-fns');
const { Op } = require('sequelize')

//------------------//

const solicitarAutorizacion = async() => {
    
        const soapUrl = 'http://istp1service.azurewebsites.net/LoginService.svc';
        const soapHeaders = new Headers();
        soapHeaders.append('Content-Type', 'text/xml');
        soapHeaders.append('SOAPACTION', 'http://ISTP1.Service.Contracts.Service/ILoginService/SolicitarAutorizacion')
    
        const soapEnvelope = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ist="http://ISTP1.Service.Contracts.Service" xmlns:sge="http://schemas.datacontract.org/2004/07/SGE.Service.Contracts.Data">
                <soapenv:Header/>
                <soapenv:Body>
                    <ist:SolicitarAutorizacion>
                      <ist:codigo>A32747FF-FF5A-4007-BBEC-1BDC54C24DCB</ist:codigo>
                    </ist:SolicitarAutorizacion>
                </soapenv:Body>
            </soapenv:Envelope>
        `;
        
        const soapOptions = {
            method: 'POST',
            headers: soapHeaders,
            body: soapEnvelope
        };
        
        const response = await fetch(soapUrl, soapOptions);
        const responseData = await response.text();

        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(responseData);
         // Acceder a los datos del objeto JavaScript resultante
        const token = result['s:Envelope']['s:Body'][0]['SolicitarAutorizacionResponse'][0]['SolicitarAutorizacionResult'][0]['a:Token'][0];

        if (typeof token != 'string') {
          throw new Error('Error al solicitar autorización a AFIP');
        }
        
        return token;
};

//------------------//


const solicitarUltimosComprobantes = async (token) => {

      const soapUrl = 'http://istp1service.azurewebsites.net/LoginService.svc';
      const soapHeaders = new Headers();
      soapHeaders.append('Content-Type', 'text/xml');
      soapHeaders.append('SOAPACTION', 'http://ISTP1.Service.Contracts.Service/ILoginService/SolicitarUltimosComprobantes');
  
      const soapEnvelope = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ist="http://ISTP1.Service.Contracts.Service" xmlns:sge="http://schemas.datacontract.org/2004/07/SGE.Service.Contracts.Data">
          <soapenv:Header/>
          <soapenv:Body>
            <ist:SolicitarUltimosComprobantes>
              <ist:token>${token}</ist:token>
            </ist:SolicitarUltimosComprobantes>
          </soapenv:Body>
        </soapenv:Envelope>
      `;
  
      const soapOptions = {
        method: 'POST',
        headers: soapHeaders,
        body: soapEnvelope
      };
  
      const response = await fetch(soapUrl, soapOptions);
      const responseData = await response.text();
  
      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(responseData);
      const comprobantes = result['s:Envelope']['s:Body'][0]['SolicitarUltimosComprobantesResponse'][0]['SolicitarUltimosComprobantesResult'][0]['a:Comprobantes'][0]['a:Comprobante'];
      const error = result['s:Envelope']['s:Body'][0]['SolicitarUltimosComprobantesResponse'][0]['SolicitarUltimosComprobantesResult'][0]['a:Error'][0]

      if (comprobantes == undefined) {
        throw new Error(error);
      }
  
      const comprobantesArray = comprobantes.map(comprobante => ({
        descripcion: comprobante['a:Descripcion'][0],
        id: comprobante['a:Id'][0],
        numero: comprobante['a:Numero'][0]
      }));

      return comprobantesArray;
};

//------------------//

const solicitarCae = async (token, monto, nroComprobante, tipoComprobante, nroDocumento, tipoDocumento) => {

    const soapUrl = 'http://istp1service.azurewebsites.net/LoginService.svc';
    const soapHeaders = new Headers();
    soapHeaders.append('Content-Type', 'text/xml');
    soapHeaders.append('SOAPACTION', 'http://ISTP1.Service.Contracts.Service/ILoginService/SolicitarCae');

    const importeNeto = (Math.trunc(monto / 1.21) / 100).toFixed(2) 
    const importeIva = (Math.trunc((monto / 100 - importeNeto) * 100) / 100).toFixed(2) 
    const importeTotal = (parseFloat(importeIva) + parseFloat(importeNeto)).toFixed(2)

    console.log(monto)
    console.log(importeIva)
    console.log(importeNeto)
    console.log(importeTotal)

    const soapEnvelope = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ist="http://ISTP1.Service.Contracts.Service" xmlns:sge="http://schemas.datacontract.org/2004/07/SGE.Service.Contracts.Data">
         <soapenv:Header/>
         <soapenv:Body>
            <ist:SolicitarCae>
               <ist:token>${token}</ist:token>
               <ist:solicitud>
                  <sge:Fecha>${format(Date.now(), "yyyy-MM-dd'T'HH:mm:ss.S")}</sge:Fecha>
                  <sge:ImporteIva>${importeIva}</sge:ImporteIva>
                  <sge:ImporteNeto>${importeNeto}</sge:ImporteNeto>
                  <sge:ImporteTotal>${importeTotal}</sge:ImporteTotal>
                  <sge:Numero>${nroComprobante}</sge:Numero>
                  <sge:NumeroDocumento>${nroDocumento}</sge:NumeroDocumento>
                  <sge:TipoComprobante>${tipoComprobante}</sge:TipoComprobante>
                  <sge:TipoDocumento>${tipoDocumento}</sge:TipoDocumento>
               </ist:solicitud>
            </ist:SolicitarCae>
         </soapenv:Body>
      </soapenv:Envelope>
    `;
  
    const soapOptions = {
      method: 'POST',
      headers: soapHeaders,
      body: soapEnvelope
    };
  
    const response = await fetch(soapUrl, soapOptions);
    const responseData = await response.text();

    //console.log(responseData)
    
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(responseData);

    const cae = result['s:Envelope']['s:Body'][0]['SolicitarCaeResponse'][0]['SolicitarCaeResult'][0]['a:Cae'][0];
    const estado = result['s:Envelope']['s:Body'][0]['SolicitarCaeResponse'][0]['SolicitarCaeResult'][0]['a:Estado'][0];
    const fechaDeVencimiento = result['s:Envelope']['s:Body'][0]['SolicitarCaeResponse'][0]['SolicitarCaeResult'][0]['a:FechaDeVencimiento'][0];
    const tipoComprobanteResponse = result['s:Envelope']['s:Body'][0]['SolicitarCaeResponse'][0]['SolicitarCaeResult'][0]['a:TipoComprobante'][0];
    const error = result['s:Envelope']['s:Body'][0]['SolicitarCaeResponse'][0]['SolicitarCaeResult'][0]['a:Error'][0];

    if (typeof error == 'string') {
      throw Error(error);
    }

    if (estado == "Rechazada") {
      throw Error('La solicitud de CAE fue rechazada')
    }

    return {
      importeIva: String(importeIva * 100),            
      importeNeto: String(importeNeto * 100),
      importeTotal: String(importeTotal * 100),
      nroComprobante: nroComprobante,
      cae: cae, 
      estado: estado, 
      fechaDeVencimiento: fechaDeVencimiento, 
      tipoComprobante: tipoComprobanteResponse 
    };
};

//------------------//

const procesarDocumento = async (token, clienteCuit) => {
  const comprobantes = await solicitarUltimosComprobantes(token)
  
  const cliente = await db.Clientes.findOne({
    where: { CUIT: {[Op.eq]: BigInt(clienteCuit)}}
  })

  const clienteCondicionTributaria = await db.CondicionesTributarias.findByPk(cliente.condicionTributariaId)

  let tipoDocumento
  //const tipoDocumento = "ConsumidorFinal" //El sistema de AFIP rechaza si el cuit no está registrado en su base de datos. Para salvar eso haremos siempre a consumidor final
  let nroDocumento
  //const nroDocumento = 0
  let tipoComprobante
  let nroComprobante

  if(clienteCondicionTributaria.descripcion == "CONSUMIDOR FINAL") tipoDocumento = "ConsumidorFinal"
  else tipoDocumento = "Cuit"

  console.log(clienteCondicionTributaria)

  if(clienteCondicionTributaria.descripcion == "CONSUMIDOR FINAL") nroDocumento = 0
  else nroDocumento = cliente.CUIT

  if(clienteCondicionTributaria.descripcion == "RESPONSABLE INSCRIPTO" || clienteCondicionTributaria.descripcion == "MONOTRIBUTISTA") tipoComprobante = "FacturaA"
  else tipoComprobante = "FacturaB"

  if (tipoComprobante == "FacturaA") nroComprobante = parseInt(comprobantes[0].numero) + 1
  else nroComprobante = parseInt(comprobantes[1].numero) + 1

  return { nroComprobante, tipoComprobante, nroDocumento, tipoDocumento }
}

//------------------//

const emitirComprobanteAfip = async (monto, clienteCuit) => {
  const token = await solicitarAutorizacion()
  const { nroComprobante, tipoComprobante, nroDocumento, tipoDocumento } = await procesarDocumento(token, clienteCuit)
  return await solicitarCae(token, (monto / 100.0).toFixed(2), nroComprobante, tipoComprobante, nroDocumento, tipoDocumento)
}

module.exports = {
    emitirComprobanteAfip
}