# Описание приложения "Инвестомания: Финансовый Квиз"

Это смартап-викторина на финансовую грамотность, разработанная специально для семейства виртуальных помощников "Салют", созданных в "Сбере". В нее еженедельно заходят около 100 пользователей таких устройств, как: SberBox, SberBox Time, SberBox Top и SberBox Portal.

## Инструкция по использованию

Приложение просто и понятно: обычная викторина с тремя вариантами ответа. Здесь присутствуют два блока: "Эрудиция" и "Инвестиция". В первом - пользователю надо ответить на общие вопросы с несколькими вариантами ответа на тему основ финансовой грамотности. Во втором - нужно будет принимать решение: куда вложить свои средства с целью заработать больше

## Стэк технологий

В приложении используются следующие технологии:

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - язык программирования, который используется для разработки приложения;
- [TypeScript](https://www.typescriptlang.org/docs/) - язык программирования, который используется для разработки приложения; 
- [Dialute](https://github.com/Dikower/Dialute) - библиотека для создания интерфейсов на языке JavaScript;
- [Svelte](https://svelte.dev/docs) - фреймворк для создания пользовательских интерфейсов;
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) и [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - языки разметки и стилей, которые используются для создания веб-страниц.
- [SmartMarket](https://developers.sber.ru/docs/) - документация для разработки смартапов для ассистентов "Салют"

Для разработки приложения я использовал эти технологии вместе с другими инструментами и библиотеками, чтобы создать удобный и понятный интерфейс для пользователей. Если вы хотите узнать больше о каждой из этих технологий, я рекомендую посетить официальные сайты и документацию.

## Установка

1. Клонируйте репозиторий на свой компьютер.
2. Установите Dialute с помощью команды `npm install -g dialute`.
3. Установите пакет с виртуальными ассистентами "Салют" с помощью команды `npm install @sberdevices/assistant-client`.
4. Установите себе клиент [ngrok](https://ngrok.com).
6. Перейдите в папку `app` и напишите `npm run dev`
   ```
   cd app
   npm run dev
      ```
6. Перейдите в папку `hook` и напишите `npm run dev`
   ```
   cd hook
   npm run dev
   ```
 7. Запустите сервер ngrok на 8000 порту командой `./ngrok http 8000`
 8. Перейдите по полученной ссылке!
