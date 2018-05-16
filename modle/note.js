// 用于操作数据库
var Sequelize = require('sequelize')
var path = require('path')

var sequelize = new Sequelize(undefined,undefined,undefined,{
  host:'localhost',
  dialect:'sqlite',

  // SQLite only
  storage:path.join(__dirname,'../database/database.sqlite')
})

// sequelize
// .authenticate()
// .then(function (err) {
//   console.log('Connection has been established successfully.')
// })
// .catch(function (err) {
//   console.log('Unable to connect to the database:',err)
// })


// 1. 定义一个表结构
var Note = sequelize.define('note',{
  text:{
    type:Sequelize.STRING
  },
  uid:{
    type:Sequelize.STRING
  }
})

// 先删除原始存在的，在重新创建。
// Note.sync({force:true})

// 上面的结构会默认在database中的database.sqlite中创建一个表结构

// 默认情况下sequelize会另外创建几条信息比如    id：1， 添加字段：hello，创建时间：122419896，更新时间：23211342

/*
// 2.查看数据库中是否存在表结构，如果不存在则重新定义一个表结构, 该操作是异步操作
Note.sync().then(function () {
  // 3.创建一条数据
  Note.create({text:'hello'});
}).then(function () {
  // 4.查找数据，并且展示数据
  Note.findAll({raw:true}).then(function (notes) {
    console.log(notes)
  })
})
*/
// Note.findAll({raw:true,where:{id:2}}).then(function (notes) {
//   console.log(notes)
// })
module.exports.Note = Note