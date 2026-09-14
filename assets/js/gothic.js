/**
* MORTIZ - Capa gotica
* Se carga DESPUES de main.js para que la plantilla base quede intacta.
*
* Intro: la clase .is-loading la pone un <script> en el <head> de index.html,
* antes del primer pintado. Aqui solo se lleva el compas:
*
*   1. .is-intro   -> la catedral aparece de dia y anochece
*   2. .is-revealing -> el contenido sube desde abajo
*   3. sin clases  -> pagina normal
*
* El anochecer vive DENTRO de cathedral.svg (se carga en un <object>, asi que
* el CSS de fuera no lo alcanza). Lo unico que se hace desde aqui es ponerle la
* clase .cycle a su <svg> para que arranque a la vez que el resto del intro.
*/

(function () {
  "use strict";

  var root = document.documentElement;
  if (!root.classList.contains('is-loading')) return;

  var sky = document.querySelector('.backdrop__sky object');

  /* El anochecer dura 2s. Esa cifra esta repetida en otros dos sitios que
     tienen que ir a la par: el velo de la noche (veil-fall / atmos-fall en
     gothic.css) y el ciclo de luz (las reglas .cycle dentro de cathedral.svg).
     Si la cambias aqui, repasalos: son duraciones absolutas, no fracciones.
     Con "reducir movimiento" el intro es el mismo; lo que cambia esta en el CSS. */
  var CYCLE_MS = 2000;   /* lo que dura el anochecer antes de abrir */
  /* Tiene que cubrir la entrada MAS LARGA de la portada: el aviso de scroll
     espera 520ms y tarda 1250ms en subir (gothic.css). Si se queda corto, se
     le quita la clase .is-revealing antes de tiempo y arranca el bamboleo (o
     el parpadeo de vela del titulo) a mitad del fundido, pisandolo. */
  var RISE_MS = 1800;    /* lo que tarda el contenido en entrar */
  var RESCUE_MS = 6000;  /* si algo no carga, se abre igual */

  var started = false;
  var opened = false;

  /* El contenido sube y el intro se va. Se refresca AOS porque sus medidas se
     tomaron con la pagina todavia escondida. */
  function open() {
    if (opened) return;
    opened = true;

    root.classList.add('is-revealing');
    root.classList.remove('is-loading', 'is-intro');

    setTimeout(function () {
      root.classList.remove('is-revealing');
      if (window.AOS) AOS.refreshHard();
    }, RISE_MS);
  }

  /* Arranca el anochecer dentro del SVG. Si el documento del <object> no es
     alcanzable (abrir el index con file:// en vez de servirlo, por ejemplo),
     no pasa nada: la catedral se queda de noche, que es su estado por defecto. */
  function lightCycle() {
    if (!sky) return;
    var doc;
    try {
      doc = sky.contentDocument;
    } catch (e) {
      return;
    }
    if (doc && doc.documentElement) doc.documentElement.classList.add('cycle');
  }

  function start() {
    if (started) return;
    started = true;

    root.classList.add('is-intro');
    lightCycle();
    setTimeout(open, CYCLE_MS);
  }

  window.addEventListener('load', start);
  setTimeout(start, RESCUE_MS);

  /* Un click o una tecla se salta el intro: quien ya ha entrado antes no tiene
     por que volver a verlo entero. */
  window.addEventListener('click', open);
  window.addEventListener('keydown', open);

})();
