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