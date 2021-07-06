import { DbTemplates } from '../templates/dbTemplates';

export class PaginationUtility {
    contructor(){

    }

    async setPageInfo(response, tableContainer, countContainer, btns){
        let templates = new DbTemplates();
        let responseInJson = await Promise.resolve(response.json());
        let {currentPage, pageSize, totalCount, totalPages, hasNext, hasPrevious, data} = responseInJson;

        let pages = templates.currentPageTemplate(totalPages);

        templates.tableTemplate(tableContainer, data);
        countContainer.innerHTML = pages;
        countContainer.options.namedItem(`${currentPage}`).selected = true;

        btns[0].disabled = (currentPage == 1) ? true : false;
        btns[1].disabled = (hasPrevious) ? false : true;
        btns[2].disabled = (hasNext) ? false : true;
        btns[3].disabled = (currentPage == totalPages) ? true : false;

        if(response.status != 200) {
            document.querySelector('.loading').style.display = 'flex';
            document.querySelector('.view-ct-us-table').style.visibility = 'hidden';
            document.querySelector('.pag-nav').style.visibility = 'hidden';
        } else if(response.status === 200) {
            setTimeout(function() {
                document.querySelector('.loading').style.display = 'none';
                document.querySelector('.view-ct-us-table').style.visibility = 'visible';
                document.querySelector('.pag-nav').style.visibility = 'visible';
            }, 1000);
        }
    }

    hasAttribute(element){
        return element.hasAttribute('data-order') ? true : false;
    }
}