const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const connect = () => {
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true)
  }
  mongoose.connect('mongodb://localhost/study')
    .then(() => {
      const mySchema = new Schema({
        title: String
      }, {
        timestamps: true
      });
      const MyModel = mongoose.model('MyModel', mySchema);
      const doc = new MyModel({
        title: 'Hello2'
      });
      console.log(doc);
      doc.save()
        .then(() => {
          console.log('doc saved')
        })
    })
    .catch(err => {
      console.log(err)
    })
};

connect();