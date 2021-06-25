const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const puntosSchema = new Schema({
  latitude:  String,
  longitude: String
});

// Crear el modelo
const Puntos = mongoose.model('Points', puntosSchema);

module.exports = Puntos;