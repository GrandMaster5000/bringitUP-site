'use strict';

export default class Differnce {
    constructor(container, items, trigger) {
        this.container = document.querySelector(container);
        this.items = this.container.querySelectorAll(items);
        this.trigger = this.container.querySelector(trigger);
    }

    showItem() {
        for(let i = 0; i <= this.items.length - 1; i++) {
            if(this.items[i].contains(this.trigger)) {
                let counter = 0;
                this.trigger.addEventListener('click', () => {
                    this.items[counter].classList.add('animate__animated', 'animate__fadeIn');
                    this.items[counter].style.display = 'flex';

                    if(this.items[counter] == this.items[this.items.length - 2]) {
                        this.items[i].classList.add('animate__animated', 'animate__fadeOut');
                    }
                    
                    if(this.items[counter] != this.items[i]) {
                        counter++;
                    }
                });
            } else {
                this.items[i].style.display = 'none';
            }
        }


    }

    init() {
        this.showItem();
    }
}