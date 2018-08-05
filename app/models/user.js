"use strict"
let db =  require('../../config/db.js');
let Sequelize = require('sequelize');
let bcrypt = require('bcrypt');
let bio = require('./bio.js');



const User = db.define('user',{

    username : {
        type : Sequelize.STRING,
        unique : true,
        allowNull : false
    },
    password : {    // will contain hashed password
        type : Sequelize.STRING,
        allowNull : false
    },
    id : {      // Set by default. Don't change!
        type : Sequelize.UUID,
        defaultValue : Sequelize.UUIDV1,
        primaryKey : true
    },
    position : {
        type : Sequelize.STRING,
        allowNull : false,
    }
    
});


User.hasOne(bio);

User.generateSalt = function(){          // function to generate salt

    const saltRound =8;
    return new Promise(function(resolve,reject){
    bcrypt.genSalt(saltRound,function(err,salt)
        {
            if(err)
                reject(err);
            else
                resolve(salt);

        });

}

    );

}

User.hashPassword = function(user){           //function to hash password

    return new Promise(function(resolve,reject){
        User.generateSalt().then((salt)=>{

            bcrypt.hash(user.password,salt,function(err,hash){

                if(err)
                    reject(err);
                else {

                    resolve(hash);
                }

            }


        );

    }).catch((err)=>{console.log(err);});

    });

}

db.sync();

module.exports = User;
