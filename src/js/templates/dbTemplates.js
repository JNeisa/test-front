export class DbTemplates {
    constructor() {

    }
    tagTemplate(text) {
        return `<li class="search-tag" data-close="x">${text}</li>`;
    }

    tableTemplate(infoFromDB) {
        let htmlToAppend = '';

        infoFromDB.forEach(row => {
            htmlToAppend += `<tr>
                                <td>${row.name}</th>
                                <td>${row.email}</th>
                                <td>${row.creationDate}</td>
                                <td>${row.subject}</th>
                            </tr>`
        });
        return htmlToAppend;
    }

    currentPageTemplate(totalPages) {
        let htmlToAppend = '';
        for (let i = 1; i <= totalPages; i++) {
            htmlToAppend += `<option name="${i}" value="${i}">${i}</option>`;
        }
        return htmlToAppend;
    }

    eraseHtml(container) {
        let defaultHtml = '<!--default-->';
        container.innerHTML = defaultHtml;
    }

    noContentMsg(container) {
        let msg = "<p class='no-content'>Oops, no se encontraron resultados :(</p>";
        container.innerHTML = msg;
    }
}