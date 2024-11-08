#!/bin/bash

TARGET_URL="http://localhost:8080"

# Check if ZAP is running
if ! pgrep -f zap.sh > /dev/null; then
    /usr/share/owasp-zap/zap.sh -daemon -host 0.0.0.0 -port 8080 &
    sleep 30
fi

echo "Running ZAP security scan..."
curl "http://localhost:8080/JSON/spider/action/scan/?url=$TARGET_URL"
sleep 10
curl "http://localhost:8080/JSON/ascan/action/scan/?url=$TARGET_URL"
curl "http://localhost:8080/OTHER/core/other/htmlreport/" -o zap_report.html
echo "ZAP scan completed. Report available at zap_report.html"