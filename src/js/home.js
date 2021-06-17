import { Templates } from './templates/templates';
import { ContactForm } from './clases/contactForm';
import { Services } from './servercalls/services';
import { Alerts } from './templates/alerts';

class Home {
    constructor() {
        this.services = new Services();
        this.templates = new Templates();
        this.listeners();
        this.services.getPlaces().then(data => {
            let places = data;
            let cardsContainer = document.querySelector('.centers-info');
            let htmltoappend = '';
            places.forEach((place) => {
                htmltoappend += this.templates.cardTemplate(place);

            });
            cardsContainer.innerHTML = htmltoappend;
        });
        this.services.getSubjects().then(data => {
            let subjects = data;
            let subjectsContainer = document.querySelector('.form-select');
            let htmltoappend = '<option hidden value="opt0">-- Seleccione una opción --</option>';
            subjects.forEach((subject) => {
                htmltoappend += this.templates.subjectTemplate(subject);
            });
            subjectsContainer.innerHTML = htmltoappend;
        });
    }

    listeners() {
        let services = new Services();
        let alerts = new Alerts();
        let btns = document.querySelectorAll('.submit-btn');
        btns[0].click(checkForm());

        document.querySelectorAll('.required-text').forEach((el) => {
            el.style.visibility = "hidden";
        });

        btns.forEach(x => {
            x.addEventListener("click", () => {
                let form = document.getElementById(x.dataset.form);
                let formData = new FormData(form);
                //---sendData debe ir false---
                let sendData = true;

                if (sendData == true) {
                    let contactForm = new ContactForm(
                        formData.get('username'),
                        parseInt(formData.get('userid')),
                        formData.get('subject'),
                        formData.get('userphone'),
                        formData.get('email'),
                        formData.get('msg')
                    );

                    services.postForms(contactForm)
                        .then(async (response) => {
                            if (response.status === 200) {
                                const x = await Promise.resolve("Información enviada!");
                                return await Promise.reject(x, alert(x));
                            }
                            const responseInJson = await Promise.resolve(response.json());
                            return await Promise.reject(alerts.contactFormError(responseInJson));
                        })
                        .catch(e => {
                            console.log(e);
                        })
                }
            });
        });
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