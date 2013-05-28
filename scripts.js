// Drag Drop ver 1.0.0
/* global document: false, window: false */

var dragDrop = (function () {
    'use strict';

    var config = {
        selectID: 'changeBorder',
        containerID: 'container',
        dragClass: 'drag',
        space: 20,
        divWidth: 200,
        startX: 0,
        startY: 0,
        offsetX: 0,
        offsetY: 0
    },
        changeBorder = document.getElementById(config.selectID),
        panel = document.getElementById(config.containerID),
        dragElm = panel.getElementsByClassName(config.dragClass),
        headerHeight = document.getElementsByTagName('header')[0].clientHeight,
        divLength = dragElm.length,
        panelWidth = panel.clientWidth,
        setTop = (window.innerHeight - 202) / 2,
        borderWidth = parseInt(changeBorder.options[changeBorder.selectedIndex].value, 10);

    function getBorderSize(size) {
        var i;
        for (i = 0; i < divLength; i += 1) {
            dragElm[i].style.borderWidth = size + 'px';
        }
    }

    function setDiv(size) {
        var i,
            divWidth = config.divWidth + size * 2,
            leftPos = (panelWidth - divWidth * divLength) / 2,
            div;
        for (i = 0; i < divLength; i += 1) {
            div = dragElm[i];
            div.style.left = leftPos + 'px';
            div.style.top = setTop - headerHeight + 'px';
            leftPos = leftPos + config.divWidth + config.space + size * 2;
        }
    }

    function refreshDiv() {
        var borderWidth = parseInt(changeBorder.options[changeBorder.selectedIndex].value, 10);
        getBorderSize(borderWidth);
        setDiv(borderWidth);
    }

    function animateDiv(event) {
        var evt = event || window.event,
            elm = event.target || event.srcElement,
            posX = evt.pageX,
            posY = evt.pageY;
        elm.style.left = (posX + config.offsetX - config.startX) + 'px';
        elm.style.top = (posY + config.offsetY - config.startY) + 'px';
    }

    function stopAnimate() {
        document.onmousemove = null;
        document.onmouseup = null;
    }

    function moveDiv(event) {
        var elm = event.target || event.srcElement,
            evt = event || window.event;
        config.startX = evt.clientX;
        config.startY = evt.clientY;
        config.offsetX = parseInt(elm.style.left, 10);
        config.offsetY = parseInt(elm.style.top, 10);

        if (elm.tagName.toLowerCase() === 'div') {
            document.onmousemove = animateDiv;
            document.onmouseup = stopAnimate;
        }
    }

    function init() {
        setDiv(borderWidth);
        getBorderSize(borderWidth);
    }

    //attach Change Event
    changeBorder.addEventListener('change', refreshDiv, false);

    //attache mousedown event
    document.addEventListener('mousedown', moveDiv, false);

    return {
        init: init
    };

}());

dragDrop.init();
