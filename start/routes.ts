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
import { middleware } from './kernel.ts'
//import  { request } from 'http'


// Router Public
router.get('/', async ({ response }) => {
  return response.redirect('/login')
})
router.get('/login', [controllers.Login, 'index'])
router.post('/login/auth', [controllers.Login, 'auth'])


// Router dengan Login dahulu baru bisa akses dashboard dan logout
router.group(() => {
    router.get('/dashboard', [controllers.Dashboard, 'index'])
    router.get('/logout', [controllers.Login, 'logout'])
    router.resource('/master-data/fakultas', controllers.Fakultas)
    router.get('/master-data/fakultas/search/data', [controllers.Fakultas, 'search'])
    router.get('/master-data/fakultas/datatable/show', [controllers.Fakultas, 'datatable'])
    router.resource('/master-data/jurusan', controllers.Jurusans)
    router.get('/master-data/jurusan/search/data', [controllers.Jurusans, 'search'])
    router.get('/master-data/jurusan/datatable/show', [controllers.Jurusans, 'datatable'])
    router.resource('/master-data/mahasiswa', controllers.Mahasiswas)
    router.get('/master-data/mahasiswa/datatable/show', [controllers.Mahasiswas, 'datatable'])
  }).middleware(middleware.auth())
  


  router.get('/users', [controllers.Users, 'index'])
router.post('/users', [controllers.Users, 'store'])
router.get('/users/:id', [controllers.Users, 'show'])
router.get('/users/:id/edit', [controllers.Users, 'edit'])
router.put('/users/:id', [controllers.Users, 'update'])
router.delete('/users/:id', [controllers.Users, 'destroy'])


// ESCPOS Testing: Netwrok OK, USB Error: No compatible devices found
router.get('/prints', [controllers.Prints, 'index'])
