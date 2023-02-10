
const input = document.getElementById('formFile')
let datenarray = [];
let powerArray = [];
let tag = "2:50 - 23:55";   
let sum = 0;
    let startTag = 1;


//Sat Dec 30 1899 10:10: 00

input.addEventListener('change', () => {
  readXlsxFile(input.files[0]).then((data) => {
    datenarray = data;
    localStorage.setItem("datenPV", datenarray);
    //console.log(data);
    // `data` is an array of rows
    // each row being an array of cells.
    console.log(data[0]); // ganze Zeile
    console.log(data[800][1]); // Uhrzeit
    let t = 1;
    tag = document.querySelector('#tag').value.trim(); // 1
    let gesSum = 0;

    // if (data[i][0] == `Tag ${startTag}` && data[t][1] == "Sat Dec 30 1899 10:10:00 GMT+0100 (Mitteleuropäische Normalzeit)") {


    for (let i = 1; i < datenarray.length; i++) {
      // Wenn Zeit und Tag stimmen
      if (datenarray[i][0] == `Tag ${tag}`) {
        sum = sum + (datenarray[i][2] / 12)/1000;
      } 
    }

    document.getElementById('#tag1').innerHTML = tag;
    document.getElementById('#kwh').innerHTML = sum.toFixed(3) + " kWh";
    document.getElementById('#time').innerHTML = "2:30";
    console.log(sum);
    console.log(gesSum);

  })
  
})

function berechneBisTag (tag) {
  let summe;
  for (let i = 1; i < datenarray.length; i++) {
    // Wenn Zeit und Tag stimmen
    if (datenarray[i][0] == `Tag ${startTag}`) {
      summe = summe + (datenarray[i][2] / 12)/1000;
    } else if (startTag < tag) {
      startTag++;        
    }
  }
  return summe
}

/*
 for (let i = 1; i < data.length; i++) {
    // Wenn Zeit und Tag stimmen
    if (data[i][0] == `Tag ${startTag}` && data[t][1] == "08:25") {
      console.log(data[i][0]);
      sum = sum + (data[i][2] / 12)/1000;
    } else if (startTag < tag && data[t][1] == "08:25" ) {
      startTag++;        
    } else {
      t++;
    }
  }*/
  function tagPlanen () {    
  let planTag = document.querySelector('#PlanTag').value.trim(); // 1  
  console.log(planTag);

  document.getElementById('#test').innerHTML = "sdfghj";
  document.getElementById('#speicherstrom').innerHTML = "sdfghj";

 // let speicherStrom = berechneBisTag(planTag);
}






































const dailyChargeNeeded = []; // 25 kwh
let currentCharge = 0; // Strom im Speicher
const chargingTimes = [];

function addChargeNeed(charge) {
  dailyChargeNeeded.push(charge);
}

function addChargingTime(startTime, endTime) {
  chargingTimes.push({ startTime, endTime });
}

function checkBattery(currentCharge) {
  for (let i = 0; i < dailyChargeNeeded.length; i++) {
    currentCharge -= dailyChargeNeeded[i]; 
    if (currentCharge < 0) { // zu wenig aus Speicher
      const chargeNeeded = Math.abs(currentCharge); 
      let availableChargingTime = 0;
      for (let j = 0; j < chargingTimes.length; j++) {
        availableChargingTime += (chargingTimes[j].endTime - chargingTimes[j].startTime);
      }
      const chargingTime = chargeNeeded / 4;
      if (chargingTime > availableChargingTime) {
        console.log(`You need to charge your car with ${chargeNeeded}kWh to complete your trip, but you only have ${availableChargingTime} hours available to charge your car.`);
        return false;
      } else {console.log() 
      }
    }
  }
}

function plane() {

}


function getLivePosition() {
    console.log("Verbindung mit Batteriespeicher");
    tag = document.querySelector('#tag').value.trim();
    console.log(tag);
}


