var joValasz;
var questionID = 14;

var hotList = [];
var questionsInHotList = 7
var displayedQuestion;
var numberOfQuestions; 
var nextQuestion = 8; 

var timeoutHandler;

function kerdesmegj() {
    let kerdes = hotList[displayedQuestion].question;
    console.log(kerdes);


    console.log(kerdes);
    document.getElementById("kerdes_szoveg").innerText = kerdes.question1
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

function kérdésBetöltés(questionNumber, destination) {
    
    fetch(`/questions/${questionNumber}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        }).then(q => {
            hotList[destination].question = q;
            hotList[destination].goodAnswers = 0;
            console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
            if (displayedQuestion == undefined && destination == 0) { 
                displayedQuestion = 0;
                kerdesmegj();
            }
        }
            );
        
}
function init() {
    

    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question1: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    

    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
    if (!localStorage.getItem("hotList")) {

    }
    else {
        try {
            hotList = JSON.parse(localStorage.getItem("hotList"));
        } catch (e) {
            hotList = [];
        }

        questionsInHotList = localStorage.getItem("questionsInHotList");
        nextQuestion = localStorage.getItem("nextQuestion");
        kerdesmegj();
    }
    
}

function elore() {
    clearTimeout(timeoutHandler);
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    document.getElementById(`valaszok`).style.pointerEvents = "auto";
    kerdesmegj()
}
function vissza() {
    displayedQuestion--;
    if (displayedQuestion == -1) displayedQuestion = questionsInHotList;
    document.getElementById(`valaszok`).style.pointerEvents = "auto";
    kerdesmegj()
}

function választás(n) {
    document.getElementById(`valaszok`).style.pointerEvents = "none";
    if (n != joValasz) {
        document.getElementById(`valasz${n}`).classList.add("rossz");
        document.getElementById(`valasz${joValasz}`).classList.add("jó");
        hotList[n].goodAnswers = 0;
        console.log(hotList[n].goodAnswers);
    }
    else {
        hotList[n].goodAnswers++;
        console.log(hotList[n].goodAnswers);
        if (hotList[n].goodAnswers ==3) {
            kérdésBetöltés(nextQuestion, n);
            nextQuestion++;
        }
        document.getElementById(`valasz${joValasz}`).classList.add("jó");
    }
    timeoutHandler = setTimeout(elore, 3000);

    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion", displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);
}

window.onload = function (e) {
    console.log("oldal betöltve");
    document.getElementById("elore_gomb").onclick = elore;
    document.getElementById("vissza_gomb").onclick = vissza;
    init();
}
