'use strict';

export default class CheckInputCyrilic {
    constructor(inputs) {
        this.inputs = document.querySelectorAll(inputs);
    }

    check() {
        this.inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\p{sc=Cyrillic}/gi, '');
            });
            input.addEventListener('keypress', e => {
                if(e.key.match(/[а-яё]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }
}