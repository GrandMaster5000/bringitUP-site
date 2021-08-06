'use strict';
import MainSlider from './modules/slider/slider-main';
import VideoPlayer from './modules/playVideo';
import MiniSlider from './modules/slider/slider-mini';
import Differnce from './modules/difference';
import Forms from './modules/form/form';
import CheckInputCyrilic from './modules/form/checkInputCyrilic';
import NumberMask from './modules/form/numberMask';
import MainPrevNext from './modules/slider/slider-mainPrevNext';

window.addEventListener('DOMContentLoaded', () => {
    const slider = new MainSlider({
        btns: '.next',
        container: '.page'
    });
    slider.render();

    const sliderModules = new MainSlider({
        btns: '.next',
        container: '.moduleapp'
    });
    sliderModules.render();

    const prevNext = new MainPrevNext('.prevmodule', '.nextmodule', '.moduleapp');
    prevNext.init();

    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider',
        prev: '.showup__prev',
        next: '.showup__next',
        activeClass: 'card-active',
        animate: true
    });
    showUpSlider.init();

    const modulesSlider =  new MiniSlider({
        container: '.modules__content-slider',
        prev: '.modules__info-btns .slick-prev',
        next: '.modules__info-btns .slick-next',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    });
    modulesSlider.init();

    const feedSlider =  new MiniSlider({
        container: '.feed__slider',
        prev: '.feed__slider .slick-prev',
        next: '.feed__slider .slick-next',
        activeClass: 'feed__item-active'
    });
    feedSlider.init();

    const differenceTenAgo = new Differnce('.officerold', '.officer__card-item', '.plus');
    differenceTenAgo.init();

    const differenceToday = new Differnce('.officernew', '.officer__card-item', '.plus');
    differenceToday.init();

    const player = new VideoPlayer('.showup .play', '.overlay');
    player.init();
    const playerModulePage = new VideoPlayer('.module__video-item .play', '.overlay');
    playerModulePage.init();

    const forms = new Forms('form');
    forms.init();

    const emailInputsChecked = new CheckInputCyrilic('input[type="email"]');
    emailInputsChecked.check();

    const numberMask = new NumberMask('input[name="phone"]');
    numberMask.init();
});