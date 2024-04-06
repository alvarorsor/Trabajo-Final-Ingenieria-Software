const fetch = require('node-fetch');
const { getSiteTransaccionId } = require('../services/database.service')

//------------------//

const solicitarTokenPagoTarjeta = async(tarjeta, dni) => {

    // Construir el cuerpo de la solicitud a la siguiente dirección
    const requestBody = {
        card_number: tarjeta.numero,
        card_expiration_month: tarjeta.mesVencimiento,
        card_expiration_year: tarjeta.anioVencimiento,
        security_code: tarjeta.ccv,
        card_holder_name: tarjeta.titular,
        card_holder_identification: {
            type: "dni",
            number: dni
        }
    };

    // Definir los encabezados personalizados
    const headers = {
        "Content-Type": "application/json",
        "apikey": "b192e4cb99564b84bf5db5550112adea",
        "Cache-Control": "no-cache"
    };

    // Realizar la solicitud a la siguiente dirección
    const response = await fetch("https://developers.decidir.com/api/v2/tokens", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
        // Si la solicitud falla, enviar el estado de error y el mensaje
        throw Error('No se pudo procesar el pago con tarjeta');
    }

    return await response.json();
}

//------------------//

const iniciarPagoTarjeta = async(token, monto, site_transaction, bin) => {

    // Construir el cuerpo de la solicitud a la siguiente dirección
    const requestBody = {
        site_transaction_id: String(site_transaction),
        payment_method_id: 1,
        token: token,
        bin: bin,
        amount: parseInt(monto), // Convertir amount a número
        currency: "ARS",
        installments: 1,
        description: "",
        payment_type: "single",
        establishment_name: "single",
        sub_payments: [{
          site_id: "",
          amount: parseInt(monto), // Convertir amount a número
          installments: null
        }]
    };

    // Definir los encabezados personalizados
    const headers = {
        "Content-Type": "application/json",
        "apikey": "566f2c897b5e4bfaa0ec2452f5d67f13",
        "Cache-Control": "no-cache"
    };

    // Realizar la solicitud a la siguiente dirección
    const response = await fetch("https://developers.decidir.com/api/v2/payments", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody)
    });

    const jsonResponse = await response.json()

      // Verificar si la solicitud fue exitosa
    if (!response.ok) {
        // Si la solicitud falla, enviar el estado de error y el mensaje
        throw Error('No se pudo procesar el pago con tarjeta');
    }

    return jsonResponse
}

//------------------//

const realizarPagoTarjeta = async(tarjeta, dni, monto) => {
    const site_transaction = await getSiteTransaccionId()
    //console.log(site_transaction)
    const { id, bin } = await solicitarTokenPagoTarjeta(tarjeta, dni)
    return await iniciarPagoTarjeta(id, monto, site_transaction, bin)
}

//------------------//

module.exports = {
    realizarPagoTarjeta
}
