
var express = require('express');
var router = express.Router();
var Note = require('../modle/note').Note
/* GET users listing. */
router.get('/notes', function(req, res, next) {
  var opts = {raw: true}
  if(req.session.user){
    opts.where = {
      uid:req.session.user.uid
    }
  }

  Note.findAll({raw:true}).then(function (notes) {
    res.send({status:0,data:notes})
  })
});

router.post('/notes/add',function (req,res,next) {
  // 判断，如果没有登录，通过与后台的约定，返回一个error。
  if (!req.session.user){
    return res.send({status:1,errorMsg:'请登录！'})
  }
  var uid = req.session.user.id
  var note = req.body.note;
  Note.create({text:note,uid:uid}).then(function () {
    res.send({status:0})
  }).catch(function () {
    res.send({status:1,errorMsg:'数据库出错'})
  })
})

router.post('/notes/edit',function (req,res,next) {
  // 判断，如果没有登录，通过与后台的约定，返回一个error。
  if (!req.session.user){
    return res.send({status:1,errorMsg:'请登录！'})
  }
  var uid = req.session.user.id
  var note = req.body.note;
  var noteId = req.body.id
  Note.update({text:note},{where:{id:noteId,uid:uid}}).then(function () {
    console.log(arguments)
    res.send({status:0})
  }).catch(function () {
    res.send({status:1,errorMsg:'更新失败'})
  })
})

router.post('/notes/delete',function (req,res,next) {
  // 判断，如果没有登录，通过与后台的约定，返回一个error。
  if (!req.session.user){
    return res.send({status:1,errorMsg:'请登录！'})
  }
  var uid = req.session.user.id
  var noteId = req.body.id
  Note.destroy({where:{id:noteId,uid:uid}}).then(function () {
    res.send({status:0})
  }).catch(function () {
    res.send({status:1,errorMsg:'更新失败'})
  })
})

module.exports = router;











