"use client"

import { useEffect, useRef, useState } from 'react';

interface Message {
    text: string;
    isOwn: boolean;
    timestamp: Date;
    id: string;
}

export default function WebsocketClient(){
    
const [messages, setMessages] = useState<Message[]>([]);
const [clientmsg, setClientmsg] = useState("");
const [connection, setConnection] = useState<WebSocket | null>(null);
const [isConnected, setIsConnected] = useState(false);
const [onlineUsers, setOnlineUsers] = useState(1);
const messagesEndRef = useRef<HTMLDivElement>(null);
const inputRef = useRef<HTMLInputElement>(null);

const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};

useEffect(() => {
    scrollToBottom();
}, [messages]);

useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000");
    console.log("connection", ws);
    
    ws.onopen = () => {
        console.log("connected to chat server");
        setIsConnected(true);
        setConnection(ws);
        // Don't send automatic hello message
    };

    ws.onmessage = (message) => {
        console.log("message from server", message.data);
        const newMessage: Message = {
            text: message.data,
            isOwn: false,
            timestamp: new Date(),
            id: Math.random().toString(36).substr(2, 9)
        };
        setMessages(prev => [...prev, newMessage]);
    };

    ws.onclose = () => {
        console.log("disconnected");
        setIsConnected(false);
        setConnection(null);
    };

    ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsConnected(false);
    };

    return () => {
        ws.close();
        setConnection(null);
        console.log("cleanup disconnected");
    };
}, []);

const sendMessage = () => {
    if (connection && clientmsg.trim() && isConnected) {
        connection.send(clientmsg);
        
        // Add your own message to display
        const newMessage: Message = {
            text: clientmsg,
            isOwn: true,
            timestamp: new Date(),
            id: Math.random().toString(36).substr(2, 9)
        };
        setMessages(prev => [...prev, newMessage]);
        setClientmsg("");
        inputRef.current?.focus();
    }
};

const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
};

   

    if (!isConnected && !connection) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="bg-white rounded-lg shadow-lg p-8 flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="text-gray-600 font-medium">Connecting to chat server...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-t-xl shadow-sm border-b border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <h1 className="text-xl font-semibold text-gray-800">Live Chat</h1>
                            <span className="text-sm text-gray-500">
                                {isConnected ? 'Connected' : 'Disconnected'}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>{onlineUsers} online</span>
                        </div>
                    </div>
                </div>

                {/* Messages Container */}
                <div className="bg-white h-[70vh] overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        {messages.length === 0 ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center text-gray-500">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                        💬
                                    </div>
                                    <p className="text-lg font-medium">No messages yet</p>
                                    <p className="text-sm">Start a conversation!</p>
                                </div>
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'} mb-2`}
                                >
                                    <div
                                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm ${
                                            msg.isOwn
                                                ? 'bg-blue-600 text-white rounded-br-md'
                                                : 'bg-gray-100 text-gray-800 rounded-bl-md'
                                        }`}
                                    >
                                        <p className="text-sm leading-relaxed break-words">{msg.text}</p>
                                        <p
                                            className={`text-xs mt-1 ${
                                                msg.isOwn ? 'text-blue-100' : 'text-gray-500'
                                            }`}
                                        >
                                            {msg.timestamp.toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Container */}
                <div className="bg-white rounded-b-xl shadow-sm border-t border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                        <div className="flex-1 relative">
                            <input
                                ref={inputRef}
                                type="text"
                                value={clientmsg}
                                onChange={(e) => setClientmsg(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-slate-900"
                                disabled={!isConnected}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <span className="text-xs text-gray-400">Press Enter to send</span>
                            </div>
                        </div>
                        <button
                            onClick={sendMessage}
                            disabled={!isConnected || !clientmsg.trim()}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </div>
                    
                    {!isConnected && (
                        <div className="mt-2 text-center">
                            <span className="text-sm text-red-500 bg-red-50 px-3 py-1 rounded-full">
                                ⚠️ Disconnected from server
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}