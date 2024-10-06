export default function (searchRequest) {
    return fetch(buildRequestURL(searchRequest)).then(
        (response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
        }
    );
}

function buildRequestURL(q) {
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
        safesearch
    })
    return `${host}?${searchParams}`

}