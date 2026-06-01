# 📊 Guía de Uso FinCalc - Ejemplos Prácticos

## Ejemplo 1: Calculadora de Préstamo Consumo 💳

### Escenario
Deseas solicitar un préstamo personal de $50,000 a una tasa de interés del 12% anual por 24 meses.

### Pasos
1. La aplicación abre por defecto en "Préstamo Consumo"
2. Completa los siguientes valores:
   - **Monto del Préstamo**: $50,000
   - **Tasa de Interés Anual**: 12%
   - **Plazo**: 24 meses

3. Presiona el botón "Calcular"

### Resultados Esperados
- **Cuota Mensual**: $2,250.31
- **Interés Total**: $4,007.44
- **Total a Pagar**: $54,007.44

### Interpretación
- Pagarás $2,250.31 cada mes durante 24 meses
- El costo de dinero (interés) será de $4,007.44
- En total desembolsarás $54,007.44 por los $50,000 prestados

### Exportar Resultados
1. Presiona "Descargar PDF" para obtener un reporte profesional
2. O "Descargar Excel" para análisis posterior
3. "Guardar en Historial" para recuperar después

---

## Ejemplo 2: Calculadora de Préstamo Hipotecario 🏠

### Escenario
Compras una casa de $300,000 con una cuota inicial del 20% (financiando el 80%) a una tasa del 5.5% anual por 30 años.

### Pasos
1. Haz clic en "Préstamo Hipotecario" en la barra lateral
2. Completa los valores:
   - **Precio de la Propiedad**: $300,000
   - **Cuota Inicial**: 20%
   - **Tasa Interés Anual**: 5.5%
   - **Plazo**: 30 años

3. Presiona "Calcular"

### Resultados Esperados
- **Cuota Inicial**: $60,000 (dinero que pagas hoy)
- **Monto a Financiar**: $240,000
- **Cuota Mensual**: $1,364.19
- **Interés Total**: $150,709.01
- **Total a Pagar**: $390,709.01

### Tabla de Amortización
El sistema genera una tabla mes por mes mostrando:
- Capital pagado cada mes
- Interés pagado cada mes
- Saldo restante

### Visualización
El gráfico muestra el desglose de capital vs interés por año, ayudando a ver cómo los pagos de interés disminuyen con el tiempo.

---

## Ejemplo 3: Calculadora de Inversiones 📈

### Escenario
Quieres invertir $10,000 iniciales más $500 mensuales en un fondo que proyecta 8% de retorno anual durante 10 años.

### Pasos
1. Haz clic en "Cálculo Inversiones" en la barra lateral
2. Completa los valores:
   - **Capital Inicial**: $10,000
   - **Aporte Mensual**: $500
   - **Tasa Retorno Anual**: 8%
   - **Plazo**: 10 años

3. Presiona "Calcular"

### Resultados Esperados
- **Saldo Final**: $94,730.78
- **Total Contribuido**: $70,000 ($10,000 + $500 × 120 meses)
- **Ganancia por Interés**: $24,730.78
- **Rendimiento**: 35.33%

### Interpretación
- Invertiste un total de $70,000
- Tu inversión creció a $94,730.78
- Ganaste $24,730.78 por interés compuesto
- Tu dinero aumentó en 35.33%

### Gráfico de Proyección
Visualiza:
- **Línea Azul**: Saldo total (lo que tendrás)
- **Línea Verde**: Aportaciones (lo que invertiste)
- **Línea Roja**: Ganancia acumulada

---

## Comparación de Escenarios 🔄

### Ejemplo: Comparar Tasas de Interés en Préstamo

#### Escenario A: Préstamo de $50,000 a 12% en 24 meses
- Cuota Mensual: $2,250.31
- Interés Total: $4,007.44

#### Escenario B: Mismo préstamo a 10% en 24 meses
1. Cambia la tasa de 12% a 10%
2. Presiona Calcular
3. Observa los nuevos resultados

**Resultado**: Ahorras en intereses redefiniendo tasas

---

## Gestión del Historial 📚

### Guardar un Cálculo
1. Realiza cualquier cálculo
2. Presiona "Guardar en Historial"
3. El cálculo aparecerá en la lista de la barra lateral

### Recuperar un Cálculo
1. En la barra lateral izquierda, verás los últimos 8 cálculos
2. Haz clic en uno de ellos
3. La aplicación:
   - Cambia a la calculadora correcta
   - Rellena todos los campos
   - Muestra los resultados nuevamente

### Eliminar Cálculos
1. Presiona el botón "Eliminar" en un cálculo del historial
2. Confirma la eliminación
3. O presiona "Limpiar Historial" para borrar todo

---

## Consejos Útiles 💡

### Usar Sliders para Exploración Rápida
1. En lugar de escribir, usa los sliders
2. Arrastra para explorar diferentes valores
3. Perfecto para "¿Qué pasaría si...?"

### Validación de Resultados
1. Usa una calculadora externa para verificar
2. Los cálculos siguen fórmulas financieras estándar
3. Revisa los valores de entrada antes de decidir

### Exportar para Presentaciones
1. Genera PDF para presentar a:
   - Bancos
   - Inversores
   - Equipos de trabajo
2. Usa Excel para análisis detallados en hojas de cálculo

### Análisis Comparativo
1. Calcula el mismo escenario con diferentes parámetros
2. Guarda ambos en el historial
3. Descarga ambos en Excel y compara

---

## Fórmulas Financieras Utilizadas 🧮

### Cuota de Préstamo (PMT)
```
PMT = (Capital × i) / (1 - (1 + i)^-n)
```
- i = Tasa mensual = Tasa anual / 12 / 100
- n = Número de períodos

### Interés Compuesto (Inversiones)
```
Saldo = Capital × (1 + r)^t + PMT × [((1 + r)^t - 1) / r]
```
- r = Tasa periódica
- t = Número de períodos
- PMT = Aporte periódico

### Tabla de Amortización
```
Interés = Saldo_Anterior × Tasa_Mensual
Capital = Cuota - Interés
Saldo = Saldo_Anterior - Capital
```

---

## Preguntas Frecuentes 🤔

### ¿Es seguro almacenar datos aquí?
Sí, los datos se guardan solo en tu navegador (localStorage). No se envía información a servidores externos.

### ¿Qué pasa si cierro el navegador?
Tus cálculos guardados en el historial permanecen. Se almacenan localmente en tu dispositivo.

### ¿Puedo usar esto en móvil?
Sí, la aplicación es totalmente responsiva. Funciona en teléfonos, tablets y computadoras.

### ¿Las fórmulas son precisas?
Las fórmulas seguidas son las estándar en finanzas. Siempre verifica con instituciones financieras para decisiones reales.

### ¿Puedo exportar a otros formatos?
Actualmente soporta PDF y Excel. Se pueden añadir más formatos en futuras versiones.

### ¿Funciona sin internet?
Parcialmente. Necesitas internet para cargar las librerías la primera vez, pero luego puede funcionar offline si están en caché.

---

## Casos de Uso Reales 🎯

### 1. Planificación de Compra de Casa
- Calcula diferentes escenarios de financiamiento
- Compara opciones de cuota inicial
- Visualiza el plan de pago completo

### 2. Gestión de Deuda Personal
- Analiza préstamos pendientes
- Simula pagos anticipados
- Visualiza ahorros potenciales

### 3. Planificación de Inversión
- Proyecta rendimientos
- Compara diferentes tasas
- Planifica metas financieras

### 4. Educación Financiera
- Aprende cómo funcionan los intereses
- Entiende el impacto del tiempo en inversiones
- Visualiza conceptos matemáticos

---

**Última actualización**: Junio 2026
**Versión**: 1.0
**Estado**: Beta Funcional
