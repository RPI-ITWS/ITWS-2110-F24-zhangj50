#!/bin/bash

TARGET_URL="zhangj50.eastus.cloudapp.azure.com"
ZAP_HOST="localhost:8080"

# Check if ZAP is running
echo "Checking if ZAP is running..."
if ! pgrep -f zap.sh > /dev/null; then
    echo "Starting ZAP..."
    /usr/share/owasp-zap/zap.sh -daemon -host 0.0.0.0 -port 8080 &
    sleep 30
fi

echo "Running ZAP security scan..."
response=$(curl -s -w "%{http_code}" -o /dev/null "http://$ZAP_HOST/JSON/spider/action/scan/?url=$TARGET_URL")
if [ "$response" -ne 200 ]; then
    echo "Failed to initiate scan, received HTTP code $response"
else
    echo "Scan initiated successfully!"
fi

sleep 10
response=$(curl -s -w "%{http_code}" -o /dev/null "http://$ZAP_HOST/JSON/ascan/action/scan/?url=$TARGET_URL")
if [ "$response" -ne 200 ]; then
    echo "Failed to start active scan, received HTTP code $response"
else
    echo "Active scan started successfully!"
fi

response=$(curl -s "http://$ZAP_HOST/OTHER/core/other/htmlreport/" -o zap_report.html)
if [ $? -eq 0 ]; then
    echo "ZAP scan completed. Report saved as zap_report.html"
else
    echo "Error generating report."
fi