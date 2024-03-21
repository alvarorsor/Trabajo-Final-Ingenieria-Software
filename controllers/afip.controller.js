const fetch = require('node-fetch');
const xml2js = require('xml2js');
const { format } = require('date-fns');

const solicitarAutorizacion = async(next) => {
    try{
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

        return token;
    } catch(err) {
        console.error(err)
        next(err)
    }
}

const solicitarUltimosComprobantes = async (token, next) => {
    try {
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
  
      const comprobantesArray = comprobantes.map(comprobante => ({
        descripcion: comprobante['a:Descripcion'][0],
        id: comprobante['a:Id'][0],
        numero: comprobante['a:Numero'][0]
      }));

      return comprobantesArray;

    } catch (err) {
      console.error(err);
      return next(err);
    }
  };

  const solicitarCae = async (token, monto, numero, documento, tipoComprobante, tipoDocumento, res, next) => {
    try {

      const soapUrl = 'http://istp1service.azurewebsites.net/LoginService.svc';
      const soapHeaders = new Headers();
      soapHeaders.append('Content-Type', 'text/xml');
      soapHeaders.append('SOAPACTION', 'http://ISTP1.Service.Contracts.Service/ILoginService/SolicitarCae');

      const importeIva = (monto - monto / 1.21).toFixed(2)
      const importeNeto = (monto / 1.21).toFixed(2) 
      const importeTotal = parseFloat(monto).toFixed(2)

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
                    <sge:Numero>${numero}</sge:Numero>
                    <sge:NumeroDocumento>${documento}</sge:NumeroDocumento>
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
    
        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(responseData);

        const cae = result['s:Envelope']['s:Body'][0]['SolicitarCaeResponse'][0]['SolicitarCaeResult'][0]['a:Cae'][0];
        const estado = result['s:Envelope']['s:Body'][0]['SolicitarCaeResponse'][0]['SolicitarCaeResult'][0]['a:Estado'][0];
        const fechaDeVencimiento = result['s:Envelope']['s:Body'][0]['SolicitarCaeResponse'][0]['SolicitarCaeResult'][0]['a:FechaDeVencimiento'][0];
        const tipoComprobanteResponse = result['s:Envelope']['s:Body'][0]['SolicitarCaeResponse'][0]['SolicitarCaeResult'][0]['a:TipoComprobante'][0];

        //console.log(soapEnvelope)

        //console.log(responseData)

        if (estado == "Rechazada") return res.status(404).json(makeErrorResponse(['No se pudo procesar el pago.']));
  
        return {
            importeIva: importeIva,
            importeNeto: importeNeto,
            importeTotal: importeTotal,
            nroComprobante: numero, 
            cae: cae, 
            estado: estado, 
            fechaDeVencimiento: fechaDeVencimiento, 
            tipoComprobante: tipoComprobanteResponse 
        };
        
    } catch (err) {
        console.error(err);
        next(err);
    }
  };

module.exports = {
    solicitarAutorizacion,
    solicitarUltimosComprobantes,
    solicitarCae
}