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
}