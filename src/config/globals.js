require('dotenv').config();

module.exports = {
	MONGO_URI: process.env.MONGO_URI || '',
	FIRESTORE_FILE: process.env.FIRESTORE_FILE || '',
	MOTOR: process.env.MOTOR || 'mongo',
	PORT: process.env.PORT ? process.env.PORT : argv.port ? argv.port : 8080,
}