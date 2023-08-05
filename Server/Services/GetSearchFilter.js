
const GetSearchFilter = (query) => {

    const category = query.category || "";
    const price = query.price || "";
    const rating = query.rating || "";
    const order = query.order || "";
    const searchQuery = query.query || "";

    //Build search filters
    const queryFilter = searchQuery && searchQuery === "all" ? {} : { title: { $regex: searchQuery, $options: 'i' } };
    const categoryFilter = category && category === "all" ? {} : { category: category};
    const ratingFilter = rating && rating === "all" ? {} : { "rating.rate": { $gte: Number(rating) } };
    const priceFilter = price && price === "all" ? {} : { price: { $gte: Number(price.split("-")[0]), $lte: Number(price.split("-")[1]) } };
    
    //Define sorting options
    const sortOrder =
      order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"  
        ? { rating: 1 }
        : order === "newest"
        ? { createdAt: -1 }
        : { _id: -1 };

  return { queryFilter, categoryFilter, ratingFilter, priceFilter, sortOrder }; 
}

export default GetSearchFilter