const express = require('express')
const router = express.Router()
const controller = require('../controller/publicaciones.js')

router.post('/', controller.crearPublicacion)
router.get('/', controller.listarPublicaciones)
router.get('/:id', controller.obtenerPorId)
router.put('/:id', controller.editarPublicacion)
router.delete('/:id', controller.eliminarPublicacion)

module.exports = router