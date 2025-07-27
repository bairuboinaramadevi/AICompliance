// Global variables
var currentData = {};
var updateInterval;
var dummyLogs = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    updateStatus();
    startRealTimeUpdates();
    generateDummyLogs();
    updateLogsGrid();
});

// Generate dummy threat logs
function generateDummyLogs() {
    var threatTypes = ['DDoS Attack', 'SQL Injection', 'Malware Detection', 'Phishing Attempt', 'Brute Force', 'Zero Day Exploit', 'Data Breach', 'Ransomware'];
    var severities = ['low', 'medium', 'high', 'critical'];
    var sources = ['192.168.1.45', '10.0.0.23', '172.16.0.8', '203.0.113.5', '198.51.100.14'];
    
    dummyLogs = [];
    
    for (var i = 0; i < 50; i++) {
        var now = new Date();
        var logTime = new Date(now.getTime() - (Math.random() * 24 * 60 * 60 * 1000)); // Random time in last 24 hours
        
        var log = {
            id: 'log_' + i,
            timestamp: logTime,
            type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
            severity: severities[Math.floor(Math.random() * severities.length)],
            source: sources[Math.floor(Math.random() * sources.length)],
            target: 'web-app-server',
            description: 'Detected suspicious activity from external source',
            status: Math.random() > 0.3 ? 'blocked' : 'investigating'
        };
        
        dummyLogs.push(log);
    }
    
    // Sort by timestamp (newest first)
    dummyLogs.sort(function(a, b) {
        return b.timestamp - a.timestamp;
    });
}

// Update logs grid
function updateLogsGrid() {
    var logsGrid = document.getElementById('threat-logs-grid');
    if (!logsGrid) return;
    
    logsGrid.innerHTML = '';
    
    for (var i = 0; i < dummyLogs.length; i++) {
        var log = dummyLogs[i];
        var logCard = document.createElement('div');
        logCard.className = 'log-card';
        
        logCard.innerHTML = 
            '<div class="log-header">' +
                '<span class="log-severity ' + log.severity + '">' + log.severity.toUpperCase() + '</span>' +
                '<span class="log-time">' + log.timestamp.toLocaleString() + '</span>' +
            '</div>' +
            '<div class="log-content">' +
                '<strong>' + log.type + '</strong><br>' +
                log.description +
            '</div>' +
            '<div class="log-details">' +
                'Source: ' + log.source + ' → Target: ' + log.target + '<br>' +
                'Status: ' + log.status.charAt(0).toUpperCase() + log.status.slice(1) +
            '</div>';
        
        logsGrid.appendChild(logCard);
    }
}

// Show threat sub-tab
function showThreatTab(tabName) {
    // Hide all threat sub-tabs
    var threatTabs = document.querySelectorAll('.threat-tab-content');
    for (var i = 0; i < threatTabs.length; i++) {
        threatTabs[i].classList.remove('active');
    }
    
    // Show selected threat sub-tab
    var selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Update nav buttons
    var navButtons = document.querySelectorAll('.threat-nav-btn');
    for (var i = 0; i < navButtons.length; i++) {
        navButtons[i].classList.remove('active');
    }
    
    // Find and activate the correct nav button
    var clickedButton = event.target;
    clickedButton.classList.add('active');
    
    // Update logs grid if logs tab is selected
    if (tabName === 'logs') {
        updateLogsGrid();
    }
}

// Test Azure connection
function testAzureConnection(service) {
    var statusElement = document.getElementById(service + '-conn-status');
    var syncElement = document.getElementById(service + '-last-sync');
    
    // Simulate connection test
    statusElement.textContent = 'Testing...';
    statusElement.className = 'connection-status testing';
    statusElement.style.background = 'rgba(234, 179, 8, 0.2)';
    statusElement.style.color = '#eab308';
    
    setTimeout(function() {
        var success = Math.random() > 0.1; // 90% success rate
        
        if (success) {
            statusElement.textContent = 'Connected';
            statusElement.className = 'connection-status connected';
            statusElement.style.background = 'rgba(34, 197, 94, 0.2)';
            statusElement.style.color = '#22c55e';
            syncElement.textContent = new Date().toLocaleString();
            showNotification('Azure ' + service + ' connection test successful');
        } else {
            statusElement.textContent = 'Failed';
            statusElement.className = 'connection-status disconnected';
            statusElement.style.background = 'rgba(239, 68, 68, 0.2)';
            statusElement.style.color = '#ef4444';
            showNotification('Azure ' + service + ' connection test failed');
        }
    }, 2000);
}

// Control agent actions
function controlAgent(agentName, action) {
    var statusElement = document.getElementById(agentName + '-control-status');
    var activityElement = document.getElementById(agentName + '-activity');
    
    var activities = {
        watcher: {
            start: [
                '• Monitoring network traffic patterns',
                '• Analyzing user behavior anomalies',
                '• Scanning for suspicious connections',
                '• Real-time threat detection active'
            ],
            pause: [
                '• Monitoring paused',
                '• Maintaining current threat database',
                '• Ready to resume on command'
            ],
            reset: [
                '• Resetting monitoring parameters',
                '• Clearing temporary data',
                '• Reinitializing detection algorithms'
            ]
        },
        analyzer: {
            start: [
                '• Analyzing threat patterns from Watcher',
                '• Calculating risk scores',
                '• Generating response recommendations',
                '• Machine learning models active'
            ],
            pause: [
                '• Analysis paused',
                '• Maintaining current assessments',
                '• Ready to resume processing'
            ],
            reset: [
                '• Resetting analysis parameters',
                '• Clearing analysis cache',
                '• Reinitializing ML models'
            ]
        },
        remediator: {
            start: [
                '• Active remediation mode enabled',
                '• Monitoring for high-priority threats',
                '• Ready to execute countermeasures',
                '• Automated response systems online'
            ],
            pause: [
                '• Remediation paused',
                '• Manual approval required for actions',
                '• Monitoring system health'
            ],
            reset: [
                '• Resetting remediation protocols',
                '• Clearing action queue',
                '• Reinitializing response systems'
            ]
        }
    };
    
    // Update status
    var statusText = action === 'start' ? 'Active' : 
                    action === 'pause' ? 'Paused' : 'Resetting';
    statusElement.textContent = statusText;
    
    // Update activity log
    var activityLog = activityElement.querySelector('.activity-log');
    activityLog.innerHTML = '';
    
    var agentActivities = activities[agentName][action];
    for (var i = 0; i < agentActivities.length; i++) {
        var p = document.createElement('p');
        p.textContent = agentActivities[i];
        activityLog.appendChild(p);
    }
    
    showNotification(agentName.charAt(0).toUpperCase() + agentName.slice(1) + ' agent ' + action + ' command executed');
    
    // Reset status after reset action
    if (action === 'reset') {
        setTimeout(function() {
            statusElement.textContent = 'Active';
            controlAgent(agentName, 'start');
        }, 3000);
    }
}

// Tab switching functionality
function showTab(tabName) {
    // Hide all tabs
    var tabs = document.querySelectorAll('.tab-content');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Update nav buttons
    var navButtons = document.querySelectorAll('.nav-btn');
    for (var i = 0; i < navButtons.length; i++) {
        navButtons[i].classList.remove('active');
    }
    
    // Find and activate the correct nav button
    var navButtons = document.querySelectorAll('.nav-btn');
    for (var i = 0; i < navButtons.length; i++) {
        if (navButtons[i].textContent.toLowerCase().indexOf(tabName.toLowerCase()) !== -1) {
            navButtons[i].classList.add('active');
            break;
        }
    }
}

// Update system status
function updateStatus() {
    fetch('/api/status')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            currentData = data;
            updateUI(data);
        })
        .catch(function(error) {
            console.error('Error fetching status:', error);
        });
}

// Update UI with current data
function updateUI(data) {
    // Update threat level
    updateThreatLevel(data.threat_level);
    
    // Update metrics
    updateMetrics(data.system_metrics);
    
    // Update agent statuses
    updateAgentStatuses(data.agents);
    
    // Update digital twin
    updateDigitalTwin(data.digital_twin);
    
    // Update Azure services
    updateAzureServices(data.azure_services);
}

// Update threat level indicator
function updateThreatLevel(level) {
    var threatStatus = document.getElementById('threat-status');
    var threatLevel = document.getElementById('threat-level');
    
    // Remove existing classes
    threatStatus.className = 'threat-status';
    
    // Add appropriate class and update text
    threatStatus.classList.add(level);
    threatLevel.textContent = level.toUpperCase();
}

// Update system metrics
function updateMetrics(metrics) {
    var elements = {
        'threats-detected': 17,
        'threats-blocked': 6,
        'cpu-usage': Math.round(metrics.cpu_usage),
        'memory-usage': Math.round(metrics.memory_usage)
    };
    
    for (var id in elements) {
        var element = document.getElementById(id);
        if (element) {
            element.textContent = elements[id];
        }
    }
    
    // Update chart bars with animation
    updatePerformanceChart(metrics);
}

// Update performance chart
function updatePerformanceChart(metrics) {
    var bars = document.querySelectorAll('.chart-bars .bar');
    var values = [
        metrics.cpu_usage,
        metrics.memory_usage,
        metrics.network_traffic / 50, // Scale down for visualization
        metrics.active_connections / 20, // Scale down for visualization
        Math.random() * 80 + 20 // Random value for demo
    ];
    
    for (var i = 0; i < bars.length && i < values.length; i++) {
        bars[i].style.height = Math.min(100, Math.max(10, values[i])) + '%';
    }
}

// Update agent statuses
function updateAgentStatuses(agents) {
    var agentItems = document.querySelectorAll('#agent-status-list .agent-item');
    var agentNames = ['watcher', 'analyzer', 'remediator'];
    
    for (var i = 0; i < agentItems.length && i < agentNames.length; i++) {
        var agentName = agentNames[i];
        var agent = agents[agentName];
        if (agent) {
            var statusElement = agentItems[i].querySelector('.agent-status');
            statusElement.className = 'agent-status ' + agent.status;
            statusElement.textContent = agent.status.charAt(0).toUpperCase() + agent.status.slice(1);
        }
    }
    
    // Update agent cards in agents tab
    updateAgentCards(agents);
}

// Update agent cards
function updateAgentCards(agents) {
    var agentCards = document.querySelectorAll('.agent-card');
    var agentNames = ['watcher', 'analyzer', 'remediator'];
    
    for (var i = 0; i < agentCards.length && i < agentNames.length; i++) {
        var agentName = agentNames[i];
        var agent = agents[agentName];
        if (agent) {
            var statusElement = agentCards[i].querySelector('.agent-status');
            statusElement.className = 'agent-status ' + agent.status;
            statusElement.textContent = agent.status.charAt(0).toUpperCase() + agent.status.slice(1);
        }
    }
}

// Update digital twin metrics
function updateDigitalTwin(twin) {
    var elements = {
        'app-health': twin.application_health,
        'app-health-value': Math.round(twin.application_health),
        'response-time': Math.round(twin.response_time),
        'error-rate': twin.error_rate.toFixed(2),
        'throughput': Math.round(twin.throughput)
    };
    
    for (var id in elements) {
        var element = document.getElementById(id);
        if (element) {
            if (id === 'app-health') {
                element.style.width = elements[id] + '%';
            } else {
                element.textContent = elements[id];
            }
        }
    }
    
    // Update twin nodes based on health
    updateTwinNodes(twin);
}

// Update twin visualization nodes
function updateTwinNodes(twin) {
    var nodes = document.querySelectorAll('.twin-node');
    var healthThreshold = 80;
    
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var statusElement = node.querySelector('.node-status');
        
        if (twin.application_health > healthThreshold) {
            node.classList.add('active');
            statusElement.textContent = '✅ Healthy';
            statusElement.style.color = '#22c55e';
        } else {
            node.classList.remove('active');
            statusElement.textContent = '⚠️ Warning';
            statusElement.style.color = '#eab308';
        }
    }
}

// Update Azure services
function updateAzureServices(services) {
    var serviceMap = {
        'sentinel': {
            'sentinel-alerts': 'alerts',
            'sentinel-incidents': 'incidents'
        },
        'security_center': {
            'security-recommendations': 'recommendations',
            'secure-score': 'secure_score'
        },
        'log_analytics': {
            'log-ingestion': 'data_ingestion',
            'log-queries': 'queries_today'
        },
        'key_vault': {
            'vault-secrets': 'secrets',
            'vault-certificates': 'certificates'
        }
    };
    
    for (var serviceName in serviceMap) {
        var service = services[serviceName];
        if (service) {
            var mappings = serviceMap[serviceName];
            for (var elementId in mappings) {
                var element = document.getElementById(elementId);
                if (element) {
                    var value = service[mappings[elementId]];
                    if (typeof value === 'number') {
                        element.textContent = value.toLocaleString();
                    } else {
                        element.textContent = value;
                    }
                }
            }
        }
    }
}

// Simulate threat
function simulateThreat(type, severity) {
    var payload = {
        type: type,
        severity: severity
    };
    
    fetch('/api/simulate_threat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        if (data.status === 'success') {
            addThreatEvent(data.threat);
            showNotification('Threat simulated: ' + type + ' (' + severity + ')');
        }
    })
    .catch(function(error) {
        console.error('Error simulating threat:', error);
    });
}

// Add threat event to log
function addThreatEvent(threat) {
    var eventList = document.getElementById('threat-events');
    var eventItem = document.createElement('div');
    eventItem.className = 'event-item';
    
    var timestamp = new Date(threat.timestamp).toLocaleString();
    
    eventItem.innerHTML = 
        '<div class="event-time">' + timestamp + '</div>' +
        '<div class="event-type">' + threat.description + '</div>' +
        '<div class="event-status ' + threat.severity + '">' + threat.severity.toUpperCase() + '</div>';
    
    eventList.insertBefore(eventItem, eventList.firstChild);
    
    // Keep only last 10 events
    var events = eventList.querySelectorAll('.event-item');
    if (events.length > 10) {
        eventList.removeChild(events[events.length - 1]);
    }
}

// Sync Azure service
function syncAzureService(service) {
    var payload = { service: service };
    
    fetch('/api/azure_sync', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        if (data.status === 'success') {
            showNotification('Azure service synchronized: ' + service);
            updateStatus(); // Refresh status
        }
    })
    .catch(function(error) {
        console.error('Error syncing Azure service:', error);
    });
}

// Show notification
function showNotification(message) {
    // Create notification element
    var notification = document.createElement('div');
    notification.style.cssText = 
        'position: fixed; top: 20px; right: 20px; background: rgba(59, 130, 246, 0.9); ' +
        'color: white; padding: 15px 20px; border-radius: 8px; z-index: 1000; ' +
        'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); font-weight: 500;';
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(function() {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Start real-time updates
function startRealTimeUpdates() {
    updateInterval = setInterval(updateStatus, 3000);
}

// Stop real-time updates
function stopRealTimeUpdates() {
    if (updateInterval) {
        clearInterval(updateInterval);
    }
}

// Navigation event listeners
document.addEventListener('DOMContentLoaded', function() {
    var navButtons = document.querySelectorAll('.nav-btn');
    for (var i = 0; i < navButtons.length; i++) {
        navButtons[i].addEventListener('click', function() {
            var tabName = this.textContent.toLowerCase().replace(/[^a-z]/g, '');
            
            // Map button text to tab IDs
            var tabMap = {
                'commandcenter': 'dashboard',
                'agenthub': 'agents',
                'threatsimulator': 'threats',
                'digitaltwin': 'twin',
                'azureintegration': 'azure'
            };
            
            var targetTab = tabMap[tabName] || tabName;
            showTab(targetTab);
        });
    }
});

// Page visibility handling
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopRealTimeUpdates();
    } else {
        startRealTimeUpdates();
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    stopRealTimeUpdates();
});