# Architecture Document

## 1. Overview
The Digital Car Parking Management application is designed as a modern React-based frontend system with modular components and clear separation of concerns. The architecture supports incremental feature expansion while keeping the UI maintainable and easy to scale.

## 2. Goals
- Keep the interface easy to navigate for users
- Separate business logic from presentation layers
- Support future integration with API and database services
- Allow clean expansion for new parking features

## 3. High-Level Architecture

```text
React Frontend
│
├── Pages
│   ├── Dashboard
│   ├── Parking Slots
│   ├── Vehicle Logs
│   ├── Billing
│   ├── Reports
│   └── Admin
│
├── Components
│   ├── Shared Layout
│   ├── Cards
│   ├── Tables
│   ├── Forms
│   ├── Modals
│   └── Status Badges
│
├── State & Logic
│   ├── Context API / State Hooks
│   ├── Validation Helpers
│   └── Business Rules
│
├── Services
│   ├── Parking Service
│   ├── Billing Service
│   ├── Reporting Service
│   └── API Client
│
├── Utilities
│   ├── Date Helpers
│   ├── Pricing Calculations
│   ├── Formatters
│   └── Validation
│
└── Styling
    ├── Design Tokens
    ├── UI Theme
    └── Responsive Layouts
```

## 4. Module Breakdown

### 4.1 Dashboard Module
Responsible for showing occupancy, alerts, revenue summaries, and quick actions.

### 4.2 Slot Management Module
Tracks parking slots, their availability status, and assignment history.

### 4.3 Vehicle Entry/Exit Module
Handles check-in, check-out, plate tracking, and status updates.

### 4.4 Billing Module
Calculates parking duration and cost using configured pricing rules.

### 4.5 Reporting Module
Provides operational reports including daily, weekly, and monthly summaries.

### 4.6 Admin Module
Provides pricing configuration, user roles, and operational controls.

## 5. Data Flow
1. A user logs in or accesses the dashboard.
2. Data is loaded from stored mock data or API services.
3. User actions trigger state changes in the frontend.
4. Business logic validates the event and updates the relevant model.
5. The UI reflects live updates, such as slot occupancy and billing totals.

## 6. Data Models

```json
{
  "vehicleId": "ABC123",
  "vehicleType": "Car",
  "entryTime": "2026-10-06T08:30:00",
  "exitTime": "2026-10-06T10:15:00",
  "slotNumber": "A-12",
  "status": "Checked Out",
  "amount": 180
}
```

## 7. Design Principles
- Component reusability
- Separation of UI and business logic
- Clear state management approach
- Responsive, user-centered interfaces
- Extensibility for future backend integration

## 8. Technical Considerations
- Use environment variables for API base URLs
- Ensure all user input is validated
- Structure pages and services by business domain
- Prefer modular styling over large monolithic CSS files
- Keep financial calculations centralized and testable

## 9. Future Architecture Evolution
This frontend can later integrate with a backend service using Node.js, Express, and a database such as PostgreSQL or MongoDB. Real-time updates can be added using WebSockets or polling for live slot status.

## 10. Scalability
The architecture is designed for modular growth across additional parking zones, branches, user roles, and reporting features without major structural changes.

---

This document defines the technical foundation for the project and supports future expansion.
