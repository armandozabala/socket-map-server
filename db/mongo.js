const mongoose = require('mongoose');
 
mongoose.connect('mongodb+srv://map:armzba1986@cluster0.fkq9c.mongodb.net/mapas', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('Conectado a mongo'))
.catch(() => console.log(object))


module.exports = mongoose;
    