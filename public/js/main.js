$(document).ready( () => {
    
    // First album is always all for the time being. When rendering the gallery, put the active class on the first item
    let urlRoutes = location.pathname.split('/');
    if( (urlRoutes.length === 2) && (urlRoutes[1] === 'gallery')){
        let firstAlbumTitle = $('.albums__link')[0];

        $(firstAlbumTitle).addClass('albums__link--active');
    }
});