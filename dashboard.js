document.addEventListener('DOMContentLoaded', function() {
    // Initialize Charts
    initializeCharts();
    
    // Populate Market Watch Table
    populateMarketWatch();
    
    // Setup Event Listeners
    setupEventListeners();
    
    // Simulate Live Updates
    simulateLiveUpdates();
});

function initializeCharts() {
    // Nifty 50 Chart
    const niftyCtx = document.getElementById('niftyChart').getContext('2d');
    new Chart(niftyCtx, {
        type: 'line',
        data: {
            labels: Array(20).fill(''),
            datasets: [{
                data: [18000, 18050, 18100, 18150, 18180, 18160, 18170, 18175, 18180, 18182, 18180, 18178, 18175, 18177, 18179, 18180, 18181, 18180, 18181, 18181.75],
                borderColor: '#f6465d',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: getChartOptions()
    });
    
    // Sensex Chart
    const sensexCtx = document.getElementById('sensexChart').getContext('2d');
    new Chart(sensexCtx, {
        type: 'line',
        data: {
            labels: Array(20).fill(''),
            datasets: [{
                data: [61000, 61200, 61350, 61400, 61450, 61500, 61520, 61540, 61550, 61555, 61557, 61558, 61559, 61560, 61561, 61560, 61559, 61560, 61560.5, 61560.64],
                borderColor: '#f6465d',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: getChartOptions()
    });
    
    // Bank Nifty Chart
    const bankCtx = document.getElementById('bankChart').getContext('2d');
    new Chart(bankCtx, {
        type: 'line',
        data: {
            labels: Array(20).fill(''),
            datasets: [{
                data: [42500, 42600, 42700, 42800, 42850, 42860, 42870, 42875, 42876, 42877, 42876.5, 42876, 42875.5, 42876, 42876.2, 42876.3, 42876.35, 42876.34, 42876.35, 42876.35],
                borderColor: '#09a854',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: getChartOptions()
    });
    
    // Portfolio Allocation Chart
    const allocCtx = document.getElementById('allocationChart').getContext('2d');
    new Chart(allocCtx, {
        type: 'doughnut',
        data: {
            labels: ['Large Cap', 'Mid Cap', 'Small Cap', 'Sectoral', 'International'],
            datasets: [{
                data: [45, 25, 15, 10, 5],
                backgroundColor: [
                    '#387ed1',
                    '#09a854',
                    '#f6465d',
                    '#ff9800',
                    '#9c27b0'
                ],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
    
    // P&L Chart
    const pnlCtx = document.getElementById('pnlChart').getContext('2d');
    new Chart(pnlCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                data: [12000, 19000, 15000, 18000, 22000, 25000],
                backgroundColor: '#09a854',
                borderRadius: 4
            }]
        },
        options: {
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return '₹' + (value / 1000) + 'K';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function getChartOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                display: false,
                grid: {
                    display: false
                }
            },
            y: {
                display: false,
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        elements: {
            point: {
                radius: 0
            }
        }
    };
}

function populateMarketWatch() {
    const marketData = [
        { symbol: 'RELIANCE', ltp: 2425.50, change: -14.50, percent: -0.59, volume: '2.5M', inWatchlist: true },
        { symbol: 'HDFCBANK', ltp: 1575.00, change: -12.25, percent: -0.77, volume: '1.8M', inWatchlist: true },
        { symbol: 'INFY', ltp: 1410.25, change: -16.70, percent: -1.17, volume: '3.2M', inWatchlist: true },
        { symbol: 'TCS', ltp: 3520.90, change: -28.75, percent: -0.81, volume: '1.1M', inWatchlist: false },
        { symbol: 'HINDUNILVR', ltp: 2598.75, change: 12.50, percent: 0.48, volume: '0.8M', inWatchlist: false },
        { symbol: 'ITC', ltp: 425.60, change: 3.25, percent: 0.77, volume: '4.5M', inWatchlist: true },
        { symbol: 'SBIN', ltp: 587.35, change: -5.40, percent: -0.91, volume: '6.2M', inWatchlist: false },
        { symbol: 'BHARTIARTL', ltp: 875.20, change: 8.75, percent: 1.01, volume: '1.7M', inWatchlist: true },
        { symbol: 'LICI', ltp: 842.50, change: -7.25, percent: -0.85, volume: '2.3M', inWatchlist: false },
        { symbol: 'LT', ltp: 3425.75, change: 42.50, percent: 1.26, volume: '0.9M', inWatchlist: true }
    ];
    
    const tableBody = document.querySelector('.market-table tbody');
    tableBody.innerHTML = '';
    
    marketData.forEach(stock => {
        const row = document.createElement('tr');
        
        const changeClass = stock.change >= 0 ? 'positive' : 'negative';
        const changeIcon = stock.change >= 0 ? '▲' : '▼';
        
        row.innerHTML = `
            <td>
                <div class="stock-name">${stock.symbol}</div>
                <div class="stock-info">NSE</div>
            </td>
            <td class="price">${stock.ltp.toFixed(2)}</td>
            <td class="${changeClass}">${Math.abs(stock.change).toFixed(2)} ${changeIcon}</td>
            <td class="${changeClass}">${stock.percent >= 0 ? '+' : ''}${stock.percent.toFixed(2)}%</td>
            <td class="volume">${stock.volume}</td>
            <td>
                <button class="action-btn ${stock.inWatchlist ? 'active' : ''}">
                    <i class="fas fa-star"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function setupEventListeners() {
    // Watchlist Star Toggle
    document.querySelector('.market-table').addEventListener('click', function(e) {
        if (e.target.closest('.action-btn')) {
            const btn = e.target.closest('.action-btn');
            btn.classList.toggle('active');
        }
    });
    
    // Sortable Table Headers
    document.querySelectorAll('.sortable').forEach(header => {
        header.addEventListener('click', function() {
            const table = this.closest('table');
            const headerIndex = Array.from(this.parentNode.children).indexOf(this);
            const rows = Array.from(table.querySelectorAll('tbody tr'));
            const isAscending = !this.classList.contains('asc');
            
            // Clear other sort indicators
            table.querySelectorAll('.sortable').forEach(h => {
                h.classList.remove('asc', 'desc');
                h.querySelector('i').className = 'fas fa-sort';
            });
            
            // Set current sort indicator
            this.classList.toggle('asc', isAscending);
            this.classList.toggle('desc', !isAscending);
            this.querySelector('i').className = isAscending ? 'fas fa-sort-up' : 'fas fa-sort-down';
            
            // Sort rows
            rows.sort((a, b) => {
                const aValue = a.children[headerIndex].textContent;
                const bValue = b.children[headerIndex].textContent;
                
                // Handle numeric values
                if (!isNaN(parseFloat(aValue)) && !isNaN(parseFloat(bValue))) {
                    return isAscending ? 
                        parseFloat(aValue) - parseFloat(bValue) : 
                        parseFloat(bValue) - parseFloat(aValue);
                }
                
                // Handle percentage values
                if (aValue.includes('%') && bValue.includes('%')) {
                    const aPercent = parseFloat(aValue);
                    const bPercent = parseFloat(bValue);
                    return isAscending ? aPercent - bPercent : bPercent - aPercent;
                }
                
                // Default string comparison
                return isAscending ? 
                    aValue.localeCompare(bValue) : 
                    bValue.localeCompare(aValue);
            });
            
            // Re-append sorted rows
            rows.forEach(row => table.querySelector('tbody').appendChild(row));
        });
    });
    
    // Trade Panel Tabs
    document.querySelectorAll('.trade-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            this.closest('.trade-tabs').querySelectorAll('.trade-tab').forEach(t => {
                t.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Time Filters
    document.querySelectorAll('.time-filter').forEach(filter => {
        filter.addEventListener('click', function() {
            this.closest('.time-filters').querySelectorAll('.time-filter').forEach(f => {
                f.classList.remove('active');
            });
            this.classList.add('active');
            // In a real app, this would filter the data
        });
    });
}

function simulateLiveUpdates() {
    // Update time every second
    setInterval(() => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        document.querySelector('.current-time').textContent = timeString;
        document.querySelectorAll('.status-value')[0].textContent = timeString;
    }, 1000);
    
    // Randomly update some stock prices
    setInterval(() => {
        const rows = document.querySelectorAll('.market-table tbody tr');
        rows.forEach(row => {
            if (Math.random() > 0.7) { // 30% chance to update
                const priceCell = row.querySelector('.price');
                const changeCell = row.querySelector('.change-col');
                const percentCell = row.querySelector('.percent-col');
                
                const currentPrice = parseFloat(priceCell.textContent);
                const fluctuation = (Math.random() * 5) - 2.5; // -2.5 to +2.5
                const newPrice = currentPrice + fluctuation;
                const change = newPrice - currentPrice;
                const percentChange = (change / currentPrice) * 100;
                
                priceCell.textContent = newPrice.toFixed(2);
                
                if (change >= 0) {
                    changeCell.className = 'positive';
                    changeCell.innerHTML = `${change.toFixed(2)} ▲`;
                    percentCell.className = 'positive';
                    percentCell.innerHTML = `+${percentChange.toFixed(2)}%`;
                } else {
                    changeCell.className = 'negative';
                    changeCell.innerHTML = `${Math.abs(change).toFixed(2)} ▼`;
                    percentCell.className = 'negative';
                    percentCell.innerHTML = `${percentChange.toFixed(2)}%`;
                }
            }
        });
    }, 3000);
}