/*Это ко сервера. Именно этот скрипт отвечает на запросы из браузера. И извлекает данные из файла
что бы отправить их пользователю.
Код асинхронный. Поэтому последовательность его выполнения не сверху вниз*/

const http = require('http');
const fs = require('fs').promises; //Импортируем файловую система js
const host = 'localhost';
const port = '8000';
const Error404 = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>404</title></head><body id="body"><p>Resource not found</p></body></html>'
//Это страница которая будет отображаться при ошибке 404

//Дальше идут переменные в которые будет хешироваться (сохранятся) внешние и дополнительные ресурсы по типу стилей , картинок, и скриптов
const image = {
	corridor00: null,
	corridor01: null,
	corridor03: null,
	corridor05: null,
	corridor07: null,
	corridor15: null
};
let htmlFILE;
let jsFILE;
let cssFILE;
let faviconIMG;

const requireListener = function(req, res) { //Эта функция запроса, она формирует ответ в зависимости от того какой был url у запроса
	switch (req.url) { //Эта конструкция очень похожа на if..else if
		case '/':
		case '/index.html': //Блок нижу выполниться если req.url равен либо '/' либо '/index.html'
			res.setHeader('Content-Type', 'text/html');
			res.writeHead(200);
			res.end(htmlFILE);
			break
		case '/script.js': //Отправит скрипт jsFILE, если запрос был http://localhost:8000/script.js
			res.setHeader('Content-Type', 'text/javascript');
			res.writeHead(200);
			res.end(jsFILE);
			break
		case '/style.css':
			res.setHeader('Content-Type', 'text/css');
			res.writeHead(200);
			res.end(cssFILE); //вместо end можно использовать write, edn - заканчивает оправку ответа, а вот после write ещё можно что-то до отправить
			break

		case '/image/favicon.png':
			res.setHeader('Content-Type', 'image/png');
			res.writeHead(200);
			res.end(faviconIMG);
			break
		case '/image/corridor_00.png':
			res.setHeader('Content-Type', 'image/png');
			res.writeHead(200);
			res.end(image.corridor00);
			break
		case '/image/corridor_01.png':
			res.setHeader('Content-Type', 'image/png');
			res.writeHead(200);
			res.end(image.corridor01);
			break
		case '/image/corridor_03.png':
			res.setHeader('Content-Type', 'image/png');
			res.writeHead(200); //Устанавливает код ответа, 200 - запрос обработан нормально
			res.end(image.corridor03);
			break
		case '/image/corridor_05.png': //Отправит скрипт image.corridor05, если запрос был http://localhost:8000/image/corridor_05.png
			res.setHeader('Content-Type', 'image/png');
			res.writeHead(200);
			res.end(image.corridor05);
			break
		case '/image/corridor_07.png':
			res.setHeader('Content-Type', 'image/png');
			res.writeHead(200);
			res.end(image.corridor07);
			break
		case '/image/corridor_15.png':
			res.setHeader('Content-Type', 'image/png');
			res.writeHead(200);
			res.end(image.corridor15);
			break
		default: //Это отработчик ошибок, если пользователь ввёл не верный url выведиться страница о том что ресурс не найден, с соответствующим кодом в ответе
			res.setHeader('Content-Type', 'text/html');
			res.writeHead(404); //404 - страница не найдена
			res.end(Error404);
			break
	}
};

const server = http.createServer(requireListener); //Здесь создаёться обект сервера, и передаёться ему функция прослушивания, которая будет обрабатывать http-запросы
getData();
/*Эта функция вызываеться сразу при запуске кода, она получает информацию из внешних источников и ХЕШИРУЕТ их в соответствующие переменные
ХЕШИРУЕТ - означает что они не будут обновлены в переменных даже исходники изменяться, пока не перезапуститься весь этот файл
что бы не нужно было перезапускать файл сервера, но при этом что бы в ответе к запросу были самы актульные данные - нужно
getData() поместить в функцию requireListener в самом начала, перед всеми остальными блоками в функции. при этом
из getData нужно вынести строку server.listen.. влюбое другое место в файле. после строки const server =...*/

async function getData() {
	try {
		htmlFILE = await fs.readFile(__dirname + '\\index.html'); //await - нужен для того что бы асинхронная функция fs.readFile (а точнее "объект класса Promise", который тоже асинхронно выполняеться) что-то вернула, и только после завершения выполнения, код пойдёт дальше
		jsFILE = await fs.readFile(__dirname + '\\script.js'); //await - рабоатет только в асинхроных функциях, поэтому getData - указана как async
		cssFILE = await fs.readFile(__dirname + '\\style.css');

		faviconIMG = await fs.readFile(__dirname + '\\image\\favicon.png');

		//__dirname - особая встроенная переменная js, которая указывает на коталог в котором запущен этот скрипт
		image.corridor00 = await fs.readFile(__dirname + '\\image\\corridor_00.png');
		image.corridor01 = await fs.readFile(__dirname + '\\image\\corridor_01.png');
		image.corridor03 = await fs.readFile(__dirname + '\\image\\corridor_03.png');
		image.corridor05 = await fs.readFile(__dirname + '\\image\\corridor_05.png');
		image.corridor07 = await fs.readFile(__dirname + '\\image\\corridor_07.png');
		image.corridor15 = await fs.readFile(__dirname + '\\image\\corridor_15.png');

		server.listen(port, host, () => {console.log(`Server is running on http://${host}:${port}`)}); //эта строка "запускает" сервер, она заставляет его начать прослушивание запросов по адрессу http://${host}:${port}
	} catch(err) {//Это отработчки ошибок. Если при загрузке файлов возникнет ошибка - в консоль выведется сообщение "Could not read file: ${err}"
		console.error(`Could not read file: ${err}`)
		process.exit(1); //Автоматическийвыход из node для того что бы в консоле можно было работать дальше, не перезапуская её
	}
}