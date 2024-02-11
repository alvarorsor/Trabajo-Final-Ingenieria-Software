const mercadopago = require('mercadopago')

const createOrder = async (req, res) => {
    await mercadopago.configure({
        access_token: 'TEST-3568857301911184-021015-fbf85184ee8c7fd61de8f2a8fa2a5c8e-1675005479'
    })
    const result = await mercadopago.preferences.create({
        items: [
            {
                title: "Laptop SQBOX",
                unit_price: req.body.precio,
                currency_id: "ARS",
                quantity: 1,
            },
        ],
        notification_url: "https://nxnw1jq7-3000.brs.devtunnels.ms/api/payment/webhook",
        back_urls: {
            success: "http://localhost:3000/api/payment/vuelta-success",
            pending: "http://localhost:3000/api/payment/vuelta-pending",
            failure: "http://localhost:3000/api/payment/vuelta-failure",
        },
    });
    

    res.json(result)
}

const manejarFin = async (req, res) => {
    mercadopago.configure({
        access_token: 'TEST-3568857301911184-021015-fbf85184ee8c7fd61de8f2a8fa2a5c8e-1675005479'
    })

    if (req.query.topic === 'merchant_order') {
        const data = await mercadopago.merchant_orders.findById(req.query.id)

        console.log(data)
    }

    res.status(204)
}

module.exports = {
    createOrder,
    manejarFin
}
