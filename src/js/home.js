class Home{
    constructor(){
        //code...
        // this.showModal();
        this.listeners();
    }

    showModal(){
        window.alert("Hola willy");
    }
    
    listeners(){
        let btns = document.querySelectorAll('.submit-btn');

        btns.forEach(x => {
            x.addEventListener("click", () => {
                let form = document.getElementById(x.dataset.form);
                let formData = new FormData(form);
            });
        });
    }
}

window.addEventListener("load", new Home());