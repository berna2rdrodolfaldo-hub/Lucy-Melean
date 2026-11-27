const cuadros2 = document.querySelectorAll('.cuadro-musica');
const audio2 = document.getElementById('reproductor');

if (cuadros2.length > 0 && audio2) {
  cuadros2.forEach((cuadro) => {
    const cancionRaw = cuadro.getAttribute('data-src');

    cuadro.addEventListener('mouseenter', () => {
      if (!cancionRaw) return;

      audio2.pause();
      audio2.currentTime = 0;
      audio2.src = encodeURI(cancionRaw);
      audio2.load();
      cuadro.classList.add('sonando');

      const promesaPlay = audio2.play();
      if (promesaPlay !== undefined) {
        promesaPlay.catch(() => {});
      }
    });

    cuadro.addEventListener('mouseleave', () => {
      cuadro.classList.remove('sonando');
      audio2.pause();
      audio2.currentTime = 0;
      audio2.removeAttribute('src');
      audio2.load();
    });
  });

  audio2.addEventListener('error', () => {
    document.querySelectorAll('.cuadro-musica.sonando').forEach((el) => {
      el.classList.remove('sonando');
    });
  });
}

const MAPA_IMAGENES_CANCION_2 = {
  // Cuando tengas tus imágenes en fondo-2/, agrégalas aquí así:
  // 'cancion 22': '../fondo-2/cancion-22.png'
};

function normalizarClave2(texto = '') {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\.mp4$|\.mp3$/i, '')
    .replace(/\(.*?\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function obtenerRutaImagen2(textoCancion = '') {
  const limpio = normalizarClave2(textoCancion);
  if (!limpio) return '';
  if (MAPA_IMAGENES_CANCION_2[limpio]) return MAPA_IMAGENES_CANCION_2[limpio];

  const entrada = Object.entries(MAPA_IMAGENES_CANCION_2).find(([clave]) =>
    limpio.includes(normalizarClave2(clave))
  );
  return entrada ? entrada[1] : '';
}

document.addEventListener('DOMContentLoaded', () => {
  const imgDetalle2 = document.getElementById('imagen-cancion');
  const tituloEl2 = document.getElementById('titulo-cancion');

  if (imgDetalle2 && tituloEl2) {
    const ruta = obtenerRutaImagen2(tituloEl2.textContent);
    if (ruta) {
      imgDetalle2.src = encodeURI(ruta);
      imgDetalle2.style.display = 'block';
      imgDetalle2.onerror = () => {
        imgDetalle2.style.display = 'none';
      };
    } else {
      imgDetalle2.style.display = 'none';
    }
  }
});