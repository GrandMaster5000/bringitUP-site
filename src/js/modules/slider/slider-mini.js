'use strict';

import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(`${this.activeClass}`);
            if(this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        this.slides[0].classList.add(this.activeClass);

        if(this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    bindTriggers() {
        let buttonsInSlider = false;
        this.slides.forEach(slide => {
            if(slide.getAttribute('type') == 'button') {
                buttonsInSlider = true;
            }
        });
        this.next.addEventListener('click', () => {
            if(buttonsInSlider) {
                this.slides[this.slides.length - 2].before(this.slides[0]);
            } else {
                this.container.appendChild(this.slides[0]);
            }
            this.decorizeSlides();
        });

        this.prev.addEventListener('click', () => {
            let active;
            if(buttonsInSlider) {
                active = this.slides[this.slides.length - 3];
            } else {
                active =  this.slides[this.slides.length - 1];
            }

            this.container.prepend(active);
            this.decorizeSlides();
        });
    }

    init() {
       try {
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
            `; 
            this.bindTriggers();
            this.decorizeSlides();

            if(this.autoplay) {
            let autoplayInterval = setInterval(() => this.next.click(), 5000);
            [this.prev, this.next].forEach(btn => {
                    btn.addEventListener('pointerover', () => {
                        clearInterval(autoplayInterval);
                    });
                    btn.addEventListener('pointerout', () => {
                        autoplayInterval = setInterval(() => this.next.click(), 5000);
                    });
            });
            }
       } catch(e) {}
    }
}