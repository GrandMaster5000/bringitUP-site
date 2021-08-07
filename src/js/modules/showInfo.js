'use strict';

export default class ShowInfo {
    constructor(trigger) {
        this.trigger = document.querySelectorAll(trigger);
    }

    triggersInit() {
        this.trigger.forEach(item => {
            item.addEventListener('click', () => {
                if(getComputedStyle(item.nextElementSibling).display === 'none') {
                    item.nextElementSibling.classList.add('animate__animated', 'animate__fadeIn');
                    item.nextElementSibling.style.display = 'block';
                } else {
                    item.nextElementSibling.style.display = 'none';
                }
            });
        });
    }
}