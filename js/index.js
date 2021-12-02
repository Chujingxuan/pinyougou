window.addEventListener('load', function () {
    //鼠标经过按钮隐藏
    var arrowl = document.querySelector('.arrow-l');
    var arrowr = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    focus.addEventListener('mouseenter', function () {
        arrowl.style.display = 'block';
        arrowr.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        arrowl.style.display = 'none';
        arrowr.style.display = 'none';
        timer = setInterval(function () {
            //手动调用点击事件
            arrowr.click();
        }, 2000);
    })
    //动态生成小圆圈,同时绑定点击事件
    var ul = focus.querySelector('ul');
    var ol = document.querySelector('.circle');
    var focusWidth = focus.offsetWidth;
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
        li.setAttribute('index', i);
        li.addEventListener('click', function () {
            //排他先清除所有小圆圈的样式
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            //点击小圆圈移动图片
            var index = this.getAttribute('index');
            //获取当前小圆圈的索引号给num和circle
            num = index;
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    //克隆第一张图片放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //点击右侧按钮切换下一张
    var num = 0;
    var circle = 0;
    //节流阀flag
    var flag = true;
    arrowr.addEventListener('click', function () {
        if (flag) {
            flag = false;
            //如果到了最后一张，ul要快速让left值等于0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            //让小圆圈跟着点击事件改变类
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });
    //左侧按钮
    arrowl.addEventListener('click', function () {
        //如果到了第一张，ul要快速让left值等于最后一张图片
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -focusWidth * num + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            //让小圆圈跟着点击事件改变类
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    });
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    };
    //自动播放轮播图
    var timer = setInterval(function () {
        //手动调用点击事件
        arrowr.click();
    }, 2000)
    //固定楼层区域
    var floor = document.querySelector('.floor');
    var fixedtool = document.querySelector('.fixedtool');
    var back = fixedtool.querySelector('.goBack');
    var footer = document.querySelector('.footer');
    var floorTop = floor.offsetTop;
    var fixedTop = fixedtool.offsetTop;
    var footTop = footer.offsetTop;
    document.addEventListener('scroll', function () {
        if (window.pageYOffset >= floorTop) {
            fixedtool.style.position = 'fixed';
            fixedtool.style.top = fixedTop - floorTop + 'px';
            back.style.display = 'block';
        } else {
            fixedtool.style.position = 'absolute';
            fixedtool.style.top = '1200px';
            back.style.display = 'none';
        }
        if (window.pageYOffset >= footTop) {
            fixedtool.style.display = 'none';
        } else {
            fixedtool.style.display = 'block';
        }
    });
    back.addEventListener('click', function () {
        animateY(window, 0);
    });


})