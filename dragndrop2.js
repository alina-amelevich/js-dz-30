'use strict';

const images = container.querySelectorAll('img');
let diffMouseMinusImgX = 0;
let diffMouseMinusImgY = 0;
let currElem;
window.addEventListener('load', start);

function start() {
    for (let elem of images) {
        const position = getElementPos(elem);
        elem.style.left = position.left + 'px';
        elem.style.top = position.top + 'px';
        elem.addEventListener('mousedown', mousedown);
        elem.addEventListener('mouseup', mouseup);
    }
    for (let elem of images) {
        elem.style.position = 'absolute';
    }
}

function getElementPos(elem) {
    const bbox = elem.getBoundingClientRect();
    return {
      left: bbox.left + window.pageXOffset,
      top: bbox.top + window.pageYOffset
    };
}

function mousedown (EO) {
    EO = EO || window.event;
    EO.preventDefault();
    currElem = EO.target;
    const position = getElementPos(currElem);
    diffMouseMinusImgX = EO.pageX - position.left;
    diffMouseMinusImgY = EO.pageY - position.top;
    container.appendChild(currElem);
    currElem.style.cursor = 'grabbing';
    window.addEventListener('mousemove', mousemove);
    
    // Проверки:
    // console.log('нажатие:' + EO);
    // console.log('EO.target: ' + EO.target);
    // console.log('EO.pageY: ' + EO.pageY + '\n' + 'EO.pageX: ' + EO.pageX + '\n' + 'diffMouseMinusImgY: ' + diffMouseMinusImgY);
    // console.log('элемент: ' + currElem);
}

function mouseup (EO) {
    EO = EO || window.event;
    EO.preventDefault();
    window.removeEventListener('mousemove', mousemove);
    currElem.style.cursor = 'auto';

    // Проверки:
    // console.log('снятие:' + EO);
    // console.log('курсор: ' + currElem.style.cursor);
}

function mousemove (EO) {
    EO = EO || window.event;
    EO.preventDefault();
    currElem.style.left = (EO.pageX - diffMouseMinusImgX) + 'px';
    currElem.style.top = (EO.pageY - diffMouseMinusImgY) + 'px';
    
    // Проверки:
    // console.log('события движений:' + EO);
    // console.log('курсор: ' + currElem.style.cursor);
    // console.log(EO.pageY);
}