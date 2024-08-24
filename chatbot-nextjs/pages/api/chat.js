export default function handler(req, res) {
    if (req.method === 'POST') {
        const { message } = req.body;
        const responseMessage = generateResponse(message);
        res.status(200).json({ response: responseMessage });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

function generateResponse(message) {
    const lowerCaseMessage = message.toLowerCase();
    
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
        return "Hello! How can I assist you today?";
    } else if (lowerCaseMessage.includes('bye') || lowerCaseMessage.includes('goodbye')) {
        return "Goodbye! It was nice talking to you.";
    } else if (lowerCaseMessage.includes('who are you') || lowerCaseMessage.includes('what are you')) {
        return "I'm a friendly chatbot created to assist you with your queries.";
    } else if (lowerCaseMessage.includes('help') || lowerCaseMessage.includes('assist')) {
        return "Sure, I'm here to help! What do you need assistance with?";
    } else if (lowerCaseMessage.includes('time') || lowerCaseMessage.includes('what time')) {
        const currentTime = new Date().toLocaleTimeString();
        return `The current time is ${currentTime}.`;
    } else if (lowerCaseMessage.includes('weather')) {
        return "I'm not connected to a weather service, but I hope the weather is nice wherever you are!";
    } else if (lowerCaseMessage.includes('what can you do') || lowerCaseMessage.includes('your capabilities')) {
        return "I can chat with you, tell you the time, and answer simple questions. I'm still learning more!";
    } else if (lowerCaseMessage.includes('programming') || lowerCaseMessage.includes('technology')) {
        return "I love programming! I'm built using Node.js and Next.js. What about you? Do you like programming?";
    } else if (lowerCaseMessage.includes('how are you')) {
        return "I'm just a bunch of code, but if I could feel, I'd say I'm doing great! How about you?";
    } else if (lowerCaseMessage.includes('your name')) {
        return "I don't have a name, but you can call me Chatbot.";
    } else if (lowerCaseMessage.includes('joke')) {
        return "Why don't scientists trust atoms? Because they make up everything!";
    } else if (lowerCaseMessage.includes('thank you') || lowerCaseMessage.includes('thanks')) {
        return "You're welcome! I'm here to help.";
    } else {
        return "Sorry, I don't understand that. Could you try asking something else?";
    }
}
