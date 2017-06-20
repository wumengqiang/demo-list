var vm = new Vue({
    el:'.vue-app',
    data: function(){
        return {
            keycode: '',
            events: [],
            prevent: {
                'keydown': false,
                'compositionstart': false,
                'compositionupdate': false,
                'compositionend': false,
                'input': false,
                'keyup': false,
                'focusin': false,
                'focus': false,
                'focusout': false,
                'blur': false
            }
        }
    },
    methods: {
        record: function(type){

            switch(type){
                case 'keydown':
                    this.keycode = event.keyCode;
                    this.events = [];
                    break;
                case 'focus':
                case 'blur':
                    this.keycode = '';
                    this.events = [];
                    break;
            }

            if(this.prevent[type]){
                event.preventDefault();
                event.stopImmediatePropagation();
            }

            this.events.push(type);
        }
    }
})
