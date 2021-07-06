export class DbTemplates {
    constructor() {

    }
    tagTemplate(text) {
        return `<li class="search-tag" data-close="x">${text}</li>`;
    }

    tableTemplate(tbody, infoToShow) {
        this.eraseHtml(tbody);
        infoToShow.forEach(row => {
            let newRow = tbody.insertRow(-1);
            newRow.insertCell(0).innerHTML = row["name"];
            newRow.insertCell(1).innerHTML = row["email"];
            newRow.insertCell(2).innerHTML = row["creationDate"];
            newRow.insertCell(3).innerHTML = row["subject"];
            let buttonCell = newRow.insertCell(-1);
            buttonCell.innerHTML = '<a href="./detailedInfo.html" class="edit-info"><i class="far fa-edit"></i></a>';
            
            // Por alguna razon acá si reconoce el boton y se puede manipular la data ?
            let btn = newRow.lastChild.getElementsByTagName('a')[0];
            btn.addEventListener('click', () => {
                document.cookie = `name = ${newRow.cells[0].innerHTML}`;
                document.cookie = `email = ${newRow.cells[1].innerHTML}`;
                document.cookie = `date = ${newRow.cells[2].innerHTML}`;
                document.cookie = `subject = ${newRow.cells[3].innerHTML}`;

                console.log(document.cookie);
            });
        });
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