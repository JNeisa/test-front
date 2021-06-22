import { PagingParameters } from './clases/pagingParameters';
import { Services } from './servercalls/services';
import { Alerts } from './templates/alerts';
import { Templates } from './templates/templates';
import { PaginationUtility } from './utilities/pagination';

class Home {
    constructor() {
        this.services = new Services();
        this.pagUtility = new PaginationUtility();
        this.alerts = new Alerts();
        this.templates = new Templates();
        this.listeners();

        this.services.getPagination().then(data => {
            let pagination = JSON.parse(data);
            let pagBtns = document.querySelectorAll('.pag-btn');
            let pageContainer = document.querySelector('.current-page');

            this.pagUtility.setPagBtns(pagBtns, pagination);
            pageContainer.innerHTML = this.templates.resultsPerPageTemplate(pagination.TotalPages);
        });

        this.services.getContactUsInfo().then(data => {
            let rows = data;
            let table = document.querySelector(".ct-us-info-table");
            table.innerHTML = this.templates.tableTemplate(rows);
        });
    }

    listeners() {
        let services = new Services();
        let alerts = new Alerts();
        let templates = new Templates();
        let pagUtility = new PaginationUtility();

        const table = document.querySelector('.ct-us-info-table');
        const pageCountContainer = document.querySelector('.current-page');

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
        let pagBtns = document.querySelectorAll('.pag-btn');
        let pageSizeOpts = document.querySelector('.results-per-page');
        let currentPage = document.querySelector('.current-page');

        // Busqueda por correo o asunto - crea etiqueta que sirve de bandera para buscar
        searchBtn.addEventListener('click', () => {
            if (searchInput.value == '') {
                //pass
            } else {
                let tag = templates.tagTemplate(searchInput.value);
                tagContainer.innerHTML = tag;
                searchInput.value = '';

                // Inserta la etiqueta - función para cerrar/eliminar la etiqueta
                let searchTag = document.querySelector('.search-tag');
                searchTag.addEventListener('click', () => {
                    templates.eraseHtml(tagContainer);

                    let newParam = new PagingParameters(10, 1);
                    services.postPagingParameters(newParam).then(async (response) => {
                        let pagination = JSON.parse(response.headers.get('x-pagination'));

                        pagUtility.setPageInfo(response, table, pageCountContainer);
                        pagUtility.setPagBtns(pagBtns, pagination);
                    });
                });

                let pagingParameters = new PagingParameters(
                    10,
                    1,
                    searchTag.innerText
                );

                services.postPagingParameters(pagingParameters).then(async (response) => {
                    let pagination = JSON.parse(response.headers.get('x-pagination'));

                    if (pagination.TotalCount === 0) {
                        alerts.noResults(searchTag.innerText);
                        templates.eraseHtml(tagContainer);
                    } else {
                        pagUtility.setPageInfo(response, table, pageCountContainer);
                        pagUtility.setPagBtns(pagBtns, pagination);
                    }
                });
            }
        });

        // Ordenar por fecha o asunto (SOLO DE FORMA ASCENDENTE)
        orderByBtns.forEach(orderByBtn => {
            orderByBtn.addEventListener('click', () => {
                let pageSize = parseInt(pageSizeOpts.value);
                let searchVariable = (tagContainer.parentElement.querySelector('.search-tag')) ? tagContainer.parentElement.querySelector('.search-tag').innerText : null;
                let pagingParameters;
                switch (orderByBtn) {
                    case orderByBtns[0]:
                        date.setAttribute('data-order', '');
                        subject.removeAttribute('data-order');
                        orderByDate = pagUtility.hasAttribute(date);
                        orderBySubject = pagUtility.hasAttribute(subject);

                        pagingParameters = new PagingParameters(
                            pageSize,
                            1,
                            searchVariable,
                            orderByDate,
                            orderBySubject
                        );
                        services.postPagingParameters(pagingParameters).then(async (response) => {
                            let pagination = JSON.parse(response.headers.get('x-pagination'));
                            pagUtility.setPageInfo(response, table, pageCountContainer);
                            pagUtility.setPagBtns(pagBtns, pagination);
                        });
                        break;
                    case orderByBtns[1]:
                        subject.setAttribute('data-order', '');
                        date.removeAttribute('data-order');
                        orderBySubject = pagUtility.hasAttribute(subject);
                        orderByDate = pagUtility.hasAttribute(date);

                        pagingParameters = new PagingParameters(
                            pageSize,
                            1,
                            searchVariable,
                            orderByDate,
                            orderBySubject
                        );
                        services.postPagingParameters(pagingParameters).then(async (response) => {
                            let pagination = JSON.parse(response.headers.get('x-pagination'));
                            pagUtility.setPageInfo(response, table, pageCountContainer);
                            pagUtility.setPagBtns(pagBtns, pagination);
                        });
                        break;

                    default:
                        break;
                }
            });
        });

        // Cantidad de resultados que se visualizan en la pagina (10-50-100)
        pageSizeOpts.addEventListener('change', () => {
            let pageNumber = 1;
            let pageSize = parseInt(pageSizeOpts.value);
            let searchVariable = (tagContainer.parentElement.querySelector('.search-tag')) ? tagContainer.parentElement.querySelector('.search-tag').innerText : null;
            orderByDate = pagUtility.hasAttribute(date);
            orderBySubject = pagUtility.hasAttribute(subject);
            let pagingParameters = new PagingParameters(
                pageSize,
                pageNumber,
                searchVariable,
                orderByDate,
                orderBySubject
            );

            services.postPagingParameters(pagingParameters).then(async (response) => {
                let pagination = JSON.parse(response.headers.get('x-pagination'));

                pagUtility.setPageInfo(response, table, pageCountContainer);
                pagUtility.setPagBtns(pagBtns, pagination);
            });
        });

        // Moverse por las paginas en el desplegable
        currentPage.addEventListener('change', () => {
            let pageNumber = parseInt(currentPage.value);
            let pageSize = parseInt(document.querySelector('.results-per-page').value);
            let searchVariable = (tagContainer.parentElement.querySelector('.search-tag')) ? tagContainer.parentElement.querySelector('.search-tag').innerText : null;
            orderByDate = pagUtility.hasAttribute(date);
            orderBySubject = pagUtility.hasAttribute(subject);
            let pagingParameters = new PagingParameters(
                pageSize,
                pageNumber,
                searchVariable,
                orderByDate,
                orderBySubject
            );

            services.postPagingParameters(pagingParameters).then(async (response) => {
                let pagination = JSON.parse(response.headers.get('x-pagination'));

                pagUtility.setPageInfo(response, table, pageCountContainer);
                pagUtility.setPagBtns(pagBtns, pagination);
            });
        });

        // Acciones de primer-anterior-siguiente-última página
        pagBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const firstPage = 1;

                let lastPage = document.querySelector('.current-page').options.length;
                let pageSize = parseInt(document.querySelector('.results-per-page').value);
                let pageNumber = parseInt(document.querySelector('.current-page').value);
                let searchVariable = (tagContainer.parentElement.querySelector('.search-tag')) ? tagContainer.parentElement.querySelector('.search-tag').innerText : null;
                let pagingParameters;
                orderByDate = pagUtility.hasAttribute(date);
                orderBySubject = pagUtility.hasAttribute(subject);

                switch (btn) {
                    case pagBtns[0]:
                        pagingParameters = new PagingParameters(
                            pageSize,
                            firstPage,
                            searchVariable,
                            orderByDate,
                            orderBySubject
                        );

                        services.postPagingParameters(pagingParameters).then(async (response) => {
                            let pagination = JSON.parse(response.headers.get('x-pagination'));

                            pagUtility.setPageInfo(response, table, pageCountContainer);
                            pagUtility.setPagBtns(pagBtns, pagination);
                        });

                        break;
                    case pagBtns[1]:
                        pageNumber -= 1;
                        pagingParameters = new PagingParameters(
                            pageSize,
                            pageNumber,
                            searchVariable,
                            orderByDate,
                            orderBySubject
                        );

                        services.postPagingParameters(pagingParameters).then(async (response) => {
                            let pagination = JSON.parse(response.headers.get('x-pagination'));

                            pagUtility.setPageInfo(response, table, pageCountContainer);
                            pagUtility.setPagBtns(pagBtns, pagination);
                        });

                        break;
                    case pagBtns[2]:
                        pageNumber += 1;
                        pagingParameters = new PagingParameters(
                            pageSize,
                            pageNumber,
                            searchVariable,
                            orderByDate,
                            orderBySubject
                        );

                        services.postPagingParameters(pagingParameters).then(async (response) => {
                            let pagination = JSON.parse(response.headers.get('x-pagination'));

                            pagUtility.setPageInfo(response, table, pageCountContainer);
                            pagUtility.setPagBtns(pagBtns, pagination);
                        });

                        break;
                    case pagBtns[3]:
                        pagingParameters = new PagingParameters(
                            pageSize,
                            lastPage,
                            searchVariable,
                            orderByDate,
                            orderBySubject
                        );

                        services.postPagingParameters(pagingParameters).then(async (response) => {
                            let pagination = JSON.parse(response.headers.get('x-pagination'));

                            pagUtility.setPageInfo(response, table, pageCountContainer);
                            pagUtility.setPagBtns(pagBtns, pagination);
                        });

                        break;
                    default:
                        break;
                }
            });
        });
    }
}

window.addEventListener("load", new Home());