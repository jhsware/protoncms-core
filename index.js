'use strict';

module.exports = {
    api: {
        database: {
            mongodb: require('./api/database/mongodb')
        }
    },
    components: require('./app/components'),
    forms: require('./app/forms'),
    interfaces: require('./app/interfaces'),
    layouts: require('./app/layouts'),
    network: require('./app/network'),
    pages: require('./app/pages'),
    permissions: require('./app/permissions'),
};