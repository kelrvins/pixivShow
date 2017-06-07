/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var insert = __webpack_require__(3);
var normalize = __webpack_require__(4);

insert(normalize);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wtools__ = __webpack_require__(6);

// import pixs from '../../static/picture.json'

//初始化全局变量
let deviceWidth = document.body.offsetWidth,
    pics = __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#allPics").getElementsByTagName("img"),
    pixs, //json 文件
    pix, //class 对象
    showLike = false, //
    localLikeStr, //localstorage 
    waterfall = true //t:waterfall  f:paging  是否为瀑布流


class pixShow {
    constructor() {
        this.pictureRender()
        this.loadImg(pics)
        this.dateChange()
    }
    //渲染图片
    pictureRender() {
        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].removaAllChildNodes(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#allPics")) //移除所有子节点
        let oFrag = document.createDocumentFragment()
        let keys = []
        //解决json被浏览器自动排序的问题
        for (let key in pixs) {
            keys.push(key)
        }
        //倒序输出
        keys.sort((x, y) => {
            return y - x
        })
        for (let k in keys) {
            let p = keys[k]
            let dateShow = document.createElement("div")
            dateShow.className = "date-show"
            dateShow.id = p
            dateShow.innerHTML = p.substr(0, 4) + "/" + p.substr(4, 2) + "/" + p.substr(6)
            if (!showLike) {
                oFrag.appendChild(dateShow)
            }
            for (let i in pixs[p]) {
                //若是收藏模式切在localstorage中不能查询到此图片id，跳出循环
                if (showLike && localLikeStr.indexOf(pixs[p][i].pixId) < 0) {
                    break
                }
                let pLi = document.createElement("div"),
                    pLiImg = document.createElement("img"),
                    pLiOpera = document.createElement("div"),
                    pLiContent = document.createElement("p"),
                    pLiLike = document.createElement("label")
                pLi.className = "pix-block"
                pLi.id = pixs[p][i].pixId
                //图片高度=设备宽度/图片原宽*图片原高
                pLiImg.height = deviceWidth / pixs[p][i].pixWidth * pixs[p][i].pixHeight
                pLiImg.dataset.src = pixs[p][i].pixPath
                pLiOpera.className = "pix-opera"
                pLiContent.className = "pix-content"
                pLiContent.innerHTML = pixs[p][i].pixDes
                pLiLike.className = "pix-like iconfont icon-xihuan"
                pLiLike.dataset.id = pixs[p][i].pixId
                pLiLike.id = "like" + pixs[p][i].pixId
                //如果localstorage可用且存在此数据，改变颜色
                if (window.localStorage && localStorage.like) {
                    if (localLikeStr.indexOf(pixs[p][i].pixId) >= 0) {
                        pLiLike.classList.add("like-F00")
                    }
                }
                pLiOpera.appendChild(pLiContent)
                pLiOpera.appendChild(pLiLike)
                pLi.appendChild(pLiImg)
                pLi.appendChild(pLiOpera)
                oFrag.appendChild(pLi)
            }
        }
        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#allPics").appendChild(oFrag)
    }
    loadImg(imgs) {
        for (let i = 0, len = imgs.length; i < len; i++) {
            //若图片顶部距离屏幕底部小于200px
            if ((imgs[i].getBoundingClientRect().top - 200) < document.documentElement.clientHeight && !imgs[i].isload) {
                ((i) => {
                    imgs[i].isload = true
                    setTimeout(() => {
                        if (imgs[i].dataset) {
                            pix.aftLoadImg(imgs[i], imgs[i].dataset.src);
                        } else {
                            pix.aftLoadImg(imgs[i], imgs[i].getAttribute("data-src"));
                        }
                    }, 500)
                    imgs[i].style.cssText = "transition: 0.5s; opacity: 1;"
                })(i);
            }
        }
    }
    //延迟加载
    aftLoadImg(obj, url) {
        let oImg = new Image();
        oImg.onload = () => {
            obj.src = oImg.src;
        }
        oImg.src = url;
    }
    dateChange() {
        let dateTitle = __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$$(".date-show")
        for (let i = 0; i < dateTitle.length; i++) {
            //日期标志距离顶部小于100时切换左上角日期标识
            if (dateTitle[i].getBoundingClientRect().top < 100 && dateTitle[i].getBoundingClientRect().top > 0) {
                // console.log(dateTitle[i].textContent)
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#headerDateTime").innerHTML = dateTitle[i].textContent.substr(-2)
            }
        }
    }
}

const loadJson = () => {
    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP")
    }
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            pixs = JSON.parse(xhr.responseText)
            pix = new pixShow()
        }
    }
    xhr.open("GET", "https://www.easy-mock.com/mock/591a6ae69aba4141cf2322e8/picture/list", true)
    xhr.send();
}

(function () {
    if (window.localStorage) {
        if (localStorage.like) {
            localLikeStr = localStorage.like
        }
        loadJson()
    } else {
        alert("not support  localstorage")
    }
}())

window.onscroll = () => {
    pix.loadImg(pics)
    pix.dateChange()
}

__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#allPics"), "click", function (e) {
    if (e.target && e.target.nodeName == "LABEL") {
        if (!__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].hasClass(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#" + e.target.id), "like-F00")) {
            __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addClass(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#" + e.target.id), "like-F00")
            if (window.localStorage) {
                if (localStorage.like) {
                    if (localStorage.like.indexOf(e.target.dataset.id) < 0) {
                        localStorage.setItem("like", localStorage.like += "," + e.target.dataset.id)
                    }
                } else {
                    localStorage.setItem("like", e.target.dataset.id)
                }
            }
        } else {
            __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].removeClass(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#" + e.target.id), "like-F00")
            if (localStorage.like) {
                let cancelNo = localStorage.like.indexOf(e.target.dataset.id),
                    localLike = localStorage.like
                if (cancelNo == 0) {
                    localStorage.setItem("like", localLike.substr(cancelNo + 11))
                } else {
                    localStorage.setItem("like", localLike.substr(0, cancelNo - 1) + localLike.substr(cancelNo + 10))
                }
            }
        }
    }
})


__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#iLike"), "click", function () {
    if (!showLike) {
        if (window.localStorage && localStorage.like) {
            localLikeStr = localStorage.like.split(',').join('')
            console.log(localLikeStr)
            showLike = true
            __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].replaceClass(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#iLike"), "icon-xihuan", "icon-exit")
            pix.pictureRender()
            pix.loadImg(pics)
        } else {
            alert("你还没有收藏。先收藏一个在点试试")
        }
    } else {
        showLike = false
        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].replaceClass(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#iLike"), "icon-exit", "icon-xihuan")
        pix.pictureRender()
        pix.loadImg(pics)
    }
})

window.addEventListener("resize", () => {
    // console.log("orientationchange")
    let getAllPic = __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#allPics").getElementsByTagName("img")
    for (let i = 0; i < getAllPic.length; i++) {
        getAllPic[i].height = (getAllPic[i].width / deviceWidth) * getAllPic[i].height
    }
    deviceWidth = document.body.offsetWidth
})

__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#showStyleChange"), "click", function () {
    alert("分页还没做。。")
    if (waterfall) {
        waterfall = false
        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].replaceClass(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#showStyleChange"), "icon-pubu", "icon-ccgl-dingdanchaibing-3")
    } else {
        waterfall = true
        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].replaceClass(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#showStyleChange"), "icon-ccgl-dingdanchaibing-3", "icon-pubu")
    }
})

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var inserted = [];

module.exports = function (css) {
    if (inserted.indexOf(css) >= 0) return;
    inserted.push(css);
    
    var elem = document.createElement('style');
    var text = document.createTextNode(css);
    elem.appendChild(text);
    
    if (document.head.childNodes.length) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
    }
    else {
        document.head.appendChild(elem);
    }
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "/*! normalize.css v2.1.3 | MIT License | git.io/normalize */\n\n/* ==========================================================================\n   HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined in IE 8/9.\n */\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nnav,\nsection,\nsummary {\n    display: block;\n}\n\n/**\n * Correct `inline-block` display not defined in IE 8/9.\n */\n\naudio,\ncanvas,\nvideo {\n    display: inline-block;\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n    display: none;\n    height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9.\n * Hide the `template` element in IE, Safari, and Firefox < 22.\n */\n\n[hidden],\ntemplate {\n    display: none;\n}\n\n/* ==========================================================================\n   Base\n   ========================================================================== */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS text size adjust after orientation change, without disabling\n *    user zoom.\n */\n\nhtml {\n    font-family: sans-serif; /* 1 */\n    -ms-text-size-adjust: 100%; /* 2 */\n    -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n    margin: 0;\n}\n\n/* ==========================================================================\n   Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n    background: transparent;\n}\n\n/**\n * Address `outline` inconsistency between Chrome and other browsers.\n */\n\na:focus {\n    outline: thin dotted;\n}\n\n/**\n * Improve readability when focused and also mouse hovered in all browsers.\n */\n\na:active,\na:hover {\n    outline: 0;\n}\n\n/* ==========================================================================\n   Typography\n   ========================================================================== */\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari 5, and Chrome.\n */\n\nh1 {\n    font-size: 2em;\n    margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9, Safari 5, and Chrome.\n */\n\nabbr[title] {\n    border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari 5, and Chrome.\n */\n\nb,\nstrong {\n    font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari 5 and Chrome.\n */\n\ndfn {\n    font-style: italic;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n    -moz-box-sizing: content-box;\n    box-sizing: content-box;\n    height: 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n    background: #ff0;\n    color: #000;\n}\n\n/**\n * Correct font family set oddly in Safari 5 and Chrome.\n */\n\ncode,\nkbd,\npre,\nsamp {\n    font-family: monospace, serif;\n    font-size: 1em;\n}\n\n/**\n * Improve readability of pre-formatted text in all browsers.\n */\n\npre {\n    white-space: pre-wrap;\n}\n\n/**\n * Set consistent quote types.\n */\n\nq {\n    quotes: \"\\201C\" \"\\201D\" \"\\2018\" \"\\2019\";\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n    font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub,\nsup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n}\n\nsup {\n    top: -0.5em;\n}\n\nsub {\n    bottom: -0.25em;\n}\n\n/* ==========================================================================\n   Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9.\n */\n\nimg {\n    border: 0;\n}\n\n/**\n * Correct overflow displayed oddly in IE 9.\n */\n\nsvg:not(:root) {\n    overflow: hidden;\n}\n\n/* ==========================================================================\n   Figures\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari 5.\n */\n\nfigure {\n    margin: 0;\n}\n\n/* ==========================================================================\n   Forms\n   ========================================================================== */\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n    border: 1px solid #c0c0c0;\n    margin: 0 2px;\n    padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n    border: 0; /* 1 */\n    padding: 0; /* 2 */\n}\n\n/**\n * 1. Correct font family not being inherited in all browsers.\n * 2. Correct font size not being inherited in all browsers.\n * 3. Address margins set differently in Firefox 4+, Safari 5, and Chrome.\n */\n\nbutton,\ninput,\nselect,\ntextarea {\n    font-family: inherit; /* 1 */\n    font-size: 100%; /* 2 */\n    margin: 0; /* 3 */\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\nbutton,\ninput {\n    line-height: normal;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Chrome, Safari 5+, and IE 8+.\n * Correct `select` style inheritance in Firefox 4+ and Opera.\n */\n\nbutton,\nselect {\n    text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton,\nhtml input[type=\"button\"], /* 1 */\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n    -webkit-appearance: button; /* 2 */\n    cursor: pointer; /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled],\nhtml input[disabled] {\n    cursor: default;\n}\n\n/**\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n    box-sizing: border-box; /* 1 */\n    padding: 0; /* 2 */\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari 5 and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari 5 and Chrome\n *    (include `-moz` to future-proof).\n */\n\ninput[type=\"search\"] {\n    -webkit-appearance: textfield; /* 1 */\n    -moz-box-sizing: content-box;\n    -webkit-box-sizing: content-box; /* 2 */\n    box-sizing: content-box;\n}\n\n/**\n * Remove inner padding and search cancel button in Safari 5 and Chrome\n * on OS X.\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n    -webkit-appearance: none;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n    border: 0;\n    padding: 0;\n}\n\n/**\n * 1. Remove default vertical scrollbar in IE 8/9.\n * 2. Improve readability and alignment in all browsers.\n */\n\ntextarea {\n    overflow: auto; /* 1 */\n    vertical-align: top; /* 2 */\n}\n\n/* ==========================================================================\n   Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n    border-collapse: collapse;\n    border-spacing: 0;\n}\n"


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(0);
__webpack_require__(2);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 自用框架
 * import { w } from './wtool';
 * w.$('node')  获取单个元素
 * w.$$('node')  获取多个的元素
 * w.hasClass(elementId, cName)  检查元素是否有指定class
 * w.addClass(elementId, cName)  添加class
 * w.replaceClass(elementId, cName,nName)  替换class
 * w.removeClass(elementId, cName)   删除class
 * w.removaAllChildNodes(elementId)   删除所有子节点
 * w.addEvent(elementId, event, func)  添加事件
 * w.formatSeconds(value)  把数值格式化为时间
 * w.attr(node, attr, newVal)  获取或设置元素属性 newVal为空是为查询
 */

const w = {
    /**
     * 获取单个的元素
     * 
     * @param {String} selector
     * @param {Element} [context=document]
     * @returns {Element} element
     */
    $: (selector, context = document) => {
        if (context instanceof NodeList) {
            return Array.from(context, node => {
                return node.querySelector(selector);
            })
        }
        return context.querySelector(selector);
    },

    /**
     * 获取多个的元素
     * 
     * @param {String} selector
     * @param {Element} [context=document]
     * @returns {Element} element
     */
    $$: (selector, context = document) => {
        if (context instanceof NodeList) {
            return Array.from(context, node => {
                return node.querySelectorAll(selector);
            })
        }
        return context.querySelectorAll(selector);
    },
    /**
     * 检查元素是否有指定class
     * 
     * @param {String} cName
     * @param {Element} elementId
     * @returns {boolean} boolean
     */
    hasClass(elementId, cName) {
        return !!elementId.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
    },
    /**
     * 元素添加class
     * 
     * @param {String} cName
     * @param {Element} elementId
     */
    addClass(elementId, cName) {
        if (!w.hasClass(elementId, cName)) {
            elementId.className += " " + cName;
        }
    },
    /**
     * 元素替换class
     * 
     * @param {Element} elementId
     * @param {String} cName
     * @param {String} nName
     */
    replaceClass(elementId, cName, nName) {
        w.removeClass(elementId, cName)
        w.addClass(elementId, nName)
    },
    /**
     * 元素删除class
     * 
     * @param {String} cName
     * @param {Element} elementId
     */
    removeClass(elementId, cName) {
        if (w.hasClass(elementId, cName)) {
            elementId.className = elementId.className.replace(new RegExp('(^|\\b)' + cName.split(' ').join('|') + '(\\b|$)', 'gi'), '');
        }
    },
    /**
     * 删除所有子节点
     * 
     * @param {Element} elementId
     */
    removaAllChildNodes(elementId) {
        var childs = elementId.childNodes;
        for (var i = childs.length - 1; i >= 0; i--) {
            elementId.removeChild(childs.item(i));
        }
    },

    /**
     * 获取或设置元素属性
     * 
     * @param {Element} node
     * @param {String} attr
     * @param {String} [newVal=null]
     * @returns {String} element's attribute value or null
     */
    attr: (node, attr, newVal = null) => {
        if (newVal) {
            node.setAttribute(attr, newVal);
            return;
        }
        return node.getAttribute(attr);
    },
    /**
     * 添加事件
     * 
     * @param {Element} elementId
     * @param {String} event
     * @param {String} func
     */
    addEvent(elementId, event = click, func) {
        if (elementId != null) {
            if (elementId.addEventListener) {
                elementId.addEventListener(event, func, false);
            } else if (elementId.attachEvent) {
                elementId.attachEvent('on' + event, func);
            } else {
                elementId['on' + event] = func;
            }
        } else {
            console.log("elementId:null")
            return false
        }
    },
    /**
     * 将数值格式化为时间
     * 
     * @param {String} value
     * @returns {String} timr or NaN
     */
    formatSeconds(value) {
        var minute = parseInt(value / 60)
        var second = parseInt(value - minute * 60)
        var result
        second = (second >= 10) ? second : '0' + second
        result = minute + ":" + second
        if (result == "NaN:NaN") {
            return "--:--"
        } else {
            return result
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = w;


/***/ })
/******/ ]);