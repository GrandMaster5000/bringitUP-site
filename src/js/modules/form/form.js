'use strict';

export default class Forms {
    constructor(form) {
        this.form = document.querySelectorAll(form);
        this.message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...',
        };
        this.path = {
            question: 'assets/question.php'
        };
    }



    async postData(url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    }

    clearInputs(){
        const inputs = document.body.querySelectorAll('input');
    
        inputs.forEach(item => {
            item.value = '';
        });
    };


    init() {
        this.form.forEach(item => {
            item.addEventListener('submit', e =>{
                e.preventDefault();
                
                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                statusMessage.textContent = this.message.loading;
                statusMessage.style.marginTop = '20px';
                statusMessage.style.fontWeight = '800';
                item.parentNode.appendChild(statusMessage);
                
                const formData = new FormData(item);
                let api = this.path.question;
    
    
                this.postData(api, formData)
                    .then(res => {
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();  
                        }, 5000);
                    });
                
            });
        });
    }
}

