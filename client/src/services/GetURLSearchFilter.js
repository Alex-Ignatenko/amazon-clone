export const GetURLSearchFilter = (searchFromURL,filter, skipPathName) => {

    //Get all the filter options backend requires from url
    const searchParams = new URLSearchParams(searchFromURL);  

    const page = searchParams.get('page') || 1;
    const query = searchParams.get('query') || 'all';
    const category = searchParams.get('category') || 'all';
    const price = searchParams.get('price') || 'all';
    const rating = searchParams.get('rating') || 'all';
    const order = searchParams.get('order') || 'newest';
    
    //Get all the filter options backend requires from filter object
    const filterPage = filter.page || page;
    const filterQuery = filter.query || query;
    const filterCategory = filter.category || category;
    const filterPrice = filter.price || price;
    const filterRating = filter.rating || rating;
    const filterOrder = filter.order || order;

    const link = `${skipPathName ? '' : "/search?"}category=${filterCategory}&page=${filterPage}&query=${filterQuery}&rating=${filterRating}&price=${filterPrice}&order=${filterOrder}`;

    return link;
};