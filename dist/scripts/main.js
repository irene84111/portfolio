$(".btn-about").click(function(){$(".cd-panel-close-mobile").fadeIn()}),$(".cd-panel-close-mobile").click(function(){$(".cd-panel-close-mobile").fadeOut()}),window.sr=ScrollReveal();var main={duration:1500,delay:200},mainLeft={duration:1500,delay:100,distance:"90px",rotate:{z:10},scale:.8},mainRight={duration:1500,delay:500,distance:"90px",rotate:{z:-10},scale:.8};sr.reveal(".about",mainLeft),sr.reveal(".skill",mainRight),sr.reveal(".work",main),sr.reveal(".blog",main);