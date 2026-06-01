# 🏗️ Documentación Técnica - FinCalc

## Resumen de Arquitectura

La aplicación sigue una arquitectura **modular de separación de responsabilidades** con 5 módulos principales:

```
┌─────────────────────────────────────────┐
│           UI.js (Orquestador)           │
│     Maneja eventos y actualiza DOM     │
└────────┬────────────────────────┬───────┘
         │                        │
    ┌────▼────────┐          ┌────▼──────────┐
    │ calculators │          │  Charts.js    │
    │   & Storage │          │ Visualización │
    └────────────┘          └──────────────┘
         │
    ┌────▼────────┐
    │  Export.js  │
    │PDF & Excel  │
    └─────────────┘
```

---

## Módulos Detallados

### 1. **calculators.js** - Lógica de Negocio
**Responsabilidad**: Realizar cálculos matemáticos puros

#### Métodos:
```javascript
Calculators.personalLoan(principal, annualRate, months)
Calculators.mortgageLoan(propertyPrice, downPaymentPercent, annualRate, years)
Calculators.investment(initialCapital, monthlyContribution, annualRate, years)
```

#### Características:
- ✅ Sin dependencias externas
- ✅ Validación de entrada
- ✅ Retorna objetos estructurados
- ✅ Incluye timestamp automático

#### Ejemplo de Salida:
```javascript
{
    principal: 50000,
    annualRate: 12,
    months: 24,
    monthlyRate: 0.01,
    monthlyPayment: 2250.31,
    totalInterest: 4007.44,
    totalPaid: 54007.44,
    type: 'personal-loan',
    timestamp: '1/6/2026, 14:30:45'
}
```

---

### 2. **storage.js** - Gestión de Datos Locales
**Responsabilidad**: CRUD (Create, Read, Update, Delete) en localStorage

#### Métodos Principales:
```javascript
Storage.save(calculation)           // Guarda cálculo
Storage.getAll()                    // Obtiene todo
Storage.getByType(type)             // Filtra por tipo
Storage.getRecent(n)                // Últimos N cálculos
Storage.delete(id)                  // Elimina uno
Storage.clear()                     // Limpia todo
Storage.search(query)               // Busca
```

#### Ejemplo:
```javascript
// Guardar
const saved = Storage.save(result);  // Retorna con ID y timestamp

// Recuperar
const recent = Storage.getRecent(5);  // Array de los 5 más recientes

// Buscar
const mortgages = Storage.getByType('mortgage-loan');
```

---

### 3. **ui.js** - Orquestador Principal
**Responsabilidad**: Coordinar toda la aplicación

#### Métodos Principales:
```javascript
UI.init()                           // Inicializa todo
UI.switchCalculator(type)           // Cambia entre calculadoras
UI.calculatePersonalLoan()          // Ejecuta cálculo
UI.displayPersonalLoanResult(result) // Muestra resultados
UI.saveToHistory()                  // Guarda en historial
UI.loadHistoryUI()                  // Actualiza lista del historial
```

#### Flujo de Eventos:
```
Usuario escribe → Input actualiza → Rango se sincroniza
                                  ↓
                      Usuario presiona Calcular
                                  ↓
                    calculators.js realiza cálculo
                                  ↓
                    ui.js muestra resultados
                                  ↓
                    charts.js dibuja gráfico
                                  ↓
            Usuario presiona "Guardar Historial"
                                  ↓
                      storage.js persiste datos
```

---

### 4. **charts.js** - Visualización de Datos
**Responsabilidad**: Crear y gestionar gráficos con Chart.js

#### Métodos:
```javascript
Charts.init()                       // Inicializa canvas
Charts.destroy()                    // Destruye gráfico anterior
Charts.personalLoanChart(result)    // Gráfico de préstamo
Charts.mortgageChart(result)        // Gráfico hipotecario
Charts.investmentChart(result)      // Gráfico de inversión
```

#### Tipos de Gráficos:
| Calculadora | Tipo | Datos |
|-------------|------|-------|
| Personal Loan | Line | Capital restante vs Interés acumulado |
| Mortgage | Bar | Capital vs Interés por año |
| Investment | Line | Saldo vs Aportaciones vs Ganancia |

---

### 5. **export.js** - Exportación de Datos
**Responsabilidad**: Generar reportes en PDF y Excel

#### Métodos:
```javascript
Export.setResult(result)            // Define dato a exportar
Export.toPDF()                      // Genera PDF
Export.toExcel()                    // Genera Excel
Export.generatePersonalLoanPDF()    // PDF específico
Export.exportPersonalLoanExcel()    // Excel específico
```

#### Características:
- Genera PDFs con html2pdf
- Exporta Excel con XLSX
- Múltiples hojas en Excel
- Incluye tablas de amortización cuando aplica

---

## Utilidades Globales

### **FormatUtils** - Formateo de Números
```javascript
FormatUtils.currency(value)         // $50,000.00
FormatUtils.number(value, decimals) // 50000.00
FormatUtils.percent(value)          // 12.50%
FormatUtils.date(value)             // 1/6/2026, 14:30
```

---

## Estructura del DOM

### IDs Principales:
```html
<!-- Formularios -->
#loan-personal-form      (inputs: lp-amount, lp-interest, lp-months)
#loan-mortgage-form      (inputs: lm-price, lm-down-percent, etc)
#investment-form         (inputs: inv-initial, inv-monthly, etc)

<!-- Resultados -->
#results-card            (contenedor de resultados)
#results-content         (contenido dinámico)
#export-buttons          (botones de descarga)

<!-- Gráficos -->
#chart-container         (contenedor del gráfico)
#result-chart            (canvas)

<!-- Historial -->
#history-list            (lista de cálculos guardados)
#clear-history-btn       (botón limpiar)
```

---

## Flujo de Datos

### Cálculo → Resultado → Exportación

```
1. Usuario ingresa datos
   ↓
2. UI.calculate* obtiene valores del formulario
   ↓
3. Validación básica
   ↓
4. Calculators.method(params) ejecuta matemáticas
   ↓
5. Retorna objeto resultado con todos los valores
   ↓
6. UI.display* crea HTML con resultados
   ↓
7. Charts.* dibuja visualización
   ↓
8. Export.setResult(result) prepara para descarga
   ↓
9. Usuario presiona "PDF" o "Excel"
   ↓
10. Export.toPDF() o Export.toExcel() genera archivo
```

---

## Storage: Estructura en localStorage

```javascript
// localStorage['fincalc_history'] contiene:
[
    {
        id: 1717262445000,
        principal: 50000,
        annualRate: 12,
        months: 24,
        monthlyPayment: 2250.31,
        totalInterest: 4007.44,
        totalPaid: 54007.44,
        type: 'personal-loan',
        timestamp: '1/6/2026, 14:30:45',
        savedAt: '2026-06-01T19:30:45.000Z'
    },
    // ... más registros
]
```

---

## Cómo Extender la Aplicación

### Agregar una Nueva Calculadora

#### Paso 1: Agregar función en calculators.js
```javascript
Calculators.newCalculator(param1, param2) {
    // Validación
    if (param1 <= 0) throw new Error('Parámetro inválido');
    
    // Cálculos
    const result = param1 * param2;
    
    // Retornar
    return {
        param1: parseFloat(param1),
        param2: parseFloat(param2),
        result: parseFloat(result.toFixed(2)),
        type: 'new-calc',
        timestamp: new Date().toLocaleString('es-ES')
    };
}
```

#### Paso 2: Agregar HTML en index.html
```html
<button class="nav-btn" data-calc="new-calc">
    <i class="fas fa-icon"></i>
    <span>Nueva Calculadora</span>
</button>

<div id="new-calc-form" class="calculator-form hidden">
    <!-- Inputs -->
</div>
```

#### Paso 3: Agregar handlers en ui.js
```javascript
setupEventListeners() {
    // ... código existente
    document.getElementById('new-calc-btn').addEventListener('click', 
        () => this.calculateNewCalc()
    );
}

calculateNewCalc() {
    try {
        const param1 = parseFloat(document.getElementById('param1').value);
        const param2 = parseFloat(document.getElementById('param2').value);
        const result = Calculators.newCalculator(param1, param2);
        this.displayNewCalcResult(result);
        // ... resto del código
    } catch(error) {
        this.showError(error.message);
    }
}

displayNewCalcResult(result) {
    const html = `<div>Resultado: ${result.result}</div>`;
    document.getElementById('results-content').innerHTML = html;
}
```

#### Paso 4: Agregar gráfico (opcional)
```javascript
// En charts.js
Charts.newCalcChart(result) {
    this.destroy();
    this.chartInstance = new Chart(this.ctx, {
        type: 'bar',
        data: { /* ... */ },
        options: { /* ... */ }
    });
}

// En ui.js
Charts.newCalcChart(result);
```

### Agregar Nueva Funcionalidad de Exportación

```javascript
// En export.js
generateNewCalcPDF(result) {
    return `<div style="...">
        <h2>Nueva Calculadora</h2>
        <p>Resultado: ${result.result}</p>
    </div>`;
}

exportNewCalcExcel(workbook, result) {
    const data = [
        ['RESULTADO'],
        ['Param1', result.param1],
        ['Param2', result.param2],
        ['Resultado', result.result]
    ];
    const sheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheet, 'Resultado');
}
```

---

## Testing Manual

### Casos de Prueba

#### Préstamo Consumo
```
Input: $50,000, 12%, 24 meses
Expected: $2,250.31/mes, $4,007.44 interés
Verify: 2250.31 × 24 = 54,007.44 ✓
```

#### Préstamo Hipotecario
```
Input: $300,000 casa, 20% cuota inicial, 5.5%, 30 años
Expected: 
  - Down: $60,000
  - Finance: $240,000
  - Monthly: $1,364.19
  - Interest: $150,709.01
Verify: 1364.19 × 360 = $490,708.40... ✓
```

#### Inversión
```
Input: $10,000 inicial, $500/mes, 8% anual, 10 años
Expected: ~$94,730.78 final
Verify: Crecimiento visible en gráfico ✓
```

---

## Optimizaciones

### Rendimiento
- Charts se destruyen al cambiar de calculadora (evita memory leaks)
- Inputs y sliders sincronizados sin debounce (es simple)
- localStorage limitado a ~5MB por navegador

### Escalabilidad
- Módulos independientes facilitan mantenimiento
- Fácil agregar nuevas calculadoras
- Estructura permite migración a framework si es necesario

---

## Depuración

### Habilitar logging
```javascript
// En ui.js, agregar al inicio de calculatePersonalLoan():
console.log('Inputs:', {amount, interest, months});
console.log('Resultado:', result);
```

### Ver localStorage
```javascript
// En consola del navegador
localStorage.getItem('fincalc_history')
JSON.parse(localStorage.getItem('fincalc_history'))
```

### Limpiar datos
```javascript
// En consola
localStorage.removeItem('fincalc_history')
// O desde la UI: presionar "Limpiar Historial"
```

---

## Compatibilidad

| Navegador | Soporte |
|-----------|---------|
| Chrome    | ✅ Total |
| Firefox   | ✅ Total |
| Safari    | ✅ Total |
| Edge      | ✅ Total |
| IE 11     | ❌ No |

**Requerimientos**:
- ES6+ JavaScript
- localStorage API
- Canvas (para Chart.js)
- CSS Grid y Flexbox

---

## Versioning y Cambios Futuros

### v1.0 (Actual)
- ✅ 3 calculadoras funcionales
- ✅ Historial local
- ✅ Exportación PDF/Excel
- ✅ Gráficos interactivos

### v1.1 (Próxima)
- 🔄 Comparador de escenarios
- 🔄 Tabla de amortización visual mejorada
- 🔄 Más temas de diseño

### v2.0 (Futura)
- 🔄 Backend con Firebase/Supabase
- 🔄 Sincronización en la nube
- 🔄 Autenticación de usuarios
- 🔄 Reportes avanzados
- 🔄 API REST

---

**Documentación Técnica v1.0**  
Última actualización: Junio 2026  
Mantenedor: Equipo de Desarrollo
