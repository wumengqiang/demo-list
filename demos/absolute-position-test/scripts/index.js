
document.addEventListener('DOMContentLoaded', function(){
    var vm = new Vue({
        el:'.vue-app',
        data: function(){
            
            return {
                ep1 : getEp1Info(),
                ep7: getEp7Info()
            }
        },
        methods: {
            record: function(type){
            }
        }
    });

    function getEp1Info(){ // 获取example 1详情
        var el = document.querySelector(".absolute-position"),
            style = window.getComputedStyle(el);
        return JSON.stringify({
            left: style.left,
            right: style.right,
            top: style.top,
            bottom: style.bottom
        });
    }

    function getEp7Info(){
        var el = document.querySelector(".absolute-width-auto"),
            style = window.getComputedStyle(el);
        return  style.width;  
    }

})


