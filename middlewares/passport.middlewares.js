const LocalStrategy = require('passport-local')
const db = require('../repositorio/models')
require('dotenv').config()

// La respuesta del inicio de sesion
const serializeUser = function (user, cb) {
    cb(null, user.id);
}

// Interpretacion de un usuario ya logueado
const deserializeUser = async function (id, cb) {
    try {
        const user = await db.Usuarios.findByPk(id);
        cb(null, {
            id: user.id,
            username: user.username,
            nombre: user.nombre,
            apellido: user.apellido,
            administrativoId: user.administrativoId,
            vendedorId: user.vendedorId
        });
    } catch (error) {
        cb(error);
    }
}

// done(error, valor falso, mensaje que acompaña al error) // caso incorrecto
// done(error, valor verdarero) // caso correcto

const localStrategy = new LocalStrategy(async (username, password, done) => {
    // logica de inicio sesion a travez de usuario y contraseña

    // buscar el usuario
    const user = await db.Usuarios.findOne({ where: { username } });

    // el usuario no existe -> se devuelve mensaje de error
    if (!user) return done(null, false, { message: 'Credenciales invalidas.' });
    
    // la pass no coincide -> se devuelve mensaje de error
    if (user?.password !== password) return done(null, false, { message: 'Credenciales Invalidas.' });

    // se devuelve el resultado correcto
    return done(null, user);
})



module.exports = {
    serializeUser,
    deserializeUser,
    localStrategy
   
}