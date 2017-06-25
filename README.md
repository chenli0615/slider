# slider
用js原生写的   类似jq的slidedown slideup 效果


用法：
window.onload = function() {
    var btn   = document.getElementById("btn"),
        ele = document.getElementById("id");

    btn.onclick = function() {

        if (ele.offsetHeight === 0) {

            Slider.slideDown(ele, 20);
        } else {

            Slider.slideUp(ele, 20);
        }
    };
};
