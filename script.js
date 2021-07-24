const imagesContainer = document.getElementById('images-container')
const loader = document.getElementById('loader');

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []

// Unsplash API
const count = 30
const ACCESS_KEY = 'Mdt8wEUioNx_Xghbuu_CbFgP7HpsDHkz5eOx9UlfHS8'
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}&count=${count}`

const imageLoaded = () => {
    imagesLoaded++;

    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}


const createPhotoElement = (photo) => {
    // Create 'a' element
    const imageLink = document.createElement('a')
    imageLink.href = photo.links.html
    imageLink.target = '_blank'

    // Create 'img' element
    let image = document.createElement('img')
    image.src = photo.urls.regular
    image.alt = photo.alt_description
    image.title = photo.alt_description
    image.addEventListener('load', imageLoaded)
    imageLink.appendChild(image)
    imagesContainer.appendChild(imageLink)
}

const displayPhotos = (photosArray) => {
    imagesLoaded = 0
    totalImages = photosArray.length

    photosArray.forEach((photo) => {
        createPhotoElement(photo)
    })
}

const getPhotosFromAPI = async () => {
    try {
        let response = await fetch(API_URL);
        photosArray = await response.json()
        console.log(photosArray)
        displayPhotos(photosArray)
    } catch (error) {
        console.log(error);
    }
}

// If scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotosFromAPI()
    }
})

getPhotosFromAPI()