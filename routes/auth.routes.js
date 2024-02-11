const authRouter = require('express').Router()
const passport = require('passport');
const db = require('../repositorio/models');
const { isAdministrador } = require('../middlewares/auth.middlewares');

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


authRouter.get('/local/failure', (req, res) => res.json({ data: null, error: 'El inicio de sesion fallo - LOCAL' }));
authRouter.get('/local/success', (req, res) => res.json({ data: null, error: 'El inicio de sesion fue exitoso - LOCAL' }));

authRouter.post('/local/login', passport.authenticate('local', {
    successRedirect: '/api/auth/local/success',
    failureRedirect: '/api/auth/local/failure'
}));



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