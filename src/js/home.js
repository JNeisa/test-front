import { cardTemplate } from './templates/templates';
import ContacForm from './clases/contactForm';
import { Services } from './servercalls/services';
import { NULL } from 'node-sass';

class Home {
    constructor() {
        this.services = new Services();
        this.listeners();
        this.setFormValidation();
        this.services.getPlaces().then(data => {
            let places = data;
            let cardsContainer = document.querySelector('.centers-info');
            let htmltoappend = '';
            places.forEach((place) => {
                htmltoappend += cardTemplate(place);

            });
            cardsContainer.innerHTML = htmltoappend;
        });
    }

    listeners() {
        let services = new Services();
        let btns = document.querySelectorAll('.submit-btn');
        btns[0].click(checkForm());

        document.querySelectorAll('.required-text').forEach(function (el) {
            el.style.visibility = "hidden";
        });

        btns.forEach(x => {
            x.addEventListener("click", () => {
                let form = document.getElementById(x.dataset.form);
                let formData = new FormData(form);
                //---sendData debe ir false---
                let sendData = true;

                for (let pair of formData) {
                    /*if (pair[0] == "subject") {
                        if (pair[1] == 'opt0') {
                            let input = document.querySelector('select[name=subject]');
                            input.parentElement.querySelector('.required-text').innerHTML = 'Opción invalida';
                            input.parentElement.querySelector('.required-text').style.visibility = "visible";
                            alert('Faltan campos por llenar');
                            break;*
                        }else{
                            sendData = true;
                        }
                    } else if (pair[1] == "") {
                        let input = document.getElementById(pair[0]);
                        input.parentElement.querySelector('.required-text').style.visibility = "visible";
                        input.focus();
                        alert('Faltan campos por llenar');
                        break;
                    } else {
                        sendData = true;
                    }*/
                }

                if (sendData == true /*&& formData.get('subject') != "opt0"*/) {
                    alert("Información enviada exitosamente!");
                    let contactForm = new ContacForm(
                        formData.get('username'),
                        parseInt(formData.get('userid')),
                        formData.get('subject'),
                        formData.get('userphone'),
                        formData.get('email'),
                        formData.get('msg')
                    );

                    services.postForms(contactForm);
                }
            });
        });
    }

    setFormValidation() {
        /*document.querySelector('input[name=username]').addEventListener('keypress', (e) => {
            let key = e.key;
            let regexp = /[a-zA-Z0-9 ]/;

            if (!regexp.exec(key)) {
                e.preventDefault();
            }
        });*/

        /*document.querySelector('input[name=userid]').addEventListener('keypress', (e) => {
            let key = e.key;
            let numbers = /[0-9]/;

            if (!numbers.exec(key)) {
                e.preventDefault();
            }
        });*/

        /*document.querySelector('input[name=userphone]').addEventListener('keypress', (e) => {
            let key = e.key;
            let numbers = /[0-9+]/;

            if (!numbers.exec(key)) {
                e.preventDefault();
            }
        });*/
    }
}

function checkForm() {
    let btns = document.querySelectorAll('.submit-btn');
    let form = document.getElementById("contactus-form");
    let formData = new FormData(form);
    let checked = true;

    for (let pair of formData) {
        if (pair[1] == "") {
            checked = false;
        }
    }

    if (checked) {
        btns[0].disabled = false;
    } else {
        btns[0].disabled = true;
    }
}

window.addEventListener("load", new Home());
window.addEventListener("keyup", checkForm);