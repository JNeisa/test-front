import { Templates } from "../templates/templates";

export class PaginationUtility {
    contructor(){
        this.templates = new Templates();
    }

    setPagBtns(btns, pagInfo){
        let {CurrentPage, TotalCount, HasPrevious, HasNext} = pagInfo;

        btns[0].disabled = (CurrentPage == 1) ? true : false;
        btns[1].disabled = (HasPrevious) ? false : true;
        btns[2].disabled = (HasNext) ? false : true;
        btns[3].disabled = (CurrentPage == TotalCount) ? true : false;
    }

    async setPageInfo(response, tableContainer, countContainer){
        let templates = new Templates();
        let responseInJson = await Promise.resolve(response.json());
        let pagination = JSON.parse(response.headers.get('x-pagination'));
        let pages = templates.resultsPerPageTemplate(pagination.TotalPages);

        tableContainer.innerHTML = templates.tableTemplate(responseInJson);
        countContainer.innerHTML = pages;
        countContainer.options.namedItem(`${pagination.CurrentPage}`).selected = true;
    }

    hasAttribute(element){
        return element.hasAttribute('data-order') ? true : false;
    }
}