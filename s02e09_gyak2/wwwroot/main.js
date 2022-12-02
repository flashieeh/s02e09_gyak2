fetch('/questions/4')
    .then(response => response.json())
    .then(data => console.log(data)
);

function kerdesmegj(kerdes) {
    console.log(kerdes);
    document.getElementById("kerdes_sz�veg").innerText = kerdes.questionText
    document.getElementById("v�lasz1").innerText = kerdes.answer1
    document.getElementById("v�lasz2").innerText = kerdes.answer2
    document.getElementById("v�lasz3").innerText = kerdes.answer3
    document.getElementById("k�p").src = "https://szoft1.comeback.hu/hajo/" + kerdes.image;
}

function kerdesBetolt(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hib�s v�lasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kerdesmegj(data));
}