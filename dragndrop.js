'use strict';
const images = document.querySelectorAll('img');
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
    console.log('нажатие:' + EO);
    EO.preventDefault();
    currElem = EO.target;
    mousePrevLeft = EO.pageX;
    mousePrevTop = EO.pageY;
    window.addEventListener('mousemove', elemMousemove);
}

function elemMouseup (EO) {
    console.log('снятие:' + EO);
    EO = EO || window.event;
    EO.preventDefault();
    window.removeEventListener('mousemove', elemMousemove);
}

function elemMousemove (EO) {
    EO = EO || window.event;
    console.log('события движений:' + EO);
    EO.preventDefault();
    const mouseLeft = EO.pageX - mousePrevLeft;
    const mouseTop = EO.pageY - mousePrevTop;
    const position = getElementPos(currElem);
    currElem.style.left = (position.left + mouseLeft) + 'px';
    currElem.style.top = (position.top + mouseTop) + 'px';
    mousePrevLeft = EO.pageX;
    mousePrevTop = EO.pageY;
}

