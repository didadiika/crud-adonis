/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
//import  { request } from 'http'


// Router Public
router.get('/', async ({ response }) => {
  return response.redirect('/login')
})
router.get('/login', [controllers.Login, 'index']).middleware(middleware.redirectIfAuthenticated())
router.post('/login/auth', [controllers.Login, 'auth'])



// Router dengan Login dahulu baru bisa akses dashboard dan logout
router
  .group(() => {
    router.get('/dashboard', [controllers.Dashboard, 'index'])
    router.get('/logout', [controllers.Login, 'logout'])
    router.resource('/master-data/fakultas', controllers.Fakultas)
    router.get('/master-data/fakultas/search/data', [controllers.Fakultas, 'search'])
    router.get('/master-data/fakultas/datatable/show', [controllers.Fakultas, 'datatable'])
    router.resource('/master-data/jurusan', controllers.Jurusans)
    router.get('/master-data/jurusan/search/data', [controllers.Jurusans, 'search'])
    router.get('/master-data/jurusan/datatable/show', [controllers.Jurusans, 'datatable'])
    router.get('/master-data/jurusan/:id/jurusan-per-fakultas', [
      controllers.Jurusans,
      'majors_of_faculty',
    ])
    router.resource('/master-data/mahasiswa', controllers.Mahasiswas)
    router.get('/master-data/mahasiswa/datatable/show', [controllers.Mahasiswas, 'datatable'])
  })
  .middleware(middleware.auth({ guards: ['web'] }))
