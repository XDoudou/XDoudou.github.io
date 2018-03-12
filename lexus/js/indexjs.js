window.onload=function(){
    var mySwiper = new Swiper('.container', {
        direction: 'horizontal',
        loop: true,

        // 如果需要分页器
        pagination: '.swiper-pagination',

        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoplay: 3000,
        // 如果需要滚动条
        //   scrollbar: '.swiper-scrollbar',
        autoplayDisableOnInteraction: false,
        effect : 'fade'
    })
    var mySwiper2 = new Swiper('.mySwiper2', {
        direction: 'horizontal',
        loop: true,
        effect : 'fade',
        
        // 如果需要分页器
        pagination: '.swiper-pagination',

        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoplay: 3000,
        // 如果需要滚动条
        //   scrollbar: '.swiper-scrollbar',
        autoplayDisableOnInteraction: false,
    })
    var mySwiper3 = new Swiper('.edit-lf', {
        direction: 'horizontal',
        loop: true,

        // 如果需要分页器
        pagination: '.swiper-pagination',

        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoplay: 3000,
        // 如果需要滚动条
        //   scrollbar: '.swiper-scrollbar',
        autoplayDisableOnInteraction: false,
    })
    function lunbo(){
        var mySwiper4 = new Swiper('.edit-lf', {
            direction: 'horizontal',
            loop: true,
    
            // 如果需要分页器
            pagination: '.swiper-pagination',
    
            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            autoplay: 3000,
            // 如果需要滚动条
            //   scrollbar: '.swiper-scrollbar',
            autoplayDisableOnInteraction: false,
        })
    }
// 视频切换
    var oVideo=document.getElementById("video"),
        aVideo=oVideo.getElementsByTagName("video"),
        aVa=oVideo.getElementsByTagName("a"),
//轮播切换
        oEdit=document.getElementById("edit"),
        oEditLc=document.getElementById("edit-lc"),
        aArtic=oEdit.getElementsByTagName("article"),
        aEa=oEditLc.getElementsByTagName("a"),
//表格切换
        oDealer=document.getElementById("dealer"),
        aDa=oDealer.getElementsByTagName("a"),
        aDdiv=oDealer.getElementsByTagName("div"),
//hover
        oBinput=document.getElementById("bm-input");
        oBinput.onmouseover=function(){
            this.style.backgroundPositionY="-46px";
        }
        oBinput.onmouseout=function(){
            this.style.backgroundPositionY="0px"
        }
// 视频切换
    for(var i=0;i<aVa.length;i++){
        aVa[i].index=i;
        aVa[i].onclick=function(){
            if(this.index==0){
                this.style.backgroundPositionY="-231px";
                aVa[this.index+1].style.backgroundPositionY="-292px";
                qiehuan(aVideo,aVideo[this.index],"video-ifram");
            }else{
                this.style.backgroundPositionY="-353px";
                aVa[this.index-1].style.backgroundPositionY="-170px";
                qiehuan(aVideo,aVideo[this.index],"video-ifram");
            }
        }
    }
//轮播切换
    for(var i=0;i<aEa.length;i++){
        aEa[i].index=i;
        aEa[i].onclick=function(){
            if(this.index==0){
                this.style.backgroundPositionY="-469px";
                aEa[this.index+1].style.backgroundPositionY="-524px";
                qiehuan(aArtic,aArtic[this.index],"edit-rs");
                lunbo();
            }else{
                this.style.backgroundPositionY="-579px";
                aEa[this.index-1].style.backgroundPositionY="-414px";
                qiehuan(aArtic,aArtic[this.index],"edit-rs");
                lunbo();
            }
        }
    }
//表格切换
    for(var i=0;i<aDa.length;i++){
        aDa[i].index=i;
        aDa[i].onclick=function(){
            if(this.index==0){
                this.style.backgroundPositionY="-1023px";
                aDa[this.index+1].style.backgroundPositionY="-1060px";
                aDa[this.index+2].style.backgroundPositionY="-1134px";
                qiehuan(aDdiv,aDdiv[this.index],"dealer-div");
            }else if(this.index==1){
                this.style.backgroundPositionY="-1097px";
                aDa[this.index-1].style.backgroundPositionY="-986px";
                aDa[this.index+1].style.backgroundPositionY="-1134px";
                qiehuan(aDdiv,aDdiv[this.index],"dealer-div");
            }else{
                this.style.backgroundPositionY="-1171px";
                aDa[this.index-1].style.backgroundPositionY="-1060px";
                aDa[this.index-2].style.backgroundPositionY="-986px";
                qiehuan(aDdiv,aDdiv[this.index],"dealer-div");
            }
        }
    }

    function qiehuan(h,y,c){
        for(var i=0;i<h.length;i++){
            h[i].className="";
        }
        y.className=c;
    }
//转盘抽奖
    var oLotto=document.getElementById("lotto"),
        oLimg=oLotto.getElementsByTagName("img")[0],
        oCover=document.getElementById("cover"),
        oAlter=oCover.getElementsByTagName("div")[0],
        oP=oCover.getElementsByTagName("p")[0],
        oButton=oCover.getElementsByTagName("button")[0],
        num=60,
        ber,
        on=0,
        timer=null,
        menu=null;
        oLimg.onclick=function(){
            on++;
            if(on==4){
                on=3;
                oCover.style.display="block";
                oP.innerHTML="您已经没有抽奖次数了！"
            }else{
                lotto();
                loj();
            }
        }
        function lotto(){
            ber=Math.random()*1000;
            clearInterval(timer);
            timer=setInterval(function(){
                num+=60;
                oLimg.style.transform="rotate("+num+"deg)";
                },20);
        }
        function loj(){
            clearTimeout(menu);
            menu=setTimeout(function() {
                clearInterval(timer);
                oCover.style.display="block";
                if(num%360==0){
                    oP.innerHTML="恭喜你抽中价值100元的精美礼品一份！";
                    console.log(oP);
                }else if(num%360==120){
                    oP.innerHTML="恭喜你抽中价值500元的加油卡一份！";
                    console.log(oP);
                }
                else if(num%360==240){
                    oP.innerHTML="恭喜你抽中瑞典布鲁雅尔(Blueair)空气净化器，价值人民币4599元一份！";
                    console.log(oP);
                }
                else if(num%360==60||num%360==180||num%360==300){
                    oP.innerHTML="谢谢参与！";
                    console.log(oP);
                }
            },1000+ber);
        }
        oButton.onclick=function(){
            oCover.style.display="none";
        } 
}