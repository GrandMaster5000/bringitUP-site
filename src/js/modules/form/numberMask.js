'use strict';

export default class NumberMask {
    constructor(inputs) {
        this.inputs = document.querySelectorAll(inputs);
    }

    
    createMask(event) {
        let matrix = '+1 (___) ___-__-__',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');
        
        if(def.length >= val.length) {
            val = def;
        }
        
        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });
        
        function setCursorPosition(pos, elem) {
            elem.focus();
    
            if(elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        }
        if(event.type === 'blur') {
            if(this.value.length == 2)  {
                this.value = '';
            }
        } else {
            setCursorPosition(this.value.length, this);
        }
    }

    init() {
        this.inputs.forEach(input => {
            input.addEventListener('input', this.createMask);
            input.addEventListener('focus', this.createMask);
            input.addEventListener('blur', this.createMask);
        });
    }
}