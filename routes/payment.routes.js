const paymentRouter = require('express').Router()
const { createOrder,manejarFin } = require("../controllers/payment.controllers");
const path = require('path');
const fetch = require('node-fetch');
const express = require("express");

paymentRouter.post("/autorizar-pago-tarjeta", async (req, res) => {
    try {
        // Obtener los valores de token y amount del frontend
        const { token, amount } = req.query;

        // Validar que se hayan proporcionado token y amount
        if (!token || !amount) {
            return res.status(400).json({ error: "Token y amount son requeridos" });
        }

        // Construir el cuerpo de la solicitud a la siguiente dirección
        const requestBody = {
            site_transaction_id: "132",
            payment_method_id: 1,
            token,
            bin: "450799",
            amount: parseInt(amount), // Convertir amount a número
            currency: "ARS",
            installments: 1,
            description: "",
            payment_type: "single",
            establishment_name: "single",
            sub_payments: [{
                site_id: "",
                amount: parseInt(amount), // Convertir amount a número
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

        // Verificar si la solicitud fue exitosa
        if (response.ok) {







            // Extraer la respuesta JSON y enviarla como respuesta al frontend
            const responseData = await response.json();
            res.json(responseData);
        } else {
            // Si la solicitud falla, enviar el estado de error y el mensaje
            const errorData = await response.json();
            res.status(response.status).json(errorData);
        }
    } catch (error) {
        // Capturar cualquier error inesperado y enviar una respuesta de error
        console.error("Error al procesar la solicitud:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

paymentRouter.get("/mostrar-vista", (req, res) => { 
    // Servir el archivo index.html
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

paymentRouter.get("/vuelta-success", (req, res) => { 
    // Servir el archivo index.html
    res.sendFile(path.resolve(__dirname, '../public', 'vuelta-success.html'));
});

paymentRouter.get("/vuelta-failure", (req, res) => { 
    // Servir el archivo index.html
    res.sendFile(path.resolve(__dirname, '../public', 'vuelta-failure.html'));
});

paymentRouter.get("/vuelta-pending", (req, res) => { 
    // Servir el archivo index.html
    res.sendFile(path.resolve(__dirname, '../public', 'vuelta-pending.html'));
});



paymentRouter.post("/webhook", manejarFin);

paymentRouter.post("/pagar", async (req, res) => {




})


module.exports = paymentRouter;
