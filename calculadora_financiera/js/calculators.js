/**
 * Calculators Module
 * Contains pure logic for financial calculations
 */

const Calculators = {
    /**
     * Personal Loan Calculator
     * Calcula cuota mensual, interés total y monto total a pagar
     */
    personalLoan(principal, annualRate, months) {
        if (principal <= 0 || annualRate < 0 || months <= 0) {
            throw new Error('Los valores deben ser válidos y positivos');
        }
        
        const monthlyRate = annualRate / 100 / 12;
        
        // Fórmula: Cuota = (Capital × i) / (1 - (1 + i)^-n)
        let monthlyPayment;
        if (monthlyRate === 0) {
            monthlyPayment = principal / months;
        } else {
            monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
        }
        
        const totalPaid = monthlyPayment * months;
        const totalInterest = totalPaid - principal;
        
        return {
            principal: parseFloat(principal),
            annualRate: parseFloat(annualRate),
            months: parseInt(months),
            monthlyRate: monthlyRate,
            monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
            totalInterest: parseFloat(totalInterest.toFixed(2)),
            totalPaid: parseFloat(totalPaid.toFixed(2)),
            type: 'personal-loan',
            timestamp: new Date().toLocaleString('es-ES')
        };
    },
    
    /**
     * Mortgage Loan Calculator with Amortization Table
     */
    mortgageLoan(propertyPrice, downPaymentPercent, annualRate, years) {
        if (propertyPrice <= 0 || annualRate < 0 || years <= 0) {
            throw new Error('Los valores deben ser válidos y positivos');
        }
        
        if (downPaymentPercent < 5 || downPaymentPercent > 95) {
            throw new Error('La cuota inicial debe estar entre 5% y 95%');
        }
        
        const downPayment = (propertyPrice * downPaymentPercent) / 100;
        const principal = propertyPrice - downPayment;
        const months = years * 12;
        const monthlyRate = annualRate / 100 / 12;
        
        // Calculate monthly payment
        let monthlyPayment;
        if (monthlyRate === 0) {
            monthlyPayment = principal / months;
        } else {
            monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
        }
        
        // Generate amortization table
        const amortization = [];
        let balance = principal;
        
        for (let month = 1; month <= months; month++) {
            const interest = balance * monthlyRate;
            const principalPayment = monthlyPayment - interest;
            balance -= principalPayment;
            
            amortization.push({
                month: month,
                payment: parseFloat(monthlyPayment.toFixed(2)),
                principal: parseFloat(principalPayment.toFixed(2)),
                interest: parseFloat(interest.toFixed(2)),
                balance: parseFloat(Math.max(0, balance).toFixed(2))
            });
        }
        
        const totalPaid = monthlyPayment * months;
        const totalInterest = totalPaid - principal;
        
        return {
            propertyPrice: parseFloat(propertyPrice),
            downPaymentPercent: parseFloat(downPaymentPercent),
            downPayment: parseFloat(downPayment.toFixed(2)),
            principal: parseFloat(principal.toFixed(2)),
            annualRate: parseFloat(annualRate),
            years: parseInt(years),
            months: months,
            monthlyRate: monthlyRate,
            monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
            totalInterest: parseFloat(totalInterest.toFixed(2)),
            totalPaid: parseFloat(totalPaid.toFixed(2)),
            amortization: amortization,
            type: 'mortgage-loan',
            timestamp: new Date().toLocaleString('es-ES')
        };
    },
    
    /**
     * Investment Calculator with Periodic Contributions
     */
    investment(initialCapital, monthlyContribution, annualRate, years) {
        if (initialCapital < 0 || monthlyContribution < 0 || annualRate < 0 || years <= 0) {
            throw new Error('Los valores deben ser válidos y positivos');
        }
        
        const months = years * 12;
        const monthlyRate = annualRate / 100 / 12;
        
        // FV = PV(1 + r)^n + PMT * [((1 + r)^n - 1) / r]
        let finalValue;
        let investmentGrowth = [];
        let balance = initialCapital;
        let totalContributions = initialCapital;
        
        for (let month = 1; month <= months; month++) {
            const interest = balance * monthlyRate;
            balance += monthlyContribution + interest;
            totalContributions += monthlyContribution;
            
            investmentGrowth.push({
                month: month,
                year: Math.ceil(month / 12),
                balance: parseFloat(balance.toFixed(2)),
                contributions: parseFloat(totalContributions.toFixed(2)),
                interest: parseFloat((balance - totalContributions).toFixed(2))
            });
        }
        
        finalValue = balance;
        const totalInterestEarned = finalValue - totalContributions;
        const totalContributed = initialCapital + (monthlyContribution * months);
        
        return {
            initialCapital: parseFloat(initialCapital),
            monthlyContribution: parseFloat(monthlyContribution),
            annualRate: parseFloat(annualRate),
            years: parseInt(years),
            months: months,
            monthlyRate: monthlyRate,
            finalValue: parseFloat(finalValue.toFixed(2)),
            totalContributed: parseFloat(totalContributed.toFixed(2)),
            totalInterestEarned: parseFloat(totalInterestEarned.toFixed(2)),
            returnPercentage: parseFloat(((totalInterestEarned / totalContributed) * 100).toFixed(2)),
            growth: investmentGrowth,
            type: 'investment',
            timestamp: new Date().toLocaleString('es-ES')
        };
    }
};

// Utility functions for formatting
const FormatUtils = {
    currency(value) {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    },
    
    number(value, decimals = 2) {
        return new Intl.NumberFormat('es-ES', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(value);
    },
    
    percent(value, decimals = 2) {
        return value.toFixed(decimals) + '%';
    },
    
    date(value) {
        if (typeof value === 'string') return value;
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(value);
    }
};
