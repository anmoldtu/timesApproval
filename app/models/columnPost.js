"use strict"
let db =  require('../../config/db.js');
let Sequelize = require('sequelize');

const columnpost = db.define('columnpost',{

	id : { 		// Set by default. Don't change!
        type : Sequelize.UUID,
        defaultValue : Sequelize.UUIDV1,
        primaryKey : true

	},

	userId:{
		type : Sequelize.UUID
	},

	approver_id : {
		type : Sequelize.UUID

	},

	approval_status : {
		type : Sequelize.BOOLEAN,
		defaultValue : false,
		allowNull : false
	},

	category : {  // Tells type of post. Can be one of ['image','article']
		type : Sequelize.STRING,
		allowNull : false
	},

	url : {   // If post contain any media, Store it to server and add url here. Leave to default if no media is available.
		type : Sequelize.STRING,
		defaultValue : 'nomedia@this.post',
		// validate : {isUrl: true}
	},

	title : { 
		type : Sequelize.STRING,
		allowNull : true
	},

	article : { // Leave blank if no article submitted.
		type : Sequelize.STRING,
		allowNull : true
	},

	biLiner : { // Leave blank if no article submitted.
		type : Sequelize.STRING,
		allowNull : true
	},
	uploaded_at : { 
		type : Sequelize.DATE,
		defaultValue : Sequelize.NOW
	},  
	approved_at : {	
		type : Sequelize.DATE,
	},

	tag : {
		type : Sequelize.STRING,
		allowNull : true,
	},

});