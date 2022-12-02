var joValasz;
var questionID = 4;

function kerdesmegj(kerdes) {
    console.log(kerdes);
    document.getElementById("kerdes_szoveg").innerText = kerdes.questionText
    document.getElementById("valasz1").innerText = kerdes.answer1
    document.getElementById("valasz2").innerText = kerdes.answer2
    document.getElementById("valasz3").innerText = kerdes.answer3
    joValasz = kerdes.correctAnswer;
    if (kerdes.image) {
        document.getElementById("kep").src = "https://szoft1.comeback.hu/hajo/" + kerdes.image;
        document.getElementById("kep").classList.remove("rejtett")
    }
    else {
        document.getElementById("kep").classList.add("rejtett")
    }
    document.getElementById("valasz1").classList.remove("jó", "rossz");
    document.getElementById("valasz2").classList.remove("jó", "rossz");
    document.getElementById("valasz3").classList.remove("jó", "rossz");

}

function kerdesbetolt(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                kerdesmegj(response.json())
            }
        })
}

function elore() {
    questionID++;
    kerdesbetolt(questionID);
}
function vissza() {
    questionID--;
    kerdesbetolt(questionID);
}

window.onload = function (e) {
    console.log("oldal betöltve");
    document.getElementById("elore_gomb").onclick = elore;
    document.getElementById("vissza_gomb").onclick = vissza;
    kerdesbetolt(questionID)
}
