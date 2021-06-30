import { DbTemplates } from '../templates/dbTemplates';

export class PaginationUtility {
    contructor(){

    }

    async setPageInfo(response, tableContainer, countContainer, btns){
        let templates = new DbTemplates();
        let responseInJson = await Promise.resolve(response.json());
        let {currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious, data} = responseInJson;

        let rows = data;
        let pages = templates.currentPageTemplate(totalPages);

        tableContainer.innerHTML = templates.tableTemplate(rows);
        countContainer.innerHTML = pages;
        countContainer.options.namedItem(`${currentPage}`).selected = true;

        btns[0].disabled = (currentPage == 1) ? true : false;
        btns[1].disabled = (hasPrevious) ? false : true;
        btns[2].disabled = (hasNext) ? false : true;
        btns[3].disabled = (currentPage == totalPages) ? true : false;
    }

    hasAttribute(element){
        return element.hasAttribute('data-order') ? true : false;
    }
}