const authRouter = require('express').Router()
const passport = require('passport');
const db = require('../repositorio/models');
const { isAdministrador } = require('../middlewares/auth.middlewares');
const { makeSuccessResponse, makeErrorResponse } = require('../utils/response.utils');

authRouter.get('/needs-login', (req, res) => {
    res.json({ data: null, error: 'Necesita iniciar sesion' })
})

// Local Auth
authRouter.post('/local/registrar-administrativo',isAdministrador, async (req, res) => {
    const { username, password, nombre, apellido, legajo } = req.body

    const t = await db.sequelize.transaction()

    try {
        const exist = await db.Usuarios.findOne({ where: { username } })

        if (exist)
            throw new Error('Nombre de Usuario ya ocupado')


        const administrativo = await db.Administrativos.create({
            nombre: nombre,
            apellido:apellido,
            legajo:legajo
        }, { transaction: t })

        const user = await db.Usuarios.create({
            username: username,
            password: password,
            administrativoId: administrativo.id
        }, { transaction: t });

        await t.commit()

        res.json({ data: { user, administrativo }, error: null })
    } catch (err) {
        console.log(err)
        await t.rollback()
        res.json({ data: null, error: err.message })
    }
})

authRouter.post('/local/registrar-vendedor',isAdministrador, async (req, res) => {
    const { username, password, nombre, apellido, legajo, puntoDeVentaId } = req.body

    const t = await db.sequelize.transaction()

    try {
        const exist = await db.Usuarios.findOne({ where: { username } })

        if (exist)
            throw new Error('nombre de usuario ya ocupado')

       
        const vendedor = await db.Vendedores.create({
           nombre:nombre,
           apellido:apellido,
           legajo:legajo,
           puntoDeVentaId: puntoDeVentaId
        }, { transaction: t })

        const user = await db.Usuarios.create({
           
            username: username,
            password: password,
           
            vendedorId: vendedor.id
        }, { transaction: t });

        await t.commit()

        res.json({ data: { user, vendedor }, error: null })
    } catch (err) {
        console.log(err)
        await t.rollback()
        res.json({ data: null, error: err.message })
    }
})


authRouter.get('/local/failure', (req, res) => res.status(401).json(makeErrorResponse(['El inicio de sesion fallo - LOCAL'])));

authRouter.post('/local/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err || !user) {
        // Autenticación fallida, redireccionar a /api/auth/local/failure
        return res.redirect('/api/auth/local/failure');
      }
  
      // Autenticación exitosa, devolver la respuesta con la información del usuario
      return res.status(200).json(makeSuccessResponse(user));
    })(req, res, next);
  });

// Close Session
authRouter.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.json({ data: null, error: 'No se pudo cerrar la sesion' })
            } else {
                res.json({ data: 'Cierre de sesion exitoso', error: null })
            }
        });
    } else {
        res.json({ data: null, error: 'No hay una sesion activa' })
    }
})


module.exports = authRouter