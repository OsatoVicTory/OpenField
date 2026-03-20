"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import type SocketIOClient from "socket.io-client";

export default function LandingPage() {
  
    const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const inputRef2 = useRef<HTMLInputElement | null>(null);
    const [socketReady, setSocketReady] = useState(false);
    const server_url = "http://localhost:5000";
          
    // useEffect(() => {
    //     if(!server_url) return;

    //     const SocketInstance = io(server_url);

    //     SocketInstance.on("connect", () => {
    //       console.log("connected");
    //         setSocket(SocketInstance);
    //         setSocketReady(true);
    //     });

    //     SocketInstance.on("response", (data: any) => {
    //       console.log(data);
    //     });
    //     SocketInstance.on("filled_order", (data: any) => {
    //       console.log("filled_order", data);
    //     });
    //     SocketInstance.on("new_price", (data: any) => {
    //       console.log("new_price", data);
    //     });

    //     return () => {
    //         if(server_url && SocketInstance) SocketInstance.disconnect();
    //     }
    // }, [server_url]);

    // const emitData = {
    //   OrderType: "BUY",
    //   Price: 0.00135,
    //   Token: "AGRW",
    //   TokenId: "6903515d3559508cc377d261",
    //   Qty: 20,
    //   Decimal: 1000000,
    //   AccountId: "690353703559508cc377d262",
    // }

    const sendMsg = (action: string) => {
      if(socket && inputRef.current && inputRef2.current) {
        const qty = parseInt(inputRef.current.value) || 2;
        const price = parseFloat(inputRef2.current.value) || 0.0013;
        console.log(price, typeof price);
        socket.emit("order", { OrderType: action, Qty: qty, Price: price });
      }
    }

  return (
    <div className="p-10">
      <h1 className="font-bold text-white">Landing Page</h1>
      <div className="flex items-center gap-x-5">
        <Link href={"/dashboard"} className="text-white p-2 bg-[rgba(255,255,255,0.8)] w-fit">Home</Link>

        <div className="flex w-full flex-col gap-y-4">
          <input ref={inputRef} placeholder="Enter qty" type="number" className="text-white border w-[350px]" />
          <input ref={inputRef2} placeholder="Enter price" type="number" step={"0.000001"} className="text-white border w-[350px]" />
        </div>

        {socketReady && <button onClick={() =>sendMsg("SELL")} className="bg-[var(--primary)] tetx-white px-7 py-4 mt-8">Sell socket</button>}
        {socketReady && <button onClick={() =>sendMsg("BUY")} className="bg-[var(--primary)] tetx-white px-7 py-4 mt-8">Buy socket</button>}
      </div>
    </div>
  );
}
