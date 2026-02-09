const title = document.getElementById("title");
const text = document.getElementById("text");
const heartScene = document.getElementById("heartScene");
const heart = document.getElementById("heart");
const endText = document.getElementById("endText");

/* Content */
const titleText = "Sorry mera bachcha";
const bodyText =
`Iss baar mai aapke birthday me nahi hu,
par maine koshish ki hai
ki aapko meri presence feel ho.

I promise…
next birthday hum saath cake cut karenge.`;

/* Typing control */
let tIndex = 0;
let bIndex = 0;

const typingSpeedTitle = 110;
const typingSpeedBody = 42;
const pauseAfterLine = 450;

/* Init */
title.textContent = "";
text.textContent = "";
title.style.opacity = 1;
text.style.opacity = 1;

/* Title typing */
function typeTitle() {
  if (tIndex < titleText.length) {
    title.textContent += titleText[tIndex];
    tIndex++;
    setTimeout(typeTitle, typingSpeedTitle);
  } else {
    setTimeout(typeBody, 900);
  }
}

/* Body typing with pause on new lines */
function typeBody() {
  if (bIndex < bodyText.length) {
    const char = bodyText[bIndex];
    text.textContent += char;
    bIndex++;

    if (char === "\n") {
      setTimeout(typeBody, pauseAfterLine);
    } else {
      setTimeout(typeBody, typingSpeedBody);
    }
  } else {
    setTimeout(triggerHeartScene, 2200);
  }
}

/* Heart cinematic ending */
function triggerHeartScene() {
  heartScene.style.opacity = 1;

  setTimeout(() => {
    heart.style.transform = "scale(18)";
    heart.style.opacity = 0.2;
  }, 1200);

  setTimeout(() => {
    endText.style.opacity = 1;
  }, 4200);
}

/* Start */
typeTitle();
