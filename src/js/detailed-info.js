import { BasicInfo } from "./clases/basicInfo";
import { Services } from "./servercalls/services";
import { IndexTemplates } from "./templates/indexTemplates";

class Home {
    constructor(){
        this.services = new Services();
        this.indexTemplates = new IndexTemplates();

        let subjectsContainer = document.querySelector('.form-select');
        this.services.getSubjects().then(data => {
            subjectsContainer = document.querySelector('.form-select');
            this.indexTemplates.subjTemplate(data, subjectsContainer);
        });

        let basicInfo =  new BasicInfo(
            document.cookie.split('; ').find(row => row.startsWith('name=')).split('=')[1],
            document.cookie.split('; ').find(row => row.startsWith('email=')).split('=')[1],
            document.cookie.split('; ').find(row => row.startsWith('date=')).split('=')[1],
            document.cookie.split('; ').find(row => row.startsWith('subject=')).split('=')[1]
        );

        this.services.postBasicInfo(basicInfo).then(async (response) => {
            const responseInJson = await Promise.resolve(response.json());
            let {name, userid, email, phone, creationDate, subject, message} = responseInJson;
            console.log(responseInJson);

            let inputs = document.querySelectorAll('.form-input');
            inputs[0].value = name;
            inputs[1].value = userid;
            inputs[2].value = phone;
            inputs[3].value = email;

            let msgInput = document.querySelector('.form-txt');
            msgInput.value = message;

            subjectsContainer.options.namedItem(subject).selected = true;
        });


    }
};

window.addEventListener("load", new Home());