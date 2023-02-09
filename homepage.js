
const input = document.getElementById('input')
let datenarray;

input.addEventListener('change', () => {
  readXlsxFile(input.files[0]).then((data) => {
    datenarray = data;
    //console.log(data);
    // `data` is an array of rows
    // each row being an array of cells.
    console.log(data[0]); // ganze Zeile
    console.log(data[0][1]); // Uhrzeit
    let sum = 0;
    // die 5 Watt (pro min)  
    tag = document.querySelector('#tag').value.trim();

    for (let i = 0; i < data.length; i++) {
      if (data[i][0] == tag) {
        console.log(data[i][0]);
        sum = sum + (data[i][2] / 12)/1000;
      }
    }

    document.getElementById('#tag1').innerHTML = tag;
    document.getElementById('#kwh').innerHTML = sum.toFixed(3) + " kwh";
    document.getElementById('#time').innerHTML = "2:30 - 23:55";
    console.log(sum);
  })
  
})


const dailyChargeNeeded = [];
let currentCharge = 0;

function addChargeNeed(charge) {
  dailyChargeNeeded.push(charge);
}

function checkBattery(currentCharge) {
  for (let i = 0; i < dailyChargeNeeded.length; i++) {
    currentCharge -= dailyChargeNeeded[i];
    if (currentCharge < 0) {
      console.log(`Du musst dein Auto mit ${Math.abs(currentCharge)}kWh extra beladen, um deine nächste Fahrt zu beenden`);
      return false;
    }
  }
  console.log(`Du bist bereit für deine Fahrt! Keine extra Ladung wird vor deiner nächsten Fahrt benötigt`)
  return true;
}



function getLivePosition() {
    console.log("Verbindung mit Batteriespeicher");
    tag = document.querySelector('#tag').value.trim();
    console.log(tag);

}

let tag

