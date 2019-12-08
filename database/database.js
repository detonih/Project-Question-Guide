const Sequelize = require('sequelize'); 

const connection = new Sequelize('questionguide_db', 'root', 'cadeirass', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection; 