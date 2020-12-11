const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataStoreSchema = new Schema({
    key: String,
    is_inDB: Boolean
    

})

const DataStore = mongoose.model('Data Store', dataStoreSchema);
module.exports = DataStore