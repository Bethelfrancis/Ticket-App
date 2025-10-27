const TICKETS_KEY = "ticketapp_tickets_v1";

function read() {
    try {
        return JSON.parse(localStorage.getItem(TICKETS_KEY) || "[]");
    } catch (e) {
        return [];
    }
}
function write(items) {
    localStorage.setItem(TICKETS_KEY, JSON.stringify(items));
}

export function listTickets() {
    return read();
}
export function getTicket(id) {
    return read().find((t) => t.id === id);
}
export function createTicket(ticket) {
    const items = read();
    ticket.id = Date.now().toString();
    items.unshift(ticket);
    write(items);
    return ticket;
}
export function updateTicket(id, patch) {
    const items = read();
    const idx = items.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error("Ticket not found");
    items[idx] = { ...items[idx], ...patch };
    write(items);
    return items[idx];
}
export function deleteTicket(id) {
    const items = read();
    const filtered = items.filter((t) => t.id !== id);
    write(filtered);
    return true;
}

export function validateTicket(data) {
    const errors = {};
    if (!data.title || data.title.trim() === "")
        errors.title = "Title is required.";
    if (!data.status || !["open", "in_progress", "closed"].includes(data.status))
        errors.status = "Status must be open, in_progress or closed.";
    if (data.description && data.description.length > 1000)
        errors.description = "Description too long.";
    return errors;
}
