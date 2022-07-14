const admin = require('firebase-admin');
const { FIRESTORE_FILE } = require('../config/globals');
const FIRESTORE_PATH_FILE = require(FIRESTORE_FILE);

admin.initializeApp({
    credential: admin.credential.cert(FIRESTORE_PATH_FILE)
})

const db = admin.firestore();

class ContainerFirestore {
    constructor(collection) {
        this.collection = collection;
        this.collection = db.collection(collection);
        console.log(`Base conectada con la collection ${collection}`);
    }
    async save(document) {
        try {
            let doc = this.collection.doc()
            document.dateTime = new Date();
            let item = await doc.create(document)
            return item
        } catch (error) {
            console.warn(`Error al obtener: ${error.message}`);
        }
    }

    async getAll() {
        let result = await this.collection.get()
        result = result.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }))
        return result
    }

    async getById(id) {
        try {
            let result = await this.collection.get();
            result = result.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }));
            let item = result.find(elem => elem.id == id);
            if(item===undefined) {
                throw new Error('No existe el documento');
            }
            return item;
        }
        catch (error) {
            console.warn(`Error al obtener: ${error.message}`);
            return null;
        }

    }

    async deleteById(id) {
        try {
            let doc = this.collection.doc(`${id}`)
            let item = doc.delete()
            return ({ status: 'Deleted' })
        }
        catch (error) {
            console.warn(`Error al eliminar: ${error.message}`);
        }
    }

    async updateById(id, content) {
        try {
            let doc = this.collection.doc(`${id}`)
            // console.log(content);
            let item = await doc.update(content)
            return item;
        }
        catch (error) {
            console.warn(`Error al actualizar: ${error.message}`);
            return null;
        }
    }
}

module.exports = { ContainerFirestore }