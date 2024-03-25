const express = require('express')
//const morgan = require('morgan')
const {logger} = require('./loggers')
const articuloRouter = require('./routes/articulo.routes')
const categoriaRouter = require('./routes/categoria.routes')
const marcaRouter = require('./routes/marca.routes')
const colorRouter = require('./routes/color.routes')
const talleRouter = require('./routes/talle.routes')
const tipoTalleRouter = require('./routes/tipoTalle.routes')
const stockRouter = require('./routes/stock.routes')
const lineaDeArticuloRouter = require('./routes/lineaDeArticulo.routes')
const ventaRouter = require('./routes/venta.routes')
const clienteRouter = require('./routes/cliente.routes')
const devolucionRouter = require('./routes/devolucion.routes')
const condicionTributariaRouter = require('./routes/condicionTributaria.routes')
const rootRouter = require('./routes');
const sucursalRouter = require('./routes/sucursal.routes');
const vendedorRouter = require('./routes/vendedor.routes');
const PDVRouter = require('./routes/PDV.routes')
const paymentRoutes = require("./routes/payment.routes.js")
const db = require("./repositorio/models")
const session = require('express-session')
const passport = require('passport');
const { localStrategy, serializeUser, deserializeUser} = require('./middlewares/passport.middlewares');
require('dotenv').config()

const cors = require('cors');

const app = express();
app.use(express.json({ limit: '50mb' }));





app.set('PORT', process.env.SERVER_PORT || 3000)

//app.use(express.json())

app.use(cors({
    credentials: true
  }));

app.use(express.urlencoded())

app.use(session({
    secret: process.env.SESSION_SECRET ?? '',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(localStrategy)


passport.serializeUser(serializeUser)
passport.deserializeUser(deserializeUser)



app.use('/api/articulo', articuloRouter)    
app.use('/api/categoria', categoriaRouter)  
app.use('/api/marca', marcaRouter) 
app.use('/api/color', colorRouter) 
app.use('/api/talle', talleRouter) 
app.use('/api/tipoTalle', tipoTalleRouter) 
app.use('/api/stock', stockRouter)
app.use('/api/lineaDeArticulo', lineaDeArticuloRouter) 
app.use('/api/venta', ventaRouter) 
app.use('/api/cliente', clienteRouter) 
app.use('/api/devolucion', devolucionRouter) 
app.use('/api/condicionTributaria', condicionTributariaRouter) 
app.use('/api', rootRouter)
app.use('/api/sucursal', sucursalRouter)
app.use('/api/vendedor', vendedorRouter)
app.use('/api/PDV', PDVRouter)
app.use('/api/payment', paymentRoutes)



db.sequelize.authenticate()
        .then(() => {
            app.listen(3000, () => console.log("escuchando en el puerto", 3000))
        })
        .catch((err) => {
            console.log(err)
            console.log("no se pudo conectar a la base de datos")
        })