const { isAdministrador } = require('../middlewares/auth.middlewares');

const db = require('../repositorio/models')
const userRouter = require('express').Router()

userRouter.get('/',/*isAdministrador*/ async (req, res) => {
    //if (!req.isAuthenticated()) return res.redirect('/api/auth/needs-login');
    const usuarios = await db.Usuarios.findAll()
    
    res.json(usuarios);
});

userRouter.get('/bloqueada', (req, res) => {
    if (!req.isAuthenticated()) return res.json({ message: 'Esta pagina esta bloqueada, sal por favor!' })

    res.json({ message: 'Esta pagina esta bloqueada pero tenes la cookie' })
})


userRouter.get('/bloqueada', (req, res) => {
    if (!req.isAuthenticated()) return res.json({ message: 'Esta pagina esta bloqueada, sal por favor!' })

    res.json({ message: 'Esta pagina esta bloqueada pero tenes la cookie' })
})

userRouter.delete('/:id',isAdministrador, async (req, res) => {
    try{
    const usuarioId = req.params.id
  
     
      const usuario = await db.Usuarios.findByPk(usuarioId)
      if (!usuario) {
        return res.status(404).json(`usuario con id ${usuarioId} no encontrado.`)
      }


      // Elimina la Color de la base de datos
      await db.Usuarios.destroy({
        where: {
          id: usuarioId
        }
      });
  
     
      
      return res.status(200).json('Usuario eliminado correctamente')

    } catch (err) {
        console.log(err)
        res.json({ data: null, error: 'No se pudo eliminar el usuario' })
    }
    
});

userRouter.patch('/:id',isAdministrador, async (req, res) => {
    
    try{
    
        const usuarioId = req.params.id
        
        // Verifica si la Color existe
      const usuario = await db.Usuarios.findByPk(usuarioId)
      if (!usuario) {
        return res.status(404).json(`usuario con id ${usuarioId} no encontrado.`)
      }
    
         
           await db.Usuarios.update(
            {
              nombre: req.body.nombre,
              apellido: req.body.apellido,
              username: req.body.username,
              password: req.body.password,
            },
            
            {
              where: {
                id: usuarioId
              },
              
            }
          );
          
         
          return res.status(200).json('Usuario actualizado correctamente')
    
           
        } catch (err) {
            console.log(err)
            res.json({ data: null, error: 'No se pudo actualizar el usuario' })
        }
});

module.exports = userRouter