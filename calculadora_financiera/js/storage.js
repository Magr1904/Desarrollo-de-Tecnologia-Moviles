/**
 * Storage Module
 * Manages local storage for calculation history
 */

const Storage = {
    STORAGE_KEY: 'fincalc_history',
    
    /**
     * Get all calculations from history
     */
    getAll() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },
    
    /**
     * Get calculations by type
     */
    getByType(type) {
        return this.getAll().filter(item => item.type === type);
    },
    
    /**
     * Save a calculation to history
     */
    save(calculation) {
        const history = this.getAll();
        const id = Date.now();
        const entry = {
            id,
            ...calculation,
            savedAt: new Date().toISOString()
        };
        history.push(entry);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
        return entry;
    },
    
    /**
     * Delete a calculation from history by ID
     */
    delete(id) {
        const history = this.getAll();
        const filtered = history.filter(item => item.id !== id);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
    },
    
    /**
     * Clear all history
     */
    clear() {
        localStorage.removeItem(this.STORAGE_KEY);
    },
    
    /**
     * Get single calculation by ID
     */
    getById(id) {
        return this.getAll().find(item => item.id === id);
    },
    
    /**
     * Get calculations sorted by date (newest first)
     */
    getAllSorted() {
        return this.getAll().sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
    },
    
    /**
     * Get last N calculations
     */
    getRecent(n = 10) {
        return this.getAllSorted().slice(0, n);
    },
    
    /**
     * Search calculations by query
     */
    search(query) {
        const lowerQuery = query.toLowerCase();
        return this.getAll().filter(item => 
            item.type.includes(lowerQuery) || 
            item.timestamp.toLowerCase().includes(lowerQuery)
        );
    }
};
