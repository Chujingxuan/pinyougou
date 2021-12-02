function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        obj.step = (target - obj.offsetLeft) / 10;
        obj.step = obj.step > 0 ? Math.ceil(obj.step) : Math.floor(obj.step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            /* if (callback) {
                callback();
            } */
            callback && callback();
        } else {
            obj.style.left = obj.offsetLeft + obj.step + 'px';
        }
    }, 15);
};
function animateY(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        obj.step = (target - window.pageYOffset) / 10;
        obj.step = obj.step > 0 ? Math.ceil(obj.step) : Math.floor(obj.step);
        if (window.pageYOffset == target) {
            clearInterval(obj.timer);
            /* if (callback) {
                callback();
            } */
            callback && callback();
        } else {
            window.scroll(0, window.pageYOffset + obj.step);
        }
    }, 15);
}