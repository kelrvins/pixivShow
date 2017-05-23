import {
    w
} from './wtools';
// import pixs from '../../static/picture.json'

//初始化全局变量
let deviceWidth = document.body.offsetWidth,
    pics = w.$("#allPics").getElementsByTagName("img"),
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
        w.removaAllChildNodes(w.$("#allPics")) //移除所有子节点
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
        w.$("#allPics").appendChild(oFrag)
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
    aftLoadImg(obj, url) {
        let oImg = new Image();
        oImg.onload = () => {
            obj.src = oImg.src;
        }
        oImg.src = url;
    }
    dateChange() {
        let dateTitle = w.$$(".date-show")
        for (let i = 0; i < dateTitle.length; i++) {
            //日期标志距离顶部小于100时切换左上角日期标识
            if (dateTitle[i].getBoundingClientRect().top < 100 && dateTitle[i].getBoundingClientRect().top > 0) {
                // console.log(dateTitle[i].textContent)
                w.$("#headerDateTime").innerHTML = dateTitle[i].textContent.substr(-2)
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

w.addEvent(w.$("#allPics"), "click", function (e) {
    if (e.target && e.target.nodeName == "LABEL") {
        if (!w.hasClass(w.$("#" + e.target.id), "like-F00")) {
            w.addClass(w.$("#" + e.target.id), "like-F00")
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
            w.removeClass(w.$("#" + e.target.id), "like-F00")
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


w.addEvent(w.$("#iLike"), "click", function () {
    if (!showLike) {
        if (window.localStorage && localStorage.like) {
            localLikeStr = localStorage.like.split(',').join('')
            console.log(localLikeStr)
            showLike = true
            w.replaceClass(w.$("#iLike"), "icon-xihuan", "icon-exit")
            pix.pictureRender()
            pix.loadImg(pics)
        } else {
            alert("你还没有收藏。先收藏一个在点试试")
        }
    } else {
        showLike = false
        w.replaceClass(w.$("#iLike"), "icon-exit", "icon-xihuan")
        pix.pictureRender()
        pix.loadImg(pics)
    }
})

window.addEventListener("resize", () => {
    // console.log("orientationchange")
    let getAllPic = w.$("#allPics").getElementsByTagName("img")
    for (let i = 0; i < getAllPic.length; i++) {
        getAllPic[i].height = (getAllPic[i].width / deviceWidth) * getAllPic[i].height
    }
    deviceWidth = document.body.offsetWidth
})

w.addEvent(w.$("#showStyleChange"), "click", function () {
    alert("分页还没做。。")
    if (waterfall) {
        waterfall = false
        w.replaceClass(w.$("#showStyleChange"), "icon-pubu", "icon-ccgl-dingdanchaibing-3")
    } else {
        waterfall = true
        w.replaceClass(w.$("#showStyleChange"), "icon-ccgl-dingdanchaibing-3", "icon-pubu")
    }
})