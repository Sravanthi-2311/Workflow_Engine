Enterprise Workflow & Business Rule Engine

(ServiceNow-Inspired JavaScript Project)

1. Project Overview

  In many organizations, service requests and incidents are handled manually without proper workflow control, priority calculation, or audit tracking. This often leads to inconsistent handling, missed SLAs, and    lack of accountability.
  
  This project is a JavaScript-based workflow automation system inspired by ServiceNow’s ticket lifecycle.
  It demonstrates how business rules, workflows, SLA tracking, and audit logs can be implemented using core JavaScript logic.

  The focus of this project is backend-style JavaScript logic, not UI design.

2. Objective

  The main objectives of this project are:

  1.To automate ticket handling using rule-based logic
  
  2.To implement controlled workflow state transitions
  
  3.To calculate ticket priority dynamically
  
  4.To track SLA deadlines
  
  5.To maintain a complete audit history of all actions

3. Key Features
3.1 Ticket Management

    Users can create service tickets with:
    
    Short description
    
    Impact level
    
    Urgency level
    
    Each ticket is assigned a unique ID automatically

3.2 Business Rules

    Priority is calculated automatically before ticket insertion
    
    Rules are executed programmatically, not hardcoded into the UI
    
    Mimics before-insert and after-insert business rules in ServiceNow

3.3 Workflow Engine

    Ticket lifecycle follows a predefined workflow:
    
    New → In Progress → Resolved → Closed
    
    Invalid state transitions are blocked
    
    Ensures process consistency

3.4 SLA Management

    SLA due time is calculated automatically at ticket creation
    
    SLA logic is handled using JavaScript date and time functions

3.5 Audit Logging

    Every important action is logged:
    
    Ticket creation
    
    State changes
    
    Audit log stores:
    
    Ticket ID
    
    Action performed
    
    Old and new values
    
    Timestamp

4. Technology Stack

    Frontend: HTML, CSS
    
    Logic Layer: Vanilla JavaScript
    
    Storage: In-memory JavaScript objects (no database)
    
    Tools: VS Code, Browser (Chrome)

5. Project Structure
    workflow-engine/
    │
    ├── index.html      # User interface
    ├── styles.css      # Styling
    ├── script.js       # Business rules, workflow logic, SLA, audit logs
    └── README.md       # Project documentation

6. How the System Works

    User submits a ticket using the form
    
    Before-insert business rule calculates priority
    
    SLA due time is generated automatically
    
    Ticket is stored in memory
    
    After-insert rule records an audit entry
    
    Workflow engine controls valid state transitions
    
    Each update is recorded in the audit log
    
    This approach separates business logic from presentation, similar to enterprise platforms like ServiceNow.

7. How to Run the Project

    Download or clone the project
    
    Open the project folder
    
    Open index.html in any modern web browser
    
    Create a ticket and test state transitions
    
    No additional installation or configuration is required.

8. Sample Use Case

    A user creates a ticket with Impact = 3 and Urgency = 2
    
    The system automatically assigns Priority = 6
    
    The ticket progresses through valid states
    
    All changes are tracked in the audit log

9. Limitations

    Data is not persistent (in-memory storage only)
    
    No authentication or role-based access
    
    Designed as a functional prototype, not a production system

10. Future Enhancements

    Database integration for persistent storage
    
    Role-based access control
    
    Scheduled jobs for SLA breach notifications
    
    Email or notification integration
    
    Configurable workflows and business rules

11. Learning Outcomes

    Through this project, I gained hands-on experience in:
    
    Writing rule-driven JavaScript logic
    
    Designing workflow-based systems
    
    Implementing audit trails
    
    Handling date and time calculations
    
    Structuring code similar to enterprise platforms

12. Conclusion

    This project demonstrates how core ServiceNow concepts such as business rules, workflows, SLAs, and auditability can be implemented using JavaScript.
    It focuses on logic, process control, and maintainability, which are critical in enterprise applications.
    


Sravanthi Pasagadugula
