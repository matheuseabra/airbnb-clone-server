'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Users routes
Route.get('/users', 'UserController.index')
Route.post('/users', 'UserController.create')
Route.post('/sessions', 'SessionController.create')

// Properties routes
Route.resource('properties', 'PropertyController')
  .apiOnly()
  .middleware('auth')

//Properties Images
Route.post('properties/:id/images', 'ImageController.create').middleware('auth')
Route.get('images/:path', 'ImageController.create')
