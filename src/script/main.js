import {
    w
} from './wtools';
// import pixs from '../../static/picture.json'

let deviceWidth = document.body.offsetWidth,
    pics = w.$("#allPics").getElementsByTagName("img"),
    pixs,//json 文件
    pix//class 对象

class pixShow {
    constructor() {
        this.pictureRender()
        this.loadImg(pics)
        this.dateChange()
    }
    pictureRender() {//渲染图片
        w.removaAllChildNodes(w.$("#allPics"))
        let oFrag = document.createDocumentFragment()
        let keys = []
        for (let key in pixs) {
            keys.push(key)
        }
        keys.sort( (x,y) => {
            return y - x
        })
        for (let k in keys) {
            let p = keys[k]
            let dateShow = document.createElement("div")
            dateShow.className = "date-show"
            dateShow.id = p
            dateShow.innerHTML = p.substr(0, 4) + "/" + p.substr(4, 2) + "/" + p.substr(6)
            oFrag.appendChild(dateShow)
            for (let i in pixs[p]) {
                // console.log(pixs[p][i].pixId)
                let pLi = document.createElement("div"),
                    pLiImg = document.createElement("img"),
                    pLiOpera = document.createElement("div"),
                    pLiContent = document.createElement("p"),
                    pLiLike = document.createElement("p")
                pLi.className = "pix-block"
                pLi.id = pixs[p][i].pixId
                pLiImg.height = deviceWidth / pixs[p][i].pixWidth * pixs[p][i].pixHeight
                pLiImg.dataset.src = pixs[p][i].pixPath
                pLiOpera.className = "pix-opera"
                pLiContent.className = "pix-content"
                pLiContent.innerHTML = pixs[p][i].pixDes
                pLiLike.className = "pix-like iconfont icon-xihuan"
                pLiLike.style.color = pixs[p][i].pixIslike === true ? "#f00" : "#000"
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
            if ((imgs[i].getBoundingClientRect().top - 200) < document.documentElement.clientHeight && !imgs[i].isload) {
                ( (i) => {
                    imgs[i].isload = true
                    setTimeout( () => {
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
        oImg.onload =  () => {
            obj.src = oImg.src;
        }
        oImg.src = url;
    }
    dateChange() {
        let dateTitle = w.$$(".date-show")
        for (let i = 0; i < dateTitle.length; i++) {
            if (dateTitle[i].getBoundingClientRect().top < 100 && dateTitle[i].getBoundingClientRect().top > 0) {
                // console.log(dateTitle[i].textContent)
                w.$("#headerDateTime").innerHTML = dateTitle[i].textContent.substr(-2)
            }
        }
    }
}

const loadJson= () => {
    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange =  () =>{
        if (xhr.readyState == 4 && xhr.status == 200) {
           pixs= JSON.parse(xhr.responseText)
           pix = new pixShow()
        }
    }
    xhr.open("GET", "https://www.easy-mock.com/mock/591a6ae69aba4141cf2322e8/picture/list", true);
    xhr.send();
}

(function () {
    loadJson()
}())

window.onscroll =  () =>{
    pix.loadImg(pics)
    pix.dateChange()

}

window.addEventListener("resize",  () => {
    // console.log("orientationchange")
    let getAllPic = w.$("#allPics").getElementsByTagName("img")
    for (let i = 0; i < getAllPic.length; i++) {
        getAllPic[i].height = (getAllPic[i].width / deviceWidth) * getAllPic[i].height
    }
    deviceWidth = document.body.offsetWidth
});