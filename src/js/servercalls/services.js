export class Services {
    constructor(){

    }

    async getPlaces() {
        const response = await fetch("https://localhost:44371/places", { method: 'GET' });
        return response.json();
    }

    async getSubjects() {
        const response = await fetch("https://localhost:44371/contactusform", { method: 'GET' });
        return response.json();
    }

    async getContactUsInfo() {
        const response = await fetch("https://localhost:44371/contactusdbinfo", { method: 'GET' });
        return response.json();
    }

    async getPagination() {
        const response = await fetch("https://localhost:44371/contactusdbinfo", { method: 'GET' });
        return response.headers.get('x-pagination');
    }

    async postPagingParameters(object){
        const response = await fetch("https://localhost:44371/contactusdbinfo", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        });
        return response;
    }

    async postForms(object) {
        const response = await fetch('https://localhost:44371/forms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        });
        return response;
    }
}