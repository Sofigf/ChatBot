from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get("message")
    response_message = generate_response(user_message)
    return jsonify({"response": response_message})

def generate_response(message):
    message = message.lower()
    
    # Greetings
    if "hello" in message or "hi" in message:
        return "Hello! How can I assist you today?"
    
    # Farewell
    elif "bye" in message or "goodbye" in message:
        return "Goodbye! It was nice talking to you."

    # Asking about the chatbot's identity
    elif "who are you" in message or "what are you" in message:
        return "I'm a friendly chatbot created to assist you with your queries."

    # Asking for help
    elif "help" in message or "assist" in message:
        return "Sure, I'm here to help! What do you need assistance with?"

    # Asking about time
    elif "time" in message or "what time" in message:
        from datetime import datetime
        current_time = datetime.now().strftime("%H:%M:%S")
        return f"The current time is {current_time}."

    # Asking about the weather (simple static response)
    elif "weather" in message:
        return "I'm not connected to a weather service, but I hope the weather is nice wherever you are!"

    # Asking about the chatbot's capabilities
    elif "what can you do" in message or "your capabilities" in message:
        return "I can chat with you, tell you the time, and answer simple questions. I'm still learning more!"

    # Asking about programming or technology
    elif "programming" in message or "technology" in message:
        return "I love programming! I'm built using Python and Flask. What about you? Do you like programming?"

    # Simple small talk
    elif "how are you" in message:
        return "I'm just a bunch of code, but if I could feel, I'd say I'm doing great! How about you?"

    elif "your name" in message:
        return "I don't have a name, but you can call me Chatbot."

    elif "joke" in message:
        return "Why don't scientists trust atoms? Because they make up everything!"

    elif "thank you" in message or "thanks" in message:
        return "You're welcome! I'm here to help."

    # Default fallback response
    else:
        return "Sorry, I don't understand that. Could you try asking something else?"

if __name__ == '__main__':
    app.run(debug=True)
