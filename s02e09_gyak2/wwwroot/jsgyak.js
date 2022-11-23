var faktoriális = n => {
    if (n === 0 || n === 1) {
        return 1;
    }
    else {
        return n * faktoriális(n - 1)
    }
}

function hozzáad() {
    var pascal = document.getElementById("pascal");
    var meret = 10;
    for (var s = 0; s <= meret; s++) {
        var ujSor = document.createElement("div")
        ujSor.classList.add("sor");

        pascal.appendChild(ujSor);
        for (var o = 0; o <= s; o++) {

            var ujElem = document.createElement("div")
            ujElem.innerHTML = `${faktoriális(s) / (faktoriális(o) * (faktoriális(s - o)))}`
            ujElem.classList.add("elem");


            ujSor.appendChild(ujElem);
        }
    }
}
hozzáad();


