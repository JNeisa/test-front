import { PagingParameters } from './clases/pagingParameters';
import { Services } from './servercalls/services';
import { Templates } from './templates/templates';
import { PaginationUtility } from './utilities/pagination';

class Home {
    constructor() {
        this.services = new Services();
        this.pagUtility = new PaginationUtility();
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
        let templates = new Templates();
        let pagUtility = new PaginationUtility();

        let pageSizeOpts = document.querySelector('.results-per-page');
        pageSizeOpts.addEventListener('change', () => {
            let pageNumber = 1;
            let pageSize = parseInt(pageSizeOpts.value);
            let pagingParameters = new PagingParameters(
                pageSize,
                pageNumber
            );

            services.postPagingParameters(pagingParameters).then(async (response) => {
                let responseInJson = await Promise.resolve(response.json());
                let table = document.querySelector('.ct-us-info-table');
                table.innerHTML = templates.tableTemplate(responseInJson);

                let pagination = JSON.parse(response.headers.get('x-pagination'));
                let pageCountContainer = document.querySelector('.current-page');
                let pages = templates.resultsPerPageTemplate(pagination.TotalPages);
                pageCountContainer.innerHTML = pages;
                pageCountContainer.options.namedItem(`${pagination.CurrentPage}`).selected = true;

                pagUtility.setPagBtns(pagBtns, pagination);
            });
        });

        let currentPage = document.querySelector('.current-page');
        currentPage.addEventListener('change', () => {
            console.log(currentPage.value);
            let pageNumber = parseInt(currentPage.value);
            let pageSize = parseInt(document.querySelector('.results-per-page').value);
            let pagingParameters = new PagingParameters(
                pageSize,
                pageNumber
            );

            services.postPagingParameters(pagingParameters).then(async (response) => {
                let responseInJson = await Promise.resolve(response.json());
                let table = document.querySelector('.ct-us-info-table');
                table.innerHTML = templates.tableTemplate(responseInJson);

                let pagination = JSON.parse(response.headers.get('x-pagination'));
                let pageCountContainer = document.querySelector('.current-page');
                let pages = templates.resultsPerPageTemplate(pagination.TotalPages);
                pageCountContainer.innerHTML = pages;
                pageCountContainer.options.namedItem(`${pagination.CurrentPage}`).selected = true;

                pagUtility.setPagBtns(pagBtns, pagination);
            });
        });

        let pagBtns = document.querySelectorAll('.pag-btn');
        pagBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const firstPage = 1;
                let lastPage = document.querySelector('.current-page').options.length;
                let pageSize = parseInt(document.querySelector('.results-per-page').value);
                let pageNumber = parseInt(document.querySelector('.current-page').value);
                let pagingParameters;

                switch (btn) {
                    case pagBtns[0]:
                        pagingParameters = new PagingParameters(
                            pageSize,
                            firstPage
                        );

                        services.postPagingParameters(pagingParameters).then(async (response) => {
                            let responseInJson = await Promise.resolve(response.json());
                            let table = document.querySelector('.ct-us-info-table');
                            table.innerHTML = templates.tableTemplate(responseInJson);

                            let pagination = JSON.parse(response.headers.get('x-pagination'));
                            let pageCountContainer = document.querySelector('.current-page');
                            let pages = templates.resultsPerPageTemplate(pagination.TotalPages);
                            pageCountContainer.innerHTML = pages;
                            pageCountContainer.options.namedItem(`${pagination.CurrentPage}`).selected = true;

                            pagUtility.setPagBtns(pagBtns, pagination);
                        });

                        break;
                    case pagBtns[1]:
                        pageNumber -=  1;
                        pagingParameters = new PagingParameters(
                            pageSize,
                            pageNumber
                        );

                        services.postPagingParameters(pagingParameters).then(async (response) => {
                            let responseInJson = await Promise.resolve(response.json());
                            let table = document.querySelector('.ct-us-info-table');
                            table.innerHTML = templates.tableTemplate(responseInJson);

                            let pagination = JSON.parse(response.headers.get('x-pagination'));
                            let pageCountContainer = document.querySelector('.current-page');
                            let pages = templates.resultsPerPageTemplate(pagination.TotalPages);
                            pageCountContainer.innerHTML = pages;
                            pageCountContainer.options.namedItem(`${pagination.CurrentPage}`).selected = true;

                            pagUtility.setPagBtns(pagBtns, pagination);
                        });

                        break;
                    case pagBtns[2]:
                        pageNumber += 1;
                        pagingParameters = new PagingParameters(
                            pageSize,
                            pageNumber
                        );

                        services.postPagingParameters(pagingParameters).then(async (response) => {
                            let responseInJson = await Promise.resolve(response.json());
                            let table = document.querySelector('.ct-us-info-table');
                            table.innerHTML = templates.tableTemplate(responseInJson);

                            let pagination = JSON.parse(response.headers.get('x-pagination'));
                            let pageCountContainer = document.querySelector('.current-page');
                            let pages = templates.resultsPerPageTemplate(pagination.TotalPages);
                            pageCountContainer.innerHTML = pages;
                            pageCountContainer.options.namedItem(`${pagination.CurrentPage}`).selected = true;

                            pagUtility.setPagBtns(pagBtns, pagination);
                        });

                        break;
                    case pagBtns[3]:
                        pagingParameters = new PagingParameters(
                            pageSize,
                            lastPage
                        );

                        services.postPagingParameters(pagingParameters).then(async (response) => {
                            let responseInJson = await Promise.resolve(response.json());
                            let table = document.querySelector('.ct-us-info-table');
                            table.innerHTML = templates.tableTemplate(responseInJson);

                            let pagination = JSON.parse(response.headers.get('x-pagination'));
                            let pageCountContainer = document.querySelector('.current-page');
                            let pages = templates.resultsPerPageTemplate(pagination.TotalPages);
                            pageCountContainer.innerHTML = pages;
                            pageCountContainer.options.namedItem(`${pagination.CurrentPage}`).selected = true;

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