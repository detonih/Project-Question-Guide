const Sequelize = require("sequelize"); 
const connection = require("./database");

const Answer = connection.define("answers", {
    corps: {
        type: Sequelize.TEXT,
        allowNull: false
    }, 
    questionId: { 
        type: Sequelize.INTEGER, 
        allowNull: false
    }
});

Answer.sync({force: false}).then(() => {
    console.log("Table for answers created sucessfully!");
});

module.exports = Answer;