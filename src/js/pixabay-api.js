import axios from "axios";

export default async function (searchRequest, page, perPage) {
    return await axios.get(buildRequestURL(searchRequest, page, perPage));
      
}

function buildRequestURL(q, page, per_page) {
    const host = 'https://pixabay.com/api/'
    const key = '46357253-cea0b9d68f62a9d404cc68056';
    let image_type = 'photo';
    let orientation = 'horizontal';
    let safesearch = true;
    const searchParams = new URLSearchParams({
        key,
        q,
        image_type,
        orientation,
        safesearch, 
        page, 
        per_page
    })
    return `${host}?${searchParams}`
}