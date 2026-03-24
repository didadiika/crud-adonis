import router from '@adonisjs/core/services/router'
import User from '#models/user'
import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'

router
  .group(() => {
    router.post('/users/:id/tokens', async ({ params }) => {
      const user = await User.findOrFail(params.id)
      const token = await User.accessTokens.create(user, ['*'], {
        expiresIn: '7 days',
      })

      return { type: 'bearer', value: token.value!.release() }
    })

    router
      .group(() => {
        router.resource('/fakultas', controllers.api.Fakultas)
    }).middleware(middleware.auth({ guards: ['api'] }))
    
  })
  .prefix('/api')