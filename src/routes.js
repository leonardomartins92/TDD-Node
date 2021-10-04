const routes = require('express').Router()
const {User} = require('./app/models');
const authMdw = require('./app/middleware/auth')
const SessionController = require ('./app/controllers/sessionController')

routes.post("/sessions", SessionController.store)

routes.get("/dashboard", authMdw, (req, res)=>{
    return res.status(200).send();
})

module.exports = routes;