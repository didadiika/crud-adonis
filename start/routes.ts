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
//import  { request } from 'http'


router.get('/', ({ view }) => {
  return view.render('home')
})

router.get('/home', ({ view }) => {
  return view.render('home')
})

router.get('/about', async ({ view }) => {
  return view.render('about')
})

router.get('/contact', async ({ view }) => { 
  return view.render('contact')
})

router.get('/users', [controllers.Users, 'index'])
router.post('/users', [controllers.Users, 'store'])
router.get('/users/:id', [controllers.Users, 'show'])
router.get('/users/:id/edit', [controllers.Users, 'edit'])
router.put('/users/:id', [controllers.Users, 'update'])
router.delete('/users/:id', [controllers.Users, 'destroy'])


// ESCPOS Testing: Netwrok OK, USB Error: No compatible devices found
router.get('/prints', [controllers.Prints, 'index'])
