'use strict';

const container = document.querySelector('#container');
const images = container.querySelectorAll('img');
let mousePrevLeft = 0;
let mousePrevTop = 0;
let currElem;
window.addEventListener('load', start);

function start() {
    for (let elem of images) {
        const position = getElementPos(elem);
        elem.style.left = position.left + 'px';
        elem.style.top = position.top + 'px';
        elem.addEventListener('mousedown', elemMousedown);
        elem.addEventListener('mouseup', elemMouseup);
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

function elemMousedown (EO) {
    EO = EO || window.event;
    EO.preventDefault();
    // console.log('нажатие:' + EO);
    currElem = EO.target;
    mousePrevLeft = EO.pageX;
    mousePrevTop = EO.pageY;
    container.appendChild(currElem);
    currElem.style.cursor = 'grabbing';
    window.addEventListener('mousemove', elemMousemove);
}

function elemMouseup (EO) {
    EO = EO || window.event;
    EO.preventDefault();
    // console.log('снятие:' + EO);
    currElem.style.cursor = 'auto';
    window.removeEventListener('mousemove', elemMousemove);
}

function elemMousemove (EO) {
    EO = EO || window.event;
    EO.preventDefault();
    // console.log('события движений:' + EO);
    const mouseLeft = EO.pageX - mousePrevLeft;
    const mouseTop = EO.pageY - mousePrevTop;
    const position = getElementPos(currElem);
    currElem.style.left = (position.left + mouseLeft) + 'px';
    currElem.style.top = (position.top + mouseTop) + 'px';
    mousePrevLeft = EO.pageX;
    mousePrevTop = EO.pageY;
}