'use strict';
export default class Download {
    constructor(triggers) {
        this.triggers = document.querySelectorAll(triggers);
        this.path = 'assets/img/mainbg.jpg';
    }

    donwloadItem(path) {
        const elem = document.createElement('a');

        elem.setAttribute('href', path);
        elem.setAttribute('download', 'nice_picture');
        
        elem.addEventListener('click', e => {
            e.stopPropagation();
        });
        elem.style.display = 'none';
        document.body.appendChild(elem);

        elem.click();
        history.pushState('', document.title, window.location.pathname);

        document.body.removeChild(elem);
    }

    init() {
        this.triggers.forEach(item => {
            item.addEventListener('click', () => {
                this.donwloadItem(this.path);
            });
        });
    }
}