import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RedirectIfAuthenticatedMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { auth, response } = ctx
    if (auth.user) {
      return response.redirect('/dashboard')
    }

    await next()
  }
}