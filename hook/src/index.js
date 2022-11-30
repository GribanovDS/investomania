"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0: case 1: t = op; break;
        case 4: _.label++; return { value: op[1], done: false };
        case 5: _.label++; y = op[1]; op = [0]; continue;
        case 7: op = _.ops.pop(); _.trys.pop(); continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
          if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
          if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
          if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
          if (t[2]) _.ops.pop();
          _.trys.pop(); continue;
      }
      op = body.call(thisArg, _);
    } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
    if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
};
exports.__esModule = true;
var dialute_1 = require("dialute");
var textToCommand = function (texts) {
  var text = texts.join(' ');
  text = text.toLocaleLowerCase();
  var down = ['низ'], up = ['верх'], left = ['лево'], right = ['право'];
  var helps = ['справка', 'помог', 'помощи', 'как игр', 'научи', 'почему', 'что делать', 'что умеешь', 'навык'];
  var greets = ['привет', 'здравствуй', 'здарова', 'здорова', 'хай', 'хеллоу'];
  var restarts = ['заново', 'новая игра', 'с начала', 'перезап', 'снова', 'по новой'];
  for (var _i = 0, down_1 = down; _i < down_1.length; _i++) {
    var dir = down_1[_i];
    if (text.includes(dir))
      return { type: 'dir', dir: 'вниз' };
  }
  for (var _a = 0, up_1 = up; _a < up_1.length; _a++) {
    var dir = up_1[_a];
    if (text.includes(dir))
      return { type: 'dir', dir: 'вверх' };
  }
  for (var _b = 0, left_1 = left; _b < left_1.length; _b++) {
    var dir = left_1[_b];
    if (text.includes(dir))
      return { type: 'dir', dir: 'влево' };
  }
  for (var _c = 0, right_1 = right; _c < right_1.length; _c++) {
    var dir = right_1[_c];
    if (text.includes(dir))
      return { type: 'dir', dir: 'вправо' };
  }
  for (var _d = 0, helps_1 = helps; _d < helps_1.length; _d++) {
    var help = helps_1[_d];
    if (text.includes(help))
      return { type: 'help' };
  }
  for (var _e = 0, greets_1 = greets; _e < greets_1.length; _e++) {
    var greet = greets_1[_e];
    if (text.includes(greet))
      return { type: 'greet' };
  }
  for (var _f = 0, restarts_1 = restarts; _f < restarts_1.length; _f++) {
    var restart = restarts_1[_f];
    if (text.includes(restart))
      return { type: 'restart' };
  }
  return { type: 'fail' };
};
function script(r) {
  var rsp, movePhrases, maleFailPhrases, femaleFailPhrases, officialGreets, unOfficialGreets, _a, gender, appeal, phrase, phraseIndex, phraseIndex, texts, command, dir, phraseIndex, phraseIndex, phraseIndex, phraseIndex, phraseIndex;
  var _b;
  return __generator(this, function (_c) {
    switch (_c.label) {
      case 0:
        rsp = r.buildRsp();
        movePhrases = ['Двигаю', 'Сдвигаю', 'Перемещаю', 'Переношу'];
        maleFailPhrases = ['Я пока не выучил эту команду', 'Расшифровка этого займет несколько часов',
          'Над этим мне нужно подумать', 'Разработчики работают над добавлением этой команды',
          'Скоро я пойму, что это значит'];
        femaleFailPhrases = ['Я пока не выучила эту команду', 'Расшифровка этого займет несколько часов',
          'Над этим мне нужно подумать', 'Разработчики работают над добавлением этой команды',
          'Скоро я пойму, что это значит'];
        officialGreets = ['Приветствую', 'Здравствуйте'];
        unOfficialGreets = ['Привет', 'Привет-привет', 'Салют'];
        _a = r.body.payload.character, gender = _a.gender, appeal = _a.appeal;
        if (appeal === 'official') {
          phraseIndex = Math.floor(Math.random() * officialGreets.length);
          phrase = officialGreets[phraseIndex];
        }
        else {
          phraseIndex = Math.floor(Math.random() * unOfficialGreets.length);
          phrase = unOfficialGreets[phraseIndex];
        }
        rsp.msg = phrase;
        rsp.data = { type: 'init' };
        return [4 /*yield*/, rsp];
      case 1:
        _c.sent();
        _c.label = 2;
      case 2:
        if (!true) return [3 /*break*/, 4];
        if (r.type === 'SERVER_ACTION' && ((_b = r.act) === null || _b === void 0 ? void 0 : _b.action_id) === 'your_action_id') {
          // from front to back actions with assistant.sendData;
        }
        else if (r.type === 'MESSAGE_TO_SKILL') {
          texts = r.nlu.texts;
          command = textToCommand(texts);
          if (command.type === 'dir') {
            dir = command.dir;
            phraseIndex = Math.floor(Math.random() * movePhrases.length);
            rsp.msg = movePhrases[phraseIndex] + ' ' + dir;
            rsp.data = { type: 'direction', dir: dir };
          }
          else if (command.type === 'fail') {
            if (gender == 'male') {
              phraseIndex = Math.floor(Math.random() * maleFailPhrases.length);
              phrase = maleFailPhrases[phraseIndex];
            }
            else {
              phraseIndex = Math.floor(Math.random() * femaleFailPhrases.length);
              phrase = femaleFailPhrases[phraseIndex];
            }
            rsp.msg = phrase;
            rsp.data = command;
          }
          else if (command.type === 'help') {
            rsp.msg = '';
            rsp.data = command;
          }
          else if (command.type === 'greet') {
            if (appeal === 'official') {
              phraseIndex = Math.floor(Math.random() * officialGreets.length);
              phrase = officialGreets[phraseIndex];
            }
            else {
              phraseIndex = Math.floor(Math.random() * unOfficialGreets.length);
              phrase = unOfficialGreets[phraseIndex];
            }
            rsp.msg = phrase;
            rsp.data = command;
          }
          else if (command.type === 'restart') {
            rsp.msg = '';
            rsp.data = command;
          }
        }
        return [4 /*yield*/, rsp];
      case 3:
        _c.sent();
        return [3 /*break*/, 2];
      case 4: return [2 /*return*/];
    }
  });
}
dialute_1.Dialute
    .fromEntrypoint(script)
    .shareApp('../app/public')
    .start();
