/*************************************
 * GLOBAL IN-MEMORY STORAGE
 *************************************/
let tickets = [];
let auditLogs = [];
let ticketCounter = 1;

/*************************************
 * BUSINESS RULES (ServiceNow Style)
 *************************************/

// Before Insert Rule
function beforeInsert(ticket) {
  // Auto-calculate priority
  ticket.priority = ticket.impact * ticket.urgency;
}

// After Insert Rule
function afterInsert(ticket) {
  logAudit(ticket.id, "TICKET_CREATED", "-", "New");
}

/*************************************
 * SLA ENGINE
 *************************************/
function calculateSLA(createdAt) {
  let slaDate = new Date(createdAt);
  slaDate.setHours(slaDate.getHours() + 48); // 48-hour SLA
  return slaDate.toLocaleString();
}

/*************************************
 * WORKFLOW / STATE ENGINE
 *************************************/
const stateFlow = {
  "New": ["In Progress"],
  "In Progress": ["Resolved"],
  "Resolved": ["Closed"]
};

function changeState(ticketId, newState) {
  let ticket = tickets.find(t => t.id === ticketId);

  if (!ticket) return;

  // Validate transition
  if (!stateFlow[ticket.state] || !stateFlow[ticket.state].includes(newState)) {
    alert("Invalid State Transition");
    return;
  }

  let oldState = ticket.state;
  ticket.state = newState;

  logAudit(ticket.id, "STATE_CHANGED", oldState, newState);
  renderTickets();
}

/*************************************
 * AUDIT LOG ENGINE
 *************************************/
function logAudit(ticketId, action, oldValue, newValue) {
  auditLogs.push({
    ticketId: ticketId,
    action: action,
    oldValue: oldValue,
    newValue: newValue,
    timestamp: new Date().toLocaleString()
  });

  renderAudit();
}

/*************************************
 * TICKET CREATION
 *************************************/
document.getElementById("ticketForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let description = document.getElementById("desc").value;
  let impact = Number(document.getElementById("impact").value);
  let urgency = Number(document.getElementById("urgency").value);

  let ticket = {
    id: ticketCounter++,
    description: description,
    impact: impact,
    urgency: urgency,
    priority: 0,
    state: "New",
    createdAt: new Date(),
    slaDue: ""
  };

  // Execute business rules
  beforeInsert(ticket);
  ticket.slaDue = calculateSLA(ticket.createdAt);

  tickets.push(ticket);
  afterInsert(ticket);

  renderTickets();
  this.reset();
});

/*************************************
 * UI RENDERING - TICKETS
 *************************************/
function renderTickets() {
  let tableBody = document.getElementById("ticketTable");
  tableBody.innerHTML = "";

  tickets.forEach(ticket => {
    let actions = "";

    if (stateFlow[ticket.state]) {
      actions = stateFlow[ticket.state]
        .map(
          nextState =>
            `<button onclick="changeState(${ticket.id}, '${nextState}')">
              ${nextState}
            </button>`
        )
        .join(" ");
    }

    let row = `
      <tr>
        <td>${ticket.id}</td>
        <td>${ticket.description}</td>
        <td>${ticket.priority}</td>
        <td>${ticket.state}</td>
        <td>${ticket.slaDue}</td>
        <td>${actions}</td>
      </tr>
    `;

    tableBody.innerHTML += row;
  });
}

/*************************************
 * UI RENDERING - AUDIT LOGS
 *************************************/
function renderAudit() {
  let auditList = document.getElementById("auditLog");
  auditList.innerHTML = "";

  auditLogs.forEach(log => {
    let item = document.createElement("li");
    item.textContent = `Ticket ${log.ticketId}: ${log.action} (${log.oldValue} → ${log.newValue}) at ${log.timestamp}`;
    auditList.appendChild(item);
  });
}
