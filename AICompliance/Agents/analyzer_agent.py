# analyzer_agent.py
import time
import random

class AnalyzerAgent:
    """
    Simulates the Analyzer Agent, responsible for analyzing detected anomalies,
    determining threat severity, and recommending responses.
    It simulates interaction with Azure Security Center.
    """

    def __init__(self, agent_id="Analyzer-001"):
        self.agent_id = agent_id
        self.status = "IDLE"
        self.analyses_completed = 0
        self.accuracy_rate = 95.0 # Starting accuracy
        print(f"{self.agent_id}: Initialized.")

    def start_analysis(self):
        """Simulates starting the analysis process."""
        if self.status == "PROCESSING":
            print(f"{self.agent_id}: Analysis is already processing.")
        else:
            self.status = "PROCESSING"
            print(f"{self.agent_id}: Analysis started.")

    def pause_analysis(self):
        """Simulates pausing the analysis process."""
        if self.status == "PROCESSING":
            self.status = "PAUSED"
            print(f"{self.agent_id}: Analysis paused.")
        else:
            print(f"{self.agent_id}: Analysis is not active or already paused.")

    def reset_analysis(self):
        """Simulates resetting the analysis process, clearing counts."""
        self.status = "IDLE"
        self.analyses_completed = 0
        self.accuracy_rate = 95.0
        print(f"{self.agent_id}: Analysis reset. Counts cleared.")

    def analyze_anomaly(self, anomaly_details):
        """
        Analyzes a given anomaly, determines severity, and recommends a response.
        Simulates threat classification, risk assessment, and response recommendation.
        """
        if self.status != "PROCESSING":
            print(f"{self.agent_id}: Not currently processing. Start analysis first.")
            return None

        self.analyses_completed += 1
        print(f"\n{self.agent_id}: Analyzing anomaly: '{anomaly_details}'...")

        # Simulate threat classification
        threat_types = ["Malware", "SQL Injection", "DDoS", "Zero Day", "Phishing"]
        threat_type = random.choice(threat_types)

        # Simulate risk assessment
        severity_levels = {"Low": 0.2, "Medium": 0.4, "High": 0.6, "Critical": 0.8}
        severity_label = random.choices(list(severity_levels.keys()), weights=list(severity_levels.values()), k=1)[0]
        risk_score = random.randint(1, 100)

        # Simulate response recommendation
        recommendations = [
            f"Isolate affected system immediately for {threat_type}.",
            f"Block source IP for {threat_type}.",
            f"Perform deep scan for {threat_type}.",
            f"Review user activity for {threat_type}."
        ]
        response_recommendation = random.choice(recommendations)

        # Simulate updating accuracy rate
        if random.random() < 0.05: # Small chance of accuracy dip
            self.accuracy_rate = max(90.0, self.accuracy_rate - random.uniform(0.1, 0.5))
        else:
            self.accuracy_rate = min(99.9, self.accuracy_rate + random.uniform(0.01, 0.1))

        analysis_result = {
            "timestamp": time.time(),
            "anomaly_details": anomaly_details,
            "threat_type": threat_type,
            "severity": severity_label,
            "risk_score": risk_score,
            "recommendation": response_recommendation,
            "analyses_completed": self.analyses_completed,
            "accuracy_rate": round(self.accuracy_rate, 2)
        }
        print(f"{self.agent_id}: Analysis complete. Threat: {threat_type} ({severity_label}), Risk: {risk_score}, Recommendation: {response_recommendation}")

        self._simulate_azure_security_center_update(analysis_result)
        return analysis_result

    def _simulate_azure_security_center_update(self, analysis_data):
        """
        Simulates pushing security recommendations/alerts to Azure Security Center.
        In a real scenario, this would use Azure SDKs.
        """
        print(f"{self.agent_id}: Updating Azure Security Center with recommendation (simulated): {analysis_data['recommendation']}")
        # Placeholder for actual Azure Security Center API call
        # Example: security_center_client.create_recommendation(analysis_data)

if __name__ == "__main__":
    analyzer = AnalyzerAgent()
    analyzer.start_analysis()

    sample_anomalies = [
        "Unusual login attempt from foreign IP.",
        "High volume of outbound network traffic.",
        "Unauthorized file access detected.",
        "Repeated failed database queries."
    ]

    for i, anomaly in enumerate(sample_anomalies):
        print(f"\n--- Analysis Cycle {i+1} ---")
        result = analyzer.analyze_anomaly(anomaly)
        if result:
            print(f"Current Analyses Completed: {analyzer.analyses_completed}, Accuracy Rate: {analyzer.accuracy_rate}%")
        time.sleep(1)

    analyzer.pause_analysis()
    analyzer.analyze_anomaly("Another anomaly (should be paused)") # Should show as paused

    analyzer.reset_analysis()
    analyzer.start_analysis()
    analyzer.analyze_anomaly("New anomaly after reset")
