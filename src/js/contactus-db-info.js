import { PagingParameters } from './clases/pagingParameters';
import { Services } from './servercalls/services';
import { Alerts } from './templates/alerts';
import { DbTemplates } from './templates/dbTemplates';
import { PaginationUtility } from './utilities/pagination';

class Home {
    constructor() {
        this.services = new Services();
        this.pagUtility = new PaginationUtility();
        this.alerts = new Alerts();
        this.templates = new DbTemplates();
        this.listeners();

        let pagingParameters = new PagingParameters(
            0,
            1,
            null
        );

        this.services.postPagingParameters(pagingParameters).then(async (response) => {
            let table = document.querySelector(".ct-us-info-table");
            let pagBtns = document.querySelectorAll('.pag-btn');
            let countContainer = document.querySelector('.current-page');
            this.pagUtility.setPageInfo(response, table, countContainer, pagBtns);
        });
    }

    listeners() {
        const table = document.querySelector('.ct-us-info-table');
        const pageCountContainer = document.querySelector('.current-page');
        const pagBtns = document.querySelectorAll('.pag-btn');

        /*document.addEventListener('readystatechange', event => {
            if(event.target.readyState != 'complete') {
                document.querySelector('.view-ct-us-table').style.visibility = 'hidden';
                document.querySelector('.pag-nav').style.visibility = 'hidden';
            } else if(event.target.readyState === 'complete') {
                setTimeout(function() {
                    document.querySelector('.loading').style.display = 'none';
                    document.querySelector('.view-ct-us-table').style.visibility = 'visible';
                    document.querySelector('.pag-nav').style.visibility = 'visible';
                }, 1000);
            }
        });*/

        // Elementos para la busqueda
        let searchBtn = document.querySelector('.search-btn');
        let searchInput = document.querySelector('.search-input');
        let tagContainer = document.querySelector('.tag-container');

        // Elementos para ordenar la info
        let date = document.querySelector('.date-cell');
        let subject = document.querySelector('.subject-cell');
        let orderByBtns = document.querySelectorAll('.order-by');
        let orderByDate;
        let orderBySubject;

        // Elementos para moverse entre paginas
        let pageSizeOpts = document.querySelector('.results-per-page');
        let currentPage = document.querySelector('.current-page');

        // Busqueda por correo o asunto - crea etiqueta que sirve de bandera para buscar
        searchBtn.addEventListener('click', () => {
            if (searchInput.value != '') {
                let tag = this.templates.tagTemplate(searchInput.value);
                tagContainer.innerHTML = tag;
                searchInput.value = '';

                // Inserta la etiqueta - cerrar etiqueta-recargar pagina
                let searchTag = document.querySelector('.search-tag');
                searchTag.addEventListener('click', () => {
                    this.templates.eraseHtml(tagContainer);

                    window.location.reload();
                });

                let pagingParameters = new PagingParameters(
                    0,
                    1,
                    searchTag.innerText
                );

                this.services.postPagingParameters(pagingParameters).then(async (response) => {
                    let respInJson = await Promise.resolve(response.clone().json());
                    if (respInJson.totalPages == 0){
                        let tableSection = document.querySelector('.view-ct-us-table');
                        let btnsSection = document.querySelector('.pag-nav')
                        this.templates.eraseHtml(tableSection);
                        this.templates.eraseHtml(btnsSection);
                        this.templates.noContentMsg(tableSection);
                    }else{
                        this.pagUtility.setPageInfo(response, table, pageCountContainer, pagBtns);
                    }
                });
            } else {
                alert('Ingrese un valor para la busqueda');
            }
        });

        // Ordenar por fecha o asunto (SOLO DE FORMA ASCENDENTE)
        orderByBtns.forEach(orderByBtn => {
            orderByBtn.addEventListener('click', () => {
                let pageSize = parseInt(pageSizeOpts.value);
                let pageNumber = parseInt(currentPage.value);
                let searchVariable = (tagContainer.parentElement.querySelector('.search-tag')) ? tagContainer.parentElement.querySelector('.search-tag').innerText : null;
                let pagingParameters = new PagingParameters(
                    pageSize,
                    pageNumber,
                    searchVariable,
                    orderByDate = false,
                    orderBySubject = false
                );
                switch (orderByBtn) {
                    case orderByBtns[0]:
                        date.setAttribute('data-order', '');
                        subject.removeAttribute('data-order');
                        orderByDate = this.pagUtility.hasAttribute(date);
                        orderBySubject = this.pagUtility.hasAttribute(subject);

                        pagingParameters.orderByDate = orderByDate;
                        pagingParameters.orderBySubject = orderBySubject;
                        break;
                    case orderByBtns[1]:
                        subject.setAttribute('data-order', '');
                        date.removeAttribute('data-order');
                        orderBySubject = this.pagUtility.hasAttribute(subject);
                        orderByDate = this.pagUtility.hasAttribute(date);

                        pagingParameters.orderByDate = orderByDate;
                        pagingParameters.orderBySubject = orderBySubject;
                        break;
                };
                this.services.postPagingParameters(pagingParameters).then(async (response) => {
                    this.pagUtility.setPageInfo(response, table, pageCountContainer, pagBtns);
                });
            });
        });

        // Cantidad de resultados que se visualizan en la pagina (10-50-100)
        pageSizeOpts.addEventListener('change', () => {
            let pageNumber = 1;
            let pageSize = parseInt(pageSizeOpts.value);
            let searchVariable = (tagContainer.parentElement.querySelector('.search-tag')) ? tagContainer.parentElement.querySelector('.search-tag').innerText : null;
            orderByDate = this.pagUtility.hasAttribute(date);
            orderBySubject = this.pagUtility.hasAttribute(subject);
            let pagingParameters = new PagingParameters(
                pageSize,
                pageNumber,
                searchVariable,
                orderByDate,
                orderBySubject
            );

            this.services.postPagingParameters(pagingParameters).then(async (response) => {
                this.pagUtility.setPageInfo(response, table, pageCountContainer, pagBtns);
            });
        });

        // Moverse por las paginas en el desplegable
        currentPage.addEventListener('change', () => {
            let pageNumber = parseInt(currentPage.value);
            let pageSize = parseInt(pageSizeOpts.value);
            let searchVariable = (tagContainer.parentElement.querySelector('.search-tag')) ? tagContainer.parentElement.querySelector('.search-tag').innerText : null;
            orderByDate = this.pagUtility.hasAttribute(date);
            orderBySubject = this.pagUtility.hasAttribute(subject);
            let pagingParameters = new PagingParameters(
                pageSize,
                pageNumber,
                searchVariable,
                orderByDate,
                orderBySubject
            );

            this.services.postPagingParameters(pagingParameters).then(async (response) => {
                this.pagUtility.setPageInfo(response, table, pageCountContainer, pagBtns);
            });
        });

        // Acciones de botones: primer-anterior-siguiente-última página
        pagBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                let lastPage = document.querySelector('.current-page').options.length;
                let pageSize = parseInt(document.querySelector('.results-per-page').value);
                let pageNumber = parseInt(document.querySelector('.current-page').value);
                let searchVariable = (tagContainer.parentElement.querySelector('.search-tag')) ? tagContainer.parentElement.querySelector('.search-tag').innerText : null;
                orderByDate = this.pagUtility.hasAttribute(date);
                orderBySubject = this.pagUtility.hasAttribute(subject);

                let pagingParameters = new PagingParameters(
                    pageSize,
                    pageNumber,
                    searchVariable,
                    orderByDate,
                    orderBySubject
                );

                switch (btn) {
                    case pagBtns[0]:
                        pagingParameters.pageNumber = 1;
                        break;
                    case pagBtns[1]:
                        pagingParameters.pageNumber = pageNumber -= 1;
                        break;
                    case pagBtns[2]:
                        pagingParameters.pageNumber = pageNumber += 1;
                        break;
                    case pagBtns[3]:
                        pagingParameters.pageNumber = lastPage;
                        break;
                }

                this.services.postPagingParameters(pagingParameters).then(async (response) =>{
                    this.pagUtility.setPageInfo(response, table, pageCountContainer, pagBtns);
                })
                .catch((e) => {
                    console.log(e);
                });
            });
        });
    }
}

window.addEventListener("load", new Home());