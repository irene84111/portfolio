// ScrollReveal
window.sr = ScrollReveal();
var main = {
  duration : 1500,
  delay    : 200,
};
var mainLeft = {
  duration : 1500,
  delay    : 100,
  distance : '90px',
  // rotate   : { z: 10 },
  scale    : 0.8
};
var mainRight = {
  duration : 1500,
  delay    : 500,
  distance : '90px',
  // rotate   : { z: -10 },
  scale    : 0.8
};

sr.reveal('.about', mainLeft);
sr.reveal('.skill', mainRight);
// sr.reveal('.work', main);
sr.reveal('.blog', main);