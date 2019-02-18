let express = require('express');
let router = express.Router();

// Root (index) page
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/gallery', (req, res) => {
    // Should be fetched frm mysql database later
    const galleryImages = [
        {
            id: 1,
            src: '/img/img4.jpg',
            title: 'Mountain in Ireland',
            desc: 'Sunset hitting the mountains in Ireland',
            dateTaken: ''
        },
        {
            id: 2,
            src: '/img/img2.jpg',
            title: 'The Galaxy in Iceland',
            desc: 'At dusk, the milky way and stars of the universe',
            dateTaken: ''
        },
        {
            id: 3,
            src: '/img/img3.jpg',
            title: 'Frozen lake in Iceland',
            desc: 'Taken at lake Something in Iceland',
            dateTaken: ''
        },
        {
            id: 4,
            src: '/img/img4.jpg',
            title: 'Mountain in Ireland',
            desc: 'Sunset hitting the mountains in Ireland',
            dateTaken: ''
        },
        {
            id: 5,
            src: '/img/img2.jpg',
            title: 'The Galaxy in Iceland',
            desc: 'At dusk, the milky way and stars of the universe',
            dateTaken: ''
        },
        {
            id: 6,
            src: '/img/img3.jpg',
            title: 'Frozen lake in Iceland',
            desc: 'Taken at lake Something in Iceland',
            dateTaken: ''
        }
    ];

    res.render('gallery', {galleryImages: galleryImages});
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/gallery/:id', (req, res) => {
    const galleryImageId = req.params.id;

    // TODO: Implement logic to fetch data for the gallery image and it's album, if any,
    // and return it to the page. This way we can display the gallery image and any other 
    // images within the album

    const galleryData = {
        galleryImageId: galleryImageId,
        galleryImageSrc: '/img/img4.jpg',
        albumId: -1,
        associatedGalleryImages: [2, 3, 4, 5, 6]
    };

    res.render('view', {galleryData: galleryData});
});

module.exports = router;