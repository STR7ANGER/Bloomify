import google.generativeai as genai
import uuid

# Setup Gemini
genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel("gemini-pro")
chat = model.start_chat(history=[])

# Orders store
orders = {}

def handle_command(cmd):
    parts = cmd.lower().split()
    if not parts:
        return "Please enter a command."

    if parts[0] == "create":
        if len(parts) < 3:
            return "Usage: create <customer_name> <item>"
        name = parts[1]
        item = ' '.join(parts[2:])
        order_id = str(uuid.uuid4())[:8]
        orders[order_id] = {"customer": name, "item": item, "status": "pending"}
        return f"🆕 Order {order_id} created for {name} ({item})."

    elif parts[0] == "update":
        if len(parts) < 3:
            return "Usage: update <order_id> <new_status>"
        oid = parts[1]
        status = parts[2]
        if oid not in orders:
            return "Order ID not found."
        orders[oid]["status"] = status
        return f"🔁 Order {oid} status updated to {status}."

    elif parts[0] == "delete":
        if len(parts) < 2:
            return "Usage: delete <order_id>"
        oid = parts[1]
        if oid in orders:
            del orders[oid]
            return f"🗑️ Order {oid} deleted."
        return "Order ID not found."

    elif parts[0] == "show":
        if not orders:
            return "📦 No orders yet."
        return "\n".join([
            f"{oid}: {data['customer']} - {data['item']} ({data['status']})"
            for oid, data in orders.items()
        ])

    elif parts[0] == "ask":
        q = cmd[4:].strip()
        if not q:
            return "Ask what?"
        try:
            res = chat.send_message(q)
            return res.text
        except Exception as e:
            return f"Error: {e}"

    elif parts[0] == "help":
        return (
            "📘 Commands:\n"
            "- create <customer> <item>\n"
            "- update <order_id> <status>\n"
            "- delete <order_id>\n"
            "- show\n"
            "- ask <your question>\n"
            "- exit"
        )

    elif parts[0] == "exit":
        return "bye"

    return "Unknown command. Type 'help' for help."

print("🤖 Orders ChatBot (Gemini powered). Type 'help' for commands.")

while True:
    u = input("You: ")
    res = handle_command(u)
    if res == "bye":
        print("👋 Exiting...")
        break
    print("Bot:", res)
