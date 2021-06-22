class PagingParameters {
    constructor(pageSize, pageNumber, searchParameter, orderByDate = false, orderBySubject = false){
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
        this.searchParameter = searchParameter;
        this.orderByDate = orderByDate;
        this.orderBySubject = orderBySubject;
    }
}

export {PagingParameters};