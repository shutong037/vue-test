// 设置 rem 函数
function setRem () {
	document.documentElement.style.fontSize = 100 * innerWidth / 750 + "px",
            addEventListener("load",
                function() {
                    setTimeout(function() {
                            document.documentElement.style.fontSize = 100 * innerWidth / 750 + "px",
                                window.unit = 100 * innerWidth / 750;
                        },
                        480)
                }),
            addEventListener("orientationchange",
                function() {
                    setTimeout(function() {
                            document.documentElement.style.fontSize = 100 * innerWidth / 750 + "px"
                        },
                        480)
                });
}

// 初始化
setRem()

// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}

