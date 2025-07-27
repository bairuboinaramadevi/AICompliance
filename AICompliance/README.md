# AI Compliance Dashboard Application

## Overview

The AI Compliance Dashboard is a robust application designed to provide a comprehensive, real-time overview of system health, security posture, and AI agent operations. It offers deep insights into threat detection, resource utilization, and seamless integration with Microsoft Azure cloud services. This application empowers administrators and security personnel to proactively monitor, analyze, and remediate security threats, ensuring continuous system integrity and compliance.

## Features

Our application is structured around several key modules, each providing specialized functionalities:

### Command Center (Dashboard)
* **High-Level System Overview**: Get an immediate snapshot of crucial metrics like Threats Detected, Threats Blocked, CPU Usage, and Memory Usage.
* **Visual Performance Chart**: A dynamic bar chart illustrating system performance across various components (CPU, Memory, Disk, Network, Processes) for quick trend identification.
* **Agent Status at a Glance**: Quickly verify the operational status (ACTIVE/PAUSED/PROCESSING) of core AI agents.
* **Overall System Health**: Prominent indicators confirm the system's operational status as "NORMAL" and "System Operational."

### Agent Hub
* **Detailed Agent Insights**: Dive into the specifics of each AI agent's performance and output.
* **Watcher Agent**: Monitors application behavior and network traffic, showcasing "Events Processed" and "Anomalies Detected."
* **Analyzer Agent**: Analyzes detected anomalies, providing "Analyses Completed" and "Accuracy Rate" for threat assessment.
* **Remediator Agent**: Executes automated responses, detailing "Actions Executed" and "Success Rate" for threat mitigation.
* **Real-time Status**: Each agent's current operational state is clearly displayed.

### Azure Services Integration
* **Seamless Azure Connectivity**: View the status and key metrics of integrated Microsoft Azure security services.
* **Azure Sentinel**: Tracks active security alerts and incidents within your cloud environment.
* **Azure Security Center**: Displays security recommendations and your current Secure Score to guide improvements.
* **Azure Log Analytics**: Shows data ingestion volume and daily query counts, indicating monitoring activity.
* **Azure Key Vault**: Manages and displays the number of secrets and certificates, highlighting secure credential handling.
* **Synchronization**: Option to sync data for real-time updates from Azure.

### Threat Simulator
* **Proactive Security Testing**: Simulate various types of cyberattacks to test the system's defensive capabilities.
* **Configurable Simulations**: Initiate simulations for DDoS Attack, SQL Injection, Malware, and Zero Day exploits with adjustable severity levels.
* **Recent Threat Events Log**: A chronological record of all executed simulations, including attack type, timestamp, and severity, for validation.
* **Azure Connection Tab**: Displays the connection status (CONNECTED/DISCONNECTED) to critical Azure security services like Sentinel, Security Center, and Log Analytics, ensuring the simulator's integration with your cloud environment.

### Threat Logs
* **Comprehensive Audit Trail**: A detailed, real-time log of all detected suspicious activities and threats.
* **Detailed Threat Information**: Each entry provides the Threat Type, Severity, Timestamp, Description, Source/Target IPs, and Status (Blocked/Investigating).
* **Rapid Incident Review**: Enables quick understanding and response to emerging threats.

### Agent Actions (Agent Control Center)
* **Granular Agent Control**: Directly manage the operational state of each AI Compliance agent.
* **Start/Pause/Reset Controls**: Independently control the Watcher, Analyzer, and Remediator agents.
* **Live Activity Monitoring**: View the current activity description for each agent (e.g., "Ready to resume," "Analyzing threat patterns," "Monitoring high-priority threats").
* **Live Activity Monitoring**: View the current activity description for each agent (e.g., "Ready to resume," "Analyzing threat patterns," "Monitoring high-priority threats").

### Digital Twin
* **Virtual System Replica**: A real-time, mirrored view of your application's health and performance.
* **Key Performance Indicators**: Displays overall "Application Health," "Response Time," "Error Rate," and "Throughput."
* **Real-time Application Mirror**: Visual representation of critical application components (Web Server, Database, API Gateway) with their individual health statuses (e.g., "Normal," "Warning").
* **Proactive Issue Identification**: Allows for early detection of potential issues in specific components before they impact the overall system.

## How Digital Twin Works

The Digital Twin feature creates a dynamic virtual replica of your live application. This replica is continuously updated with real-time data from the physical system, providing an accurate, up-to-the-minute representation. This mirroring enables deep analysis, performance monitoring, and even hypothetical scenario testing without affecting the live application. It facilitates proactive identification of anomalies, bottlenecks, or potential failures in specific components, allowing for targeted intervention and predictive maintenance before critical issues arise.

## Guide to Test Your Application

To test this application, you would typically follow these steps, assuming a deployed environment:

### Prerequisites
* A running instance of the AI Compliance Dashboard application.
* Access credentials for the application (if authentication is implemented).
* (For full Azure integration testing): An active Azure subscription with configured Azure Sentinel, Security Center, Log Analytics, and Key Vault services.
* (For agent testing): Python environment set up to run the provided agent scripts (though they are simulations in this context).

### Testing Steps

1.  **Dashboard Overview (Command Center)**
    * Navigate to the main dashboard screen.
    * Observe the "Threats Detected" and "Threats Blocked" metrics to see if they update (if dynamic).
    * Check CPU and Memory Usage indicators.
    * Verify the "System Performance" chart visually represents resource allocation.
    * Confirm that all agent statuses (Watcher, Analyzer, Remediator) show as "ACTIVE" or their appropriate state.
    * Ensure the "Overall Status" displays "NORMAL."

2.  **Agent Hub Tab**
    * Click on the "Agent Hub" tab in the navigation.
    * For each agent (Watcher, Analyzer, Remediator), verify that the "Status" is correctly displayed.
    * Check if the "Events Processed," "Analyses Completed," and "Actions Executed" counts update over time (if dynamic).
    * Verify "Accuracy Rate" for Analyzer and "Success Rate" for Remediator are as expected.

3.  **Azure Services Integration Page**
    * Navigate to the "Azure Services Integration" page.
    * Verify that the "Status" for Azure Sentinel, Security Center, Log Analytics, and Key Vault shows "CONNECTED."
    * Observe if the metrics (Alerts, Incidents, Recommendations, Secure Score, Data Ingestion, Queries, Secrets, Certificates) are displayed and appear consistent with mock or real data.
    * If a "Sync" button is available, click it and observe any changes or confirmations.

4.  **Threat Simulator**
    * Go to the "Threat Simulator" page.
    * In "Threat Simulation Controls," select an attack type (e.g., "SQL Injection") and severity.
    * Click the "Simulate" button (if available) or trigger the simulation.
    * Observe the "Recent Threat Events" log for the newly simulated event entry.
    * Navigate to the "Azure Connection" sub-tab (if part of this section).
    * Verify all Azure services (Sentinel, Security Center, Log Analytics) show "CONNECTED" status and details.
    * Click "Test Connection" for each service and confirm successful connection messages.

5.  **Threat Logs**
    * Access the "Threat Logs" page.
    * Review the table to ensure new threat entries appear after simulated attacks or real system activity (if integrated).
    * Verify that all columns (Threat Type, Severity, Timestamp, Description, Source/Target, Status) are populated correctly.
    * Check if the "Status" column updates (e.g., from "Investigating" to "Blocked").

6.  **Agent Actions Tab**
    * Go to the "Agent Actions" tab (or "Agent Control Center").
    * For each agent, try changing its status (e.g., from ACTIVE to PAUSED, then back to ACTIVE).
    * Confirm that the status indicator changes accordingly.
    * Verify that the "Current Activity" description updates based on the agent's state.
    * Test the "Reset" functionality for each agent.

7.  **Digital Twin Page**
    * Open the "Digital Twin" page.
    * Observe the "Digital Twin Status" metrics (Application Health, Response Time, Error Rate, Throughput).
    * In the "Real-time Application Mirror," check the status of each component (Web Server, Database, API Gateway). Look for changes from "Normal" to "Warning" or "Critical" if any issues are simulated or occur.

### Testing the Flask Application

If your application's front-end is served by a Flask backend, follow these steps to run and test it:

#### Prerequisites for Flask App
* Python 3.x installed.
* `pip` (Python package installer).
* Flask library installed.

#### Setup and Running the Flask App

1.  **Create a Flask Application File**:
    Copy or Download the code in your sytem and go to CMD.

2.  **Install Flask**:
    If you haven't already, install Flask in your Python environment:
    ```bash
    pip install Flask
    ```

3.  **Place HTML Files**:
    Create a folder named `templates` in the same directory as your `app.py` file. Place your main HTML file (e.g., the dashboard HTML you provided earlier) inside this `templates` folder and name it `index.html`.

4.  **Run the Flask Application**:
    Open your terminal or command prompt, navigate to the directory where `app.py` is located, and run:
    ```bash
    python app.py
    ```
    You should see output indicating that the Flask development server is running, typically on `http://127.0.0.1:5000/` or `http://localhost:5000/`.

5.  **Access the Application**:
    Open your web browser and go to the address provided by the Flask server (e.g., `http://127.0.0.1:5000/`). You should see your AI Compliance Dashboard.

6.  **Interact and Test**:
    * **Dashboard**: The metrics on the dashboard (Threats Detected, Blocked, Agent Statuses) would ideally be populated by calls to your Flask backend (e.g., `/api/dashboard_metrics`). You'd need JavaScript in your `index.html` to fetch this data periodically.
    * **Agent Hub**: Similarly, the Agent Hub details would be fetched from an API endpoint like `/api/agent_hub_details`.
    * **Threat Simulator**: When you trigger a simulation from the UI, your JavaScript would send a POST request to an endpoint like `/api/simulate_threat`. The Flask app would then log this or potentially trigger your simulated agents.
    * **Agent Actions**: When you click "Start," "Pause," or "Reset" for an agent in the UI, JavaScript would send a POST request to `/api/agent_action` to update the agent's state via the Flask backend.

### Testing the Simulated Agents (Python Files)

The provided Python files (`watcher_agent.py`, `analyzer_agent.py`, `remediator_agent.py`) are command-line simulations.

1.  **Save the Files**: Save each code block as a `.py` file (e.g., `watcher_agent.py`).
2.  **Run from Terminal**: Open your terminal or command prompt.
3.  **Execute Each Agent**:
    * `python watcher_agent.py`
    * `python analyzer_agent.py`
    * `python remediator_agent.py`
4.  **Observe Output**: Watch the console output for each agent. You will see print statements simulating their actions, detected anomalies, analysis results, and remediation steps, along with their simulated interactions with Azure services. These outputs will reflect the "Events Processed," "Anomalies Detected," "Analyses Completed," and "Actions Executed," and their respective statuses as seen in the application's UI.

This setup allows you to run your front-end and a basic backend together, demonstrating how the UI would interact with the underlying agent logic and data.