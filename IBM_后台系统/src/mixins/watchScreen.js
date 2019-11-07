/* 
  监听屏幕尺寸的变化，从而进行大小屏切换
*/
const PC_1500 = 1500;
const PC_1200 = 1200;
const IPHONE6_WIDTH = 376; //iphone6设备宽度
const IPHONE4_WIDTH = 320; //iphone4设备宽度
const IPAD_WIDTH = 768; // 标准ipad设备宽度
// const IPAD_WIDTH = 820; // ipad设备宽度
function fnScreenType (num) {
    let w = num;
    let type = '';
    if(w>IPAD_WIDTH){
        type = 1;
    }else{
        type = 2;
    }
    return type;
}
export default {
    data: function () {
        return {
            screenSize: 1, // 1 大屏  2 小屏 
            screenWidth: document.body.clientWidth, // 网页可见区域宽 包括边线
            screenTimer: null, // 定时器
        }
    },
    created () {
        let vm = this;
        vm.screenSize = fnScreenType(document.documentElement.clientWidth || document.body.clientWidth);
    },
    mounted () {
        let vm = this;
        window.onresize = () => {
            return  (() => {
                window.screenWidth = document.body.clientWidth;
                vm.screenWidth = window.screenWidth;
            })()
        }
    },
    watch: {
        screenWidth(val){
            let vm = this;
            // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
            if(!vm.screenTimer){
                // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
                vm.screenWidth = val
                vm.screenTimer = true
                setTimeout(function(){
                    // 打印screenWidth变化的值
                    vm.screenSize = fnScreenType(vm.screenWidth);
                    console.log(vm.screenSize,11111111);
                    vm.screenTimer = false
                },400)
            }
        }
    }
};