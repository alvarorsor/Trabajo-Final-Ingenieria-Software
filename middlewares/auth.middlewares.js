const isAdministrador = (req, res, next) => {

    console.log(req.user)
    //if (!req.isAuthenticated()) return res.json({ message: 'Inicia sesion' })
    //if (req.user.administrativoId == null) return res.json({ message: 'URL PERMITIDA SOLO A ADMINISTRATIVOS' })

    next()
}

const isVendedor = (req, res, next) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: 'Inicia sesion' })
    if (req.user.vendedorId== null) return res.json({ message: 'URL PERMITIDA SOLO A VENDEDORES' })

    next()
}

const isAuthenthicated = (req, res, next) => {

    if (!req.isAuthenticated()) return res.status(401).json({ message: 'Inicia sesion' })
    

    next()
}

module.exports = {
    isAdministrador,
    isVendedor,
    isAuthenthicated
}