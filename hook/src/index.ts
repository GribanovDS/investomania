import { Dialute, SberRequest, SberResponse } from 'dialute';
const textToCommand = (texts: string[]) => {
    console.log('textToCommand in index.ts');
    let text = texts.join(' ');
    text = text.toLocaleLowerCase();

    let smartapp = ['викторин'];
    let start = ['начни','играть','начать','игр']
    let greet = ['привет','добрый','салют','доброе','здравствуй'];
    let help = ['помо','справка','что делать'];
    let close = ['закончить','стоп','конец','останови','заново', 'главн', 'меню', 'начать заново']
    let rules = ['правила','мануал']
    let value = ['оцен'];

    for (let dir of smartapp) {
        if (text.includes(dir)) return {type: 'smartapp'};
    }
    for (let dir of close) {
        if (text.includes(dir)) return {type: 'close'};
    }
    for (let dir of start) {
        if (text.includes(dir)) return {type: 'start'};
    }
    for (let dir of help) {
        if (text.includes(dir)) return {type: 'help'};
    }
    for (let dir of rules) {
        if (text.includes(dir)) return {type: 'rules'};
    }
    for (let dir of greet) {
        if (text.includes(dir)) return {type: 'greet'};
    }
    for (let dir of value) {
        if (text.includes(dir)) return {type: 'value'};
    }
    return {type: 'fail'};
}

function* script(r: SberRequest, rs: SberResponse) {
    let GuessedRightPhrases = ['Так держать!', 'Превосходно!', 'Замечательно!', 'Хорошая работа!', 'Легко!', 'Гениально'];
    let GuessedWrongPhrases = ['Ничего страшного!', 'Сложный вопрос!', 'Не всё так плохо!', 'Неприятности случаются'];
    let rsp = r.buildRsp();
    rsp.kbrd = ['Оценить','Помощь'];
    
    let phrase;
    let phraseIndex;
    let {gender, appeal} = r.body.payload.character;
    phrase = `Добро пожаловать в игру «Викторина по финансовой грамотности»! Здесь ${(appeal === 'official' ? 'вы можете' : 'ты можешь')} не только проверить свои знания в финансовой грамотности, но и научиться зарабатывать деньги на инвестициях!`;
    rsp.msg = phrase;
    rsp.data = {type: 'init'};
    yield rsp;

    while (true) {
        rsp = r.buildRsp();
        rsp.kbrd = ['Оценить','Помощь'];
        gender = r.body.payload.character.gender;
        appeal = r.body.payload.character.appeal;
        let fail_messages = [`Я пока не ${(gender === 'male' ? 'выучил' : 'выучила')} эту команду. Лучше ${(appeal === 'official' ? 'скажите' : 'скажи')} «помощь», возможно, это чем-то поможет`, `Расшифровка этого займет несколько часов. Лучше ${(appeal === 'official' ? 'скажите' : 'скажи')} «помощь», возможно, это чем-то поможет`,
    `Над этим мне нужно подумать. Лучше ${(appeal === 'official' ? 'скажите' : 'скажи')} «помощь», возможно, это чем-то поможет`, `Разработчики работают над добавлением этой команды. Лучше ${(appeal === 'official' ? 'скажите' : 'скажи')} «помощь», возможно, это чем-то поможет`,
    `Скоро я пойму, что это значит. Лучше ${(appeal === 'official' ? 'скажите' : 'скажи')} «помощь», возможно, это чем-то поможет`];
        let start_messages = [`${(appeal === 'official' ? 'Приготовьтесь' : 'Приготовься')}, сейчас будут вопросы!`, `Ну что? Проверим ${(appeal === 'official' ? 'вашу' : 'твою')} эрудицию!`, `${(appeal === 'official' ? 'Готовы показать вашу' : 'Готов показать свою')} финансовую грамотность?`,`Желаю ${(appeal === 'official' ? 'вам' : 'тебе')} удачи в ответах на вопросы!`]
        if (r.type === 'SERVER_ACTION') {
            console.log(r.act?.action_id);
            if (r.act?.action_id === 'help') {
            rsp.data = {type: 'help'}
            rsp.msg = `В данной игре ${(appeal === 'official' ? 'вы можете' : 'ты можешь')} не только проверить свои знания в финансовой грамотности, но и научиться зарабатывать деньги на инвестициях! Для этого ${(appeal === 'official' ? 'вы будете' : 'ты будешь')} отвечать на вопросы с разными вариантами ответа. Если до сих пор что-то не понятно, то ${(appeal === 'official' ? 'скажите или нажмите' : 'скажи или нажми')} «правила»`;
            } else if (r.act?.action_id === 'start') {
                rsp.kbrd = ['Оценить','Правила'];
                let phraseIndex = Math.floor(Math.random() * start_messages.length);
                phrase = start_messages[phraseIndex] + ` Чтобы вернуться в главное меню ${(appeal === 'official' ? 'нажмите вправо или скажите' : 'нажми вправо или скажи')} «стоп»`;
                rsp.msg = phrase;
                rsp.data = {type: 'start'};
            } else if (r.act?.action_id === 'rules') {
                rsp.msg = `Данная игра разделена на два блока. В первом блоке «Эрудиция» ${(appeal === 'official' ? 'вам' : 'тебе')} надо будет ответить на вопросы на тему основ финансовой грамотности. 
                За каждый правильный ответ будут начисляться внутриигровые деньги. Во втором блоке «Инвестиция» ${(appeal === 'official' ? 'вам' : 'тебе')} нужно будет вложить свои заработанные средства, чтобы заработать больше. 
                ${(appeal === 'official' ? 'Помните' : 'Помни')}, что иногда ${(appeal === 'official' ? 'ваши' : 'твои')} инвестиции могут оказаться убыточными. Удачи!`;
                rsp.data = {type: 'rules'};
            }
            else if (r.act?.action_id === 'close') {
                rsp.kbrd = ['Оценить','Помощь'];
                rsp.data = {type: 'close'};
            }
            else if (r.act?.action_id === 'good') {
                console.log(r.act?.number);
                if (r.act?.number != 10) {
                rsp.kbrd = ['Оценить','Помощь'];
                phraseIndex = Math.floor(Math.random() * GuessedRightPhrases.length);
                rsp.msg = GuessedRightPhrases[phraseIndex];
                rsp.data = {type: 'good'};
                }
            }
            else if (r.act?.action_id === 'bad') {
                console.log(r.act?.number);
                if (r.act?.number != 10) {
                rsp.kbrd = ['Оценить','Помощь'];
                phraseIndex = Math.floor(Math.random() * GuessedWrongPhrases.length);
                rsp.msg = GuessedWrongPhrases[phraseIndex];
                rsp.data = {type: 'bad'};
                }
            }
            else if (r.act?.action_id === 'norm') {
                console.log(r.act?.number);
                if (r.act?.number != 10) {
                rsp.kbrd = ['Оценить','Помощь'];
                rsp.msg = 'Ничего не заработано, но ничего и не потеряно!';
                rsp.data = {type: 'norm'};
                }
            }
            else if (r.act?.action_id === 'completed') {
                rsp.kbrd = ['Оценить','Помощь'];
                rsp.msg = `Поздравляю! Первый блок вопросов подошёл к концу`;
                rsp.data = {type: 'completed'};
            }
            else if (r.act?.action_id === 'completed invest') {
                rsp.kbrd = ['Оценить','Помощь'];
                rsp.msg = `Поздравляю! Второй блок вопросов подошёл к концу`;
                rsp.data = {type: 'completed invest'};
            }
            else if (r.act?.action_id === 'congratulations') {
                rsp.kbrd = ['Оценить','Помощь'];
                rsp.msg = `На этом «Викторина по финансовой грамотности» подошла к концу. ${(appeal === 'official' ? 'Ваш' : 'Твой')} результат сейчас можно увидеть на экране. Скорее  ${(appeal === 'official' ? 'поделитесь' : 'поделись')} им в о́тзывах к приложению! Спасибо за игру!`;
                rsp.data = {type: 'congratulations'};
            }
        } else if (r.type == "RATING_RESULT") {
            //Пользовательская оценка. От 1 до 5
            rsp.data = {type: 'mark'};
            rsp.msg = 'Спасибо за оценку!';            
        } else if (r.type === 'MESSAGE_TO_SKILL') {
            let texts = r.nlu.texts;
            let command = textToCommand(texts);
            if (command.type === 'close') {
                rsp.data = command;
            } else if (command.type === 'help') {
                rsp.data = command;
                rsp.msg = `В данной игре ${(appeal === 'official' ? 'вы можете' : 'ты можешь')} не только проверить свои знания в финансовой грамотности, но и научиться зарабатывать деньги на инвестициях! Для этого ${(appeal === 'official' ? 'вы будете' : 'ты будешь')} отвечать на вопросы с разными вариантами ответа. Если до сих пор что-то не понятно, то ${(appeal === 'official' ? 'скажите или нажмите' : 'скажи или нажми')} «правила»`;
            } else if (command.type === 'start') {
                rsp.kbrd = ['Оценить','Правила'];
                let phraseIndex = Math.floor(Math.random() * start_messages.length);
                phrase = start_messages[phraseIndex];
                rsp.msg = phrase;
                rsp.data = command;
            } else if (command.type === 'greet') {
                    rsp.msg =  `Добро пожаловать в игру «Викторина по финансовой грамотности»! Здесь ${(appeal === 'official' ? 'вы можете' : 'ты можешь')} не только проверить свои знания в финансовой грамотности, но и научиться зарабатывать деньги на инвестициях!`;
                    rsp.data = command;
            } else if (command.type === 'smartapp') {
                    rsp.msg = `Добро пожаловать в игру «Викторина по финансовой грамотности»! Здесь ${(appeal === 'official' ? 'вы можете' : 'ты можешь')} не только проверить свои знания в финансовой грамотности, но и научиться зарабатывать деньги на инвестициях!`;
                    rsp.data = command;
            }
            else if (command.type === 'rules') {
                rsp.msg = `Данная игра разделена на два блока. В первом блоке «Эрудиция» ${(appeal === 'official' ? 'вам' : 'тебе')} надо будет ответить на вопросы на тему основ финансовой грамотности. 
                За каждый правильный ответ будут начисляться внутриигровые деньги. Во втором блоке «Инвестиция» ${(appeal === 'official' ? 'вам' : 'тебе')} нужно будет вложить свои заработанные средства, чтобы заработать больше. 
                ${(appeal === 'official' ? 'Помните' : 'Помни')}, что иногда ${(appeal === 'official' ? 'ваши' : 'твои')} инвестиции могут оказаться убыточными. Удачи!`;
                rsp.data = {type: 'rules'};
            }
            else if (command.type === 'value') {
                rsp.msg = 'Оценивание';
                rsp.data = command;
                rsp.body.messageName = 'CALL_RATING';
            }
            else if (command.type === 'fail') {
                let phraseIndex = Math.floor(Math.random() * fail_messages.length);
                phrase = fail_messages[phraseIndex];
                rsp.msg = phrase;
                rsp.data = command;
            }
            console.log(command);
        }
        else{
            rsp.msg = '';
            rsp.data = {};
        }
        yield rsp;
    }
}

Dialute
    .fromEntrypoint(script as GeneratorFunction)
    .start();
