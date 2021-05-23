window.onload = function () {

    const qrBox = document.querySelector(".qrCode .box");
    const triangle = document.querySelector(".triangle");
    const qrImg = document.getElementById("qr");
    qrBox.onmouseenter = function () {
        triangle.style.opacity = "1";
        qrImg.style.opacity = "1";
    };
    qrBox.onmouseleave = function () {
        triangle.style.opacity = "0";
        qrImg.style.opacity = "0";
    }

    // pc端轮播图 
    const arrow_l = document.querySelector(".arrow_l");
    const arrow_r = document.querySelector(".arrow_r");
    const carousel = document.querySelector(".carousel");

    let num = 0; // 箭头切换图片
    let circle = 0; //箭头切换圆点

    // 绑定箭头显示隐藏事件
    carousel.addEventListener("mouseenter", function () {
        // arrow_l.style.display = "block";
        // arrow_r.style.display = "block";
        arrow_l.style.opacity = "1";
        arrow_r.style.opacity = "1";
        clearInterval(timer);
        timer = null;
    })
    carousel.addEventListener("mouseleave", function () {
        arrow_l.style.opacity = "0";
        arrow_r.style.opacity = "0";
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000);
    })

    // 动态生成圆点,点击改变轮播图片
    const ul = carousel.querySelector(".carousel_img");
    const ol = carousel.querySelector(".carousel_nav");
    // console.log(ul.children.length);
    for (let i = 0; i < ul.children.length; i++) {
        const li = document.createElement("li");
        li.setAttribute("data-index", i);
        ol.appendChild(li);
        li.addEventListener("click", function () {
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = "";
            }
            this.className = "current";
            var index = this.getAttribute("data-index");
            animate(ul, -index * 600);
            num = index;
            circle = index;
        })
    }

    ol.children[0].className = "current";
    //克隆第一个图片实现无缝切换
    const first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    let dtl = document.querySelector(".project_dtl");
    // 箭头绑定轮播图片事件 
    arrow_r.addEventListener("click", function () {
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * 600);

        circle++;
        if (circle == ul.children.length - 1) {
            circle = 0;
        }
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = "";
        }
        ol.children[circle].className = "current";
    })

    arrow_l.addEventListener("click", function () {
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * 600 + "px";
        }
        num--;
        animate(ul, -num * 600);

        circle--;
        if (circle == -1) {
            circle = ol.children.length - 1;
        }
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = "";
        }
        ol.children[circle].className = "current";
    })

    var timer = setInterval(function () {
        arrow_r.click();
    }, 2000);

    // 侧边栏
    const slider_bar = document.querySelector(".slider_bar");
    let slider_top = slider_bar.offsetTop - 200 + "px"; // 便固定定位后剧上边距俩
    document.addEventListener("scroll", function () {
        // console.log(window.pageYOffset > 200); 
        if (window.pageYOffset >= 200) {
            slider_bar.style.position = "fixed";
            slider_bar.style.top = slider_top;
        } else {
            slider_bar.style.position = "absolute";
            slider_bar.style.top = 250 + "px";
        }
    })
    // 侧边栏 滚动动画
    function windowAnimate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var step = (target - window.pageYOffset) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (Math.abs(window.pageYOffset - target) < 0.6)
            // if (window.pageYOffset == target)
            {
                clearInterval(obj.timer);
                callback && callback();
                // alert(11);
            }
            window.scroll(0, window.pageYOffset + step);
        }, 4)
    }
    // 侧边栏 滚回顶部
    var goBack = document.querySelector(".goBack a");
    goBack.addEventListener("click", function () {
        windowAnimate(window, 0)
    })
    // 侧边栏 滚到个人简介
    var slider_main = document.querySelector(".slider_main");
    slider_main.addEventListener("click", function () {
        windowAnimate(window, 65);
    })
    // 侧边栏 滚到项目介绍
    var slider_project = document.querySelector(".slider_project");
    slider_project.addEventListener("click", function () {
        windowAnimate(window, 1300);
    })
    // var a = document.querySelector("#aa");
    // alert(a.offsetTop)

    // 移动端轮播图
    var m_carousel = document.querySelector(".m_carousel");
    var m_carousel_img = m_carousel.children[0];
    var m_index = 0;
    var w = m_carousel.offsetWidth;
    m_carousel_img.timer = setInterval(function () {
        m_index++;
        var m_step = -w * m_index;

        m_carousel_img.style.transform = "translateX("+m_step+"px)";
    }, 2000);
    m_carousel_img.addEventListener("transitionend", function() {
        if(m_index = 3) {
            m_index = 0;
            m_carousel_img.style.transition = "none";
            var m_step = -m_index * w;
            m_carousel_img.style.transform = "translateX("+m_step+"px)";
        }
    })
}
