import google.generativeai as genai
import uuid

# Gemini setup
genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel("gemini-pro")
chat = model.start_chat(history=[])

# Data stores
stock = {}
orders = {}

LOW_STOCK_THRESHOLD = 5

def notify_stock(item):
    qty = stock.get(item, 0)
    if qty < LOW_STOCK_THRESHOLD:
        return f"⚠️ Low stock alert for {item} (only {qty} left!)"
    return None

def handle_command(cmd):
    parts = cmd.lower().split()
    if not parts:
        return "Please enter a command."

    # Stock commands
    if parts[0] == "addstock":
        if len(parts) < 3: return "Usage: addstock <item> <qty>"
        item, qty = parts[1], int(parts[2])
        stock[item] = stock.get(item, 0) + qty
        return f"✅ Added {qty} of {item} to stock."

    elif parts[0] == "updatestock":
        if len(parts) < 3: return "Usage: updatestock <item> <new_qty>"
        item, qty = parts[1], int(parts[2])
        stock[item] = qty
        return f"🔁 Stock of {item} updated to {qty}."

    elif parts[0] == "deletestock":
        if len(parts) < 2: return "Usage: deletestock <item>"
        item = parts[1]
        if item in stock:
            del stock[item]
            return f"🗑️ {item} removed from stock."
        return "Item not found."

    elif parts[0] == "showstock":
        if not stock:
            return "📦 Stock is empty."
        return "\n".join([f"{i}: {q}" for i, q in stock.items()])

    # Order commands
    elif parts[0] == "createorder":
        if len(parts) < 3: return "Usage: createorder <customer> <item>"
        cust, item = parts[1], parts[2]
        if stock.get(item, 0) == 0:
            return f"❌ {item} is out of stock."

        order_id = str(uuid.uuid4())[:8]
        stock[item] -= 1
        orders[order_id] = {"customer": cust, "item": item, "status": "pending"}

        notif = notify_stock(item)
        res = f"🆕 Order {order_id} placed for {cust} ({item})."
        if notif: res += f"\n{notif}"
        return res

    elif parts[0] == "updateorder":
        if len(parts) < 3: return "Usage: updateorder <order_id> <new_status>"
        oid, status = parts[1], parts[2]
        if oid not in orders: return "Order not found."
        orders[oid]["status"] = status
        return f"🔁 Order {oid} status updated to {status}."

    elif parts[0] == "deleteorder":
        if len(parts) < 2: return "Usage: deleteorder <order_id>"
        oid = parts[1]
        if oid in orders:
            del orders[oid]
            return f"🗑️ Order {oid} deleted."
        return "Order not found."

    elif parts[0] == "showorders":
        if not orders:
            return "📋 No orders placed."
        return "\n".join([f"{oid}: {o['customer']} - {o['item']} ({o['status']})" for oid, o in orders.items()])

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
            "- addstock <item> <qty>\n"
            "- updatestock <item> <new_qty>\n"
            "- deletestock <item>\n"
            "- showstock\n"
            "- createorder <customer> <item>\n"
            "- updateorder <order_id> <status>\n"
            "- deleteorder <order_id>\n"
            - showorders\n"
            "- ask <your question>\n"
            "- exit"
        )

    elif parts[0] == "exit":
        return "bye"

    return "Unknown command. Type 'help' for commands."

print("🤖 Stock & Orders ChatBot (Gemini powered). Type 'help' for commands.")

while True:
    u = input("You: ")
    res = handle_command(u)
    if res == "bye":
        print("👋 Exiting...")
        break
    print("Bot:", res)
