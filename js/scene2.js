const pages = document.querySelectorAll('.diary-page');
const diary = document.getElementById('diary');
const sound = document.getElementById('pageSound');

let current = 0;
let soundUnlocked = false;
let sceneEnded = false;

/* ---------- SOUND PLAY ---------- */
function playSound() {
  if (!soundUnlocked) return;
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

/* ---------- SHOW PAGE ---------- */
function showPage(index) {

  /* LAST PAGE → CLOSE DIARY & END SCENE */
  if (index >= pages.length) {
    if (sceneEnded) return;
    sceneEnded = true;

    playSound();
    diary.classList.add('close');

    /* tell main controller that Scene 2 is complete */
    setTimeout(() => {
      if (window.sceneComplete) {
        window.sceneComplete(2);
      }
    }, 1200); // diary close animation buffer

    return;
  }

  if (index < 0) return;

  playSound();

  pages[current].classList.remove('active');
  pages[index].classList.add('active');

  pages[index].querySelector('.page').animate(
    [
      { transform: 'rotateY(0deg)' },
      { transform: 'rotateY(-180deg)' }
    ],
    {
      duration: 900,
      easing: 'ease-in-out'
    }
  );

  current = index;
}

/* ---------- NEXT / PREV ---------- */
function nextPage() {
  showPage(current + 1);
}

function prevPage() {
  if (current === 0) return;
  showPage(current - 1);
}

/* ---------- CLICK (NEXT) ---------- */
document.addEventListener('click', () => {
  if (sceneEnded) return;

  if (!soundUnlocked) {
    soundUnlocked = true;
    sound.play().then(() => sound.pause());
  }

  nextPage();
});

/* ---------- SWIPE ---------- */
let startX = 0;

document.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

document.addEventListener('touchend', e => {
  if (sceneEnded) return;

  const endX = e.changedTouches[0].clientX;

  if (!soundUnlocked) {
    soundUnlocked = true;
    sound.play().then(() => sound.pause());
  }

  if (startX - endX > 60) {
    nextPage();      // swipe left → next
  } 
  else if (endX - startX > 60) {
    prevPage();      // swipe right → previous
  }
});
