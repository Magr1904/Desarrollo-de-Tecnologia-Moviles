# FinCalc - Calculadoras Financieras 💰

Una aplicación web moderna y funcional para realizar cálculos financieros con interfaz gráfica intuitiva, desarrollada con **vibe coding** (programación con prompts).

## 📋 Características

### 🎯 Tres Calculadoras Financieras

#### 1. **Préstamo Consumo** 💳
- Calcula la cuota mensual de préstamos personales
- Muestra el total de intereses y monto total a pagar
- Visualización gráfica de la evolución del capital restante e interés acumulado
- Inputs con sliders para ajuste fácil de parámetros

#### 2. **Préstamo Hipotecario** 🏠
- Proyecta el financiamiento de propiedades
- Genera tabla de amortización completa (mes a mes)
- Desglose visual de capital e interés por año
- Incluye cálculo de cuota inicial en porcentaje

#### 3. **Cálculo de Inversiones** 📈
- Proyecta el crecimiento de inversiones con aportes periódicos
- Visualiza la acumulación de capital, aportaciones e interés ganado
- Muestra el rendimiento porcentual total
- Gráfica de proyección anual

### 💾 Funcionalidades Adicionales

- **Historial Local**: Guardar y recuperar cálculos anteriores usando localStorage
- **Gráficos Interactivos**: Visualización dinámica con Chart.js
- **Exportación PDF**: Descarga reportes con formato profesional
- **Exportación Excel**: Exporta datos tabulares con múltiples hojas
- **Interfaz Responsiva**: Funciona en móvil, tablet y desktop
- **Validación de Datos**: Mensajes de error y validación visual

## 🚀 Cómo Usar

### 1. Abrir la Aplicación
```bash
# Abre el archivo index.html en tu navegador
# O utiliza un servidor local (Live Server, Python SimpleHTTPServer, etc.)
```

### 2. Seleccionar una Calculadora
- Haz clic en el botón correspondiente en la barra lateral izquierda
- Cada calculadora muestra sus propios campos de entrada

### 3. Ingresar Datos
- **Inputs Numéricos**: Escribe el valor directamente
- **Sliders**: Arrastra para ajustar el valor dinámicamente
- Los inputs y sliders están sincronizados automáticamente

### 4. Calcular
- Presiona el botón "Calcular" para ejecutar la operación
- Los resultados aparecerán en el panel derecho

### 5. Visualizar Resultados
- **Resumén**: Muestra los principales valores calculados
- **Gráfico**: Visualización interactiva de los datos
- **Exportar**: Descarga los resultados en PDF o Excel

### 6. Guardar en Historial
- Presiona "Guardar en Historial" para almacenar el cálculo
- Los cálculos guardados aparecen en la barra lateral
- Haz clic en un historial para recuperar los datos

## 📁 Estructura de Archivos

```
.
├── index.html              # Página principal con estructura HTML
├── css/
│   └── custom.css          # Estilos personalizados (Tailwind + custom)
└── js/
    ├── calculators.js      # Lógica pura de las calculadoras
    ├── storage.js          # Gestión de localStorage
    ├── ui.js               # Lógica de interfaz y eventos
    ├── charts.js           # Integración con Chart.js
    └── export.js           # Exportación a PDF y Excel
```

## 🔧 Dependencias Externas

La aplicación usa las siguientes librerías via CDN:

- **Tailwind CSS**: Framework de estilos
- **Font Awesome**: Iconos
- **Chart.js**: Gráficos interactivos
- **html2pdf.js**: Exportación a PDF
- **XLSX**: Exportación a Excel

No se requiere instalar dependencias locales. Todo funciona con CDN.

## 📊 Fórmulas Utilizadas

### Préstamo Consumo
```
Cuota = (Capital × i) / (1 - (1 + i)^-n)
```
Donde:
- `i` = Tasa de interés mensual (Tasa anual / 12)
- `n` = Número de meses

### Préstamo Hipotecario
Utiliza la misma fórmula que Préstamo Consumo, pero:
- Genera tabla de amortización mes a mes
- Desglose: Interés = Saldo × Tasa mensual
- Capital = Cuota - Interés

### Inversión
```
Saldo_Final = Capital_Inicial × (1 + r)^n + PMT × [((1 + r)^n - 1) / r]
```
Donde:
- `r` = Tasa de retorno mensual (Tasa anual / 12)
- `n` = Número de meses
- `PMT` = Aporte periódico

## 💡 Características del Código

### Arquitectura Modular
- **calculators.js**: Lógica pura sin dependencias de DOM
- **storage.js**: Abstracción de localStorage
- **ui.js**: Orquestador principal de eventos
- **charts.js**: Gestión de gráficos
- **export.js**: Exportación de datos

### Validación
- Inputs numéricos con rangos específicos
- Mensajes de error interactivos
- Validación en tiempo real

### Rendimiento
- Cálculos optimizados
- Actualización eficiente del DOM
- Gráficos destruidos y recreados cuando es necesario

## 📱 Responsividad

- **Desktop**: Layout de 3 columnas (formulario + resultado + gráfico)
- **Tablet**: Ajustes de tamaño y espaciado
- **Móvil**: Adaptación a pantalla vertical

## 🔐 Privacidad

- Todos los datos se guardan localmente en localStorage del navegador
- No se envía información a servidores externos
- Borrar el historial limpia todos los datos almacenados

## 🎨 Diseño

- Paleta de colores: Azul profesional + acentos verdes, rojos, amarillos
- Tipografía legible y moderna
- Iconos de Font Awesome para mejor UX
- Transiciones suaves y animaciones

## 🐛 Solución de Problemas

### Los gráficos no aparecen
- Verifica que Chart.js se carga correctamente desde CDN
- Abre la consola del navegador (F12) para ver errores

### La exportación no funciona
- Algunos navegadores pueden bloquear descargas
- Intenta abrir la consola del navegador para diagnósticos

### El historial no se guarda
- Verifica que localStorage está habilitado en tu navegador
- No funciona en modo incógnito de algunos navegadores

## 🚀 Mejoras Futuras

- [ ] Comparador de calculadoras
- [ ] Análisis de sensibilidad
- [ ] Simulaciones monte carlo
- [ ] Backend para sincronización en la nube
- [ ] Autenticación de usuarios
- [ ] Reportes avanzados
- [ ] Cálculos de impuestos

## 📝 Notas de Desarrollo

### Vibe Coding
Esta aplicación fue desarrollada usando **vibe coding** - un enfoque de programación basado en prompts de lenguaje natural. Cada módulo fue generado describiendo su propósito y funcionalidad deseada.

### Validación Manual Recomendada
Se recomienda:
1. Probar con valores extremos (muy altos, muy bajos)
2. Verificar resultados con calculadoras financieras externas
3. Probar la exportación en diferentes navegadores
4. Validar el historial después de varias operaciones

## 👤 Autor

Desarrollado con IA usando Vibe Coding
Proyecto: Desarrollo de Tecnología Móviles

---

**Última actualización**: Junio 2026

**Estado**: ✅ Funcional y listo para usar
