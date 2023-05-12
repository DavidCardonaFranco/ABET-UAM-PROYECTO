/**
 * Config source: https://git.io/JfefC
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import type { CorsConfig } from '@ioc:Adonis/Core/Cors'

const corsConfig: CorsConfig = {
  enabled: true, // Cambia esto a true para habilitar CORS

  origin: 'http://localhost:4200', // Establece el origen permitido a 'http://localhost:4200'

  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],

  headers: true,

  exposeHeaders: [
    'cache-control',
    'content-language',
    'content-type',
    'expires',
    'last-modified',
    'pragma',
  ],

  credentials: true,

  maxAge: 90,
}

export default corsConfig
