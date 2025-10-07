"use client"
import { useEffect, useRef, useState } from 'react';

export default function CodeEditor() {
  const [code, setCode] = useState(`# Python Example
print("Hello, World!")
for i in range(5):
    print(f"Number: {i}")`);
  const [lang, setLang] = useState('python');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [wsConnected, setWsConnected] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const[retryCount, setRetryCount] = useState(0);
  // Setup WebSocket connection
  const retryCountRef = useRef(0);
  useEffect(() => {
    const connectWebSocket = () => {
      try {
        const ws = new WebSocket('ws://localhost:4000');
        wsRef.current = ws;

        ws.onopen = () => {
          console.log('🔗 WebSocket connected');
          setWsConnected(true);
          
          // Register user for updates
          ws.send(JSON.stringify({
            type: 'register',
            userId: userId
          }));
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            
            if (data.type === 'registered') {
              console.log('📝 Registered for execution updates');
            } else if (data.type === 'execution-result') {
              console.log('📨 Received execution result:', data);
              
              if (data.status === 'completed') {
                setOutput(data.output || 'Code executed successfully (no output)');
                setError('');
              } else if (data.status === 'error') {
                setError(data.error || 'Execution failed');
                setOutput('');
              }
              setIsLoading(false);
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        ws.onclose = () => {
          console.log('🔌 WebSocket disconnected', retryCountRef.current, userId);
          setWsConnected(false);
          
          // Attempt to reconnect after 3 seconds
          setTimeout(() => {
            
            if ((!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) && retryCountRef.current < 5) {
              retryCountRef.current += 1;
              connectWebSocket();  

            }
          }, 2000);

          setRetryCount(c => c + 1);
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          setWsConnected(false);
        };


      console.info('🌐 closure rendered',retryCount, userId);
      } catch (error) {
        console.error('Failed to create WebSocket connection:', error);
      }
    };
    console.info('🌐 retry count inside useeffect',retryCount);
    connectWebSocket();

    // Cleanup on unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [userId]);

  console.info('🌐 retry count outside useeffect',retryCount);

  const handleSubmit = async () => {
    if (!code.trim()) {
      setError('Please enter some code');
      return;
    }

    setIsLoading(true);
    setError('');
    setOutput('Submitting to queue...');

    try {
      // Submit to queue
      const response = await fetch('http://localhost:4000/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          lang,
          userId,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setOutput('Code queued for execution. Processing via WebSocket...');
        // Results will come via WebSocket - no polling needed!
      } else {
        setError(result.error || 'Failed to queue code');
        setOutput('');
        setIsLoading(false);
      }
    } catch (err) {
      setError('Failed to connect to server. Make sure Express server is running on port 4000.');
      setOutput('');
      setIsLoading(false);
    }
  };



  const handleLanguageChange = (newLang: string) => {
    setLang(newLang);
    // Set example code based on language
    if (newLang === 'python') {
      setCode(`# Python Example
print("Hello, World!")
for i in range(5):
    print(f"Number: {i}")`);
    } else if (newLang === 'nodejs') {
      setCode(`// Node.js Example
import fs from 'fs';
console.log("Hello from Node.js!");
console.log("Node version:", process.version);`);
    }
    setOutput('');
    setError('');
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Left Side - Code Editor */}
      <div className="flex-1 flex flex-col border-r border-gray-700">
        {/* Header */}
        <div className="bg-gray-800 p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Code Editor</h1>
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <select
                value={lang}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-white"
              >
                <option value="python">Python</option>
                <option value="nodejs">Node.js</option>
              </select>
              
              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`px-6 py-2 rounded font-medium transition-colors ${
                  isLoading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? 'Running...' : 'Run Code'}
              </button>
            </div>
          </div>
        </div>

        {/* Code Input Area */}
        <div className="flex-1 p-4">
          <textarea
            ref={editorRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`Enter your ${lang} code here...`}
            className="w-full h-full bg-gray-800 border border-gray-600 rounded p-4 text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Right Side - Output/Results */}
      <div className="flex-1 flex flex-col bg-gray-800">
        {/* Output Header */}
        <div className="bg-gray-700 p-4 border-b border-gray-600">
          <h2 className="text-lg font-semibold">Output</h2>
        </div>

        {/* Output Content */}
        <div className="flex-1 p-4 overflow-auto">
          {error ? (
            <div className="bg-red-900 border border-red-700 rounded p-4">
              <h3 className="text-red-400 font-semibold mb-2">Error:</h3>
              <pre className="text-red-300 whitespace-pre-wrap font-mono text-sm">
                {error}
              </pre>
            </div>
          ) : output ? (
            <div className="bg-gray-900 border border-gray-600 rounded p-4">
              <h3 className="text-green-400 font-semibold mb-2">Result:</h3>
              <pre className="text-green-300 whitespace-pre-wrap font-mono text-sm">
                {output}
              </pre>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-4">▶️</div>
                <p>Click "Run Code" to see output here</p>
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="bg-gray-700 p-2 border-t border-gray-600">
          <div className="flex items-center justify-between text-sm text-gray-300">
            <div className="flex items-center gap-4">
              <span>Language: {lang}</span>
              <span className={`flex items-center gap-1 ${wsConnected ? 'text-green-400' : 'text-red-400'}`}>
                <span className={`w-2 h-2 rounded-full ${wsConnected ? 'bg-green-400' : 'bg-red-400'}`}></span>
                WebSocket {wsConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <span>{isLoading ? '🔄 Executing...' : '✅ Ready'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}