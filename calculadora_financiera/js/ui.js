/**
 * UI Module
 * Handles all DOM interactions, events, and orchestration
 */

const UI = {
    currentCalculatorType: 'loan-personal',
    currentResult: null,
    
    /**
     * Initialize the application
     */
    init() {
        this.setupEventListeners();
        this.loadHistoryUI();
    },
    
    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchCalculator(e.target.closest('.nav-btn').dataset.calc));
        });
        
        // Personal Loan inputs and ranges
        const lpInputs = ['lp-amount', 'lp-interest', 'lp-months'];
        const lpRanges = ['lp-amount-range', 'lp-interest-range', 'lp-months-range'];
        
        lpInputs.forEach((inputId, idx) => {
            const input = document.getElementById(inputId);
            const range = document.getElementById(lpRanges[idx]);
            
            input.addEventListener('input', (e) => {
                range.value = e.target.value;
            });
            range.addEventListener('input', (e) => {
                input.value = e.target.value;
            });
        });
        
        // Mortgage Loan inputs and ranges
        const lmInputs = ['lm-price', 'lm-down-percent', 'lm-interest', 'lm-years'];
        const lmRanges = ['lm-price-range', 'lm-down-percent-range', 'lm-interest-range', 'lm-years-range'];
        
        lmInputs.forEach((inputId, idx) => {
            const input = document.getElementById(inputId);
            const range = document.getElementById(lmRanges[idx]);
            
            input.addEventListener('input', (e) => {
                range.value = e.target.value;
            });
            range.addEventListener('input', (e) => {
                input.value = e.target.value;
            });
        });
        
        // Investment inputs and ranges
        const invInputs = ['inv-rate', 'inv-years'];
        const invRanges = ['inv-rate-range', 'inv-years-range'];
        
        invInputs.forEach((inputId, idx) => {
            const input = document.getElementById(inputId);
            const range = document.getElementById(invRanges[idx]);
            
            input.addEventListener('input', (e) => {
                range.value = e.target.value;
            });
            range.addEventListener('input', (e) => {
                input.value = e.target.value;
            });
        });
        
        // Calculate buttons
        document.getElementById('lp-calculate-btn').addEventListener('click', () => this.calculatePersonalLoan());
        document.getElementById('lm-calculate-btn').addEventListener('click', () => this.calculateMortgage());
        document.getElementById('inv-calculate-btn').addEventListener('click', () => this.calculateInvestment());
        
        // Export buttons
        document.getElementById('export-pdf-btn').addEventListener('click', () => Export.toPDF());
        document.getElementById('export-excel-btn').addEventListener('click', () => Export.toExcel());
        document.getElementById('save-to-history-btn').addEventListener('click', () => this.saveToHistory());
        
        // Clear history button
        document.getElementById('clear-history-btn').addEventListener('click', () => this.clearHistory());
    },
    
    /**
     * Switch between calculators
     */
    switchCalculator(calcType) {
        this.currentCalculatorType = calcType;
        
        // Update active button
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.calc === calcType);
        });
        
        // Hide all forms
        document.querySelectorAll('.calculator-form').forEach(form => {
            form.classList.add('hidden');
        });
        
        // Show selected form
        const formId = `${calcType}-form`;
        document.getElementById(formId).classList.remove('hidden');
        
        // Update page title and description
        const titles = {
            'loan-personal': {
                title: 'Préstamo Consumo',
                description: 'Calcula la cuota mensual y el total de intereses de tu préstamo'
            },
            'loan-mortgage': {
                title: 'Préstamo Hipotecario',
                description: 'Proyecta el financiamiento de tu propiedad con tabla de amortización'
            },
            'investment': {
                title: 'Cálculo de Inversiones',
                description: 'Simula el crecimiento de tu inversión con aportes periódicos'
            }
        };
        
        document.getElementById('page-title').textContent = titles[calcType].title;
        document.getElementById('page-description').textContent = titles[calcType].description;
        
        // Clear results
        this.clearResults();
    },
    
    /**
     * Calculate Personal Loan
     */
    calculatePersonalLoan() {
        try {
            const amount = parseFloat(document.getElementById('lp-amount').value);
            const interest = parseFloat(document.getElementById('lp-interest').value);
            const months = parseInt(document.getElementById('lp-months').value);
            
            // Validation
            if (isNaN(amount) || isNaN(interest) || isNaN(months)) {
                throw new Error('Por favor ingresa todos los valores');
            }
            
            const result = Calculators.personalLoan(amount, interest, months);
            this.displayPersonalLoanResult(result);
            this.currentResult = result;
            Export.setResult(result);
            
        } catch (error) {
            this.showError(error.message);
        }
    },
    
    /**
     * Display Personal Loan results
     */
    displayPersonalLoanResult(result) {
        const html = `
            <div class="space-y-4 fade-in">
                <div class="result-item">
                    <div class="result-label">
                        <i class="fas fa-dollar-sign"></i> Cuota Mensual
                    </div>
                    <div class="result-value">${FormatUtils.currency(result.monthlyPayment)}</div>
                </div>
                
                <div class="result-item">
                    <div class="result-label">
                        <i class="fas fa-percent"></i> Interés Total
                    </div>
                    <div class="result-value text-red-600">${FormatUtils.currency(result.totalInterest)}</div>
                    <div class="text-xs text-gray-600 mt-1">${FormatUtils.percent((result.totalInterest / result.principal) * 100, 1)} del monto original</div>
                </div>
                
                <div class="result-item">
                    <div class="result-label">
                        <i class="fas fa-money-bill-wave"></i> Total a Pagar
                    </div>
                    <div class="result-value text-blue-600">${FormatUtils.currency(result.totalPaid)}</div>
                </div>
                
                <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                    <p class="text-sm text-yellow-800">
                        <strong>Plazo:</strong> ${result.months} meses (${(result.months / 12).toFixed(1)} años)
                    </p>
                </div>
            </div>
        `;
        
        document.getElementById('results-content').innerHTML = html;
        this.showExportButtons();
        this.showChart();
        Charts.personalLoanChart(result);
    },
    
    /**
     * Calculate Mortgage
     */
    calculateMortgage() {
        try {
            const price = parseFloat(document.getElementById('lm-price').value);
            const downPercent = parseFloat(document.getElementById('lm-down-percent').value);
            const interest = parseFloat(document.getElementById('lm-interest').value);
            const years = parseInt(document.getElementById('lm-years').value);
            
            // Validation
            if (isNaN(price) || isNaN(downPercent) || isNaN(interest) || isNaN(years)) {
                throw new Error('Por favor ingresa todos los valores');
            }
            
            const result = Calculators.mortgageLoan(price, downPercent, interest, years);
            this.displayMortgageResult(result);
            this.currentResult = result;
            Export.setResult(result);
            
        } catch (error) {
            this.showError(error.message);
        }
    },
    
    /**
     * Display Mortgage results
     */
    displayMortgageResult(result) {
        const html = `
            <div class="space-y-4 fade-in">
                <div class="result-item">
                    <div class="result-label">
                        <i class="fas fa-dollar-sign"></i> Cuota Mensual
                    </div>
                    <div class="result-value">${FormatUtils.currency(result.monthlyPayment)}</div>
                </div>
                
                <div class="result-item">
                    <div class="result-label">
                        <i class="fas fa-home"></i> Monto a Financiar
                    </div>
                    <div class="result-value text-green-600">${FormatUtils.currency(result.principal)}</div>
                    <div class="text-xs text-gray-600 mt-1">
                        Cuota inicial: ${FormatUtils.currency(result.downPayment)}
                    </div>
                </div>
                
                <div class="result-item">
                    <div class="result-label">
                        <i class="fas fa-percent"></i> Interés Total
                    </div>
                    <div class="result-value text-red-600">${FormatUtils.currency(result.totalInterest)}</div>
                </div>
                
                <div class="result-item">
                    <div class="result-label">
                        <i class="fas fa-money-bill-wave"></i> Total a Pagar
                    </div>
                    <div class="result-value text-blue-600">${FormatUtils.currency(result.totalPaid)}</div>
                </div>
                
                <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4 text-sm text-yellow-800">
                    <p><strong>Plazo:</strong> ${result.years} años (${result.months} meses)</p>
                    <p class="mt-2"><strong>Tasa:</strong> ${FormatUtils.percent(result.annualRate)} anual</p>
                </div>
            </div>
        `;
        
        document.getElementById('results-content').innerHTML = html;
        this.showExportButtons();
        this.showChart();
        Charts.mortgageChart(result);
    },
    
    /**
     * Calculate Investment
     */
    calculateInvestment() {
        try {
            const initial = parseFloat(document.getElementById('inv-initial').value);
            const monthly = parseFloat(document.getElementById('inv-monthly').value);
            const rate = parseFloat(document.getElementById('inv-rate').value);
            const years = parseInt(document.getElementById('inv-years').value);
            
            // Validation
            if (isNaN(initial) || isNaN(monthly) || isNaN(rate) || isNaN(years)) {
                throw new Error('Por favor ingresa todos los valores');
            }
            
            const result = Calculators.investment(initial, monthly, rate, years);
            this.displayInvestmentResult(result);
            this.currentResult = result;
            Export.setResult(result);
            
        } catch (error) {
            this.showError(error.message);
        }
    },
    
    /**
     * Display Investment results
     */
    displayInvestmentResult(result) {
        const html = `
            <div class="space-y-4 fade-in">
                <div class="result-item">
                    <div class="result-label">
                        <i class="fas fa-piggy-bank"></i> Saldo Final
                    </div>
                    <div class="result-value text-green-600">${FormatUtils.currency(result.finalValue)}</div>
                </div>
                
                <div class="result-item">
                    <div class="result-label">
                        <i class="fas fa-chart-line"></i> Ganancia por Interés
                    </div>
                    <div class="result-value text-green-600">${FormatUtils.currency(result.totalInterestEarned)}</div>
                    <div class="text-xs text-gray-600 mt-1">
                        Rendimiento: ${FormatUtils.percent(result.returnPercentage)}
                    </div>
                </div>
                
                <div class="result-item">
                    <div class="result-label">
                        <i class="fas fa-money-bill-wave"></i> Total Contribuido
                    </div>
                    <div class="result-value text-blue-600">${FormatUtils.currency(result.totalContributed)}</div>
                </div>
                
                <div class="bg-green-50 border-l-4 border-green-500 p-4 mt-4">
                    <p class="text-sm text-green-800">
                        <strong>Plazo:</strong> ${result.years} años (${result.months} meses)
                    </p>
                    <p class="text-sm text-green-800 mt-2">
                        <strong>Tasa Retorno:</strong> ${FormatUtils.percent(result.annualRate)} anual
                    </p>
                </div>
            </div>
        `;
        
        document.getElementById('results-content').innerHTML = html;
        this.showExportButtons();
        this.showChart();
        Charts.investmentChart(result);
    },
    
    /**
     * Show export buttons
     */
    showExportButtons() {
        document.getElementById('export-buttons').classList.remove('hidden');
    },
    
    /**
     * Show chart container
     */
    showChart() {
        document.getElementById('chart-container').classList.remove('hidden');
    },
    
    /**
     * Clear results
     */
    clearResults() {
        document.getElementById('results-content').innerHTML = '<p class="text-gray-500 text-center py-8">Ingresa los datos y presiona calcular</p>';
        document.getElementById('export-buttons').classList.add('hidden');
        document.getElementById('chart-container').classList.add('hidden');
        Charts.destroy();
        this.currentResult = null;
    },
    
    /**
     * Save current result to history
     */
    saveToHistory() {
        if (!this.currentResult) {
            alert('No hay resultado para guardar');
            return;
        }
        
        Storage.save(this.currentResult);
        this.loadHistoryUI();
        this.showSuccess('Cálculo guardado en el historial');
    },
    
    /**
     * Load and display history in sidebar
     */
    loadHistoryUI() {
        const historyList = document.getElementById('history-list');
        const recent = Storage.getRecent(8);
        
        if (recent.length === 0) {
            historyList.innerHTML = '<p class="text-blue-200 text-sm">Vacío</p>';
            return;
        }
        
        historyList.innerHTML = recent.map(item => {
            const typeLabels = {
                'personal-loan': '💳 Consumo',
                'mortgage-loan': '🏠 Hipotecario',
                'investment': '📈 Inversión'
            };
            
            return `
                <div class="bg-blue-500 bg-opacity-30 rounded p-2 text-xs hover:bg-opacity-50 transition-all cursor-pointer"
                     data-history-id="${item.id}">
                    <div class="font-semibold">${typeLabels[item.type]}</div>
                    <div class="text-blue-100 mt-1">${item.timestamp}</div>
                    <button class="delete-history-btn w-full mt-2 bg-red-600 hover:bg-red-700 text-white py-1 rounded text-xs"
                            data-history-id="${item.id}">
                        Eliminar
                    </button>
                </div>
            `;
        }).join('');
        
        // Add event listeners for history items
        document.querySelectorAll('[data-history-id]').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('delete-history-btn')) {
                    this.loadHistoryItem(item.dataset.historyId);
                }
            });
        });
        
        // Add event listeners for delete buttons
        document.querySelectorAll('.delete-history-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteHistoryItem(btn.dataset.historyId);
            });
        });
    },
    
    /**
     * Load a history item and populate the form
     */
    loadHistoryItem(id) {
        const item = Storage.getById(parseInt(id));
        if (!item) return;
        
        // Switch to the appropriate calculator
        this.switchCalculator(
            item.type === 'personal-loan' ? 'loan-personal' :
            item.type === 'mortgage-loan' ? 'loan-mortgage' :
            'investment'
        );
        
        // Fill the form with the saved data
        if (item.type === 'personal-loan') {
            document.getElementById('lp-amount').value = item.principal;
            document.getElementById('lp-amount-range').value = item.principal;
            document.getElementById('lp-interest').value = item.annualRate;
            document.getElementById('lp-interest-range').value = item.annualRate;
            document.getElementById('lp-months').value = item.months;
            document.getElementById('lp-months-range').value = item.months;
            this.calculatePersonalLoan();
        } else if (item.type === 'mortgage-loan') {
            document.getElementById('lm-price').value = item.propertyPrice;
            document.getElementById('lm-price-range').value = item.propertyPrice;
            document.getElementById('lm-down-percent').value = item.downPaymentPercent;
            document.getElementById('lm-down-percent-range').value = item.downPaymentPercent;
            document.getElementById('lm-interest').value = item.annualRate;
            document.getElementById('lm-interest-range').value = item.annualRate;
            document.getElementById('lm-years').value = item.years;
            document.getElementById('lm-years-range').value = item.years;
            this.calculateMortgage();
        } else if (item.type === 'investment') {
            document.getElementById('inv-initial').value = item.initialCapital;
            document.getElementById('inv-monthly').value = item.monthlyContribution;
            document.getElementById('inv-rate').value = item.annualRate;
            document.getElementById('inv-rate-range').value = item.annualRate;
            document.getElementById('inv-years').value = item.years;
            document.getElementById('inv-years-range').value = item.years;
            this.calculateInvestment();
        }
    },
    
    /**
     * Delete a history item
     */
    deleteHistoryItem(id) {
        if (confirm('¿Estás seguro de que deseas eliminar este cálculo?')) {
            Storage.delete(parseInt(id));
            this.loadHistoryUI();
            this.showSuccess('Cálculo eliminado');
        }
    },
    
    /**
     * Clear all history
     */
    clearHistory() {
        if (confirm('¿Estás seguro de que deseas limpiar todo el historial? No se puede deshacer.')) {
            Storage.clear();
            this.loadHistoryUI();
            this.showSuccess('Historial limpiado');
        }
    },
    
    /**
     * Show error message
     */
    showError(message) {
        const alert = document.createElement('div');
        alert.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-bounce';
        alert.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.remove();
        }, 4000);
    },
    
    /**
     * Show success message
     */
    showSuccess(message) {
        const alert = document.createElement('div');
        alert.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 fade-in';
        alert.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    UI.init();
});
