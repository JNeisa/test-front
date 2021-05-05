import Glide from '@glidejs/glide'

var glide = new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    autoplay:5000
});

glide.mount();

var glideNews = new Glide('.glide-news', {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    autoplay:5000
});

glideNews.mount();

function setOrderToMenu(){
    var menu = [...document.querySelectorAll("#menu-ccf > li")];
    menu.forEach(function (item){
        item.classList.add("ccf-order-"+ menu.indexOf(item));
    });
}

setOrderToMenu();

var form = document.getElementById("main-table");
form.addEventListener("blur", function( event ) {
    var id = event.target.parentElement.parentElement.id;
  console.log(id);
}, true);