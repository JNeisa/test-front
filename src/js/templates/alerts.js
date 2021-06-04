export class Alerts{
    constructor(){

    }

    contactFormError(list){
        let alertMsg = "";
        let labels = document.querySelectorAll('.labels');
        const dict = {
            Name : "Nombre",
            Userid : "Cédula",
            Subject : "Asunto",
            Phone : "Teléfono",
            Email : "Correo electrónico",
            Message : "Mensaje"
        }

        list.forEach(obj => {
            const {errorName, errorDesc} = obj;

            labels.forEach(label => {
                if(`${dict[errorName]} *` == label.textContent){
                    label.parentElement.querySelector('.required-text').style.visibility = "visible";
                }
            });

            alertMsg += `Error en ${dict[errorName]}: ${errorDesc}\n`;
        });

        alert(alertMsg);
    }
}