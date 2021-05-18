class Home{
    constructor(){
        this.listeners();
        this.setFormValidation();
    }

    listeners(){
        let btns = document.querySelectorAll('.submit-btn');

        document.querySelectorAll('.required-text').forEach(function(el){
            el.style.visibility = "hidden";
        });

        btns.forEach(x => {
            x.addEventListener("click", () => {
                let form = document.getElementById(x.dataset.form);
                let formData = new FormData(form);
                let sendData = 0;

                for(let pair of formData){
                    console.log(pair);
                    if(pair[0]=="affair"){
                        if(pair[1]=='opt0'){
                            let input = document.querySelector('select[name=affair]');
                            input.parentElement.querySelector('.required-text').innerHTML = 'Opción invalida';
                            input.parentElement.querySelector('.required-text').style.visibility = "visible";
                            alert('Faltan campos por llenar');
                            break;
                        }
                    }else if(pair[1] == ""){
                        let input = document.getElementById(pair[0]);
                        input.parentElement.querySelector('.required-text').style.visibility = "visible";
                        input.focus();
                        alert('Faltan campos por llenar');
                        break;
                    }else{
                        sendData = sendData + 1;
                    }
                }

                if(sendData == 5 && formData.get('affair') != "opt0"){
                    alert("Información enviada exitosamente!");
                }
            });
        });
    }

    setFormValidation(){
        document.querySelector('input[name=username]').addEventListener('keypress', (e)=> {
            let key = e.key;
            let regexp = /[a-zA-Z0-9 ]/;
            
            if(!regexp.exec(key)){
                e.preventDefault();
            }
        });

        document.querySelector('input[name=userid]').addEventListener('keypress', (e) => {
            let key = e.key;
            let numbers = /[0-9]/;

            if(!numbers.exec(key)){
                e.preventDefault();
            }
        });

        document.querySelector('input[name=userphone]').addEventListener('keypress', (e) => {
            let key = e.key;
            let numbers = /[0-9+]/;

            if(!numbers.exec(key)){
                e.preventDefault();
            }
        });
    }
}

window.addEventListener("load", new Home());