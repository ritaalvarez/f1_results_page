function setNextRace(data){
    var json = JSON.stringify(data);
    json = JSON.parse(json);

    let numberRace = json.MRData.RaceTable.Races[0].round;
    let round = document.getElementById("round");
    round.innerHTML = numberRace;

    let numberSeason= json.MRData.RaceTable.Races[0].season;
    let season = document.getElementById("season");
    season.innerHTML = numberSeason;

    let raceName = json.MRData.RaceTable.Races[0].raceName;
    let nextRace = document.getElementById("race_name");
    nextRace.innerHTML = raceName;

    let circuitName = json.MRData.RaceTable.Races[0].Circuit.circuitName;
    let circuit = document.getElementById("circuit_name");
    circuit.innerHTML = circuitName;

    let raceDate = json.MRData.RaceTable.Races[0].date;
    let date = document.getElementById("date");
    date.innerHTML = raceDate;

    let raceTime = json.MRData.RaceTable.Races[0].time;
    let time = document.getElementById("time");
    let hour = raceTime.split(":")[0];
    if(hour > 12){
        time.innerHTML = hour + ":" + raceTime.split(":")[1] + " PM - Local Time";
    }
    else{
        time.innerHTML = hour + ":" + raceTime.split(":")[1] + " AM - Local Time";
    }

}

function setResultsLastRace(data){
    var json = JSON.stringify(data);
    json = JSON.parse(json);

    console.log(json);

    let raceName = json.MRData.RaceTable.Races[0].raceName;
    let lastRace = document.getElementById("last_race_name");
    lastRace.innerHTML = raceName;

    let classification = document.getElementById("classif_lines");
    const classif = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    classif.forEach(function(pos) {
        let li = document.createElement("li");
        li.classList = "classif_item";

        let div1 = document.createElement("div");
        div1.innerHTML = pos;

        let div2 = document.createElement("div");
        div2.innerHTML =  `${json.MRData.RaceTable.Races[0].Results[pos-1].Driver["givenName"]} ${json.MRData.RaceTable.Races[0].Results[pos-1].Driver["familyName"]}`;
        
        let div3 = document.createElement("div");
        div3.innerHTML = json.MRData.RaceTable.Races[0].Results[pos-1].number;
        
        let div4= document.createElement("div");
        div4.innerHTML = json.MRData.RaceTable.Races[0].Results[pos-1].Constructor["name"];
        
        li.appendChild(div1);
        li.appendChild(div2);
        li.appendChild(div3);
        li.appendChild(div4);
        classification.appendChild(li);
    });

}

function getResultsLastRace(){
    let url = "https://ergast.com/api/f1/current/last/results.json";
    fetch(url)
    .then(response => response.json())
    .then(data => {setResultsLastRace(data);});
}


function getNextRace(){
    let url = "https://ergast.com/api/f1/current/next.json";
    fetch(url)
    .then(response => response.json())
    .then(data => {setNextRace(data);});
}

window.addEventListener("load", getNextRace);
window.addEventListener("load", getResultsLastRace);