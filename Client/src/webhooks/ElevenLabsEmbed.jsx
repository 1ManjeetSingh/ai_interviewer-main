import { fetchTranscript } from './apiService';
const BASE_URL = 'wss://api.elevenlabs.io/v1/convai/conversation';
let ws = null;

// Start WebSocket for Live Transcription
export default function startLiveTranscription(agentId, conversationId, onMessage) {
    if (ws) {
        console.warn('WebSocket already open. Closing existing connection.');
        ws.close();
    }

    ws = new WebSocket(`${BASE_URL}?agent_id=${agentId}&conversation_id=${conversationId}`);

    ws.onopen = () => {
        console.log('WebSocket Connected to ElevenLabs for live transcription.');
        console.log(ws);
        ws.send(JSON.stringify({ 
            action: "start_transcription",
            conversation_id: conversationId
         }));
    };

    ws.onmessage = (event) => {

        const message = JSON.parse(event.data);
        console.log('Incoming Message:', message);

        // Handle different message types
        if (onMessage) {
            onMessage(message);
        }
    };

    ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
    };

    ws.onclose = () => {
        console.log('WebSocket Disconnected.');
        ws = null;  // Reset WebSocket
    };
}

// Stop WebSocket Connection
export function stopLiveTranscription() {
    if (ws) {
        ws.close();
        console.log('WebSocket Closed.');
    } else {
        console.log('No active WebSocket to close.');
    }
}
