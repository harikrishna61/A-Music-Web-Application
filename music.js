// Put your Last.fm API key here
var api_key = "9abc7bf2428d99b93b0b81498f8faa70";
function sendRequest () {
    var xhr = new XMLHttpRequest();
    var method = "artist.getinfo";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method=" + method + "&artist=" + artist + "&api_key=" + api_key + "&format=json", true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            document.getElementById("name").innerHTML = json.artist.name;
            var link=json.artist.url;
            document.getElementById("link").innerHTML = "Link to Last.fm ";
            document.getElementById("link").href=link;
            document.getElementById("link").href=json.artist.url;
            document.getElementById("bio").innerHTML = json.artist.bio.content;
            document.getElementById("img").src = json.artist.image[2]['#text'];
        }
    };
    xhr.send(null);
    var xhr1 = new XMLHttpRequest();
    var method1 = "artist.getTopAlbums";
    xhr1.open("GET", "proxy.php?method=" + method1 + "&artist=" + artist + "&api_key=" + api_key + "&format=json", true);
    xhr1.setRequestHeader("Accept", "application/json");
    xhr1.onreadystatechange = function () {
        if (this.readyState == 4) {
            document.getElementById("albums").innerHTML = "Top Albums";
            document.getElementById("topimg").innerHTML = "";
            var json1 = JSON.parse(this.responseText);
            var str1 = JSON.stringify(json1, undefined, 2);
            for(i=0;i<json1.topalbums.album.length;i++) {
                var albums_names;
                albums_names=json1.topalbums.album[i].name;
                document.getElementById("topimg").append(albums_names);
                var img = new Image();
                img.src = json1.topalbums.album[i].image[2]['#text'];
                document.getElementById("topimg").appendChild(img);
            }
        }
    };
    xhr1.send(null);
    var xhr2 = new XMLHttpRequest();
    var method2 = "artist.getSimilar";
    xhr2.open("GET", "proxy.php?method=" + method2 + "&artist=" + artist + "&api_key=" + api_key + "&format=json", true);
    xhr2.setRequestHeader("Accept", "application/json");
    xhr2.onreadystatechange = function () {
        if (this.readyState == 4) {
            document.getElementById("similar").innerHTML = "Similar artists";
            document.getElementById("getsimilar").innerHTML = "";
            var json2 = JSON.parse(this.responseText);
            var similar_artists;
            for(i=0;i<json2.similarartists.artist.length;i++)
            {
                similar_artists=json2.similarartists.artist[i].name;
                var artist_button=document.createElement("a");
                artist_button.addEventListener( "click", loadlocal.bind(null,similar_artists) );
                var artist=document.createTextNode(similar_artists);
                artist_button.appendChild(artist);
                document.getElementById("getsimilar").appendChild(artist_button);
                var space=document.createElement("p");
                var space_value=document.createTextNode("  ");
                space.appendChild(space_value);
                document.getElementById("getsimilar").appendChild(space);
            }
        }
    };
    xhr2.send(null);
}
function loadlocal(si){
    document.getElementById("form-input").value=si;
    sendRequest();
}
