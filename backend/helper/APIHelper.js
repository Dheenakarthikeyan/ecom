class APIHelper {
    constructor(query, queryStr) {
        this.query = query;//MonogoDB query
        this.queryStr = queryStr;//Query String frorm URL? after ?mark url ?keyword="samsung"&&keyword2="samsung"
    }
    search() {
        const keyword = this.queryStr?.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i" // ✅ correct
                }
            }
            : {};

            console.log(keyword);
        this.query = this.query.find({...keyword});
       
        return this;
    }
    //http://localhost:6663/api/v1/products?keyword=Office Chair&category=Books&keyword=google&page=1&limit=5
    filter() {
        console.log({...this.queryStr})
        const querycopy = {...this.queryStr};//http://localhost:6663/api/v1/products?keyword=i&category=Electronics&page=1&limit=5
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach((key) => delete querycopy[key]);
        this.query = this.query.find(querycopy);
        console.log(this);
        return this;
     }
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;

     }

}
export default APIHelper;