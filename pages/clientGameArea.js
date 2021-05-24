overlayOda();

class Hole {
  constructor(value, id) {
    this.id = id;
    this.value = value;
    this.addedDotcount = 0;
  }
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
waitcolor = "#ed664c"; // Kırmızı renk beklesin
playercolor = "#ffe268"; // Sarı renk oynasın
waitvisible = "visible";
playervisible = "hidden";

function tikla(id) {
  // ekranda bulunan kuyulardaki kuyulara tıklama ile tetiklenen fonk.
  // tiklanan kuyunun html' deki id sini alır
  // Paramaters:
  //      id --> tiklanan kuyunun html' deki id sini alır ex.("user1hole5")
  if (Number(id[4]) == 1 && player == Number(id[4]) && id[10] == "x") {
    if (user1hole[Number(id[9]) - 1].value != 0) {
      player = 2;
      dagit(Number(id[4]), Number(id[9]));
      boncukCiz();
      if (player == 2) {
        document.getElementById("user1").style.backgroundColor = waitcolor;
        document.getElementById("user2").style.backgroundColor = playercolor;
        document.getElementById("clock1").style.visibility = playervisible;
        document.getElementById("clock2").style.visibility = waitvisible;
      }
      //sendMessage(Number(id[9]));
    }
  } else if (Number(id[4]) == 2 && player == Number(id[4])) {
    // player 2
    if (user2hole[Number(id[9]) - 1].value != 0) {
      player = 1;
      dagit(Number(id[4]), Number(id[9]));
      boncukCiz();

      if (player == 1) {
        document.getElementById("user1").style.backgroundColor = playercolor;
        document.getElementById("user2").style.backgroundColor = waitcolor;
        document.getElementById("clock1").style.visibility = waitvisible;
        document.getElementById("clock2").style.visibility = playervisible;
      }
      sendMessage(Number(id[9]));
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
    let sira = 1;
    let count = user1hole[holeID].value - 1;
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
    }
    ///##################
    //player 1 (ustteki) icin oynu kurallari

    sonHole = holeID - 1;
    console.log(sonHole, ".....sonhole");
    if (sonHole == 6) {
      // son tas kendi hazinendeyse sira tekrar sende
      if (sira == 1) {
        player = 1;
      }
    } else if (sira == -1 && user2hole[sonHole].value % 2 == 0) {
      // son tas karsi tarafin kuyusunu cift yapiyorsa hepsini al
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
      // ve karsi kuyu da tas varsa kendi tek tasini ve karsidakileri hepsini al
      console.log(user2hole[5 - sonHole].value);
      user1hole[6].value += user2hole[5 - sonHole].value + 1;
      user1hole[6].addedDotcount += user2hole[5 - sonHole].value + 1;
      user1hole[sonHole].value = 0;
      user1hole[sonHole].addedDotcount = 0;
      user2hole[5 - sonHole].value = 0;
      user2hole[5 - sonHole].addedDotcount = 0;
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
    console.log(sonHole, ".....sonhole");
    if (sonHole == 6) {
      // son tas kendi hazinendeyse sira tekrar sende
      if (sira == 1) {
        player = 2;
      }
    } else if (sira == -1 && user1hole[sonHole].value % 2 == 0) {
      // son tas karsi tarafin kuyusunu cift yapiyorsa hepsini al
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
      console.log(user1hole[5 - sonHole].value);
      user2hole[6].value += user1hole[5 - sonHole].value + 1;
      user2hole[6].addedDotcount += user1hole[5 - sonHole].value + 1;
      user2hole[sonHole].value = 0;
      user2hole[sonHole].addedDotcount = 0;
      user1hole[5 - sonHole].value = 0;
      user1hole[5 - sonHole].addedDotcount = 0;
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
  let x = 0;
  let holeID = Math.floor(Math.random() * 10) % 6;
  while (user1hole[holeID] == 0 && x < 100) {
    holeID = Math.floor(Math.random() * 10) % 6;
    x += 1;
  }

  return holeID;
}

function robotEasy() {
  // player 1 i kontrol eden robot
  let x = 0;
  let holeID = Math.floor(Math.random() * 10) % 6;
  while (user1hole[holeID] == 0 && x < 100) {
    holeID = Math.floor(Math.random() * 10) % 6;
    x += 1;
  }

  return holeID;
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
  state = false;
  settingsScore.addScore(user2hole[6].value - user1hole[6].value,rakipOyuncu);
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
  //player = 2;

  //document.getElementById("user1").style.backgroundColor = waitcolor;
  //document.getElementById("user2").style.backgroundColor = playercolor;

  for (var i = 1; i < 8; i++) {
    user1hole.pop();
    user2hole.pop();
  }

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

  console.log(user1hole);
  console.log(user2hole);

  boncukCiz();

  overlayOff();
}

const { desktopCapturer } = require("electron");
// SERVER İLETİŞİM
//client
const io = require("socket.io-client");

//Connect  http://localhost:3000
let game = io.connect("https://mangala-server.herokuapp.com/game");
//let game = io.connect("http://localhost:3000/game");

//username cekme
const name = require("./settings.js");

const username = name.getUsername();
console.log(name.getUsername());
// server kontrol
game.on("welcome", (data) => {
  console.log(data);
});
var rakipOyuncu;
var randomKey;
function overlayOda() {
  document.getElementById("overlayOda").style.display = "block";

  //ODA OLUSTURMA
  const odaOlusturContainer = document.getElementById("odaOlustur");
  const odaOlusturBtn = document.getElementById("odaOlusturBtn");
  odaOlusturBtn.onclick = () => {
    randomKey = Math.random().toString(36).substr(2, 5); // odalar için random key
    let elemt = document.createElement("p");
    //Server kısmında key adında oda olustur.
    console.log("girdi");
    game.emit("odaOlustur", randomKey);
    game.on("odaBasariliSekildeOlusturuldu", (odaninKeyDegeri) => {
      elemt.textContent = odaninKeyDegeri + " odası oluşturuldu.";
    });
    //odaOlusturContainer.appendChild(elemt);

    let elemt2 = document.createElement("p");
    game.emit("joinRoom", randomKey, username);
    game.on("success", (key) => {
      elemt2.textContent = "Oda numarası: " + key;
    });
    game.on("err", (key) => {
      elemt2.textContent = key + " odasına giriş yapılamadı.";
    });
    odaOlusturContainer.appendChild(elemt2);

    let elemt3 = document.createElement("p");
    let odaGirisi = document.getElementById("odaGirisi");
    game.on("newUser", (userNew) => {
      elemt3.textContent = userNew + " odaya katıldı.";
      game.emit("sendUserName", username, randomKey); // İkinci kullanıcı karşılama(isim yollama)
      document.getElementById("user1Name").innerHTML = userNew;
      rakipOyuncu=userNew;
      createNotification(userNew + " odaya katıldı.");
    });
    //odaGirisi.appendChild(elemt3);
    overlayOdaOff();
  };
 
  
  // ODAYA KATIL
  const odaGirisi = document.getElementById("odaGirisi");
  let odayaKatilBtn = document.getElementById("odayaKatilBtn");
  let odayaKatilInput = document.getElementById("odayaKatilInput");
  odayaKatilBtn.onclick = () => {
    document.getElementById("user1").style.backgroundColor = playercolor;
    document.getElementById("user2").style.backgroundColor = waitcolor;
    document.getElementById("clock1").style.visibility = waitvisible;
    document.getElementById("clock2").style.visibility = playervisible;
    let roomKey = odayaKatilInput.value;
    randomKey = roomKey;
    game.emit("joinRoom", roomKey, name.getUsername()); //username dinamik olmalı!!!!
    let elemt5 = document.createElement("p");
    game.on("success", (roomKey) => {
      elemt5.textContent = "Oda numarası: " + roomKey;
      createNotification(roomKey + " odasına giriş yapıldı.");
    });
    game.on("err", (roomKey) => {
      elemt5.textContent = roomKey + " odasına giriş yapılamadı.";
      createNotification(roomKey + " odasına giriş yapılamadı.");
    });
    //odaGirisi.appendChild(elemt);
    odaOlusturContainer.appendChild(elemt5);
    overlayOdaOff();
    player = 1;
  };
}

function overlayOdaOff() {
  document.getElementById("overlayOda").style.display = "none";
}

// Toast script
const createNotification = (mesaj) => {
  const notif = document.createElement("div");
  const toasts = document.getElementById("toasts");
  notif.classList.add("toast");
  notif.classList.add("info");
  notif.innerText = mesaj;
  toasts.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
};

// MESAJ YOLLAMA <OdayaKatıl>
function sendMessage(userHoleID) {
  //let odayaKatilInput = document.getElementById("odayaKatilInput");
  //let roomKey = odayaKatilInput.value; // Odaya katıl alanı için etkin
  //let input = document.getElementById("mesajGonderOdayaKatilInput");
  //let msg = input.value;
  let msg = userHoleID;
  //input.value = "";
  game.emit("newMsg", name.getUsername(), msg, randomKey); // username dinamik olmalı!!!!
}

// MESAJI ALMA <OdaOlustur>
function addMessage(msg) {
  let elemt = document.createElement("p");
  elemt.textContent = `${username}:${msg}`;
  container.appendChild(elemt);
}

game.on("newMessage", (msg) => {
  console.log(`newMessage...: "${msg}" mesajı geldi.`);
  tikla("user1hole" + msg + "x");
});

game.on("newUserName", (username) => {
  console.log(username);
  document.getElementById("user1Name").innerHTML = username;
});
