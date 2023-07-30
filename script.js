let body = document.getElementById('body');
let p = document.createElement('p');
let hello = document.getElementById('H');

p.textContent = 'It is Me!';
/*body.append(p);*/ //Вставляет элемент самым поледним в body
/*hello.insertAdjacentHTML('afterEnd', '<p>It is Me!</p>');*/ // https://learn.javascript.ru/multi-insert#insertadjacent - но второй параметр нельзя вставить как переменную
hello.insertAdjacentElement('afterEnd', p); //работает также как и пред идущий, только в него можно вставлять объекты из переменных типа newElem

/*Также есть вариант использовать совремменый метод :
append/prepend – вставка в конец/начало
before/after – вставка перед/после
replaceWith – замена

Синтаксис :
node.append(...nodes) – вставляет nodes в конец node,
node.prepend(...nodes) – вставляет nodes в начало node,
node.after(...nodes) – вставляет nodes после узла node,
node.before(...nodes) – вставляет nodes перед узлом node,
node.replaceWith(...nodes) – вставляет nodes вместо node.*/