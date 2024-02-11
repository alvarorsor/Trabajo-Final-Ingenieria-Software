const rootRouter = require('express').Router()
const authRouter = require('./auth.routes')
const userRouter = require('./user.routes')

rootRouter.use('/auth', authRouter)
rootRouter.use('/user', userRouter)

module.exports = rootRouter