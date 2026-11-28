const cuadros = document.querySelectorAll('.cuadro-musica');
const audio = document.getElementById('reproductor');

// 1. Cuadrícula principal (paginamusica.html)
if (cuadros.length > 0 && audio) {
  cuadros.forEach((cuadro) => {
    const cancionRaw = cuadro.getAttribute('data-src');

    cuadro.addEventListener('mouseenter', () => {
      if (!cancionRaw) return;

      const cancionUrl = encodeURI(cancionRaw);

      audio.pause();
      audio.currentTime = 0;
      audio.src = cancionUrl;
      audio.load();

      cuadro.classList.add('sonando');

      const promesaPlay = audio.play();
      if (promesaPlay !== undefined) {
        promesaPlay.catch(() => {
          // Evita error en consola si el navegador bloquea autoplay sin interacción previa
        });
      }
    });

    cuadro.addEventListener('mouseleave', () => {
      cuadro.classList.remove('sonando');
      audio.pause();
      audio.currentTime = 0;
      audio.removeAttribute('src');
      audio.load();
    });
  });

  audio.addEventListener('error', () => {
    document.querySelectorAll('.cuadro-musica.sonando').forEach((el) => {
      el.classList.remove('sonando');
    });
  });
}

// 2. Mapa de imágenes por canción para la vista individual
const MAPA_IMAGENES_CANCION = {
  'afuera del planeta': '../fondo/Afuera del planeta.png',
  'bajo el agua': '../fondo/Bajo el agua.png',
  'como hacer para olvidarte': '../fondo/comohacerparaolvidate.png',
  'cuando te pensaba': '../fondo/cuandotepensaba.png',
  'delincuentes': '../fondo/delincuentes.png',
  'felicidad': '../fondo/felicidad.png',
  'hace tiempo': '../fondo/hacetiempo.png',
  'hay una luz dentro de ti': '../fondo/hayunaluzdentrodeti.png',
  'junto a mi': '../fondo/juntoami.png',
  'la mujer que bota fuego': '../fondo/lamujerquebotafuego.png',
  'mariposas en el pecho': '../fondo/mariposasenelpecho.png',
  'mas alla': '../fondo/masalla.png',
  'me gustas': '../fondo/megustas.png',
  'mucho mas que ayer': '../fondo/muchomasqueayer.png',
  'negra': '../fondo/negra.png',
  'primavera': '../fondo/blueandsoft - album.png',
  'blueandsoft': '../fondo/blueandsoft - album.png',
  'si pudiera': '../fondo/sipudiera.png',
  'sin saber por que': '../fondo/sinsaberporque.png',
  'swing de la propuesta': '../fondo/swingdelapropuesta.png',
  'una y otra vez': '../fondo/unayotravez.png',
  'yo solo nado contigo': '../fondo/yosolonadocontigo.png'
};

function normalizarClaveCancion(texto = '') {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\.mp4$|\.mp3$/i, '')
    .replace(/spotidownloader\.com\s*-\s*/i, '')
    .replace(/manuel medrano\s*-\s*/i, '')
    .replace(/\(.*?\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function obtenerRutaImagenCancion(textoCancion = '') {
  const limpio = normalizarClaveCancion(textoCancion);
  if (!limpio) return '';

  if (MAPA_IMAGENES_CANCION[limpio]) {
    return MAPA_IMAGENES_CANCION[limpio];
  }

  const entrada = Object.entries(MAPA_IMAGENES_CANCION).find(([clave]) =>
    limpio.includes(normalizarClaveCancion(clave))
  );

  return entrada ? entrada[1] : '';
}

// 3. Página individual de cada canción (pagina-1.html a pagina-21.html)
document.addEventListener('DOMContentLoaded', () => {
  const audioDetalle = document.getElementById('reproductor-detalle');
  const tituloEl =
    document.getElementById('titulo-cancion') ||
    document.getElementById('titulo-detalle');
  const btnControl = document.getElementById('btn-control-audio');
  const imgCancionDetalle =
    document.getElementById('imagen-cancion') ||
    document.getElementById('portada-detalle');

  if (imgCancionDetalle) {
    const referencia =
      (tituloEl && tituloEl.textContent) ||
      (audioDetalle && audioDetalle.getAttribute('src')) ||
      document.title ||
      '';

    const srcActual = imgCancionDetalle.getAttribute('src') || '';
    const esSeccionDos =
      window.location.pathname.includes('/pages-2/') ||
      window.location.pathname.includes('/pages-3/') ||
      srcActual.includes('../fondo-2/') ||
      srcActual.includes('../fondo-3/');

    if (esSeccionDos && srcActual) {
      imgCancionDetalle.src = encodeURI(srcActual);
      imgCancionDetalle.style.display = 'block';
      imgCancionDetalle.onerror = () => {
        imgCancionDetalle.style.display = 'none';
      };
    } else {
      const rutaImg = obtenerRutaImagenCancion(referencia);

      if (rutaImg) {
        imgCancionDetalle.src = encodeURI(rutaImg);
        imgCancionDetalle.style.display = 'block';
        imgCancionDetalle.onerror = () => {
          imgCancionDetalle.style.display = 'none';
        };
      } else {
        imgCancionDetalle.style.display = 'none';
      }
    }
  }

  if (audioDetalle && btnControl) {
    btnControl.addEventListener('click', () => {
      if (!audioDetalle.getAttribute('src')) return;

      if (audioDetalle.paused) {
        audioDetalle
          .play()
          .then(() => {
            btnControl.textContent = 'Pausar';
          })
          .catch(() => {
            btnControl.textContent = 'Reproducir';
          });
      } else {
        audioDetalle.pause();
        btnControl.textContent = 'Reproducir';
      }
    });

    audioDetalle.addEventListener('play', () => {
      btnControl.textContent = 'Pausar';
    });

    audioDetalle.addEventListener('pause', () => {
      btnControl.textContent = 'Reproducir';
    });

    audioDetalle.addEventListener('ended', () => {
      btnControl.textContent = 'Reproducir';
    });
  }
});

