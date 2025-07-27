import time
import random

class WatcherAgent:
    """
    Simulates the Watcher Agent, responsible for continuous monitoring,
    traffic analysis, behavioral pattern recognition, and threshold monitoring.
    It simulates sending data to Azure Log Analytics.
    """

    def __init__(self, agent_id="Watcher-001"):
        self.agent_id = agent_id
        self.status = "ACTIVE"
        self.events_processed = 0
        self.anomalies_detected = 0
        print(f"{self.agent_id}: Initialized.")

    def start_monitoring(self):
        """Simulates starting the monitoring process."""
        if self.status == "PAUSED":
            self.status = "ACTIVE"
            print(f"{self.agent_id}: Monitoring resumed.")
        elif self.status == "ACTIVE":
            print(f"{self.agent_id}: Monitoring is already active.")
        else:
            self.status = "ACTIVE"
            print(f"{self.agent_id}: Monitoring started.")

    def pause_monitoring(self):
        """Simulates pausing the monitoring process."""
        if self.status == "ACTIVE":
            self.status = "PAUSED"
            print(f"{self.agent_id}: Monitoring paused.")
        else:
            print(f"{self.agent_id}: Monitoring is not active or already paused.")

    def reset_monitoring(self):
        """Simulates resetting the monitoring process, clearing counts."""
        self.status = "PAUSED"
        self.events_processed = 0
        self.anomalies_detected = 0
        print(f"{self.agent_id}: Monitoring reset. Counts cleared.")

    def _simulate_traffic_analysis(self):
        """Simulates real-time traffic analysis."""
        self.events_processed += random.randint(50, 150)
        print(f"{self.agent_id}: Performing real-time traffic analysis...")

    def _simulate_behavioral_pattern_recognition(self):
        """Simulates behavioral pattern recognition for anomalies."""
        if random.random() < 0.1:  # 10% chance of detecting an anomaly
            self.anomalies_detected += 1
            anomaly_details = f"Anomaly detected! Current events processed: {self.events_processed}"
            print(f"{self.agent_id}: {anomaly_details}")
            return anomaly_details
        return None

    def _simulate_threshold_monitoring(self):
        """Simulates threshold monitoring for system performance."""
        cpu_usage = random.randint(30, 95)
        memory_usage = random.randint(40, 98)
        if cpu_usage > 90 or memory_usage > 95:
            alert_message = f"High resource usage alert! CPU: {cpu_usage}%, Memory: {memory_usage}%"
            print(f"{self.agent_id}: {alert_message}")
            return alert_message
        return None

    def _simulate_azure_log_analytics_ingestion(self, data):
        """
        Simulates ingesting monitoring data into Azure Log Analytics.
        In a real scenario, this would use Azure SDKs.
        """
        print(f"{self.agent_id}: Ingesting data to Azure Log Analytics (simulated): {data[:100]}...")
        # Placeholder for actual Azure Log Analytics API call
        # Example: log_client.upload_logs(workspace_id, shared_key, table_name, data)

    def run_cycle(self):
        """Runs a single cycle of monitoring activities."""
        if self.status == "ACTIVE":
            print(f"\n{self.agent_id}: Running monitoring cycle...")
            self._simulate_traffic_analysis()
            anomaly = self._simulate_behavioral_pattern_recognition()
            threshold_alert = self._simulate_threshold_monitoring()

            monitoring_data = {
                "timestamp": time.time(),
                "agent_id": self.agent_id,
                "events_processed": self.events_processed,
                "anomalies_detected": self.anomalies_detected,
                "latest_anomaly": anomaly,
                "latest_threshold_alert": threshold_alert
            }
            self._simulate_azure_log_analytics_ingestion(str(monitoring_data))
            print(f"{self.agent_id}: Cycle complete. Events Processed: {self.events_processed}, Anomalies Detected: {self.anomalies_detected}")
            return anomaly # Return anomaly for Analyzer Agent to pick up
        else:
            print(f"{self.agent_id}: Monitoring is {self.status}. Skipping cycle.")
            return None

if __name__ == "__main__":
    watcher = WatcherAgent()
    watcher.start_monitoring()

    for i in range(3):
        print(f"\n--- Monitoring Cycle {i+1} ---")
        watcher.run_cycle()
        time.sleep(1) # Simulate time passing

    watcher.pause_monitoring()
    watcher.run_cycle() # Should show as paused

    watcher.reset_monitoring()
    watcher.start_monitoring()
    watcher.run_cycle()
