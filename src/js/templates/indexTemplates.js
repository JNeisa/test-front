export class IndexTemplates {
    constructor(){

    }

    cardTemplate(card){
        const imgUrl = "http://www.periodicoelector.com/2018/wp-content/uploads/2019/04/camara-de-comercio-e1468255518670-300x300.jpg"
        let { name, address, pbx, phone, schedule, image } = card;
    
        pbx = pbx.toString().replace(/\D+/g, '').replace(/(\d{3})(\d{2})(\d{2})/, '$1 $2 $3');
        phone = phone.toString().replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
        
        image = (!image) ? imgUrl : image;
        let disp = (phone === "0") ? "none" : "block";
    
        return `<div class="card">
                    <img src="${image}" class="center-img">
                    <div class="card-info">
                        <h4 class="center-name">${name}</h4>
                        <h5 class="subtitle">Dirección</h5>
                        <p class="sub-info">${address}</p>
                        <h5 class="subtitle">PBX</h5>
                        <p class="sub-info">${pbx}</p>
                        <p class="sub-info" style="display:${disp};">Cel. ${phone}</p>
                        <h5 class="subtitle">Horario de atención:</h5>
                        <p class="sub-info">${schedule}</p>
                    </div>
                </div>`;
    }

    subjTemplate(data, container) {
        let htmlToAppend = '<option hidden value="opt0">-- Seleccione una opción --</option>';
        data.forEach(e => {
            let {name, htmlValue} = e;
            htmlToAppend += `<option value="${htmlValue}" name="${htmlValue}">${name}</option>`;
        });
        container.innerHTML = htmlToAppend;
    }

    tagTemplate(text){
        return `<li class="search-tag" data-close="x">${text}</li>`;
    }

    tableTemplate(infoFromDB){
        let htmlToAppend = '';
        
        infoFromDB.forEach(row => {
            htmlToAppend += `<tr>
                                <td>${row.name}</th>
                                <td>${row.userid}</th>
                                <td>${row.phone}</th>
                                <td>${row.email}</th>
                                <td>${row.creationDate}</td>
                                <td>${row.subject}</th>
                                <td>${row.message}</th>
                            </tr>`
        });
        return htmlToAppend;
    }

    currentPageTemplate(totalPages){
        let htmlToAppend = '';
        for(let i = 1; i <= totalPages; i++){
            htmlToAppend += `<option name="${i}" value="${i}">${i}</option>`;
        }
        return htmlToAppend;
    }

    eraseHtml(container){
        let defaultHtml = '<!--default-->';
        container.innerHTML = defaultHtml;
    }
}