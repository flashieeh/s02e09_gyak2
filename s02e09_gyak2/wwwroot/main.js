fetch('/questions/4')
    .then(response => response.json())
    .then(data => console.log(data)
);

function kerdesmegj(kerdes) {
    console.log(kerdes);
    document.getElementById("kerdes_szöveg").innerText = kerdes.questionText
    document.getElementById("válasz1").innerText = kerdes.answer1
    document.getElementById("válasz2").innerText = kerdes.answer2
    document.getElementById("válasz3").innerText = kerdes.answer3
    document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kerdes.image;
}

function kerdesBetolt(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kerdesmegj(data));
}