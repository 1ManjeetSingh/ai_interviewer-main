from flask import Flask, request, jsonify
import openai
import os
import tempfile
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
# model = whisper.load_model("base")  # Load Whisper model (base size)

openai.api_key = "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"

# Ensure the "uploads" directory exists
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/transcribe_audio', methods=['POST'])
def upload_audio():
    try:
        # Check if an audio file is sent in the request
        if 'audio' not in request.files:
            return jsonify({"error": "Audio file is required for STT."}), 400
        
        # Get the uploaded audio file
        audio_file = request.files['audio']
        
        # Save the file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_audio_file:
            temp_audio_path = temp_audio_file.name
            audio_file.save(temp_audio_path)
        
        # Send the audio file to OpenAI's Speech-to-Text API
        with open(temp_audio_path, "rb") as audio:
            response = openai.Audio.transcribe(
                model="whisper-1",
                file=audio
            )
        
        # Clean up temporary audio file
        os.remove(temp_audio_path)
        
        # Return the transcription result
        return jsonify({"transcription": response.get("text", "")})

    except Exception as e:
        print("Error generating STT:", str(e))
        return jsonify({"error": "STT generation failed.", "details": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=8001)


