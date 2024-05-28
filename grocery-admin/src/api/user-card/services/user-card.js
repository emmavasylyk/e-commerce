'use strict';

/**
 * user-card service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-card.user-card');
