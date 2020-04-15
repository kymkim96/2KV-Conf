const knex = require('./knex');

knex.schema.createTable('users', table => {
    table.increments();
    table.string('email');
    table.string('password');
    table.string('nickname');
});

const bookshelf = require('bookshelf')(knex);
module.exports = bookshelf.model('User', {
    tableName: 'users',
    videos() {
        return this.belongsTo('Video');
    }
});