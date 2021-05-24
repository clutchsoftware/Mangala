// Zorluk Dereceleri:
//    1: Easy :: Random hamleler

//    2: Medium :: Robotun kendi hamleleri icerisinden tek derinlikte
// kazanc hesaplayarak 'en iyi' hamlesini bulması

//    3: Hard :: Robotun hamle sirasi kendinde oldugu muddetce tum olasiliklerini
// hesaplayarak 'en iyi' hamlesini bulmasi

//    4: Expert :: Robot Hard modda hesapladigi her kendi hamlesi icin ayni sekilde
// karsi tarafin oynayabilecegi hamleleri de hesaplamasi ve karsi tarafa en az
// tasi kazandirarak ve kendisi olabilecek en fazla tasi hazinesine katacak sekilde
// 'en iyi' hamlesini bulmasi

var zorlukDerecesi=4;
const settingsScore = require("./settings");
var zorlukDerecesiGelen = settingsScore.getZorlukSetting();

switch (zorlukDerecesiGelen) {
  case "Kolay":
    zorlukDerecesi = 1;
    break;
  case "Orta":
    zorlukDerecesi = 2;
    break;
  case "Zor":
    zorlukDerecesi = 3;
    break;
  case "Cengaver":
    zorlukDerecesi = 4;
    break;
}

class Hole {
  constructor(value, id) {
    this.id = id;
    this.value = value;
    this.addedDotcount = 0;
  }
  getID() {
    return this.id.toString();
  }
  getValue() {
    return Number(this.value);
  }
}
var state = true; //true ise oyun devam ediyor.

async function wait(x) {
  setTimeout(() => {
    //console.log("Done waiting");
    if (zorlukDerecesi == 4) {
      runRobotExpert();
    } else if (zorlukDerecesi == 3) {
      runRobotHard();
    } else if (zorlukDerecesi == 2) {
      robotMedium();
    } else {
      robotEasy();
    }

    if (player == 1 && state) {
      wait(x);
    }
  }, x);
}

var user1hole = [];
var user2hole = [];

for (var i = 1; i < 7; i++) {
  var hole1 = new Hole(4, "user1hole" + i.toString());
  var hole2 = new Hole(4, "user2hole" + i.toString());
  user1hole.push(hole1);
  user2hole.push(hole2);
}

var treasure1 = new Hole(0, "user1hole7");
var treasure2 = new Hole(0, "user2hole7");
user1hole.push(treasure1);
user2hole.push(treasure2);
var player = 2;
playercolor = "#ffe268";
waitcolor = "#ed664c";
waitvisible = "visible";
playervisible = "hidden";

function tikla(id) {
  // ekranda bulunan kuyulardaki kuyulara tıklama ile tetiklenen fonk.
  // tiklanan kuyunun html' deki id sini alır
  // Paramaters:
  //      id --> tiklanan kuyunun html' deki id sini alır ex.("user1hole5")
  console.log(player);
  if (Number(id[4]) == 1 && player == Number(id[4]) && id[10] == "x") {
    //bilgisayar tikladiysa x gelecek

    if (user1hole[Number(id[9]) - 1].value != 0) {
      dagit(Number(id[4]), Number(id[9]));
      boncukCiz();
      if (player == 2) {
        document.getElementById("user1").style.backgroundColor = waitcolor;
        document.getElementById("user2").style.backgroundColor = playercolor;
        document.getElementById("clock1").style.visibility = playervisible;
        document.getElementById("clock2").style.visibility = waitvisible;
      }
    }
  } else if (Number(id[4]) == 2 && player == Number(id[4])) {
    //kullanici tikladiginda
    if (user2hole[Number(id[9]) - 1].value != 0) {
      dagit(Number(id[4]), Number(id[9]));
      if (player == 1) {
        document.getElementById("user1").style.backgroundColor = playercolor;
        document.getElementById("user2").style.backgroundColor = waitcolor;
        document.getElementById("clock1").style.visibility = waitvisible;
        document.getElementById("clock2").style.visibility = playervisible;
      }
      boncukCiz();
      if (player == 1 && state) {
        wait(3000);
      }
    }
  }
}

function dagit(user, hole) {
  //kullanicinin sectigi kuyudaki taslarini sagat yonunun tersinde, sectigi kuyuya birtane
  //ve devamindaki her kuyuya bir tane birakarak, tas miktari kadar dagitim yapmakta
  //Parameters :
  //  user --> dagitimi yapan user'in id'si, (1 | 2)
  //  hole --> dagitimi yapilacak kuynun id'si, [1-6]
  let holeID = hole - 1;
  if (user == 1) {
    let sira = 1; // dagitirkan karsiya gecip gecilmedigini tutar, 1: kendi tarafi, -1:karsi taraf
    let count = user1hole[holeID].value - 1; // tikladigi bosluktaki tas sayisini al
    if (count == 0) {
      // tikladigin holde
      user1hole[holeID].value = 0;
      user1hole[holeID + 1].value += 1;
      user1hole[holeID + 1].addedDotcount = 1;
      holeID += 2;
    } else if (user1hole[holeID].value > 0) {
      user1hole[holeID].value = 1;
      user1hole[holeID].addedDotcount = 1;
      holeID++;
      let i = 0;
      while (i < count) {
        if (holeID == 7) {
          holeID = 0;
          sira *= -1;
        }
        if (sira == 1) {
          user1hole[holeID].value += 1;
          user1hole[holeID].addedDotcount += 1;
        } else if (sira == -1) {
          user2hole[holeID].value += 1;
          user2hole[holeID].addedDotcount += 1;
        }

        holeID += 1;
        i++;
      }
    } else {
      return 0; // eger kuyuda tas yoksa dagitma
    }
    ///##################
    //player 1 (ustteki) icin oynu kurallari

    let sonHole = holeID - 1; //oynanan son holu u tut
    //console.log(sonHole,".....sonhole");
    //console.log(sira,".....sira");
    if (sonHole == 6) {
      // son tas kendi hazinendeyse sira tekrar sende
      if (sira == 1) {
        // bu hazinenin senin ki oldugunu belirler
        player = 1; // ozaman sira tekrar sende
      } else {
        player = 2; // degilse sira karsiya gecti
      }
    } else if (sira == -1 && user2hole[sonHole].value % 2 == 0) {
      // son tas karsi tarafin kuyusunu cift yapiyorsa hepsini al
      //console.log(sonHole,".....sonhole");
      //console.log(sira,".....sira");
      player = 2;

      user1hole[6].value += user2hole[sonHole].value;
      user1hole[6].addedDotcount += user2hole[sonHole].value;
      user2hole[sonHole].value = 0;
      user2hole[sonHole].addedDotcount = 0;
    } else if (
      sira == 1 &&
      user1hole[sonHole].value == 1 &&
      user2hole[5 - sonHole].value > 0
    ) {
      // son tas kendindenki bos kuyuna geliyosa,
      player = 2;

      // ve karsi kuyu da tas varsa kendi tek tasini ve karsidakileri hepsini al
      //console.log(user2hole[5 - sonHole].value + " kural 3 gerceklesti.");
      user1hole[6].value += user2hole[5 - sonHole].value + 1;
      user1hole[6].addedDotcount += user2hole[5 - sonHole].value + 1;
      user1hole[sonHole].value = 0;
      user1hole[sonHole].addedDotcount = 0;
      user2hole[5 - sonHole].value = 0;
      user2hole[5 - sonHole].addedDotcount = 0;
    } else {
      player = 2;
    }

    //renklendirme işini yapılmadı düzgün çalışmıyordu.
    let total = 0; // son kural hepsini bitiren alir
    for (let o = 0; o < 6; o++) {
      total += user1hole[o].value;
    }
    if (total == 0) {
      tabladakiBoncuklar = 0;
      for (let k = 0; k < 6; k++) {
        tabladakiBoncuklar += user2hole[k].value;
        user2hole[k].value = 0;
      }
      user1hole[6].value += tabladakiBoncuklar;
      overlay();
    }
    //#####################3333
  } else if (user == 2) {
    let sira = 1;
    let count = user2hole[holeID].value - 1;
    if (count == 0) {
      // tikladigin holde
      user2hole[holeID].value = 0;
      user2hole[holeID + 1].value += 1;
      user2hole[holeID + 1].addedDotcount = 1;
      holeID += 2;
    } else if (user2hole[holeID].value > 0) {
      user2hole[holeID].value = 1;
      user2hole[holeID].addedDotcount = 1;
      holeID++;
      let i = 0;
      while (i < count) {
        if (holeID == 7) {
          holeID = 0;
          sira *= -1;
        }
        if (sira == 1) {
          user2hole[holeID].value += 1;
          user2hole[holeID].addedDotcount += 1;
        } else if (sira == -1) {
          user1hole[holeID].value += 1;
          user1hole[holeID].addedDotcount += 1;
        }

        holeID += 1;
        i++;
      }
    }
    ///##################
    //player 1 (ustteki) icin oynu kurallari

    sonHole = holeID - 1;
    //console.log(sonHole,".....sonhole");

    if (sonHole == 6) {
      // son tas kendi hazinendeyse sira tekrar sende
      if (sira == 1) {
        player = 2;
      } else {
        player = 1;
      }
    } else if (sira == -1 && user1hole[sonHole].value % 2 == 0) {
      // son tas karsi tarafin kuyusunu cift yapiyorsa hepsini al
      player = 1;

      user2hole[6].value += user1hole[sonHole].value;
      user2hole[6].addedDotcount += user1hole[sonHole].value;
      user1hole[sonHole].value = 0;
      user1hole[sonHole].addedDotcount = 0;
    } else if (
      sira == 1 &&
      user2hole[sonHole].value == 1 &&
      user1hole[5 - sonHole].value > 0
    ) {
      // son tas kendindenki bos kuyuna geliyosa,
      // ve karsi kuyu da tas varsa kendi tek tasini ve karsidakileri hepsini al
      player = 1;

      //console.log(user1hole[5 - sonHole].value);
      user2hole[6].value += user1hole[5 - sonHole].value + 1;
      user2hole[6].addedDotcount += user1hole[5 - sonHole].value + 1;
      user2hole[sonHole].value = 0;
      user2hole[sonHole].addedDotcount = 0;
      user1hole[5 - sonHole].value = 0;
      user1hole[5 - sonHole].addedDotcount = 0;
    } else {
      player = 1;
    }

    //renklendirme işini yapılmadı düzgün çalışmıyordu.
    let total = 0; // son kural hepsini bitiren alir
    for (let o = 0; o < 6; o++) {
      total += user2hole[o].value;
    }
    if (total == 0) {
      tabladakiBoncuklar = 0;
      for (let k = 0; k < 6; k++) {
        tabladakiBoncuklar += user1hole[k].value;
        user1hole[k].value = 0;
      }
      user2hole[6].value += tabladakiBoncuklar;
      overlay();
    }
  }
}

function boncukCiz() {
  // hollerde bulunun boncuk sayisi kadar, ekrandaki kollere boncuk cizimini yapan fonk.

  //user1hole
  for (let i = 0; i < 7; i++) {
    var node = document.getElementById(user1hole[i].id);
    node.innerHTML = "";
    let j = 0;
    while (j < user1hole[i].value - user1hole[i].addedDotcount) {
      var dot = document.createElement("span");
      dot.className = "dot_black";
      node.appendChild(dot);
      j++;
    }
    j = 0;
    while (j < user1hole[i].addedDotcount) {
      var dot = document.createElement("span");
      dot.className = "dot_gray";
      node.appendChild(dot);
      j++;
    }
    user1hole[i].addedDotcount = 0;
  }
  //user2hole
  for (let i = 0; i < 7; i++) {
    var node = document.getElementById(user2hole[i].id);
    node.innerHTML = "";

    let j = 0;
    while (j < user2hole[i].value - user2hole[i].addedDotcount) {
      var dot = document.createElement("span");
      dot.className = "dot_black";
      node.appendChild(dot);
      j++;
    }
    j = 0;
    while (j < user2hole[i].addedDotcount) {
      var dot = document.createElement("span");
      dot.className = "dot_gray";
      node.appendChild(dot);
      j++;
    }
    user2hole[i].addedDotcount = 0;
  }
}

function robotEasy() {
  // player 1 i kontrol eden robot
  // console.log("EEEEasy calisti.");
  let array = doluHoleler();
  let len = array.length;
  if (len > 0) {
    let holeID = Math.floor(Math.random() * 100000) % len;
    tikla("user1hole" + (array[holeID] + 1).toString() + "x");
  }
}
function robotMedium() {
  //console.log("HHHHARD calisti.");
  let array = doluHoleler();
  let len = array.length;
  let score_ar = []; // dolu hucrelerle ayni indisle
  if (len > 0) {
    var temp1 = [];
    var temp2 = [];
    for (let i = 0; i < 7; i++) {
      temp1.push(new Hole(user1hole[i].getValue(), user1hole[i].getID()));
      temp2.push(new Hole(user2hole[i].getValue(), user2hole[i].getID()));
    }
    bosalt();
    //console.log("ilk bosalt sonrasi user1hoel uzunnlugu: ",user1hole.length);
    //console.log("ilk bosalt  sonrasi user2hole uzunnlugu: ",user2hole.length);

    /*
        console.log("robotHard hesaplama basliyor..");
        console.log("temp1[0].value: ", temp1[0].value);
        console.log("user1hole[0].value: ", user1hole[0].value);
        console.log("atamar yapiliyor..");
        temp1[0].value = 100;
        user1hole[0].value = 999;
        console.log("temp1[0].value: ", temp1[0].getValue());
        console.log("user1hole[0].value: ", user1hole[0].getValue());
        player = 2;
        */

    for (let k = 0; k < array.length; k++) {
      // dolu hocre sayisi kadar don
      let denenecek_hole_indis = array[k]; // dolu hucresinin indisini al
      //console.log("hole ,",denenecek_hole_indis, ", deneniyor.");
      bosalt();
      for (let i = 0; i < 7; i++) {
        user1hole.push(new Hole(temp1[i].getValue(), temp1[i].getID()));
        user2hole.push(new Hole(temp2[i].getValue(), temp2[i].getID()));
      }

      //console.log("dagitim sonrasi user1hole uzunnlugu: ",user1hole.length);
      //console.log("dagitim öncesi hazine: ",user1hole[6].value);
      //tikla("user1hole"+(denenecek_hole_indis+1).toString()+"x"); // dolu hucreyi dagittini dusun
      dagit(1, denenecek_hole_indis + 1);
      //console.log("dagitim sonrasi hazine: ",user1hole[6].value);
      score_ar[k] = user1hole[6].getValue(); // dolu hucre dagilitdiktan sonra hazinenin degerini al ve score ar.ine ata
    }
    // her dolu kutu denendikten sonra hazineyi encok arttıran adimi sec
    bosalt();
    for (let i = 0; i < 7; i++) {
      user1hole.push(new Hole(temp1[i].getValue(), temp1[i].getID()));
      user2hole.push(new Hole(temp2[i].getValue(), temp2[i].getID()));
    }

    let max = 0;
    let max_indis = 0;
    for (let a = 0; a < score_ar.length; a++) {
      // en yuksek hazine degerini bul
      if (score_ar[a] >= max) {
        max = score_ar[a];
        max_indis = a;
      }
    }
    player = 1;
    //console.log("en yuksek insdis########### ",array[max_indis], ", tiklaniyor.");
    tikla("user1hole" + (array[max_indis] + 1).toString() + "x");
  }
}
////////////////////////////////////
function runRobotHard() {
  let move = robotHard();
  player = 1;
  //console.log("en yuksek insdis########### ",array[max_indis], ", tiklaniyor.");
  tikla("user1hole" + move.toString() + "x");
}
function robotHard() {
  //console.log("HHHHARD calisti.");
  let array = doluHoleler();
  let len = array.length;
  let score_ar = []; // dolu hucrelerle ayni indisle
  if (len > 0) {
    var temp1 = [];
    var temp2 = [];
    for (let i = 0; i < 7; i++) {
      temp1.push(new Hole(user1hole[i].getValue(), user1hole[i].getID()));
      temp2.push(new Hole(user2hole[i].getValue(), user2hole[i].getID()));
    }
    bosalt();
    //console.log("ilk bosalt sonrasi user1hoel uzunnlugu: ",user1hole.length);
    //console.log("ilk bosalt  sonrasi user2hole uzunnlugu: ",user2hole.length);

    /*
        console.log("robotHard hesaplama basliyor..");
        console.log("temp1[0].value: ", temp1[0].value);
        console.log("user1hole[0].value: ", user1hole[0].value);
        console.log("atamar yapiliyor..");
        temp1[0].value = 100;
        user1hole[0].value = 999;
        console.log("temp1[0].value: ", temp1[0].getValue());
        console.log("user1hole[0].value: ", user1hole[0].getValue());
        player = 2;
        */

    for (let k = 0; k < array.length; k++) {
      // dolu hocre sayisi kadar don
      let denenecek_hole_indis = array[k]; // dolu hucresinin indisini al
      //console.log("hole ,",denenecek_hole_indis, ", deneniyor.");
      bosalt();
      for (let i = 0; i < 7; i++) {
        user1hole.push(new Hole(temp1[i].getValue(), temp1[i].getID()));
        user2hole.push(new Hole(temp2[i].getValue(), temp2[i].getID()));
      }

      //console.log("dagitim sonrasi user1hole uzunnlugu: ",user1hole.length);
      //console.log("dagitim öncesi hazine: ",user1hole[6].value);
      //tikla("user1hole"+(denenecek_hole_indis+1).toString()+"x"); // dolu hucreyi dagittini dusun
      dagit(1, denenecek_hole_indis + 1);
      //console.log("dagitim sonrasi hazine: ",user1hole[6].value);
      // dolu hucre dagilitdiktan sonra hazinenin degerini al ve score ar.ine ata
      while (player == 1) {
        let move = robotExpert();
        dagit(1, move);
      }
      score_ar[k] = user1hole[6].getValue();
    }
    // her dolu kutu denendikten sonra hazineyi encok arttıran adimi sec
    bosalt();
    for (let i = 0; i < 7; i++) {
      user1hole.push(new Hole(temp1[i].getValue(), temp1[i].getID()));
      user2hole.push(new Hole(temp2[i].getValue(), temp2[i].getID()));
    }

    let max = 0;
    let max_indis = 0;
    for (let a = 0; a < score_ar.length; a++) {
      // en yuksek hazine degerini bul
      if (score_ar[a] >= max) {
        max = score_ar[a];
        max_indis = a;
      }
    }
    //player = 1;
    //console.log("en yuksek insdis########### ",array[max_indis], ", tiklaniyor.");
    //tikla("user1hole"+(array[max_indis]+1).toString()+"x");
    return array[max_indis] + 1;
  }
}

////////////////////////////////////
function runRobotExpert() {
  let move = robotExpert();
  player = 1;
  //console.log("en yuksek insdis########### ",move, ", tiklaniyor.");
  tikla("user1hole" + move.toString() + "x");
}
function robotExpert() {
  //console.log("HHHHARD calisti.");
  let array = doluHoleler();
  let len = array.length;
  let score_ar = []; // dolu hucrelerle ayni indisle
  if (len > 0) {
    var temp1 = [];
    var temp2 = [];
    for (let i = 0; i < 7; i++) {
      temp1.push(new Hole(user1hole[i].getValue(), user1hole[i].getID()));
      temp2.push(new Hole(user2hole[i].getValue(), user2hole[i].getID()));
    }
    bosalt();

    for (let k = 0; k < array.length; k++) {
      // dolu hocre sayisi kadar don
      let denenecek_hole_indis = array[k]; // dolu hucresinin indisini al
      //console.log("hole ,",denenecek_hole_indis, ", deneniyor.");
      bosalt();
      for (let i = 0; i < 7; i++) {
        user1hole.push(new Hole(temp1[i].getValue(), temp1[i].getID()));
        user2hole.push(new Hole(temp2[i].getValue(), temp2[i].getID()));
      }

      //console.log("dagitim sonrasi user1hole uzunnlugu: ",user1hole.length);
      //console.log("dagitim öncesi hazine: ",user1hole[6].value);
      //tikla("user1hole"+(denenecek_hole_indis+1).toString()+"x"); // dolu hucreyi dagittini dusun
      dagit(1, denenecek_hole_indis + 1);
      //console.log("dagitim sonrasi hazine: ",user1hole[6].value);
      // dolu hucre dagilitdiktan sonra hazinenin degerini al ve score ar.ine ata
      while (player == 1) {
        let move = robotExpert();
        dagit(1, move);
      }
      let karsi_skor_max = robotExpertForHumanSide(2);
      score_ar[k] = user1hole[6].getValue() - karsi_skor_max;
    }
    // her dolu kutu denendikten sonra hazineyi encok arttıran adimi sec
    bosalt();
    for (let i = 0; i < 7; i++) {
      user1hole.push(new Hole(temp1[i].getValue(), temp1[i].getID()));
      user2hole.push(new Hole(temp2[i].getValue(), temp2[i].getID()));
    }

    let max = 0;
    let max_indis = 0;
    for (let a = 0; a < score_ar.length; a++) {
      // en yuksek hazine degerini bul
      if (score_ar[a] >= max) {
        max = score_ar[a];
        max_indis = a;
      }
    }
    //player = 1;
    //console.log("en yuksek insdis########### ",array[max_indis], ", tiklaniyor.");
    //tikla("user1hole"+(array[max_indis]+1).toString()+"x");
    return array[max_indis] + 1;
  }
}
function robotExpertForHumanSide(istek) {
  //console.log("HHHHARD calisti.");
  let array = doluHolelerForHumanSide();
  let len = array.length;
  let score_ar = []; // dolu hucrelerle ayni indisle
  if (len > 0) {
    var temp1 = [];
    var temp2 = [];
    for (let i = 0; i < 7; i++) {
      temp1.push(new Hole(user1hole[i].getValue(), user1hole[i].getID()));
      temp2.push(new Hole(user2hole[i].getValue(), user2hole[i].getID()));
    }
    bosalt();

    for (let k = 0; k < array.length; k++) {
      // dolu hocre sayisi kadar don
      let denenecek_hole_indis = array[k]; // dolu hucresinin indisini al
      //console.log("hole ,",denenecek_hole_indis, ", deneniyor.");
      bosalt();
      for (let i = 0; i < 7; i++) {
        user1hole.push(new Hole(temp1[i].getValue(), temp1[i].getID()));
        user2hole.push(new Hole(temp2[i].getValue(), temp2[i].getID()));
      }

      //tikla("user1hole"+(denenecek_hole_indis+1).toString()+"x"); // dolu hucreyi dagittini dusun
      dagit(2, denenecek_hole_indis + 1);
      //console.log("dagitim sonrasi hazine: ",user1hole[6].value);
      // dolu hucre dagilitdiktan sonra hazinenin degerini al ve score ar.ine ata
      while (player == 2) {
        let move = robotExpertForHumanSide(1);
        dagit(2, move);
      }
      score_ar[k] = user2hole[6].getValue();
    }
    // her dolu kutu denendikten sonra hazineyi encok arttıran adimi sec
    bosalt();
    for (let i = 0; i < 7; i++) {
      user1hole.push(new Hole(temp1[i].getValue(), temp1[i].getID()));
      user2hole.push(new Hole(temp2[i].getValue(), temp2[i].getID()));
    }

    let max = 0;
    let max_indis = 0;
    for (let a = 0; a < score_ar.length; a++) {
      // en yuksek hazine degerini bul
      if (score_ar[a] >= max) {
        max = score_ar[a];
        max_indis = a;
      }
    }
    //player = 1;
    //console.log("en yuksek insdis########### ",array[max_indis], ", tiklaniyor.");
    //tikla("user1hole"+(array[max_indis]+1).toString()+"x");
    if (istek == 1) {
      return array[max_indis] + 1;
    } else {
      return max;
    }
  }
}
function bosalt() {
  while (user1hole.length > 0) {
    user1hole.pop();
  }
  while (user2hole.length > 0) {
    user2hole.pop();
  }
}
function doluHoleler() {
  // robotun oynacagi hole'u secmek icin, dolu olanlari bulan fonk.
  let x = 0;
  let array = [];
  for (let k = 0; k < 6; k++) {
    if (user1hole[k].getValue() != 0) {
      array.push(k);
    }
  }
  return array;
}
function doluHolelerForHumanSide() {
  // robotun oynacagi hole'u secmek icin, dolu olanlari bulan fonk.
  let x = 0;
  let array = [];
  for (let k = 0; k < 6; k++) {
    if (user2hole[k].getValue() != 0) {
      array.push(k);
    }
  }
  return array;
}

var clicks = 0;
function counterUp() {
  clicks += 1;
  document.getElementById("clicks").innerHTML = clicks;
}
function counterDown() {
  clicks -= 1;
  document.getElementById("clicks").innerHTML = clicks;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  counterDown();
}

//overlay ac kapa
function overlay() {
  settingsScore.addScore(
    user2hole[6].value - user1hole[6].value,
    `Cengaver(${zorlukDerecesi})`
  );
 

  state = false;

  document.getElementById("overlay").style.display = "block";

  if (user1hole[6].value > user2hole[6].value) {
    document.getElementById("text").innerHTML = "Kaybettiniz :(";
  } else if (user1hole[6].value == user2hole[6].value) {
    document.getElementById("text").innerHTML = "Berabere.";
  } else {
    document.getElementById("text").innerHTML = "Tebrikler! Kazandınız. :)";
  }
}

function overlayOff() {
  document.getElementById("overlay").style.display = "none";
}

function yenidenOyna() {
  // yeniden oynanmasi icin degiskenleri baslangic konumuna getirir.
  player = 2;
  robotMedium = 0;
  state = true; //true ise oyun devam ediyor.

  document.getElementById("user1").style.backgroundColor = waitcolor;
  document.getElementById("user2").style.backgroundColor = playercolor;

  bosalt();

  for (var i = 1; i < 7; i++) {
    var hole1 = new Hole(4, "user1hole" + i.toString());
    var hole2 = new Hole(4, "user2hole" + i.toString());
    user1hole.push(hole1);
    user2hole.push(hole2);
  }

  treasure1 = new Hole(0, "user1hole7");
  treasure2 = new Hole(0, "user2hole7");
  user1hole.push(treasure1);
  user2hole.push(treasure2);
  boncukCiz();

  overlayOff();
}
