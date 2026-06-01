# Diario de Gratitud - Prototipo Wireframe

## Descripción

Prototipo de una aplicación web para registrar tres pensamientos positivos por día. Es un **wireframe básico sin colores ni imágenes**, solo estructura y funcionalidad.

## Características

✅ **Registro de tres gratitudes por día**
- Tres campos de texto para escribir pensamientos positivos
- Almacenamiento automático en el navegador (LocalStorage)
- Asociación automática por fecha

✅ **Gestión de fechas**
- Navegación entre días (Día Anterior / Hoy / Día Siguiente)
- Visualización de la fecha actual
- Carga automática de entradas por fecha

✅ **Historial de entradas**
- Visualización de todas las entradas registradas
- Ordenadas por fecha (más recientes primero)
- Opción de eliminar entradas individuales

✅ **Funcionalidades**
- Guardar entrada automáticamente
- Limpiar formulario
- Sin dependencias externas (HTML, CSS y JavaScript vanilla)

## Estructura del proyecto

```
index.html          - Archivo principal con HTML, CSS y JavaScript integrados
README.md           - Este archivo
```

## Cómo usar

1. **Descargar o clonar** este repositorio
2. **Abrir** el archivo `index.html` en un navegador web
3. **Escribir** tus tres pensamientos positivos del día
4. **Guardar** la entrada
5. **Navegar** entre días para ver o editar entradas anteriores

## Almacenamiento de datos

- Los datos se guardan en **LocalStorage** del navegador
- No se requiere servidor
- Los datos persisten entre sesiones (mientras no limpies el historial del navegador)
- Cada entrada se asocia automáticamente con la fecha

## Especificaciones del Wireframe

- **Sin colores complejos**: Solo blanco y gris
- **Sin imágenes**: Solo símbolos de texto (emojis) como indicadores visuales
- **Estructura clara**: Bordes simples para definir secciones
- **Componentes básicos**: Formulario, botones, listado de entradas

## Navegación

- **Guardar Entrada**: Almacena los tres pensamientos positivos de la fecha actual
- **Limpiar**: Limpia los campos de texto sin guardar
- **Día Anterior/Siguiente**: Navega entre días
- **Hoy**: Vuelve a la fecha actual
- **Eliminar Entrada**: Elimina una entrada completa del historial

## Requisitos de navegador

- Navegador moderno con soporte para:
  - HTML5
  - CSS3
  - JavaScript ES6
  - LocalStorage

## Versión

**Prototipo v1.0** - Wireframe funcional básico

---

**Nota**: Este es un prototipo wireframe desarrollado con fines educativos. No incluye estilos avanzados, responsive design completo para todos los dispositivos, ni validaciones complejas.
