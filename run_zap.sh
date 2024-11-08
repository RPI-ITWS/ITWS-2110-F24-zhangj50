#!/bin/bash

# Variables
TARGET_URL="http://zhangj50.eastus.cloudapp.azure.com"
ZAP_API_KEY="123"  # Replace this with your actual API key
ZAP_HOST="localhost"
ZAP_PORT="8080"
REPORT_FILE="zap_report.html"

# Check if ZAP is running; if not, start it
if ! pgrep -f zap.sh > /dev/null; then
    echo "Starting OWASP ZAP in daemon mode..."
    /usr/share/owasp-zap/zap.sh -daemon -host $ZAP_HOST -port $ZAP_PORT -config api.key=$ZAP_API_KEY &
    sleep 30  # Allow ZAP to initialize
fi

# Check if ZAP is ready
echo "Checking if OWASP ZAP is ready..."
for i in {1..10}; do
    STATUS=$(curl -s "http://$ZAP_HOST:$ZAP_PORT/JSON/core/view/version/?apikey=$ZAP_API_KEY" | grep -o "ZAP")
    if [ "$STATUS" == "ZAP" ]; then
        echo "OWASP ZAP is ready!"
        break
    else
        echo "Waiting for OWASP ZAP to start... Attempt $i"
        sleep 5
    fi
done

# Start the spider scan
echo "Initiating spider scan on $TARGET_URL..."
curl "http://$ZAP_HOST:$ZAP_PORT/JSON/spider/action/scan/?apikey=$ZAP_API_KEY&url=$TARGET_URL"
sleep 10  # Wait for the spider scan to initiate

# Start the active scan
echo "Initiating active scan on $TARGET_URL..."
curl "http://$ZAP_HOST:$ZAP_PORT/JSON/ascan/action/scan/?apikey=$ZAP_API_KEY&url=$TARGET_URL"
sleep 30  # Wait for the active scan to run

# Generate the HTML report
echo "Generating ZAP report..."
curl "http://$ZAP_HOST:$ZAP_PORT/OTHER/core/other/htmlreport/?apikey=$ZAP_API_KEY" -o $REPORT_FILE

if [ -f "$REPORT_FILE" ]; then
    echo "ZAP scan completed. Report generated: $REPORT_FILE"
else
    echo "Failed to generate ZAP report."
fi

# Optional: Stop ZAP daemon after scan
echo "Stopping OWASP ZAP..."
curl "http://$ZAP_HOST:$ZAP_PORT/JSON/core/action/shutdown/?apikey=$ZAP_API_KEY"
