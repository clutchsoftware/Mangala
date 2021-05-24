# Mangala 

[Mangala Web Sayfası](https://clutchsoftware.github.io)

**➤Mangala Sunum Dosyası:**

[<i>Sunum Dosyası</i>](https://kod.pardus.org.tr/tugbaficici/mangala/blob/master/assets/sunum/MANGALA%20CLUTCH%20SOFTWARE.pdf)

**➤Mangala Tanıtım Videosu:**



[<i>Youtube Tanıtım Link</i>](https://www.youtube.com/watch?v=5J0FsoDLgyg)

Mangala bir zeka ve strateji oyunudur. Gaziantep, Urfa, Hatay gibi illede oynanan Köçürme oyununun adıdır. Dünyada bir çok farklı versiyonu vardır.
Mangala, iki kişi ile oynanır. Oyun tahtası üzerinde 12 kuyu, 2 hazine ve toplam 48 boncuk bulunmaktadır. Oyunun amacı oyuncuların kendi hazinelerinde en yüksek boncuk sayısına ulaşmasıdır.
![ayarlar](https://kod.pardus.org.tr/tugbaficici/mangala/raw/master/assets/image/ayarlarekrani.png)
### Oyun İçi Ayarlar
<b>Kullanıcı Ayarları</b>

Oyun başlangıç ile beraber kullanıcıya varsayılan isimlerden birini atamaktadır. Ana sayfadan <i>"Ayarlar"</i> kısmına girerek oyun boyunca kullanacağınız ismi belirleyebilirsiniz.

<b>Zorluk Modu</b>

<i>Bilgisayara karşı oyna</i> modu için geliştirilen Cengaver'in zorluk seviyesini belirlemenizi sağlar. Varsayılan olarak <i>orta zorluk modu</i> ayarlıdır.

### Oyunun Temel Kuralları

> <b>Kural 1 : </b>Başlama hakkı olan oyuncu kendi bölgesinde bulunan istediği kuyudan 4 adet taşı alır. Bir adet taşı aldığı kuyuya bırakıp saatin tersi yönünde, yani sağa doğru her bir kuyuya birer adet taş bırakarak elindeki taşlar bitene kadar dağıtır. Elindeki son taş hazinesine denk gelirse, oyuncu tekrar oynama hakkına sahip olur. Oyuncunun kuyusunda tek taş varsa, sırası geldiğinde bu taşı sağındaki kuyuya taşıyabilir. Hamle sırası rakibine geçer. Her seferinde oyuncunun elinde kalan son taş oyunun kaderini belirler.

> <b>Kural 2 : </b>Hamle sırası gelen oyuncu kendi kuyusundan aldığı taşları dağıtırken elinde taş kaldıysa, rakibinin bölgesindeki kuyulara da taş bırakmaya devam eder. Oyuncunun elindeki son taş, rakibinin bölgesinde denk geldiği kuyudaki taşların <b><i>sayısını çift sayı yaparsa</i> </b>(2, 4, 6, 8 gibi) oyuncu bu kuyuda yer alan tüm taşların sahibi olur ve onları kendi hazinesine koyar. Hamle sırası rakibine geçer.

> <b>Kural 3 : </b>Oyuncu taşları dağıtırken elinde kalan son taş, yine kendi bölgesinde yer alan boş bir kuyuya denk gelirse ve <b><i>eğer boş kuyusunun karşısındaki kuyuda da rakibine ait taş varsa, </i></b>hem rakibinin kuyusundaki taşları alır, hem de kendi boş kuyusuna bıraktığı taşı alıp hazinesine koyar. Hamle sırası rakibine geçer.

> <b>Kural 4 : </b>Oyunculardan herhangi birinin bölgesinde yer alan taşlar bittiğinde oyun seti biter. Oyunda kendi bölgesinde taşları ilk biten oyuncu, rakibinin bölgesinde bulunan tüm taşları da kazanır.
![tahta](https://kod.pardus.org.tr/tugbaficici/mangala/raw/master/assets/image/tahta.png)



## Yükleme Ve Çalıştırma

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/grass.png)
### Yükleme

```sh
$ git clone https://kod.pardus.org.tr/tugbaficici/mangala.git
$ cd Mangala
$ chmod +x script.sh
$ ./script.sh
```
### Çalıştırma

```sh
$ chmod +x run.sh
$ ./run.sh
```

# Mangala Oyunumuzun Dinamiği

> Oyunumuz da 3 tane mod bulumakta. Bunlar; <b>Çevim içi olarak oynamak, robota (Cengaver) karşı oynamak ve bilgisayar üzerinden karşılıklı oynamak.</b>

## Cengaver'in Gücü

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)

<p>
Cengaver'imizin toplam 4 farklı zorluk derecesi bulunmakta. Bu zorluk derecelerini incelersek;<br/><br/>
<b>Kolay Seviye:</b> Kuyu sayıları arasından rastgele birini seçerek Cengaver'imiz hamlesini oynamakta.

```javascript
function robotEasy() {
  let array = doluHoleler();
  let len = array.length;
  if (len > 0) {
    let holeID = Math.floor(Math.random() * 100000) % len;
    tikla("user1hole" + (array[holeID] + 1).toString() + "x");
  }
}
```

<b>Orta Seviye:</b> Cengaver bu seviyede tek hamlede yapabileceği en kazançlı (hazinesini en çok arttıran) hamleyi oynar.

```javascript
function robotMedium() {
  let array = doluHoleler();
  let len = array.length;
  let score_ar = [];
  if (len > 0) {
    var temp1 = [];
    var temp2 = [];
    for (let i = 0; i < 7; i++) {
      temp1.push(new Hole(user1hole[i].getValue(), user1hole[i].getID()));
      temp2.push(new Hole(user2hole[i].getValue(), user2hole[i].getID()));
    }
    bosalt();

    for (let k = 0; k < array.length; k++) {
      let denenecek_hole_indis = array[k];
      bosalt();
      for (let i = 0; i < 7; i++) {
        user1hole.push(new Hole(temp1[i].getValue(), temp1[i].getID()));
        user2hole.push(new Hole(temp2[i].getValue(), temp2[i].getID()));
      }
      dagit(1, denenecek_hole_indis + 1);
      score_ar[k] = user1hole[6].getValue();
    }
    bosalt();
    for (let i = 0; i < 7; i++) {
      user1hole.push(new Hole(temp1[i].getValue(), temp1[i].getID()));
      user2hole.push(new Hole(temp2[i].getValue(), temp2[i].getID()));
    }

    let max = 0;
    let max_indis = 0;
    for (let a = 0; a < score_ar.length; a++) {
      if (score_ar[a] >= max) {
        max = score_ar[a];
        max_indis = a;
      }
    }
    player = 1;
    tikla("user1hole" + (array[max_indis] + 1).toString() + "x");
  }
}
```

<b>Zor Seviye:</b> Cengaver bu seviyede orta seviyeye ek olarak oynama sırasın kendinde olduğu müddetçe yapabileceğie ardışık halmeler arasından en kazançlı (hazinesini en çok arttıran) hamleyi oynar.

```javascript
function robotHard() {
  let array = doluHoleler();
  let len = array.length;
  let score_ar = [];
  if (len > 0) {
    var temp1 = [];
    var temp2 = [];
    for (let i = 0; i < 7; i++) {
      temp1.push(new Hole(user1hole[i].getValue(), user1hole[i].getID()));
      temp2.push(new Hole(user2hole[i].getValue(), user2hole[i].getID()));
    }
    bosalt();

    for (let k = 0; k < array.length; k++) {
      let denenecek_hole_indis = array[k];
      bosalt();
      for (let i = 0; i < 7; i++) {
        user1hole.push(new Hole(temp1[i].getValue(), temp1[i].getID()));
        user2hole.push(new Hole(temp2[i].getValue(), temp2[i].getID()));
      }
      dagit(1, denenecek_hole_indis + 1);
      while (player == 1) {
        let move = robotExpert();
        dagit(1, move);
      }
      score_ar[k] = user1hole[6].getValue();
    }
    bosalt();
    for (let i = 0; i < 7; i++) {
      user1hole.push(new Hole(temp1[i].getValue(), temp1[i].getID()));
      user2hole.push(new Hole(temp2[i].getValue(), temp2[i].getID()));
    }

    let max = 0;
    let max_indis = 0;
    for (let a = 0; a < score_ar.length; a++) {
      if (score_ar[a] >= max) {
        max = score_ar[a];
        max_indis = a;
      }
    }
    return array[max_indis] + 1;
  }
}
```

<b>Cengaver Seviyesi:</b>  Bu seviyede Cengaver elinden geleni ardına koymaz. Kendisinin oynayabileceği her hamleye karşılık rakibinin de en iyi hamlesini hesaplar ve kendisine en yüksek, rakibine en az kazancı sağlayan hamleyi bulur ve oynar.

```javascript
function runRobotExpert(){
        let move = robotExpert()
        player = 1;
        tikla("user1hole"+(move).toString()+"x");
}
function robotExpert(){
    let array = doluHoleler();
    let len = array.length;
    let score_ar = [];
    if( len > 0){
        var temp1 = [];
        var temp2 = [];
        for (let i = 0; i < 7; i++) {
            temp1.push(new Hole(user1hole[i].getValue(),user1hole[i].getID()));
            temp2.push(new Hole(user2hole[i].getValue(),user2hole[i].getID()));
        };
        bosalt();

        for ( let k = 0; k < array.length; k++){
            let denenecek_hole_indis = array[k];
            bosalt();
            for (let i = 0; i < 7; i++) {
                user1hole.push(new Hole(temp1[i].getValue(),temp1[i].getID()));
                user2hole.push(new Hole(temp2[i].getValue(),temp2[i].getID()));
            };
            dagit(1,denenecek_hole_indis+1);
            while(player == 1){
                let move = robotExpert();
                dagit(1,move);
            }
            let karsi_skor_max = robotExpertForHumanSide(2);
            score_ar[k] = user1hole[6].getValue() - karsi_skor_max;
        }
        bosalt();
        for (let i = 0; i < 7; i++) {
            user1hole.push(new Hole(temp1[i].getValue(),temp1[i].getID()));
            user2hole.push(new Hole(temp2[i].getValue(),temp2[i].getID()));
        };

        let max = 0;
        let max_indis = 0;
        for ( let a = 0; a< score_ar.length; a++){
            if( score_ar[a] >= max){
                max = score_ar[a];
                max_indis = a;
            }
        }
        return array[max_indis]+1;
    }
}
...
```

[<i>Cengaver'in Kaynak Kodu.</i>](https://kod.pardus.org.tr/tugbaficici/mangala/blob/master/pages/robotGameArea.js)

## Çevrim İçi Moduyla Gerçek Cengaverlere Karşı

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)

> SocketIO kullanarak oluştuduğumuz server ile kullanıcıların bu server üzerinde <i>oda oluşturma</i> ve <i>odaya katılma</i> fonksiyonlarıyla çevrim içi olarak oynayabilmektedir.

![OdaImage](https://kod.pardus.org.tr/tugbaficici/mangala/raw/master/assets/image/oda.png)

## Arkadaşına Karşı

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)

> Hem Cengaver'e karşı hem de çevrim içi oynanabildiği gibi aynı bilgisayarda iki kişi karşılıklı oynabilmektedir.

## Ekip Üyeleri

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/fire.png)

[@Abdülkerim Aksak](https://github.com/KerimAksak)

[@Muaz Dervent](https://github.com/muazdervent)

[@Tuğba Fıçıcı](https://github.com/tugbaficici)

## Lisans

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/solar.png)

Mangala MIT lisansı ile lisanslanmıştır.
