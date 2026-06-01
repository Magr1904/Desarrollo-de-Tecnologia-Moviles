/**
 * Export Module
 * Handles PDF and Excel export functionality
 */

const Export = {
    currentResult: null,
    
    /**
     * Set the current result to export
     */
    setResult(result) {
        this.currentResult = result;
    },
    
    /**
     * Export to PDF
     */
    toPDF() {
        if (!this.currentResult) {
            alert('No hay datos para exportar');
            return;
        }
        
        const result = this.currentResult;
        const element = document.createElement('div');
        element.style.padding = '20px';
        element.style.fontFamily = 'Arial, sans-serif';
        
        // Header
        const header = `
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #2563eb; padding-bottom: 20px;">
                <h1 style="color: #2563eb; margin: 0;">FinCalc - Reporte Financiero</h1>
                <p style="color: #666; margin: 5px 0;">Generado: ${new Date().toLocaleString('es-ES')}</p>
            </div>
        `;
        
        // Content based on type
        let content = '';
        
        if (result.type === 'personal-loan') {
            content = this.generatePersonalLoanPDF(result);
        } else if (result.type === 'mortgage-loan') {
            content = this.generateMortgageLoanPDF(result);
        } else if (result.type === 'investment') {
            content = this.generateInvestmentPDF(result);
        }
        
        element.innerHTML = header + content;
        
        const opt = {
            margin: 10,
            filename: `fincalc-${result.type}-${Date.now()}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
        };
        
        html2pdf().set(opt).from(element).save();
    },
    
    /**
     * Generate Personal Loan PDF content
     */
    generatePersonalLoanPDF(result) {
        return `
            <div style="margin-bottom: 20px;">
                <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
                    Resumen de Préstamo Consumo
                </h2>
                
                <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
                    <tr style="background: #e0e7ff;">
                        <td style="padding: 12px; border: 1px solid #c7d2fe; font-weight: bold; width: 50%;">Monto del Préstamo:</td>
                        <td style="padding: 12px; border: 1px solid #c7d2fe; text-align: right;">${FormatUtils.currency(result.principal)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border: 1px solid #c7d2fe; font-weight: bold;">Tasa de Interés Anual:</td>
                        <td style="padding: 12px; border: 1px solid #c7d2fe; text-align: right;">${FormatUtils.percent(result.annualRate)}</td>
                    </tr>
                    <tr style="background: #e0e7ff;">
                        <td style="padding: 12px; border: 1px solid #c7d2fe; font-weight: bold;">Plazo:</td>
                        <td style="padding: 12px; border: 1px solid #c7d2fe; text-align: right;">${result.months} meses (${(result.months / 12).toFixed(1)} años)</td>
                    </tr>
                </table>
                
                <div style="background: #f0f9ff; padding: 20px; margin-top: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px 0; font-weight: bold; color: #2563eb;">Cuota Mensual:</td>
                            <td style="padding: 10px 0; text-align: right; font-size: 18px; font-weight: bold; color: #2563eb;">
                                ${FormatUtils.currency(result.monthlyPayment)}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; color: #666;">Interés Total:</td>
                            <td style="padding: 10px 0; text-align: right; color: #ef4444;">
                                ${FormatUtils.currency(result.totalInterest)}
                            </td>
                        </tr>
                        <tr style="border-top: 2px solid #2563eb;">
                            <td style="padding: 10px 0; font-weight: bold;">Total a Pagar:</td>
                            <td style="padding: 10px 0; text-align: right; font-size: 16px; font-weight: bold;">
                                ${FormatUtils.currency(result.totalPaid)}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        `;
    },
    
    /**
     * Generate Mortgage Loan PDF content
     */
    generateMortgageLoanPDF(result) {
        let amortizationTable = `
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 11px;">
                <thead>
                    <tr style="background: #1e40af;">
                        <th style="padding: 8px; border: 1px solid #1e3a8a; color: white; font-weight: bold;">Mes</th>
                        <th style="padding: 8px; border: 1px solid #1e3a8a; color: white; font-weight: bold; text-align: right;">Cuota</th>
                        <th style="padding: 8px; border: 1px solid #1e3a8a; color: white; font-weight: bold; text-align: right;">Capital</th>
                        <th style="padding: 8px; border: 1px solid #1e3a8a; color: white; font-weight: bold; text-align: right;">Interés</th>
                        <th style="padding: 8px; border: 1px solid #1e3a8a; color: white; font-weight: bold; text-align: right;">Saldo</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        // Show every 12 months for PDF readability
        result.amortization.forEach((row, idx) => {
            if ((row.month % 12 === 0 || row.month === 1 || row.month === result.months)) {
                const bgColor = row.month % 24 === 0 ? '#f3f4f6' : 'white';
                amortizationTable += `
                    <tr style="background: ${bgColor};">
                        <td style="padding: 6px; border: 1px solid #d1d5db;">${row.month}</td>
                        <td style="padding: 6px; border: 1px solid #d1d5db; text-align: right;">${FormatUtils.currency(row.payment)}</td>
                        <td style="padding: 6px; border: 1px solid #d1d5db; text-align: right;">${FormatUtils.currency(row.principal)}</td>
                        <td style="padding: 6px; border: 1px solid #d1d5db; text-align: right;">${FormatUtils.currency(row.interest)}</td>
                        <td style="padding: 6px; border: 1px solid #d1d5db; text-align: right;">${FormatUtils.currency(row.balance)}</td>
                    </tr>
                `;
            }
        });
        
        amortizationTable += `
                </tbody>
            </table>
            <p style="font-size: 10px; color: #999; margin-top: 10px;">*Tabla simplificada. Mostrando pagos mensuales seleccionados.</p>
        `;
        
        return `
            <div style="margin-bottom: 20px;">
                <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
                    Resumen de Préstamo Hipotecario
                </h2>
                
                <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
                    <tr style="background: #e0e7ff;">
                        <td style="padding: 12px; border: 1px solid #c7d2fe; font-weight: bold; width: 50%;">Precio de Propiedad:</td>
                        <td style="padding: 12px; border: 1px solid #c7d2fe; text-align: right;">${FormatUtils.currency(result.propertyPrice)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border: 1px solid #c7d2fe; font-weight: bold;">Cuota Inicial (${result.downPaymentPercent}%):</td>
                        <td style="padding: 12px; border: 1px solid #c7d2fe; text-align: right;">${FormatUtils.currency(result.downPayment)}</td>
                    </tr>
                    <tr style="background: #e0e7ff;">
                        <td style="padding: 12px; border: 1px solid #c7d2fe; font-weight: bold;">Monto a Financiar:</td>
                        <td style="padding: 12px; border: 1px solid #c7d2fe; text-align: right;">${FormatUtils.currency(result.principal)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border: 1px solid #c7d2fe; font-weight: bold;">Tasa Interés Anual:</td>
                        <td style="padding: 12px; border: 1px solid #c7d2fe; text-align: right;">${FormatUtils.percent(result.annualRate)}</td>
                    </tr>
                    <tr style="background: #e0e7ff;">
                        <td style="padding: 12px; border: 1px solid #c7d2fe; font-weight: bold;">Plazo:</td>
                        <td style="padding: 12px; border: 1px solid #c7d2fe; text-align: right;">${result.years} años (${result.months} meses)</td>
                    </tr>
                </table>
                
                <div style="background: #f0f9ff; padding: 20px; margin-top: 20px; margin-bottom: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px 0; font-weight: bold; color: #2563eb;">Cuota Mensual:</td>
                            <td style="padding: 10px 0; text-align: right; font-size: 18px; font-weight: bold; color: #2563eb;">
                                ${FormatUtils.currency(result.monthlyPayment)}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; color: #666;">Interés Total:</td>
                            <td style="padding: 10px 0; text-align: right; color: #ef4444;">
                                ${FormatUtils.currency(result.totalInterest)}
                            </td>
                        </tr>
                        <tr style="border-top: 2px solid #2563eb;">
                            <td style="padding: 10px 0; font-weight: bold;">Total a Pagar:</td>
                            <td style="padding: 10px 0; text-align: right; font-size: 16px; font-weight: bold;">
                                ${FormatUtils.currency(result.totalPaid)}
                            </td>
                        </tr>
                    </table>
                </div>
                
                <h3 style="color: #1e40af; margin-top: 20px; margin-bottom: 10px;">Tabla de Amortización (Seleccionada)</h3>
                ${amortizationTable}
            </div>
        `;
    },
    
    /**
     * Generate Investment PDF content
     */
    generateInvestmentPDF(result) {
        return `
            <div style="margin-bottom: 20px;">
                <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
                    Resumen de Proyección de Inversión
                </h2>
                
                <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
                    <tr style="background: #e0e7ff;">
                        <td style="padding: 12px; border: 1px solid #c7d2fe; font-weight: bold; width: 50%;">Capital Inicial:</td>
                        <td style="padding: 12px; border: 1px solid #c7d2fe; text-align: right;">${FormatUtils.currency(result.initialCapital)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border: 1px solid #c7d2fe; font-weight: bold;">Aporte Mensual:</td>
                        <td style="padding: 12px; border: 1px solid #c7d2fe; text-align: right;">${FormatUtils.currency(result.monthlyContribution)}</td>
                    </tr>
                    <tr style="background: #e0e7ff;">
                        <td style="padding: 12px; border: 1px solid #c7d2fe; font-weight: bold;">Tasa Retorno Anual:</td>
                        <td style="padding: 12px; border: 1px solid #c7d2fe; text-align: right;">${FormatUtils.percent(result.annualRate)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border: 1px solid #c7d2fe; font-weight: bold;">Plazo:</td>
                        <td style="padding: 12px; border: 1px solid #c7d2fe; text-align: right;">${result.years} años</td>
                    </tr>
                </table>
                
                <div style="background: #f0f9ff; padding: 20px; margin-top: 20px; margin-bottom: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px 0; font-weight: bold; color: #2563eb;">Saldo Final:</td>
                            <td style="padding: 10px 0; text-align: right; font-size: 18px; font-weight: bold; color: #2563eb;">
                                ${FormatUtils.currency(result.finalValue)}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; color: #666;">Total Contribuido:</td>
                            <td style="padding: 10px 0; text-align: right;">
                                ${FormatUtils.currency(result.totalContributed)}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; color: #22c55e; font-weight: bold;">Ganancia por Interés:</td>
                            <td style="padding: 10px 0; text-align: right; color: #22c55e; font-weight: bold;">
                                ${FormatUtils.currency(result.totalInterestEarned)}
                            </td>
                        </tr>
                        <tr style="border-top: 2px solid #2563eb;">
                            <td style="padding: 10px 0; font-weight: bold;">Rendimiento:</td>
                            <td style="padding: 10px 0; text-align: right; font-size: 16px; font-weight: bold;">
                                ${FormatUtils.percent(result.returnPercentage)}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        `;
    },
    
    /**
     * Export to Excel
     */
    toExcel() {
        if (!this.currentResult) {
            alert('No hay datos para exportar');
            return;
        }
        
        const result = this.currentResult;
        const workbook = XLSX.utils.book_new();
        
        if (result.type === 'personal-loan') {
            this.exportPersonalLoanExcel(workbook, result);
        } else if (result.type === 'mortgage-loan') {
            this.exportMortgageLoanExcel(workbook, result);
        } else if (result.type === 'investment') {
            this.exportInvestmentExcel(workbook, result);
        }
        
        XLSX.writeFile(workbook, `fincalc-${result.type}-${Date.now()}.xlsx`);
    },
    
    /**
     * Export Personal Loan to Excel
     */
    exportPersonalLoanExcel(workbook, result) {
        const summaryData = [
            ['RESUMEN - PRÉSTAMO CONSUMO'],
            [],
            ['Monto del Préstamo', result.principal],
            ['Tasa de Interés Anual (%)', result.annualRate],
            ['Plazo (Meses)', result.months],
            [],
            ['RESULTADOS'],
            ['Cuota Mensual', result.monthlyPayment],
            ['Interés Total', result.totalInterest],
            ['Total a Pagar', result.totalPaid],
            [],
            ['Fecha de Cálculo', result.timestamp]
        ];
        
        const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
        summarySheet['!cols'] = [{wch: 30}, {wch: 20}];
        XLSX.utils.book_append_sheet(workbook, summarySheet, 'Resumen');
    },
    
    /**
     * Export Mortgage Loan to Excel
     */
    exportMortgageLoanExcel(workbook, result) {
        // Summary sheet
        const summaryData = [
            ['RESUMEN - PRÉSTAMO HIPOTECARIO'],
            [],
            ['Precio de Propiedad', result.propertyPrice],
            ['Cuota Inicial (%)', result.downPaymentPercent],
            ['Cuota Inicial ($)', result.downPayment],
            ['Monto a Financiar', result.principal],
            ['Tasa de Interés Anual (%)', result.annualRate],
            ['Plazo (Años)', result.years],
            [],
            ['RESULTADOS'],
            ['Cuota Mensual', result.monthlyPayment],
            ['Interés Total', result.totalInterest],
            ['Total a Pagar', result.totalPaid],
            [],
            ['Fecha de Cálculo', result.timestamp]
        ];
        
        const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
        summarySheet['!cols'] = [{wch: 30}, {wch: 20}];
        XLSX.utils.book_append_sheet(workbook, summarySheet, 'Resumen');
        
        // Amortization sheet
        const amortizationData = [
            ['TABLA DE AMORTIZACIÓN'],
            [],
            ['Mes', 'Cuota Mensual', 'Capital', 'Interés', 'Saldo']
        ];
        
        result.amortization.forEach(row => {
            amortizationData.push([
                row.month,
                row.payment,
                row.principal,
                row.interest,
                row.balance
            ]);
        });
        
        const amortSheet = XLSX.utils.aoa_to_sheet(amortizationData);
        amortSheet['!cols'] = [{wch: 12}, {wch: 15}, {wch: 15}, {wch: 15}, {wch: 15}];
        XLSX.utils.book_append_sheet(workbook, amortSheet, 'Amortización');
    },
    
    /**
     * Export Investment to Excel
     */
    exportInvestmentExcel(workbook, result) {
        // Summary sheet
        const summaryData = [
            ['RESUMEN - PROYECCIÓN DE INVERSIÓN'],
            [],
            ['Capital Inicial', result.initialCapital],
            ['Aporte Mensual', result.monthlyContribution],
            ['Tasa Retorno Anual (%)', result.annualRate],
            ['Plazo (Años)', result.years],
            [],
            ['RESULTADOS'],
            ['Saldo Final', result.finalValue],
            ['Total Contribuido', result.totalContributed],
            ['Ganancia por Interés', result.totalInterestEarned],
            ['Rendimiento (%)', result.returnPercentage],
            [],
            ['Fecha de Cálculo', result.timestamp]
        ];
        
        const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
        summarySheet['!cols'] = [{wch: 30}, {wch: 20}];
        XLSX.utils.book_append_sheet(workbook, summarySheet, 'Resumen');
        
        // Growth projection sheet
        const growthData = [
            ['PROYECCIÓN DE CRECIMIENTO'],
            [],
            ['Mes', 'Año', 'Saldo', 'Aportaciones', 'Interés Ganado']
        ];
        
        result.growth.forEach(row => {
            growthData.push([
                row.month,
                row.year,
                row.balance,
                row.contributions,
                row.interest
            ]);
        });
        
        const growthSheet = XLSX.utils.aoa_to_sheet(growthData);
        growthSheet['!cols'] = [{wch: 10}, {wch: 10}, {wch: 15}, {wch: 15}, {wch: 15}];
        XLSX.utils.book_append_sheet(workbook, growthSheet, 'Proyección');
    }
};
