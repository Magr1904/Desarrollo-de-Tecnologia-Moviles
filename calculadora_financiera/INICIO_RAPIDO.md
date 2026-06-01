# 🚀 FinCalc - Inicio Rápido

## En 30 segundos ⚡

1. **Abre** `index.html` en tu navegador
2. **Selecciona** una calculadora del menú izquierdo
3. **Ingresa** los valores deseados
4. **Presiona** "Calcular"
5. **Descarga** PDF o Excel si lo necesitas

¡Listo! Tu calculadora financiera está lista para usar.

---

## Archivos Importantes 📁

```
📦 Tu carpeta
├── 📄 index.html              ← ABRE ESTE ARCHIVO
├── 📂 css/
│   └── custom.css
├── 📂 js/
│   ├── calculators.js         ← Lógica de cálculos
│   ├── storage.js             ← Historial
│   ├── ui.js                  ← Interfaz
│   ├── charts.js              ← Gráficos
│   └── export.js              ← PDF/Excel
├── 📖 INSTRUCCIONES.md        ← Guía completa
├── 📖 EJEMPLOS_USO.md         ← Ejemplos prácticos
└── 📖 TECNICA.md              ← Documentación técnica
```

---

## Las 3 Calculadoras 🧮

### 💳 Préstamo Consumo
**Qué calcula**: Cuota mensual, interés total, monto final  
**Parámetros**: Monto, Tasa Anual (%), Plazo (meses)  
**Ejemplo**: $50,000 al 12% anual en 24 meses = $2,250.31/mes

### 🏠 Préstamo Hipotecario
**Qué calcula**: Cuota mensual, tabla de amortización, interés total  
**Parámetros**: Precio propiedad, Cuota inicial (%), Tasa, Plazo (años)  
**Ejemplo**: Casa de $300,000 con 20% inicial = $1,364/mes

### 📈 Cálculo de Inversiones
**Qué calcula**: Saldo final, ganancia, rendimiento  
**Parámetros**: Capital inicial, Aporte mensual, Tasa retorno (%), Plazo (años)  
**Ejemplo**: $10,000 + $500/mes al 8% en 10 años = $94,730.78

---

## Características Clave ✨

| Característica | Detalles |
|---|---|
| **Sliders Dinámicos** | Arrastra para cambiar valores en tiempo real |
| **Gráficos Interactivos** | Visualiza tu información |
| **Historial Local** | Guarda tus cálculos (sin internet) |
| **Exportar PDF** | Descarga reportes profesionales |
| **Exportar Excel** | Lleva datos a hojas de cálculo |
| **Responde en Móvil** | Funciona en cualquier dispositivo |
| **Sin Instalación** | Solo abre en navegador |

---

## Primeros Pasos 👣

### 1️⃣ Abre la aplicación
```bash
# Opción A: Doble-click en index.html
# Opción B: Arrastra index.html al navegador
# Opción C: Con servidor local
python -m http.server 8000
# Luego: http://localhost:8000
```

### 2️⃣ Prueba tu primera calculadora
- **Préstamo Consumo** viene seleccionado por defecto
- Verás valores de ejemplo: $50,000, 12%, 24 meses
- Presiona "Calcular"
- Los resultados aparecerán a la derecha

### 3️⃣ Explora otras calculadoras
- Haz clic en "Préstamo Hipotecario" 🏠
- O en "Cálculo Inversiones" 📈
- Ingresa tus propios valores

### 4️⃣ Guarda tus cálculos
- Presiona "Guardar en Historial"
- Aparecerá en la barra lateral izquierda
- Haz clic para recuperarlo cuando quieras

### 5️⃣ Descarga resultados
- Presiona "Descargar PDF" para reportes
- O "Descargar Excel" para análisis
- Los archivos se descargarán automáticamente

---

## Tips Pro 💡

### Usar Sliders Eficientemente
```
1. Escribe un valor en el input
2. El slider se sincroniza automáticamente
3. O arrastra el slider y el input se actualiza
→ Perfecta sinergia para exploración rápida
```

### Comparar Escenarios
```
1. Calcula Escenario A (ej: 12% de tasa)
2. Guarda en historial
3. Cambia la tasa a 10%
4. Calcula Escenario B
5. Compara ambos en Excel
```

### Validar Resultados
```
Fórmula de Préstamo Consumo:
Cuota = (Capital × i) / (1 - (1 + i)^-n)

Ejemplo verificación:
- Capital: $50,000
- Tasa anual: 12% → Tasa mensual: 1%
- Meses: 24
- Cuota = (50000 × 0.01) / (1 - 1.01^-24)
- Cuota = $2,250.31 ✓
```

---

## Atajos del Navegador ⌨️

| Acción | Efecto |
|--------|--------|
| Presiona Tab | Navega entre inputs |
| Presiona Enter | Calcula (en algunos inputs) |
| F12 | Abre consola para debugging |
| Ctrl+Shift+K | Consola en algunos navegadores |

---

## Preguntas Comunes ❓

**¿Cómo borro el historial?**
→ Presiona "Limpiar Historial" en la barra lateral

**¿Se guardan mis datos si cierro el navegador?**
→ Sí, se guardan en localStorage del navegador

**¿Puedo usar esto en mi teléfono?**
→ Sí, es completamente responsivo

**¿Necesito internet?**
→ Sí para cargar las librerías la primera vez, luego funciona offline

**¿Los cálculos son precisos?**
→ Usa fórmulas financieras estándar. Verifica con tu banco para decisiones reales.

**¿Cómo agregó una nueva calculadora?**
→ Ver archivo TECNICA.md - Sección "Cómo Extender la Aplicación"

---

## Solución de Problemas 🔧

### "Los gráficos no aparecen"
```
✓ Abre la consola (F12)
✓ Verifica que no hay errores rojos
✓ Recarga la página (Ctrl+R)
✓ Verifica tu conexión a internet
```

### "La exportación no funciona"
```
✓ Verifica la carpeta de Descargas
✓ Algunos navegadores piden confirmación
✓ Intenta en otro navegador
✓ Verifica permisos de descarga
```

### "El historial no se guarda"
```
✓ Verifica que localStorage está habilitado
✓ No funciona en modo incógnito
✓ Intenta en modo normal del navegador
✓ Limpia cookies/cache e intenta de nuevo
```

---

## Próximos Pasos 🎯

### Nivel Básico
- [ ] Realiza tu primer cálculo de préstamo
- [ ] Guarda un resultado en historial
- [ ] Descarga un PDF
- [ ] Explora el gráfico interactivo

### Nivel Intermedio
- [ ] Compara 2 escenarios diferentes
- [ ] Exporta a Excel y abre en tu app favorita
- [ ] Copia valores entre diferentes calculadoras
- [ ] Lee EJEMPLOS_USO.md para casos reales

### Nivel Avanzado
- [ ] Lee TECNICA.md para entender la arquitectura
- [ ] Personaliza estilos en css/custom.css
- [ ] Agrega una nueva calculadora (sigue la guía)
- [ ] Integra con tu propio sistema

---

## Archivos de Ayuda 📚

| Archivo | Contenido |
|---------|-----------|
| **INSTRUCCIONES.md** | Guía completa de características |
| **EJEMPLOS_USO.md** | Ejemplos reales y casos de uso |
| **TECNICA.md** | Arquitectura y cómo extender |
| **README.md** | Descripción general del proyecto |

---

## Stack Tecnológico 🛠️

```
HTML5       → Estructura
CSS3        → Estilos (Tailwind + Custom)
JavaScript  → Lógica (Vanilla ES6+)
Chart.js    → Gráficos
html2pdf    → Exportación PDF
XLSX        → Exportación Excel
localStorage → Historial local
Font Awesome → Iconos
```

**¿Necesitas ayuda?** Lee la documentación completa en los archivos .md

---

## Cheat Sheet ⚡

### Atajos Comunes
```javascript
// Si quieres acceder a los datos desde consola:

// Ver todo el historial
Storage.getAll()

// Ver cálculos guardados recientemente
Storage.getRecent(5)

// Ver solo hipotecarios
Storage.getByType('mortgage-loan')

// Limpiar todo
Storage.clear()

// Realizar un cálculo manual
Calculators.personalLoan(50000, 12, 24)
```

---

## ¡Listo para Empezar! 🎉

1. Abre `index.html` en tu navegador
2. ¡Comienza a calcular!
3. Consulta EJEMPLOS_USO.md si tienes dudas

**Versión**: 1.0  
**Estado**: ✅ Funcional  
**Última actualización**: Junio 2026

---

*Hecho con ❤️ usando Vibe Coding*
