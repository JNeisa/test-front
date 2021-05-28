export class Services {
    constructor(){

    }

    async getPlaces() {
        const response = await fetch("https://localhost:44371/places", { method: 'GET' });
        return response.json();
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