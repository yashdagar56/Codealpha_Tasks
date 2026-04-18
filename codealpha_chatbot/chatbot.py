def get_bot_response(user_input):
    """
    Returns a predefined response based on the user's input.
    Keys are lowercased to handle case insensitivity.
    """
    cleaned_input = user_input.strip().lower()

    if cleaned_input == "hello" or cleaned_input == "hi":
        return "Hi!"
    elif cleaned_input == "how are you":
        return "I'm fine, thanks!"
    elif cleaned_input == "what is your name":
        return "I am a CodeAlpha Chatbot. I don't have a specific name, but I love to chat!"
    elif cleaned_input == "tell me a joke":
        return "Why do programmers prefer dark mode? Because light attracts bugs!"
    elif cleaned_input == "bye" or cleaned_input == "goodbye":
        return "Goodbye!"
    else:
        return "Sorry, I didn't understand that. I only know basic greetings right now."

def run_chatbot():
    print("🤖 Chatbot initialized! Type 'bye' to exit the conversation.\n")
    
    while True:
        # 1. Get input from user
        user_message = input("You: ")
        
        # 2. Determine the response based on conditions (if-elif)
        bot_reply = get_bot_response(user_message)
        
        # 3. Output the bot's reply
        print(f"Bot: {bot_reply}")
        
        # 4. Loop breaks if the user wants to leave
        if user_message.strip().lower() in ["bye", "goodbye"]:
            break

if __name__ == "__main__":
    run_chatbot()
