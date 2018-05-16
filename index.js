const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const connect = () => {
  // 如果不是生产环境 就打印日志
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true)
  }
  // mongoose.connect('mongodb://localhost/study');
  // const db = mongoose.connection;
  // db.on('error', console.error.bind(console, 'connection error:'));
  // db.once('open', function() {
  //   console.log('Hello')
  // });
  mongoose.connect('mongodb://localhost/study')
    .then(() => {
      // 定义模版
      const catSchema = new mongoose.Schema({
        name: String
      }, { timestamps: true });
      // 定义模版上的方法
      catSchema.methods.speak = function () {
        console.log(`my name is ${this.name}`)
      };
      // 由模版编译出 model
      const CatsModel = mongoose.model('CatsModel', catSchema);
      // 由 model 创建实体
      const smallCat = new CatsModel({
        name: 'cat2'
      });
      // 测试
      smallCat.speak();
      // 保存
      smallCat.save()
        .then(() => {
          console.log('smallCat saved')
        })
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err)
    })
};

connect();