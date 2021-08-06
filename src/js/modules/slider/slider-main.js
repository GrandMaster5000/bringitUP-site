'use strict';
import Slider from './slider';
// import MainPrevNext from './slider-mainPrevNext';

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
    }

    showSlides(n) {
        if(n > this.slides.length) {
            this.slideIndex = 1;
        }

        if(n < 1) {
            this.slideIndex = this.slides.length;
        }

        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });

        try {
            if(this.slideIndex == 3) {
    
                this.hanson.style.display = 'none';
    
                setTimeout(() => {
                    this.hanson.style.display = 'block';
                }, 3000);
            } 
        } catch(e) {}

        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    pluseSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    render() {
        if(this.container) {
            try {
                this.hanson = document.querySelector('.hanson');
            } catch(e) {}
    
            this.btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    this.pluseSlides(1);
                });
    
                btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                    e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
                });
            });
    
            this.showSlides(this.slideIndex);
           
        }
        

    }
}