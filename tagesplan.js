
const input = document.getElementById('formFile')
let datenarray = [];
let powerArray = [];
let tag = "2:50 - 23:55";   
let sum = 0;
    let startTag = 1;


//Sat Dec 30 1899 10:10:00

input.addEventListener('change', () => {
  readXlsxFile(input.files[0]).then((data) => {
    datenarray = data;
    localStorage.setItem("datenPV", datenarray);5

  })
  
})

function berechneBisTag (tag) {
  let summe = 0;
  for (let i = 1; i < datenarray.length; i++) {
    // Wenn Zeit und Tag stimmen
    if (datenarray[i][0] == `Tag ${startTag}`) {
      summe = summe + (datenarray[i][2] / 12)/1000;
    } else if (startTag < tag) {
      startTag++;        
    }
  }
  console.log(summe);
  return summe.toFixed(3);
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
    // Werte aufnehmen
  let planTag = document.querySelector('#PlanTag').value.trim(); // 1  
  let powerNeeded = document.querySelector('#powerneeded').value.trim();  
  let ladeleistung = document.querySelector('#ladeleistung').value.trim(); 
  let startTime = document.querySelector('#startZeit').value.trim(); 
  let endTime = document.querySelector('#endZeit').value.trim(); 



  // Aufladedauer
  let ladedauer = powerNeeded/ladeleistung;

  // verfügebarer Strom
  let speicherStrom = berechneBisTag(planTag);
  let speicherStromÜbrig = 0;

 
 // Aufladen Speicher / frembezogen
  let ladenSp = ladedauer;
  let ladeF = 0;


  // fremdbezogener Strom
  let fStrom = speicherStrom-powerNeeded;
  console.log(fStrom);
  if ( fStrom < 0) {
    fStrom = Math.abs(fStrom);
    ladenSp =  speicherStrom/ladeleistung;
    ladeF = fStrom/ladeleistung;
  } else {
    speicherStromÜbrig = fStrom;    
    fStrom = 0;
  }

  // Zur Uhrzeit
  // Dauer vergleichen
  let differenzDate = calculateData(startTime, endTime);
  console.log(hours1);
  console.log(min1);
  let a;

  let timediff = `${hours1}`; 
  timediff = parseFloat(timediff) + min1;
  console.log(timediff);

  
  if (timediff < ladedauer) {
    let diff = timediff - ladedauer;
    console.log("NOOO  " + diff);
     // Error anzeigen
     a =  document.getElementById('#error');
     a.innerHTML = `Sie brauchen mehr Zeit zum laden! Es fehlen ${Math.abs(diff).toFixed(1)} h`;
     a.style.visibility = 'visible';    

  } else {    
    console.log("klppt")
    a =  document.getElementById('#error');

     a.style.visibility = 'hidden';

  }

  // Kosten
  let kostenPV = speicherStrom * 0.07;
  let kostenNetz = fStrom * 0.3;
  


  // Werte ergänzen
  document.getElementById('#speicherstrom').innerHTML = speicherStrom + " kWh";
  document.getElementById('#ladedauer').innerHTML = ladedauer.toFixed(1)+ " h";
  document.getElementById('#fstrom').innerHTML = fStrom.toFixed(3) + " kWh";
  document.getElementById('#nachAufladen').innerHTML = speicherStromÜbrig.toFixed(3) + " kWh";
  document.getElementById('#ladedauerB').innerHTML = ladenSp.toFixed(1) + " h";
  document.getElementById('#ladedauerF').innerHTML = ladeF.toFixed(1) + " h";
  document.getElementById('#zeitV').innerHTML = differenzDate + " (hours:min), (" + timediff.toFixed(1) + " h)";
  document.getElementById('#kostenNetz').innerHTML = kostenNetz.toFixed(2) + " €";
  document.getElementById('#kostenPV').innerHTML = kostenPV.toFixed(2) + " €";
  document.getElementById('#kostenGes').innerHTML = (kostenNetz + kostenPV).toFixed(2) + " €";


}

const calculateData = (startTimeStamp, finishTimeStamp) => {    
    //23:23

    let h1 = startTimeStamp.slice(0,2);
    var m1 = startTimeStamp.slice(3,6);    
    console.log(h1, m1);

    var h2 = finishTimeStamp.slice(0,2);
    var m2 = finishTimeStamp.slice(3,6);

    // Monat und Tag sind vertauscht ->Monat vorne
    var date1 = new Date(2022, 01, 01, h1, m1, 0);

  var date2   = new Date(2022, 01, 01, h2, m2, 0);

    var diff = date2 - date1;
    console.log(diff); // milliseconds 

    var msec = diff;
    var hours = Math.floor(msec / 1000 / 60 / 60);
    msec -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(msec / 1000 / 60);
    msec -= minutes * 1000 * 60;
   
    // diff = 28800000 => hh = 8, mm = 0, ss = 0, msec = 0
    console.log(hours);
    console.log(minutes);
    // Konvertieren zu HOURS:MIN:MS
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    min1 = 1 / (60/minutes);
    hours1= hours;

    return hours + ":" + minutes;
}
let hours1;

let min1;


