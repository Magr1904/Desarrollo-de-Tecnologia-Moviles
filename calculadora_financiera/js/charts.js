/**
 * Charts Module
 * Handles chart generation and visualization with Chart.js
 */

const Charts = {
    chartInstance: null,
    
    /**
     * Initialize chart container
     */
    init() {
        this.ctx = document.getElementById('result-chart');
    },
    
    /**
     * Destroy existing chart instance
     */
    destroy() {
        if (this.chartInstance) {
            this.chartInstance.destroy();
            this.chartInstance = null;
        }
    },
    
    /**
     * Create chart for Personal Loan
     */
    personalLoanChart(result) {
        this.destroy();
        
        const months = Array.from({length: result.months}, (_, i) => i + 1);
        const principalRemaining = [];
        const interestAccumulated = [];
        
        let remaining = result.principal;
        let totalInterest = 0;
        const monthlyRate = result.monthlyRate;
        
        for (let i = 0; i < result.months; i++) {
            const interestPayment = remaining * monthlyRate;
            const principalPayment = result.monthlyPayment - interestPayment;
            remaining -= principalPayment;
            totalInterest += interestPayment;
            
            principalRemaining.push(Math.max(0, parseFloat(remaining.toFixed(2))));
            interestAccumulated.push(parseFloat(totalInterest.toFixed(2)));
        }
        
        this.chartInstance = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'Capital Restante',
                        data: principalRemaining,
                        borderColor: 'rgb(59, 130, 246)',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4,
                        fill: true,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Interés Acumulado',
                        data: interestAccumulated,
                        borderColor: 'rgb(239, 68, 68)',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        tension: 0.4,
                        fill: true,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: { size: 12, weight: 'bold' }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Evolución del Préstamo por Mes',
                        font: { size: 14, weight: 'bold' }
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString('es-ES', {maximumFractionDigits: 0});
                            }
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString('es-ES', {maximumFractionDigits: 0});
                            }
                        },
                        grid: { drawOnChartArea: false }
                    }
                }
            }
        });
    },
    
    /**
     * Create chart for Mortgage Loan
     */
    mortgageChart(result) {
        this.destroy();
        
        // Get every 12 months (yearly) for readability
        const yearlyData = result.amortization.filter((_, i) => (i + 1) % 12 === 0 || i === result.amortization.length - 1);
        const labels = yearlyData.map(d => `Año ${Math.ceil(d.month / 12)}`);
        
        this.chartInstance = new Chart(this.ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Capital Pagado',
                        data: yearlyData.map(d => d.principal),
                        backgroundColor: 'rgba(34, 197, 94, 0.8)',
                        borderColor: 'rgb(34, 197, 94)',
                        borderWidth: 1
                    },
                    {
                        label: 'Interés Pagado',
                        data: yearlyData.map(d => d.interest),
                        backgroundColor: 'rgba(239, 68, 68, 0.8)',
                        borderColor: 'rgb(239, 68, 68)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                indexAxis: 'x',
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: { size: 12, weight: 'bold' }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Desglose de Pagos por Año',
                        font: { size: 14, weight: 'bold' }
                    }
                },
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000).toFixed(0) + 'k';
                            }
                        }
                    }
                }
            }
        });
    },
    
    /**
     * Create chart for Investment
     */
    investmentChart(result) {
        this.destroy();
        
        // Get yearly data
        const yearlyData = result.growth.filter((_, i) => (i + 1) % 12 === 0 || i === result.growth.length - 1);
        const labels = yearlyData.map(d => `Año ${d.year}`);
        
        this.chartInstance = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Saldo Total',
                        data: yearlyData.map(d => d.balance),
                        borderColor: 'rgb(59, 130, 246)',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: 'rgb(59, 130, 246)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5
                    },
                    {
                        label: 'Aportaciones',
                        data: yearlyData.map(d => d.contributions),
                        borderColor: 'rgb(34, 197, 94)',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        tension: 0.4,
                        fill: false,
                        pointBackgroundColor: 'rgb(34, 197, 94)',
                        pointRadius: 4
                    },
                    {
                        label: 'Ganancia',
                        data: yearlyData.map(d => d.interest),
                        borderColor: 'rgb(239, 68, 68)',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: 'rgb(239, 68, 68)',
                        pointRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: { size: 12, weight: 'bold' }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Proyección de Crecimiento de Inversión',
                        font: { size: 14, weight: 'bold' }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000).toFixed(0) + 'k';
                            }
                        }
                    }
                }
            }
        });
    }
};

// Initialize charts when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Charts.init();
});
