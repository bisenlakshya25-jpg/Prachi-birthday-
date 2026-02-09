const app = document.getElementById("app");

const scenes = [
  "scene1",
  "scene2",
  "scene3",
  "scene4",
  "scene5",
  "scene6"
];

let currentScene = 0;

function loadScene(index) {
  fetch(`scenes/${scenes[index]}.html`)
    .then(res => res.text())
    .then(html => {
      app.innerHTML = html;

      document
        .querySelector(".scene")
        .classList.add("active");
    });
}

window.sceneComplete = function () {
  currentScene++;
  if (currentScene < scenes.length) {
    loadScene(currentScene);
  }
};

loadScene(currentScene);
