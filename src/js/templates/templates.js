let cardTemplate = (card) => {
    const imgUrl = "http://www.periodicoelector.com/2018/wp-content/uploads/2019/04/camara-de-comercio-e1468255518670-300x300.jpg"
    let {name, address, pbx, phone, schedule, image} = card;
    let disp = "block"

    pbx = pbx.toString().replace(/\D+/g, '').replace(/(\d{3})(\d{2})(\d{2})/, '$1 $2 $3');
    phone = phone.toString().replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
    
    if(!image){
        image = imgUrl;
    }
    if(phone === "0"){
        disp = "none";
    }

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

export{cardTemplate};