'use strict';
import MainSlider from "./slider-main";

export default class MainPrevNext extends MainSlider{
    constructor (prev, next) {
        super();
        this.prev = prev;
        this.next = next;
    }

    init() {
        if(this.container) {
            document.querySelectorAll(this.prev).forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    this.pluseSlides(-1);
                });
            });
            document.querySelectorAll(this.next).forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    this.pluseSlides(1);
                });
            });
        }
    }
}