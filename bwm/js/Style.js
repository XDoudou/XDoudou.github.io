//获取元素的属性
function getStyle(obj, attr) {
    //currentStyle兼容ie
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

//获取或设置元素的transform的属性和值(设置的元素，设置的属性，设置的值) 
//如果要获取transform的值,必须是通过这个函数设置，才能通过这个函数获取
function transForm(el, attr, val) {
    //如果元素没有transform这个属性，就添加一个transform属性为对象
    if (!el.transform) {
        el.transform = {};
    }

    //如果参数有三个说明是设置元素的transform属性的值
    if (arguments.length > 2) {
        //如果元素有transform这个属性，就给这个元素的transform添加attr的值为val
        el.transform[attr] = val;
        //创建一个变量来储存元素transform的属性+属性值（字符串形式）
        var sVal = '';
        //遍历一下元素的transform的属性
        for (var i in el.transform) {
            //如果元素的transform的属性是一下四个值，那么单位就是deg
            if (i == 'rotate' || i == 'skewX' || i == 'skewY' || i == 'rotateZ' || i == 'rotateX' || i == 'rotateY') {
                sVal = i + '(' + el.transform[i] + 'deg) '
                //举例：rotate(100deg)
            }

            //如果元素的transform的属性是一下两个值，那么单位就是px
            else if (i == 'translateX' || i == 'translateY' || i == 'ranslateZ') {
                sVal = i + '(' + el.transform[i] + 'px) '
                //举例：translateX(100px)
            }

            //如果元素的transform的属性是一下四个值，那么就没有单位
            else if (i == 'scaleZ' || i == 'scaleX' || i == 'scaleY' || i == 'scale') {
                sVal = i + '(' + el.transform[i] + ') '
                //举例：scaleX(100)
            }
        }
        //注意加前缀，把储存的属性+属性值赋值到元素的transform上
        el.style.WebkitTansform = el.style.transform = sVal;
    }
    //如果参数只有两个，说明是获取transform属性上的值
    else {
        //获取transform属性的值就等于el.transform[attr]
        val = el.transform[attr];
        //当初始化，或者你没设置过元素上的transform的属性的值时，这个值是为undefined
        if (typeof val == 'undefined') {
            //如果没设置过属性值的属性为以下时（缩放默认为1倍）这个属性值为1
            if (attr == 'scale' || attr == 'scaleX' || attr == "scaleY" || attr == 'scaleZ') {
                val = 1;
            }
            //否则属性值为0，其他的默认值为0
            else {
                val = 0;
            }
        }
        //返回要获取的属性值
        return val;
    }
}


//滚动条
function gundong(box, isScroll) {
    //获取所有元素
    var conTent = box.children[0];
    //创建滚动条元素
    gundongtiao = document.createElement('span');

    //给滚动条添加样式，滚动条的高=手机高度/内容高度*手机高度(手机高度：内容高度=滚动条高度：手机高度)
    gundongtiao.style.cssText = 'position: absolute;top:0;right:0;background:rgba(0,0,0,0);width:5px;height:' + box.clientHeight / conTent.offsetHeight * box.clientHeight + 'px;border-radius:5px;'

    if (isScroll) {
        box.appendChild(gundongtiao);//把滚动条添加到父元素里
    }
    conTent.addEventListener('touchstart', start, false);
    conTent.addEventListener('touchmove', move, false);
    conTent.addEventListener('touchend', end, false);

    minH = box.clientHeight - conTent.offsetHeight;

    transForm(conTent, 'translateZ', 0.01);//3d硬件加速

    //手指按下时执行的函数
    function start(e) {
        clearInterval(this.timer);//手指按下时清除掉定时器
        this.startPageY = e.changedTouches[0].pageY;//按下时手指的坐标
        this.lastY = this.startY = transForm(this, 'translateY');//元素最后的坐标=手指按下时的坐标
        this.lastDis = this.timeDis = 0;//元素最后的时间差值和距离差值=0
        this.lastTime = new Date().getTime();//最后的时间就等于当前的时间
    }

    //手指移动时执行的函数
    function move(e) {
        gundongtiao.style.background = 'rgba(0,0,0,0.5)';//当手指移动时，滚动条出现
        this.moveTime = new Date().getTime();//移动时的时间
        this.movePageY = e.changedTouches[0].pageY;//移动时手指的坐标
        this.pageDis = this.movePageY - this.startPageY;//移动时手指的坐标-按下时手指的坐标=元素需要移动的距离
        this.moveY = this.startY + this.pageDis;//元素移动时的位置=按下时元素的坐标+元素需要移动的距离
        if (this.moveY > 0) {
            this.moveY *= 0.4;//橡皮筋效果
        }
        if (this.moveY < minH) {
            this.moveY = minH;
        }
        transForm(this, 'translateY', this.moveY);
        this.lastDis = this.moveY - this.lastY;//元素移动完后的差值=元素移动时的位置-元素最后的坐标
        this.timeDis = this.moveTime - this.lastTime;//最后的时间差值=元素移动时的时间-最后一次的时间
        this.lastY = this.moveY;//元素最后的位置=元素移动时的位置
        this.lastTime = this.moveTime;//最后的时间=元素移动时的时间
    }

    //手指抬起时执行的函数
    function end(e) {
        if (this.timeDis == '0') {//因为不管任何数除以0都是等于Infinity所以当时差等于0的时候，就代表没有移动，就不执行接下来的代码
            return;
        }
        this.speed = this.lastDis / this.timeDis;//速度=距离/时间
        this.Target = this.speed * 300 + transForm(this, 'translateY');//元素的最终位置=速度*300+元素现在的位置，速度越大距离越远，速度越小距离越近
        if (this.Target > 0) {
            this.Target = 0;
        }
        if (this.Target < minH) {
            this.Target = minH;
        }
        //用定时器做的动画效果
        mTween({
            el: this,//需要运动的元素
            target: {
                translateY: this.Target,//需要运动的属性和终点值，这个是一个对象，可以同时运动
            },
            time: Math.abs(this.speed * 300),//时间
            type: 'easeOut',//动画效果,
            callIn: function () {//动画运行时执行的函数
                transForm(gundongtiao, 'translateY', -transForm(this, 'translateY') * (box.clientHeight / conTent.offsetHeight))
            },
            callBack: function () {//动画执行完执行的函数
                setTimeout(function () {
                    gundongtiao.style.webkitTransition = '100ms';
                    gundongtiao.style.background = 'rgba(0,0,0,0)';//动画执行完后300ms'滚动条慢慢消失
                }, 300)
            }
        })
    }
}

//多指操作
function setGesture(inti) {
    var el = inti.el;
    if (!el) return;

    var scaleStart = 0;
    var isGesture = false;
    var startPoint = [];

    //斜率  Math.atan2(y,x)  由一条直线与x轴正方向所成的角的正切 返回值的弧度
    //角度转弧度  Math.PI/180
    //弧度转角度  rad*180/Math.PI

    el.addEventListener('touchstart', function (e) {
        if (e.touches.length >= 2) {
            isGesture = true;//记录进行了多指操作

            startPoint[0] = { x: e.touches[0].pageX, y: e.touches[0].pageY };
            startPoint[1] = { x: e.touches[1].pageX, y: e.touches[1].pageY };

            inti.start && inti.start.call(el, e);//手指按下时执行
        }
    });
    el.addEventListener('touchmove', function (e) {
        if (e.touches.length >= 2 && isGesture) {
            var nowPoint = []; //移动时手指的坐标点
            nowPoint[0] = { x: e.touches[0].pageX, y: e.touches[0].pageY };
            nowPoint[1] = { x: e.touches[1].pageX, y: e.touches[1].pageY };
            var startDis = getDis(startPoint[1], startPoint[0]);
            var nowDis = getDis(nowPoint[1], nowPoint[0]);
            e.scale = nowDis / startDis;//手指移动时的距离与开始时的手指距离的比值

            var startDeg = getDeg(startPoint[1], startPoint[0]);
            var nowDeg = getDeg(nowPoint[1], nowPoint[0]);
            e.rotation = nowDeg - startDeg;//多指旋转的角度

            inti.change && inti.change.call(el, e);//手指移动时执行
        }
    });
    el.addEventListener('touchend', function (e) {
        if (isGesture) {
            //e.touches:当前屏幕的手指列表  e.targetTouches：当前元素的手指列表
            if (e.touches.length < 2 || e.targetTouches.length < 1) {
                isGesture = false;
                inti.end && inti.end.call(el, e);//手指抬起时执行
            }
        }
    });
}

function getDis(point1, point2) {
    var x = point2.x - point1.x;
    var y = point2.y - point1.y;
    return Math.sqrt(x * x + y * y);
}
function getDeg(point1, point2) {
    var x = point2.x - point1.x;
    var y = point2.y - point1.y;
    return Math.atan2(y, x) * 180 / Math.PI;
}