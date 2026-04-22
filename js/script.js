const songs = [
  { title:"Filúz a striga", book:"Balady a povesti", author:"Ľudmila Podjavorinská", cover:"IMG/NG-pribeh-cover-2.jpg", src: "AUDIO/01.1_BALADY A POVESTI_Filuz a striga.mp3"},
  { title:"Filúz a víly", book:"Balady a povesti", author:"Ľudmila Podjavorinská", cover:"IMG/NG-pribeh-cover-2.jpg", src: "AUDIO/01.2_BALADY A POVESTI_Filuz a vily.mp3"},
  { title:"Lietajúci krab", book:"Biely koník", author:"Onelio Jorge Cardoso", cover:"IMG/NG-pribeh-cover-9.jpg", src: "AUDIO/02.1_BIELY KONIK_Lietajuci krab.mp3"},
  { title:"Vták, netopier a&nbsp;myš", book:"Biely koník", author:"Onelio Jorge Cardoso", cover:"IMG/NG-pribeh-cover-9.jpg", src: "AUDIO/02.2_BIELY KONIK_Vtak, netopier a mys.mp3"},
  { title:"Bolo nás jedenásť", book:"", author:"Bolo nás jedenásť", cover:"IMG/NG-pribeh-cover-6.jpg", src: "AUDIO/03_BOLO NAS JEDENAST.mp3"},
  { title:"Dajte pozor na leva", book:"Dajte pozor na leva", author:"Jaroslav Steľmach", cover:"IMG/NG-pribeh-cover-4.jpg", src: "AUDIO/04_DAJTE POZOR NA LEVA.mp3"},
  { title:"Ezopské bájky", book:"Ezopské bájky", author:"Ezop", cover:"IMG/NG-pribeh-cover-5.jpg", src: "AUDIO/05_EZOPSKE BAJKY.mp3"},
  { title:"Išli svrčky poza bučky", book:"Išli svrčky poza bučky", author:"Ľudmila Podjavorinská", cover:"IMG/NG-pribeh-cover-8.jpg", src: "AUDIO/06_ISLI SVRCKY POZY BUCKY.mp3"},
  { title:"Sedmohlások", book:"Sedmohlások", author:"Vladimír Ferko", cover:"IMG/NG-pribeh-cover-7.jpg", src: "AUDIO/07.1_SEDMOHLASOK_Sedmohlasok.mp3"},
  { title:"Vrabec všadebol", book:"Sedmohlások", author:"Vladimír Ferko", cover:"IMG/NG-pribeh-cover-7.jpg", src: "AUDIO/07.2_SEDMOHLASOK_Vrabec vsadebol.mp3"},
  { title:"Karavanou cez saharu", book:"Karavanou cez saharu", author:"Herbert Kaufmann", cover:"IMG/NG-pribeh-cover-7.jpg", src: "AUDIO/08_S KARAVANOU CEZ SAHARU.mp3"},
  { title:"Čertoryje", book:"Sedem dobrých bratov", author:"Ondrej Ľubomírsky", cover:"IMG/NG-pribeh-cover-10.jpg", src: "AUDIO/09.1_SEDEM DOBRYCH BRATOV_Certoryje.mp3"},
  { title:"Sedem dobrých bratov", book:"Sedem dobrých bratov", author:"Ondrej Ľubomírsky", cover:"IMG/NG-pribeh-cover-10.jpg", src: "AUDIO/09.2_SEDEM DOBRYCH BRATOV_Sedem dobrych bratov.mp3"},
  { title:"Či za dobré sa treba dobrým odmeniť", book:"Slovenské ľudové rozprávky", author:"Samo Czambla", cover:"IMG/NG-pribeh-cover-3.jpg", src: "AUDIO/10.1_SLOVENSKE LUDOVE ROZPRAVKY_Ci za dobre sa treba dobrym odmenit.mp3"},
  { title:"Krvižíznivý pán", book:"Slovenské ľudové rozprávky", author:"Samo Czambla", cover:"IMG/NG-pribeh-cover-3.jpg", src: "AUDIO/10.2_SLOVENSKE LUDOVE ROZPRAVKY_Krviziznivy pan.mp3"},
  { title:"O Ďurkovi, čo oslobodil princeznú", book:"Slovenské ľudové rozprávky", author:"Samo Czambla", cover:"IMG/NG-pribeh-cover-3.jpg", src: "AUDIO/10.3_SLOVENSKE LUDOVE ROZPRAVKY_O Durkovi, co oslobodil princeznu.mp3"},
  { title:"Zakliate vojsko pod Sitnom", book:"Slovenské ľudové rozprávky", author:"Samo Czambla", cover:"IMG/NG-pribeh-cover-3.jpg", src: "AUDIO/10.4_SLOVENSKE LUDOVE ROZPRAVKY_Zakliate vojsko pod Sitnom.mp3"},
];

const CARD_H = 500; /* Musí sedieť s CSS height .card a .reel-mask */
let current = 0, playing = false, animating = false;
const track = document.getElementById('reelTrack');
const audio = new Audio();

function loadSong(index) {
  audio.src = songs[index].src;
  audio.load();
}

function togglePlay() {
  if (playing) {
    audio.pause();
  } else {
    audio.play().catch(e => console.log("Audio error:", e));
  }
  playing = !playing;
  updatePlayIcons();
}

function updatePlayIcons() {
  document.getElementById('iconPlay').style.display = playing ? 'none' : 'block';
  document.getElementById('iconPause').style.display = playing ? 'block' : 'none';
}

audio.onended = () => navigate(1);

function getRandomColor() {
  return 'c' + Math.floor(Math.random() * 7);
}

function getRandomRotation() {
  return (Math.random() * 6 - 3).toFixed(1);
}

function buildCards() {
  const ext = [songs[songs.length-1], ...songs, songs[0]];
  track.innerHTML = '';
  ext.forEach((s) => {
    const colorClass = getRandomColor();
    const rotation = getRandomRotation();
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-cover ${colorClass}" style="transform: rotate(${rotation}deg)">
        <img src="${s.cover}" alt="${s.title}" onerror="this.style.display='none'">
      </div>
      <div class="card-info">
        <div class="song-label ${colorClass}">${s.title}</div>
        <div class="card-book">${s.book}</div>
        <div class="card-author">${s.author}</div>
      </div>`;
    track.appendChild(card);
  });
}

function setPos(extIdx, instant) {
  const y = -extIdx * CARD_H;
  // Zmenený čas na 0.8s a upravený easing pre "filmový" plynulý pocit
  track.style.transition = instant ? 'none' : 'transform 0.8s cubic-bezier(0.45, 0, 0.55, 1)';
  track.style.transform = `translateY(${y}px)`;
}

function navigate(dir) {
  if (animating) return;
  animating = true;
  
  const tgtExt = (current + 1) + dir;
  const wrap = ((current + dir) % songs.length + songs.length) % songs.length;

  setPos(tgtExt, false);
  
  track.addEventListener('transitionend', function h() {
    track.removeEventListener('transitionend', h);
    current = wrap;
    setPos(current + 1, true);
    
    loadSong(current);
    if (playing) audio.play();
    
    animating = false;
  }, { once: true });
}

document.getElementById('btnPrev').addEventListener('click', () => navigate(-1));
document.getElementById('btnNext').addEventListener('click', () => navigate(1));
document.getElementById('btnPlay').addEventListener('click', togglePlay);

buildCards();
setPos(current + 1, true);
loadSong(current);