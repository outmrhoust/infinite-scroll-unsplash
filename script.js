// Unsplash API
const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')
let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []
let count = 5
const apiKey = 'API_key'

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true
        count = 30

    }

}

// helper function to set attribute on Dom element
function setAttributes(element, attributes) {

    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }


}



// create elements for links and photos and add them to DOM

function displayPhotos() {
    totalImages = photosArray.length
    // Run function for each on photosArray
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
         })
        // create img for photo
        const img = document.createElement('img')

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)
        // Put img inside <a>, then put both inside image container
        item.appendChild(img)
        imageContainer.appendChild(item)
         }) 
}



// get photos from unsplash api

async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos()

    } catch (error) {
        console.log(error)
    }
}

// check to see if scrolling is near end of the page

window.addEventListener('scroll', ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        imagesLoaded = 0
        getPhotos()
    }
})

// on load
getPhotos()



