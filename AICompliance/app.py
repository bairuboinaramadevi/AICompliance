from flask import Flask, render_template, jsonify, request
import json
import random
import time
from datetime import datetime, timedelta
import threading
from Agents.watcher_agent import WatcherAgent
from Agents.analyzer_agent import AnalyzerAgent
from Agents.remediator_agent import RemediatorAgent


app = Flask(__name__)

# Global state for the application
app_state = {
    'threat_level': 'normal',
    'agents': {
        'watcher': {'status': 'active', 'last_update': datetime.now()},
        'analyzer': {'status': 'active', 'last_update': datetime.now()},
        'remediator': {'status': 'standby', 'last_update': datetime.now()}
    },
    'system_metrics': {
        'cpu_usage': 45,
        'memory_usage': 62,
        'network_traffic': 1250,
        'active_connections': 847,
        'threats_detected': 0,
        'threats_blocked': 0
    },
    'threats': [],
    'azure_services': {
        'sentinel': {
            'name': 'Azure Sentinel',
            'status': 'connected',
            'last_sync': datetime.now(),
            'alerts': 23,
            'incidents': 5
        },
        'security_center': {
            'name': 'Azure Security Center',
            'status': 'connected',
            'last_sync': datetime.now(),
            'recommendations': 12,
            'secure_score': 85
        },
        'log_analytics': {
            'name': 'Azure Log Analytics',
            'status': 'connected',
            'last_sync': datetime.now(),
            'data_ingestion': '2.5GB',
            'queries_today': 1847
        },
        'key_vault': {
            'name': 'Azure Key Vault',
            'status': 'connected',
            'last_sync': datetime.now(),
            'secrets': 45,
            'certificates': 8
        }
    },
    'digital_twin': {
        'application_health': 95,
        'response_time': 150,
        'error_rate': 0.02,
        'throughput': 1200,
        'security_score': 88
    }
}

def call_agents():
    WatcherAgent()
    AnalyzerAgent()
    RemediatorAgent()

def update_metrics():
    """Background task to update system metrics"""
    while True:
        time.sleep(3)
        with app.app_context():
            metrics = app_state['system_metrics']
            metrics['cpu_usage'] = max(10, min(90, metrics['cpu_usage'] + random.uniform(-5, 5)))
            metrics['memory_usage'] = max(20, min(95, metrics['memory_usage'] + random.uniform(-2, 2)))
            metrics['network_traffic'] = max(100, metrics['network_traffic'] + random.uniform(-100, 100))
            metrics['active_connections'] = max(100, metrics['active_connections'] + random.randint(-25, 25))
            
            # Update digital twin metrics
            twin = app_state['digital_twin']
            twin['application_health'] = max(70, min(100, twin['application_health'] + random.uniform(-1, 1)))
            twin['response_time'] = max(50, min(500, twin['response_time'] + random.uniform(-10, 10)))
            twin['error_rate'] = max(0, min(5, twin['error_rate'] + random.uniform(-0.01, 0.01)))
            twin['throughput'] = max(500, twin['throughput'] + random.uniform(-50, 50))

# Start background metrics update
metrics_thread = threading.Thread(target=update_metrics, daemon=True)
metrics_thread.start()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/status')
def get_status():
    return jsonify({
        'threat_level': app_state['threat_level'],
        'agents': {k: {**v, 'last_update': v['last_update'].isoformat()} for k, v in app_state['agents'].items()},
        'system_metrics': app_state['system_metrics'],
        'azure_services': {k: {**v, 'last_sync': v['last_sync'].isoformat()} for k, v in app_state['azure_services'].items()},
        'digital_twin': app_state['digital_twin']
    })

@app.route('/api/simulate_threat', methods=['POST'])
def simulate_threat():
    data = request.json
    threat_type = data.get('type', 'unknown')
    severity = data.get('severity', 'low')
    
    # Create threat event
    threat = {
        'id': f'threat_{int(time.time())}',
        'type': threat_type,
        'severity': severity,
        'timestamp': datetime.now().isoformat(),
        'description': f'Simulated {threat_type} attack detected',
        'source': f'192.168.1.{random.randint(1, 255)}',
        'target': 'web-app-server',
        'status': 'detected'
    }
    
    app_state['threats'].append(threat)
    app_state['threat_level'] = severity
    app_state['system_metrics']['threats_detected'] += 1
    
    # Update agent statuses
    app_state['agents']['watcher']['status'] = 'alert'
    app_state['agents']['analyzer']['status'] = 'processing'
    app_state['agents']['remediator']['status'] = 'active'
    
    # Schedule automatic resolution
    def resolve_threat():
        time.sleep(5)
        app_state['system_metrics']['threats_blocked'] += 1
        app_state['threat_level'] = 'normal'
        for agent in app_state['agents'].values():
            agent['status'] = 'active'
            agent['last_update'] = datetime.now()
    
    threading.Thread(target=resolve_threat, daemon=True).start()
    
    return jsonify({'status': 'success', 'threat': threat})

@app.route('/api/threats')
def get_threats():
    return jsonify(app_state['threats'][-10:])  # Return last 10 threats

@app.route('/api/azure_sync', methods=['POST'])
def azure_sync():
    service = request.json.get('service')
    if service in app_state['azure_services']:
        app_state['azure_services'][service]['last_sync'] = datetime.now()
        app_state['azure_services'][service]['status'] = 'connected'
        return jsonify({'status': 'success', 'message': f'{service} synchronized successfully'})
    return jsonify({'status': 'error', 'message': 'Service not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)