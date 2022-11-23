var viccek;

var letöltés = function () {
    fetch("jokes.json")
        
        .then(data => data.json())
        .then(data => ddl(data));
}

function ddl(d) {
    console.log("siker")
    console.log(d)
    viccek = d;

    for (var i = 0; i < viccek.length; i++) {
        var új = document.createElement("div");

        új.innerHTML = viccek[i].text;
        document.getElementById("ide").appendChild(új);


    }
}



window.addEventListener("load", (event) => {
    letöltés();
});
