import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socketClient = io("http://localhost:3000");

const Dashboard = () => {
    const [readings, updateReadings] = useState<Array<any>>([]);

    useEffect(() => {
        const handleIncomingData = (payload: any) => {
            updateReadings(prev => [...prev, payload]);
        };

        socketClient.on("sensor-data", handleIncomingData);

        return () => {
            socketClient.off("sensor-data", handleIncomingData);
        };
    }, []);

    return (
        <main style={{ padding: "2rem", textAlign: "center" }}>
            <h1>Dane z czujników - WebSocket</h1>
            <section>
                <h2>Historia pomiarów:</h2>
                {readings.map((entry, idx) => (
                    <div key={idx} style={{ marginBottom: "1.5rem" }}>
                        <p><strong>🌡️ Temperatura:</strong> {entry.temperature}°C</p>
                        <p><strong>💧 Wilgotność:</strong> {entry.humidity}%</p>
                        <p><strong>📈 Ciśnienie:</strong> {entry.pressure} hPa</p>
                        <hr />
                    </div>
                ))}
            </section>
        </main>
    );
};

export default Dashboard;
