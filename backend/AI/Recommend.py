import google.generativeai as genai

# Gemini setup
genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel("gemini-pro")
chat = model.start_chat(history=[])

plants = [
    {"name": "Snake Plant", "light": "low", "water": "low", "use": "indoor", "type": "leaves"},
    {"name": "Peace Lily", "light": "medium", "water": "medium", "use": "indoor", "type": "flowers"},
    {"name": "Rose", "light": "high", "water": "medium", "use": "outdoor", "type": "flowers"},
    {"name": "Lavender", "light": "high", "water": "low", "use": "outdoor", "type": "fragrance"},
    {"name": "Money Plant", "light": "low", "water": "medium", "use": "indoor", "type": "leaves"},
    {"name": "Cactus", "light": "high", "water": "low", "use": "indoor", "type": "leaves"},
    {"name": "Aloe Vera", "light": "high", "water": "low", "use": "indoor", "type": "herb"},
    {"name": "Jasmine", "light": "medium", "water": "medium", "use": "outdoor", "type": "fragrance"},
]

def recommend(req):
    l = req.get("light")
    w = req.get("water")
    u = req.get("use")
    t = req.get("type")

    res = [p for p in plants if
           (not l or p["light"] == l) and
           (not w or p["water"] == w) and
           (not u or p["use"] == u) and
           (not t or p["type"] == t)]

    if not res:
        return "❌ No match found. Try changing preferences."

    return "\n".join([f"🌿 {p['name']} — {p['type'].capitalize()}, {p['use']} plant" for p in res])

def parse_input(text):
    prefs = {"light": None, "water": None, "use": None, "type": None}
    text = text.lower()

    for k in prefs:
        if k == "light":
            if "sun" in text or "bright" in text: prefs[k] = "high"
            elif "shade" in text or "dark" in text: prefs[k] = "low"
            elif "medium" in text: prefs[k] = "medium"
        elif k == "water":
            if "dry" in text or "low" in text: prefs[k] = "low"
            elif "wet" in text or "high" in text: prefs[k] = "high"
            elif "medium" in text: prefs[k] = "medium"
        elif k == "use":
            if "indoor" in text: prefs[k] = "indoor"
            elif "outdoor" in text: prefs[k] = "outdoor"
        elif k == "type":
            if "flower" in text: prefs[k] = "flowers"
            elif "leaf" in text: prefs[k] = "leaves"
            elif "herb" in text: prefs[k] = "herb"
            elif "fragrant" in text or "smell" in text: prefs[k] = "fragrance"
    return prefs

def handle_command(cmd):
    if cmd.lower().startswith("recommend"):
        prefs = parse_input(cmd)
        return recommend(prefs)

    elif cmd.lower().startswith("ask"):
        q = cmd[4:].strip()
        if not q: return "Ask what?"
        try: return chat.send_message(q).text
        except Exception as e: return f"Error: {e}"

    elif cmd.lower() == "help":
        return (
            "🪴 Commands:\n"
            "- recommend [e.g. recommend indoor flower low water]\n"
            "- ask <any gardening/plant question>\n"
            "- exit"
        )
    elif cmd.lower() == "exit":
        return "bye"
    return "Unknown command. Type 'help' for help."

print("🌸 Plant & Flower Recommendation ChatBot (Gemini powered). Type 'help' for commands.")

while True:
    u = input("You: ")
    res = handle_command(u)
    if res == "bye":
        print("👋 Goodbye!")
        break
    print("Bot:", res)
