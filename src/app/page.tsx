"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import type SocketIOClient from "socket.io-client";

export default function LandingPage() {
  
    const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
    const [socketReady, setSocketReady] = useState(false);
    const server_url = "http://localhost:5000";
          
    useEffect(() => {
        if(!server_url) return;

        const SocketInstance = io(server_url);

        SocketInstance.on("connect", () => {
          console.log("connected");
            setSocket(SocketInstance);
            setSocketReady(true);
        });

        return () => {
            if(server_url && SocketInstance) SocketInstance.disconnect();
        }
    }, [server_url]);

    const emitData = {
      OrderType: "BUY",
      Price: 1000,
      Token: "AGRW",
      TokenId: "6903515d3559508cc377d261",
      Qty: 20,
      Decimal: 4,
    }

    const sendMsg = () => {
      if(socket) {
        socket.emit("order", emitData);
      }
    }

  return (
    <div className="p-10">
      <h1 className="font-bold text-white">Landing Page</h1>
      <Link href={"/dashboard"} className="text-white p-2 bg-[rgba(255,255,255,0.8)] w-fit">Home</Link>
      {socketReady && <button onClick={() =>sendMsg()} className="bg-[var(--primary)] tetx-white px-7 py-4 mt-8">SEnd socket</button>}
    </div>
  );
}
