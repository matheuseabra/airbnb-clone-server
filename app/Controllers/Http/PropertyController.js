'use strict'

const Property = use('App/Models/Property')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with properties
 */
class PropertyController {
  /**
   * Show a list of all properties.
   * GET properties
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const { latitude, longitude } = request.all()

    const properties = Property.query()
                               //.nearBy(latitude, longitude, 10)
                               .with('images')
                               .fetch()

    return properties
  }

  /**
   * Create/save a new property.
   * POST properties
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth, request, response }) {
    try {
      const { id } = auth.user

      const data = request.only(['title', 'address', 'price', 'latitude', 'longitude'])

      const property = await Property.create({ ...data, user_id: id })

      return property
    } catch (err) {

      return err
    }
  }

  /**
   * Display a single property.
   * GET properties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ request, response, view }) {

    const properties = Property.query()
                               .with('images')
                               .fetch()

    return properties
  }

  /**
   * Update property details.
   * PUT or PATCH properties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    const property = await Property.findOrFail(params.id)

    const data = request.only([
      'title',
      'address',
      'price',
      'latitude',
      'longitude'
    ])

    property.merge(data)

    property.save()

    return property
  }

  /**
   * Delete a property with id.
   * DELETE properties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, request, response }) {

    const property = Property.findOrFail(params.id)

    if (property.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    return property
  }
}

module.exports = PropertyController
