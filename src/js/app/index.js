
require('less/index.less');

let NoteManager = require('mod/note-manager').NoteManager;
let Event = require('mod/event');
let WaterFall = require('mod/waterfall');

NoteManager.load();

$('.add-note').on('click',function () {
  NoteManager.add()
})
Event.on('waterfall',function () {
  WaterFall.init($('#content'))
})

