# 📱 Guía Maestra de Diseño Edge-to-Edge

Este documento sirve como referencia definitiva para el diseño de interfaces "Edge-to-Edge" (de borde a borde). Su objetivo es proporcionar reglas claras, principios de diseño y mejores prácticas agnósticas a la tecnología, enfocándose en la experiencia visual y de usuario.

---

## 1. 🌟 Filosofía y Conceptos Core

El diseño **Edge-to-Edge** busca crear una experiencia inmersiva eliminando las barreras visuales tradicionales. La aplicación no se dibuja "entre" las barras del sistema, sino **debajo** de ellas.

### Principios Fundamentales

1.  **Inmersión Total**: El fondo de la aplicación (imágenes, mapas, colores) debe extenderse hasta los bordes físicos del dispositivo, ocupando el 100% de la pantalla.
2.  **Jerarquía de Capas**: Las barras del sistema (hora, batería, indicador de inicio) flotan _sobre_ tu aplicación, no empujan tu contenido hacia abajo.
3.  **Protección de Interacción**: Los elementos interactivos (botones, textos) deben permanecer dentro de las "Áreas Seguras" (Safe Areas) para evitar conflictos con gestos del sistema o recortes físicos (notches).

---

## 2. 🏛️ Anatomía del Sistema: Las Barras

Entender las barras del sistema es crucial para diseñar correctamente debajo de ellas.

### A. Barra de Estado (Status Bar) - Parte Superior

Contiene la hora, batería y notificaciones.

- **Diseño**: Ya no es una franja negra sólida. Ahora debe ser transparente.
- **Contenido**: El contenido de tu app se ve detrás.
- **Contraste**: Debes asegurar que los iconos del sistema (blancos o negros) sean legibles sobre tu fondo. Si tu header es una imagen clara, usa iconos oscuros; si es oscura, usa iconos claros.

### B. Barra de Navegación / Indicador de Inicio - Parte Inferior

Permite salir de la app o cambiar entre ellas.

- **iOS (Home Indicator)**: Una línea delgada horizontal que flota sobre el contenido. Requiere un margen de seguridad (aprox. 34pt) para evitar toques accidentales.
- **Android (Navegación por Gestos)**: Similar a iOS, una línea delgada o invisible.
- **Android (3 Botones - Legacy)**: Una barra sólida con botones Atrás/Home/Recientes. Aunque es antigua, el diseño debe adaptarse si el usuario la tiene activa (el contenido no debe quedar oculto detrás).

---

## 3. 📏 Reglas de Diseño por Componente

### A. Encabezados (App Bars / Headers)

El encabezado ya no empieza en el pixel 0 _debajo_ de la barra de estado, sino en el pixel 0 _físico_ de la pantalla.

| Característica | Regla de Diseño                                                                                                                                       |
| :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Altura**     | La altura visual debe ser: `Altura de Status Bar` + `Altura de Contenido (ej. 56pt)`. Nunca usar alturas fijas estándar sin sumar la barra de estado. |
| **Fondo**      | Usar semitransparencia (80-95%) o efectos de desenfoque (Blur/Glassmorphism) para permitir que el contenido scrolleable se intuya detrás.             |
| **Posición**   | "Pegado" (Sticky) al borde superior.                                                                                                                  |
| **Sombra**     | Opcional. Útil para separar el header del contenido si ambos son del mismo color.                                                                     |

### B. Navegación Inferior (Bottom Tabs)

La barra de pestañas debe integrarse con el gesto de "ir a inicio".

| Característica     | Regla de Diseño                                                                                                                                    |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Altura**         | `Altura de Tabs` + `Margen Seguro Inferior (Bottom Inset)`.                                                                                        |
| **Estilo**         | Puede ser flotante (tipo píldora) o extendida (full width).                                                                                        |
| **Interacción**    | El contenido scrolleable debe ser visible a través de ella (si es translúcida) pero terminar su recorrido _por encima_ para no quedar inaccesible. |
| **Home Indicator** | El indicador de inicio flota SOBRE la barra de navegación. No intentes esconderlo ni poner botones justo debajo de él.                             |

### C. Listas y Scroll (Feed, Detalles)

El cuerpo de la aplicación es lo que da el efecto "infinito".

- **Inicio y Fin**: El contenedor de scroll debe empezar en el pixel 0 superior y terminar en el pixel 0 inferior.
- **Padding Interno**: El _contenido_ dentro del scroll debe tener relleno (padding) superior e inferior para que el primer elemento no quede tapado por el Header y el último no quede tapado por los Tabs.
- **Barras de Scroll**: Las barras visuales de desplazamiento deben tener márgenes para no chocar con las curvas de la pantalla o el notch.

### D. Botones Flotantes (FAB)

Los botones de acción principal (e.g., "Nuevo Twit", "Agregar") deben flotar sobre todo.

- **Ubicación Vertical**: Deben situarse _arriba_ de la barra de navegación inferior, no sobre ella, ni mucho menos debajo.
- **Cálculo**: `Distancia desde abajo` = `Margen Seguro del Sistema` + `Altura Barra Navegación` + `Margen Visual (16pt)`.

### E. Modales y Hojas Inferiores (Bottom Sheets)

- **Overlay (Fondo oscurecido)**: Debe cubrir **toda** la pantalla, incluyendo la barra de estado y la barra de navegación. Es un error común que el oscurecimiento se corte en las barras.
- **Drag Handle**: La pequeña línea para arrastrar el sheet debe estar en una zona segura.

---

## 4. ⚔️ Comparativa y Casos Específicos

### iOS vs Android: Diferencias Visuales

| Elemento           | iOS                                                                                                                       | Android                                                                                           |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------ |
| **Notch / Isla**   | Muy prominente invadiendo la parte superior central. Diseño debe evitar poner logo/título en el centro absoluto superior. | Generalmente un "punhole" (cámara pequeña) o notch gota. Menos intrusivo pero variado.            |
| **Borde Inferior** | Siempre es el "Home Indicator" (línea). Altura segura constante (~34pt).                                                  | Puede ser "Gestos" (línea fina) o "3 Botones" (barra sólida grande). El diseño debe ser flexible. |
| **Teclado**        | El teclado es una capa opaca que sube.                                                                                    | El teclado puede redimensionar la ventana o superponerse.                                         |

### Modo Paisaje (Landscape)

- **Reto**: Las barras seguras se mueven a los laterales (izquierda/derecha) para evitar el notch.
- **Solución**: El contenido debe tener márgenes laterales dinámicos ("gutters") para no quedar cortado por la cámara o esquinas redondeadas.

---

## 5. � Errores Comunes de Diseño (Anti-Patrones)

1.  **"Doble Barra"**: Diseñar un Header de color sólido y dejar la Status Bar del sistema con su propio color de fondo sólido, creando dos franjas de color distintas.
    - _Solución_: La Status Bar debe ser transparente; el Header debe extenderse debajo de ella.
2.  **Botones en la Zona Muerta**: Colocar botones de acción (CTA) pegados al borde inferior del dispositivo.
    - _Problema_: Interfiere con el gesto de swipe para salir de la app (Home Gesture).
    - _Solución_: Siempre respetar el margen seguro inferior.
3.  **Pérdida de Legibilidad**: Usar una imagen de fondo compleja sin proteger los textos.
    - _Solución_: Usar degradados (scrims) negros transparentes detrás del texto o desenfoques en las zonas de lectura.
4.  **Cortes abruptos**: Que el contenido scrolleable se corte visualmente antes de llegar al borde físico de la pantalla.

---

## 6. ✅ Checklist de "Buena Implementación"

Usa esta lista para verificar tus diseños (mockups) antes de pasarlos a desarrollo:

- [ ] **Fondo Infinito:** ¿El background o mapa llega hasta los 4 bordes físicos?
- [ ] **Status Bar:** ¿Está definida como transparente? ¿Se ha elegido el color de iconos correcto (blanco/negro) para el fondo previsto?
- [ ] **Safe Areas:** ¿Todos los botones y textos importantes están alejados de los bordes curvos y del notch?
- [ ] **Navegación:** ¿La barra inferior permite ver el contenido pasar por detrás (si es estilo translúcido)?
- [ ] **Interacción:** ¿Hay suficiente espacio al final de las listas para que el último ítem se pueda tocar y no quede tapado por la navegación?
- [ ] **Teclado:** ¿Se ha pensado qué pasa cuando sale el teclado? (¿El contenido sube? ¿El botón de acción se mantiene visible?).
