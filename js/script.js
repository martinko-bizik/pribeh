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
  { title:"Karavanou cez saharu", book:"Karavanou cez saharu", author:"Herbert Kaufmann", cover:"IMG/NG-pribeh-cover-1.jpg", src: "AUDIO/08_S KARAVANOU CEZ SAHARU.mp3"},
  { title:"Čertoryje", book:"Sedem dobrých bratov", author:"Ondrej Ľubomírsky", cover:"IMG/NG-pribeh-cover-10.jpg", src: "AUDIO/09.1_SEDEM DOBRYCH BRATOV_Certoryje.mp3"},
  { title:"Sedem dobrých bratov", book:"Sedem dobrých bratov", author:"Ondrej Ľubomírsky", cover:"IMG/NG-pribeh-cover-10.jpg", src: "AUDIO/09.2_SEDEM DOBRYCH BRATOV_Sedem dobrych bratov.mp3"},
  { title:"Či za dobré sa treba dobrým odmeniť", book:"Slovenské ľudové rozprávky", author:"Samo Czambla", cover:"IMG/NG-pribeh-cover-3.jpg", src: "AUDIO/10.1_SLOVENSKE LUDOVE ROZPRAVKY_Ci za dobre sa treba dobrym odmenit.mp3"},
  { title:"Krvižíznivý pán", book:"Slovenské ľudové rozprávky", author:"Samo Czambla", cover:"IMG/NG-pribeh-cover-3.jpg", src: "AUDIO/10.2_SLOVENSKE LUDOVE ROZPRAVKY_Krviziznivy pan.mp3"},
  { title:"O Ďurkovi, čo oslobodil princeznú", book:"Slovenské ľudové rozprávky", author:"Samo Czambla", cover:"IMG/NG-pribeh-cover-3.jpg", src: "AUDIO/10.3_SLOVENSKE LUDOVE ROZPRAVKY_O Durkovi, co oslobodil princeznu.mp3"},
  { title:"Zakliate vojsko pod Sitnom", book:"Slovenské ľudové rozprávky", author:"Samo Czambla", cover:"IMG/NG-pribeh-cover-3.jpg", src: "AUDIO/10.4_SLOVENSKE LUDOVE ROZPRAVKY_Zakliate vojsko pod Sitnom.mp3"},
];

const CARD_H = 500;
let current = 0, playing = false, animating = false;
const track = document.getElementById('reelTrack');
const audio = new Audio();

/**
 * Zafixuje farbu k názvu piesne, aby sa pri nekonečnom skrolovaní nemenila.
 */
function getColorClass(songTitle) {
  let hash = 0;
  for (let i = 0; i < songTitle.length; i++) {
    hash = songTitle.charCodeAt(i) + ((hash << 5) - hash);
  }
  return 'c' + (Math.abs(hash) % 7);
}

function getRandomRotation() {
  return (Math.random() * 6 - 3).toFixed(1);
}

function loadSong(index) {
  audio.src = songs[index].src;
  audio.load();
}

function updatePlayIcons() {
  const btnPlay = document.getElementById('btnPlay');
  const iconPlay = document.getElementById('iconPlay');
  const iconPause = document.getElementById('iconPause');

  if (playing) {
    iconPlay.style.display = 'none';
    iconPause.style.display = 'block';
    btnPlay.classList.add('is-playing'); // CSS zmení farbu na pink
  } else {
    iconPlay.style.display = 'block';
    iconPause.style.display = 'none';
    btnPlay.classList.remove('is-playing'); // CSS vráti na čiernu
  }
}

function togglePlay() {
  if (playing) {
    audio.pause();
  } else {
    audio.play().catch(e => console.log("Audio play blocked:", e));
  }
  playing = !playing;
  updatePlayIcons();
}

audio.onended = () => navigate(1);

function buildCards() {
  // Pridáme dummy karty na začiatok a koniec pre plynulý nekonečný loop
  const ext = [songs[songs.length - 1], ...songs, songs[0]];
  track.innerHTML = '';
  
  ext.forEach((s) => {
    const colorClass = getColorClass(s.title);
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

/**
 * Nastavenie pozície s GPU akceleráciou (translateZ(0))
 */
function setPos(extIdx, instant) {
  const y = -extIdx * CARD_H;
  if (instant) {
    track.style.transition = 'none';
  } else {
    // cubic-bezier optimalizovaný pre plynulý dojazd na dotykových displejoch
    track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
  }
  
  // translateZ(0) vynúti renderovanie cez grafický čip (plynulosť)
  track.style.transform = `translateY(${y}px) translateZ(0)`;
}

function navigate(dir) {
  if (animating) return;
  animating = true;
  
  const tgtExt = (current + 1) + dir;
  const wrap = ((current + dir) % songs.length + songs.length) % songs.length;

  // Spustenie animácie
  requestAnimationFrame(() => {
    setPos(tgtExt, false);
  });
  
  const onTransitionEnd = () => {
    track.removeEventListener('transitionend', onTransitionEnd);
    current = wrap;
    setPos(current + 1, true); // Okamžitý skok na reálnu pozíciu (neviditeľne)
    
    loadSong(current);
    if (playing) {
      audio.play().catch(e => console.log("Auto-play error:", e));
    }
    
    animating = false;
  };

  track.addEventListener('transitionend', onTransitionEnd);
}

/**
 * Špeciálny handler pre iPad: eliminuje ghosting a oneskorenie dotyku.
 */
function setupControl(id, action) {
  const btn = document.getElementById(id);
  
  const handleStart = (e) => {
    // Zabraňuje simulovaným "click" udalostiam a systémovému zvýrazneniu
    if (e.cancelable) e.preventDefault(); 
    btn.classList.add('is-active');
  };

  const handleEnd = (e) => {
    if (btn.classList.contains('is-active')) {
      btn.classList.remove('is-active');
      action();
    }
  };

  const handleCancel = () => {
    btn.classList.remove('is-active');
  };

  // Pointer udalosti fungujú pre myš aj dotyk (iOS 13+)
  btn.addEventListener('pointerdown', handleStart);
  btn.addEventListener('pointerup', handleEnd);
  btn.addEventListener('pointerleave', handleCancel);
  btn.addEventListener('pointercancel', handleCancel);
}

// Inicializácia pri načítaní
document.addEventListener('DOMContentLoaded', () => {
  buildCards();
  setPos(current + 1, true);
  loadSong(current);

  // Naviazanie ovládania
  setupControl('btnPrev', () => navigate(-1));
  setupControl('btnNext', () => navigate(1));
  setupControl('btnPlay', () => togglePlay());
});