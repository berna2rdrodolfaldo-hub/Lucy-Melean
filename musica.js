const cuadros = document.querySelectorAll('.cuadro-musica');
const audio = document.getElementById('reproductor');

// 1. Cuadrícula principal (paginamusica.html)
if (cuadros.length > 0 && audio) {
  cuadros.forEach((cuadro) => {
    const cancionRaw = cuadro.getAttribute('data-src');
    const tituloTexto = cuadro.querySelector('.etiqueta')?.textContent?.trim() || 'Canción';

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

    cuadro.addEventListener('click', () => {
      if (!cancionRaw) return;
      localStorage.setItem('cancionActualSrc', cancionRaw);
      localStorage.setItem('cancionActualTitulo', tituloTexto);
    });
  });

  audio.addEventListener('error', () => {
    // Si algún archivo tarda o falla, no deja bloqueado el estado visual
    document.querySelectorAll('.cuadro-musica.sonando').forEach((el) => {
      el.classList.remove('sonando');
    });
  });
}

// 2. Página individual de cada canción (pagina-1.html a pagina-21.html)
const audioDetalle = document.getElementById('reproductor-detalle');
const tituloDetalle = document.getElementById('titulo-detalle');
const btnControl = document.getElementById('btn-control-audio');
const portadaDetalle = document.getElementById('portada-detalle');

if (audioDetalle && tituloDetalle) {
  const srcGuardado = localStorage.getItem('cancionActualSrc') || '';
  const tituloGuardado = localStorage.getItem('cancionActualTitulo') || '';

  if (tituloGuardado) {
    tituloDetalle.textContent = tituloGuardado;
  }

  if (srcGuardado) {
    audioDetalle.src = encodeURI(srcGuardado);
    audioDetalle.load();

    const promesaDetalle = audioDetalle.play();
    if (promesaDetalle !== undefined) {
      promesaDetalle
        .then(() => {
          if (btnControl) btnControl.textContent = 'Pausar';
        })
        .catch(() => {
          if (btnControl) btnControl.textContent = 'Reproducir';
        });
    }

    if (portadaDetalle) {
      const normalizado = srcGuardado.toLowerCase();

      const esJuntoAMi = normalizado.includes('junto a mi');
      const esSuperior =
        normalizado.includes('delincuentes') ||
        normalizado.includes('felicidad') ||
        normalizado.includes('mariposas en el pecho') ||
        normalizado.includes('mucho más que ayer') ||
        normalizado.includes('mucho mas que ayer');
      const esDistancia =
        normalizado.includes('hace tiempo') ||
        normalizado.includes('hay una luz dentro de ti') ||
        normalizado.includes('más allá') ||
        normalizado.includes('mas alla') ||
        normalizado.includes('me gustas');
      const esManuelMedrano = normalizado.includes('manuel medrano');
      const esBlueandsoft =
        normalizado.includes('blueandsoft') ||  
        normalizado.includes('primavera');

      if (esJuntoAMi) {
        portadaDetalle.src = encodeURI('../fondo/manuel medrano perfecto.png');
        portadaDetalle.style.display = 'block';
      } else if (esSuperior) {
        portadaDetalle.src = encodeURI('../fondo/manuel medrano superior.png');
        portadaDetalle.style.display = 'block';
      } else if (esDistancia) {
        portadaDetalle.src = encodeURI('../fondo/Manuel medrano Distancia album.png');
        portadaDetalle.style.display = 'block';
      } else if (esManuelMedrano) {
        portadaDetalle.src = encodeURI('../fondo/manuel medrano album.png');
        portadaDetalle.style.display = 'block';
      } else if (esBlueandsoft) {
        portadaDetalle.src = encodeURI('../fondo/Blueandsoft - album.png');
        portadaDetalle.style.display = 'block';
      } else {
        portadaDetalle.style.display = 'none';
      }
    }
  }

  if (btnControl) {
    btnControl.addEventListener('click', () => {
      if (!audioDetalle.src) return;

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
  }

  audioDetalle.addEventListener('ended', () => {
    if (btnControl) btnControl.textContent = 'Reproducir';
  });
}

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
  'más allá': '../fondo/masalla.png',
  'me gustas': '../fondo/megustas.png',
  'mucho mas que ayer': '../fondo/muchomasqueayer.png',
  'mucho más que ayer': '../fondo/muchomasqueayer.png',
  'negra': '../fondo/negra.png',
  'primavera': '../fondo/blueandsoft - album.png',
  'blueandsoft': '../fondo/blueandsoft - album.png',
  'si pudiera': '../fondo/sipudiera.png',
  'sin saber por que': '../fondo/sinsaberporque.png',
  'sin saber por qué': '../fondo/sinsaberporque.png',
  'swing de la propuesta': '../fondo/swingdelapropuesta.png',
  'una y otra vez': '../fondo/unayotravez.png',
  'yo solo nado contigo': '../fondo/yosolonadocontigo.png'
};

function obtenerRutaImagenCancion(textoCancion = '') {
  const limpio = textoCancion
    .toLowerCase()
    .replace(/\.mp4$|\.mp3$/i, '')
    .replace(/spotidownloader\.com\s*-\s*/i, '')
    .replace(/manuel medrano\s*-\s*/i, '')
    .replace(/\(.*?\)/g, '')
    .trim();

  if (MAPA_IMAGENES_CANCION[limpio]) {
    return MAPA_IMAGENES_CANCION[limpio];
  }

  const claveEncontrada = Object.keys(MAPA_IMAGENES_CANCION).find((clave) =>
    limpio.includes(clave)
  );

  return claveEncontrada ? MAPA_IMAGENES_CANCION[claveEncontrada] : '';
}

const imgCancionDetalle = document.getElementById('imagen-cancion');
if (imgCancionDetalle) {
  const referencia =
    (typeof cancionActual !== 'undefined' && cancionActual) ||
    document.getElementById('titulo-cancion')?.textContent ||
    '';
  const rutaImg = obtenerRutaImagenCancion(referencia);
  if (rutaImg) {
    imgCancionDetalle.src = encodeURI(rutaImg);
    imgCancionDetalle.style.display = 'block';
  }
}