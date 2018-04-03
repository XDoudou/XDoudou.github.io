window.onload = function () {
    var oNaul = document.getElementById("nav-ul"),
        aNali = oNaul.getElementsByTagName("li"),
        aNaspan = oNaul.getElementsByTagName("span"),
        aNap = oNaul.getElementsByTagName("p"),
        oFooter = document.getElementsByTagName("footer")[0],
        oFoota3 = oFooter.getElementsByTagName("span")[2],
        oRder = document.getElementById("order"),
        orderi = oRder.getElementsByTagName("i")[0],
        oCover = document.getElementById("cover"),
        //获取html
        html = document.getElementsByTagName("html")[0],
        //获取屏幕宽度
        width = html.getBoundingClientRect().width;
    transForm(oRder, "translateX", width);
    oRder.style.display = "block";
    transForm(oRder, "translateZ", 0.01);
    function xianshi() {
        oRder.style.display = "block";
        oCover.style.display = "block";
        oRder.style.transition = ".5s";
        transForm(oRder, "translateX", 0);
    }
    function yingcang() {
        oRder.style.transition = ".3s";
        transForm(oRder, "translateX", width);
        setTimeout(function () {
            oCover.style.display = "none";
        }, 500);
    }
    oFoota3.addEventListener("touchstart", xianshi, false);
    orderi.addEventListener("touchstart", yingcang, false);
    oFoota3.addEventListener("click", xianshi, false);
    orderi.addEventListener("click", yingcang, false);
    var mySwiper1 = new Swiper('.pag-all', {
        direction: 'horizontal',
        autoHeight: true,
        onSlideChangeStart: function (swiper) {
            mind(swiper.activeIndex);
            Swip(swiper.activeIndex);
        },
        onInit: function (swiper) {
            for (var i = 0; i < aNali.length; i++) {
                aNali[i].index = i;
                aNali[i].addEventListener("touchstart", function () {
                    mySwiper1.slideTo(this.index, 1000, false);
                    mind(swiper.activeIndex);
                    Swip(swiper.activeIndex);
                }, false)
                aNali[i].addEventListener("click", function () {
                    mySwiper1.slideTo(this.index, 1000, false);
                    mind(swiper.activeIndex);
                    Swip(swiper.activeIndex);
                }, false)
            }
            aSwper = swiper.activeIndex;
        },
    })
    function mind(num) {
        for (var i = 0; i < aNali.length; i++) {
            aNap[i].style.color = "#666666";
            aNali[i].className = "";
        }
        aNap[num].style.color = "#1c69d4";
        aNali[num].className = "active";
        if (num == 0) {
            aNaspan[1].style.backgroundPosition = "0 -.38rem";
            aNaspan[2].style.backgroundPosition = "0 -.78rem";
            aNaspan[3].style.backgroundPosition = "0 -1.2rem";
            aNaspan[num].style.backgroundPositionX = "-.4rem";
        } else if (num == 1) {
            aNaspan[0].style.backgroundPositionX = "0";
            aNaspan[2].style.backgroundPosition = "0 -.78rem";
            aNaspan[3].style.backgroundPosition = "0 -1.2rem";
            aNaspan[num].style.backgroundPosition = "-.4rem -.38rem";
        } else if (num == 2) {
            aNaspan[0].style.backgroundPositionX = "0";
            aNaspan[1].style.backgroundPosition = "0 -.38rem";
            aNaspan[3].style.backgroundPosition = "0 -1.2rem";
            aNaspan[num].style.backgroundPosition = "-.4rem -.78rem";
        } else {
            aNaspan[0].style.backgroundPositionX = "0";
            aNaspan[1].style.backgroundPosition = "0 -.38rem";
            aNaspan[2].style.backgroundPosition = "0 -.78rem";
            aNaspan[num].style.backgroundPosition = "-.4rem -1.2rem";
        }
    }
    function Swip(n) {
        if (n != 0) {
            oFooter.style.display = "none";
        } else {
            oFooter.style.display = "block";
        }
    }
    var mySwiper2 = new Swiper('.bm-lunbo', {
        direction: 'horizontal',
        loop: true,
        autoplay: 3000,
        // 如果需要分页器
        pagination: '.swiper-pagination',
    })
    var mySwiper3 = new Swiper('.cont-bmcar', {
        direction: 'horizontal',
        loop: true,
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
    })
    var mySwiper4 = new Swiper('.video-bmcar', {
        direction: 'horizontal',
        loop: true,
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
    })

    var overscroll = function (el) {
        el.addEventListener('touchstart', function () {
            var top = el.scrollTop,
                totalScroll = el.scrollHeight,
                currentScroll = top + el.offsetHeight;
            if (top === 0) {
                el.scrollTop = 1;
            } else if (currentScroll === totalScroll) {
                el.scrollTop = top - 1;
            }
        });

        el.addEventListener('touchmove', function (evt) {
            if (el.offsetHeight < el.scrollHeight)
                evt._isScroller = true;
        });
    };
    overscroll(document.querySelector('.scroll'));
    document.body.addEventListener('touchmove', function (evt) {
        if (!evt._isScroller) {
            evt.preventDefault();
        }
    });
}