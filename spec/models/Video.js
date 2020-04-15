const knex = require('./knex');

knex.schema.createTable('videos', table => {
    table.increments();
    table.string('filename');
});

const bookshelf = require('bookshelf')(knex);
module.exports = bookshelf.model('Video', {
    tableName: 'videos',
    users() {
        return this.hasOne('User');
    }
});