// ==UserScript==
// @name         Auto Next Page
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Tung Do (nhattieunhatkiem@gmail.com)
// @match        *sangtacviet.pro/truyen/*
// @match        *sangtacvietfpt.com/truyen/*
// @match        *sangtacviet.com/truyen/*
// @match        *sangtacviet.me/truyen/*
// @match        *sangtacviet.vip/truyen/*
// @match        *sangtacviet.info/truyen/*
// @match        *14.225.254.182/truyen/*
// @match        *sangtacviet.info/truyen/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sangtacviet.vip
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  setTimeout(() => {document.querySelector('#navnexttop').click()}, 1000);
})();
