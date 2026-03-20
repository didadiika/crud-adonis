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


router.get('/home', ({ view }) => {
  return view.render('home')
})

router.get('/about', async ({ view }) => {
  return view.render('about')
})

router.get('/contact', async ({ view }) => { 
  return view.render('contact')
})

