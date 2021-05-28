let cardTemplate = (card) => {
    return `<div class="card">
                <img src="${card.image}" class="center-img">
                <div class="card-info">
                    <h4 class="center-name">${card.name}</h4>
                    <h5 class="subtitle">Dirección</h5>
                    <p class="sub-info">${card.address}</p>
                    <h5 class="subtitle">PBX</h5>
                    <p class="sub-info">${card.pbx}</p>
                    <p class="sub-info">Cel. ${card.phone}</p>
                    <h5 class="subtitle">Horario de atención:</h5>
                    <p class="sub-info">${card.schedule}</p>
                </div>
            </div>`;
}

export{cardTemplate};