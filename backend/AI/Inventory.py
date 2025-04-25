import google.generativeai as genai

# Setup Gemini
genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel("gemini-pro")
chat = model.start_chat(history=[])

# Inventory store
inventory = {}

def handle_command(cmd):
    parts = cmd.lower().split()
    if not parts:
        return "Please enter a command."

    if parts[0] == "add":
        if len(parts) < 3: return "Usage: add <item_name> <quantity>"
        name = parts[1]
        qty = int(parts[2])
        inventory[name] = inventory.get(name, 0) + qty
        return f"✅ Added {qty} of {name}."

    elif parts[0] == "update":
        if len(parts) < 3: return "Usage: update <item_name> <new_quantity>"
        name = parts[1]
        qty = int(parts[2])
        inventory[name] = qty
        return f"🔁 Updated {name} to {qty}."

    elif parts[0] == "remove":
        if len(parts) < 2: return "Usage: remove <item_name>"
        name = parts[1]
        if name in inventory:
            del inventory[name]
            return f"🗑️ Removed {name}."
        return "Item not found."

    elif parts[0] == "show":
        if not inventory:
            return "📦 Inventory is empty."
        return "\n".join([f"{k}: {v}" for k, v in inventory.items()])

    elif parts[0] == "help":
        return (
            "📘 Commands:\n"
            "- add <item> <qty>\n"
            "- update <item> <new_qty>\n"
            "- remove <item>\n"
            "- show\n"
            "- help\n"
            "- ask <your question>\n"
            "- exit"
        )

    elif parts[0] == "ask":
        q = cmd[4:].strip()
        if not q:
            return "Ask what?"
        try:
            res = chat.send_message(q)
            return res.text
        except Exception as e:
            return f"Error: {e}"

    elif parts[0] == "exit":
        return "bye"

    return "Unknown command. Type 'help' for help."

print("🤖 Inventory ChatBot (Gemini powered). Type 'help' for commands.")

while True:
    u = input("You: ")
    res = handle_command(u)
    if res == "bye":
        print("👋 Exiting...")
        break
    print("Bot:", res)
