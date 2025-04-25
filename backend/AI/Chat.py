import google.generativeai as genai

# Initialize API
genai.configure(api_key="YOUR_API_KEY")

# Create a chat model
model = genai.GenerativeModel("gemini-pro")
chat = model.start_chat(history=[])

print("🤖 Gemini ChatBot. Type 'exit' to quit.")

while True:
    user_input = input("You: ")
    if user_input.lower() == "exit":
        print("👋 Goodbye!")
        break

    try:
        response = chat.send_message(user_input)
        print("Gemini:", response.text)
    except Exception as e:
        print("Error:", e)
