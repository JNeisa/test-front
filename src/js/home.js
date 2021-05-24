class Home {
    constructor() {
        this.listeners();
        this.setFormValidation();
        this.getPlaces().then(data => {
            let places = data;
            let cardsContainer = document.querySelector('.centers-info');
            let htmltoappend = '';
            places.forEach((place) => {
                htmltoappend += this.cardTemplate(place);

            });
            cardsContainer.innerHTML = htmltoappend;
        });
    }

    async getPlaces() {
        const response = await fetch("https://localhost:44371/places", { method: 'GET' });
        return response.json();
    }

    cardTemplate(card) {
        return `<div class="card">
                    <img src="${card.image}" class="center-img">
                    <div class="card-info">
                        <h4 class="center-name">${card.name}</h4>
                        <h5 class="subtitle">Dirección</h5>
                        <p class="sub-info">${card.address}</p>
                        <h5 class="subtitle">PBX</h5>
                        <p class="sub-info">${card.pbx}</p>
                        <p class="sub-info">${card.phone}</p>
                        <h5 class="subtitle">Horario de atención:</h5>
                        <p class="sub-info">${card.schedule}</p>
                    </div>
                </div>`;
    }

    listeners() {
        let btns = document.querySelectorAll('.submit-btn');
        btns[0].click(checkForm());

        document.querySelectorAll('.required-text').forEach(function (el) {
            el.style.visibility = "hidden";
        });

        btns.forEach(x => {
            x.addEventListener("click", () => {
                let form = document.getElementById(x.dataset.form);
                let formData = new FormData(form);
                let sendData = 0;

                for (let pair of formData) {
                    console.log(pair);
                    if (pair[0] == "affair") {
                        if (pair[1] == 'opt0') {
                            let input = document.querySelector('select[name=affair]');
                            input.parentElement.querySelector('.required-text').innerHTML = 'Opción invalida';
                            input.parentElement.querySelector('.required-text').style.visibility = "visible";
                            alert('Faltan campos por llenar');
                            break;
                        }
                    } else if (pair[1] == "") {
                        let input = document.getElementById(pair[0]);
                        input.parentElement.querySelector('.required-text').style.visibility = "visible";
                        input.focus();
                        alert('Faltan campos por llenar');
                        break;
                    } else {
                        sendData = sendData + 1;
                    }
                }

                if (sendData == 5 && formData.get('affair') != "opt0") {
                    alert("Información enviada exitosamente!");
                }
            });
        });
    }

    setFormValidation() {
        document.querySelector('input[name=username]').addEventListener('keypress', (e) => {
            let key = e.key;
            let regexp = /[a-zA-Z0-9 ]/;

            if (!regexp.exec(key)) {
                e.preventDefault();
            }
        });

        document.querySelector('input[name=userid]').addEventListener('keypress', (e) => {
            let key = e.key;
            let numbers = /[0-9]/;

            if (!numbers.exec(key)) {
                e.preventDefault();
            }
        });

        document.querySelector('input[name=userphone]').addEventListener('keypress', (e) => {
            let key = e.key;
            let numbers = /[0-9+]/;

            if (!numbers.exec(key)) {
                e.preventDefault();
            }
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