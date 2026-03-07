/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

//import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'


router.get('/', async ({ response }) => {
  return response.redirect('/login')
})
router.get('/login', [controllers.visitor.Login, 'index'])
router.post('/login', [controllers.visitor.Login, 'login'])
