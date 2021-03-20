let allAlbums;
let albumsToDisplay = skipBy = 6;
let moreAlbums = document.querySelector('#morealbums');
let totalFetch = 24;


// Check if JSON objects are correctly formatted
let isValid = (album) => {
    return album.hasOwnProperty('id') && album.hasOwnProperty('art') && album['artist'] != null;
}

// Query JSON file and display the albums on the page
$.getJSON("https://newyorker.s3.eu-west-2.amazonaws.com/records.json", (albums) => {
    const validAlbums = [];

    Object.keys(albums).forEach(key => {
        albums[key].forEach(album => { if (isValid(album)) validAlbums.unshift(album); })
    });

    validAlbums.slice(0,totalFetch).forEach((album, i) => {

        let node = document.getElementById('cont');
        let newNode = document.createElement('span');
        newNode.className = 'cardcont';
        node.appendChild(newNode);


        node = document.querySelectorAll('.cardcont')[i]
        newNode = document.createElement('div');
        newNode.className = 'card';
        if (i < skipBy) {
            // Only display the number of albums defined by skipBy
            node.style.display = 'block';
        }
        node.appendChild(newNode);

        node = document.querySelectorAll('.card')[i];
        newNode = document.createElement('div');
        newNode.className = 'card__face card__face--front';
        node.appendChild(newNode);

        node = document.querySelectorAll('.card__face.card__face--front')[i];
        newNode = document.createElement('img');
        newNode.loading = 'lazy';
        newNode.src = 'https://i.scdn.co/image/' + album['art'];
        node.appendChild(newNode);

        newNode = document.createElement('p');
        newNode.className = 'withincard';
        let text = document.createTextNode(album['artist']);
        newNode.appendChild(text);
        node.appendChild(newNode);

        newNode = document.createElement('p');
        newNode.className = 'withincard_sub';
        text = document.createTextNode(album['album']);
        newNode.appendChild(text);
        node.appendChild(newNode);

        node = document.querySelectorAll('.card')[i];
        newNode = document.createElement('div');
        newNode.className = 'card__face card__face--back';
        node.appendChild(newNode);

        node = document.querySelectorAll('.card__face.card__face--back')[i];
        newNode = document.createElement('div');
        newNode.className = 'preloader';
        node.appendChild(newNode)

        node = document.querySelectorAll('.preloader')[i];
        let loader = node
        newNode = document.createElement('iframe');
        newNode.loading = 'lazy';
        newNode.src = 'https://open.spotify.com/embed/album/' + album['id'];
        newNode.width = "100%";
        newNode.height = 380;
        newNode.frameBorder = 0;
        newNode.allowtransparency = true;
        newNode.allow = 'encrypted-media';
        newNode.onload = () => { loader.style.background = "none"; }
        node.appendChild(newNode);
        

    })
    moreAlbums.innerText = "More albums ("+ (validAlbums.splice(0,totalFetch).length - skipBy)+")"
    allAlbums = [...document.querySelectorAll('.cardcont')];
});


moreAlbums.addEventListener('click', function() {

    moreAlbums.innerText = "More albums ("+(allAlbums.length - albumsToDisplay - skipBy)+")"

    for (let i = albumsToDisplay; i < albumsToDisplay + skipBy; i++) {
        if (allAlbums[i]) allAlbums[i].style.display = 'block';
    }

    albumsToDisplay += skipBy;

    if (albumsToDisplay >= allAlbums.length) {
        moreAlbums.innerText = 'No more albums :(';
        moreAlbums.disabled = true
    }
})