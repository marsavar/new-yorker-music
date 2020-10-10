function isValid(album) {
    return album.hasOwnProperty('id') && album.hasOwnProperty('art') && album['artist'] != null
}

$.getJSON( "https://newyorker.s3.eu-west-2.amazonaws.com/records.json", function( albums ) {

    let i = 0;

    Object.keys(albums).forEach(key => {

        albums[key].forEach(album => {

            if (isValid(album)) {
       
                let node = document.getElementById('cont');
                let newNode = document.createElement('span');
                newNode.className = 'cardcont';
                newNode.id = i;
                node.appendChild(newNode);

                node = document.getElementById(i);
                newNode = document.createElement('div');
                newNode.className = 'card';
                newNode.id = 'card'+i;
                node.appendChild(newNode);

                i++; 
        }
           
        })
    });

    i--;

    Object.keys(albums).forEach(key => {

        albums[key].forEach(album => {

            if (isValid(album)) {

                let node = document.getElementById('card'+i);
                let newNode = document.createElement('div');
                newNode.className = 'card__face card__face--front';
                newNode.id = 'face'+i;
                node.appendChild(newNode);
                
                node = document.getElementById('face'+i);
                newNode = document.createElement('img');
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
                
                node = document.getElementById('card'+i);
                newNode = document.createElement('div');
                newNode.className = 'card__face card__face--back';
                newNode.id = 'back'+i;
                node.appendChild(newNode);

                node = document.getElementById('back'+i);
                newNode = document.createElement('iframe');
                newNode.src = 'https://open.spotify.com/embed/album/' + album['id'];
                newNode.width = 300;
                newNode.height = 380;
                newNode.frameBorder = 0;
                newNode.allowtransparency = true;
                newNode.allow = 'encrypted-media';
                node.appendChild(newNode);
                i--;

            }   
        })
    });
});