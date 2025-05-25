(function () {
    let logs = []; // Array to store log messages

    // Override console.log to capture logs
    const originalLog = console.log;
    console.log = function (...args) {
        logs.push(`[${new Date().toISOString()}] ${args.map(arg => JSON.stringify(arg)).join(" ")}`);
        originalLog.apply(console, args);
    };

    function downloadLogsAsTXTandCSV() {
        try {
            window.collectedLogs = logs;

            const logString = logs.join('\n');
            const timestamp = new Date().toISOString().replace(/[:.]/g, "_");
            const baseFilename = `console_logs_${timestamp}`;

            // Save TXT
            const txtBlob = new Blob([logString], { type: 'text/plain' });
            const txtLink = document.createElement("a");
            txtLink.href = URL.createObjectURL(txtBlob);
            txtLink.download = `${baseFilename}.txt`;
            document.body.appendChild(txtLink);
            txtLink.click();
            document.body.removeChild(txtLink);

            // Convert to CSV: timestamp,message
            const csvHeader = "timestamp,message\n";
            const csvRows = logs.map(line => {
                const match = line.match(/^\[(.*?)\] (.*)$/);
                if (match) {
                    const [, timestamp, message] = match;
                    return `"${timestamp}","${message.replace(/"/g, '""')}"`;
                } else {
                    return `"","${line.replace(/"/g, '""')}"`; // fallback if format is off
                }
            });
            const csvContent = csvHeader + csvRows.join('\n');

            // Save CSV
            const csvBlob = new Blob([csvContent], { type: 'text/csv' });
            const csvLink = document.createElement("a");
            csvLink.href = URL.createObjectURL(csvBlob);
            csvLink.download = `${baseFilename}.csv`;
            document.body.appendChild(csvLink);
            csvLink.click();
            document.body.removeChild(csvLink);

        } catch (err) {
            console.error("downloadLogsAsTXTandCSV failed:", err);
        }
    }

    // Expose function globally
    window.downloadConsoleLogs = downloadLogsAsTXTandCSV;
})();
