const music = document.getElementById('bgMusic');
const knife = document.getElementById('knife');
const instruction = document.getElementById('instruction');
const slice = document.getElementById('slice');
const cake = document.getElementById('cake');
const blackout = document.getElementById('blackout');
const wishText = document.getElementById('wishText');

let cutting = false;
let cutDone = false;
let musicStarted = false;
let sceneEnded = false;

/* ---------- START MUSIC (SAFE UNLOCK) ---------- */
document.body.addEventListener('touchstart', () => {
  if (!musicStarted) {
    music.volume = 0.9;
    music.play().catch(() => {});
    musicStarted = true;
  }
}, { once: true });

/* ---------- CUT START ---------- */
document.addEventListener('touchstart', e => {
  if (cutDone || sceneEnded) return;

  const touch = e.touches[0];
  knife.style.left = touch.clientX + 'px';
  knife.style.top = touch.clientY + 'px';
  knife.style.opacity = 1;

  instruction.style.opacity = 0;
  cutting = true;
});

/* ---------- KNIFE MOVE ---------- */
document.addEventListener('touchmove', e => {
  if (!cutting || cutDone || sceneEnded) return;

  const touch = e.touches[0];
  knife.style.left = touch.clientX + 'px';
  knife.style.top = touch.clientY + 'px';
});

/* ---------- CUT END ---------- */
document.addEventListener('touchend', () => {
  if (!cutting || cutDone || sceneEnded) return;

  cutting = false;
  cutDone = true;
  knife.style.opacity = 0;

  /* Cake cut animation */
  setTimeout(() => {
    cake.style.transform = 'translateZ(20px) rotateY(-4deg)';
    slice.style.opacity = 1;
    slice.style.transform =
      'translateX(60px) translateZ(60px) rotateY(18deg)';
  }, 600);

  /* Music fade out */
  setTimeout(() => {
    let fade = setInterval(() => {
      if (music.volume > 0.05) {
        music.volume -= 0.05;
      } else {
        music.pause();
        music.currentTime = 0;
        clearInterval(fade);
      }
    }, 150);
  }, 1200);

  /* Blackout + wish */
  setTimeout(() => {
    blackout.style.opacity = 1;
    wishText.style.opacity = 1;
  }, 2600);

  /* End Scene → go next */
  setTimeout(endScene, 5200);
});

/* ---------- END SCENE ---------- */
function endScene() {
  if (sceneEnded) return;
  sceneEnded = true;

  if (musicStarted) {
    music.pause();
    music.currentTime = 0;
  }

  if (window.sceneComplete) {
    window.sceneComplete(5);
  }
}
