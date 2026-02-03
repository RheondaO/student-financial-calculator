

## VCU SFMC Student Financial Gap Calculator

A comprehensive, multi-step financial planning tool matching the exact UI reference provided, with full backend integration for user accounts, data persistence, and advisor communication.

---

### Visual Design (Matching Reference Exactly)

**Header:**
- VCU SFMC logo with envelope icon
- "VCU SFMC Student Financial Gap Calculator" title
- Yellow "Financial Gap Calculator Mock Scenario" banner (top-right corner)

**Color Palette:**
- VCU Gold (#FFB300) for primary buttons and stepper highlights
- Pure Black (#000000) for the gap balance card
- Light Gray (#f6f8fa) for background surfaces
- White for input cards and content areas

**6-Step Stepper Navigation:**
Student Gap Calculator → Start → Enrollment → Funding → Payment Planner → Gap Summary → Final Overview

---

### Main Layout (Two-Column Design)

**Left Column - Input Sections:**

1. **Institutional Parameters**
   - Student type dropdown (Full-Time Student Undergraduate, etc.)
   - School selection (School of Business, Engineering, etc.)
   - Credit hours input with Min: 1, Max: 21 validation

2. **Applied Financial Aid**
   - Residency Status dropdown (Off-Campus Resident In-State, Out-of-State, etc.)
   - Credit Hours field (auto-synced)
   - Grants & Scholarships currency input with help tooltip
   - Federal Student Loans currency input with help tooltip

3. **Action Buttons**
   - "Start Over" secondary button
   - "Calculate My Gap!" primary gold button

**Right Column - Results Sidebar:**

1. **Your Estimated Semester Balance Card (Black)**
   - Large white dollar amount (e.g., $4,250.00)
   - "Estimated Balance Due" label
   - Total Tuition & Fees breakdown
   - Total Applied Aid breakdown (shown in parentheses)

2. **Take Action Section**
   - Generate Summary PDF button with icon
   - Meet with Advisor button with calendar icon
   - Email SFMC Advisor button with mail icon

3. **Data Integrity Check Section**
   - "View VCU 2026-2027 Tuition Tables" link
   - Session ID display
   - Last Updated timestamp

---

### Backend Integration (Supabase/Lovable Cloud)

**Database Tables (Matching Data Model):**

- `ref_tuition_rates`: Hardcoded 2026 VCU rates by residency/program
- `core_student_data`: Student profiles linked to auth
- `txn_student_calculations`: Saved calculation history
- `work_case_management`: High-risk case flagging (gap > $1,000)
- `core_advisor_data`: Advisor information for contact forms
- `log_audit_trail`: All changes logged for compliance

**User Authentication:**
- Email/password signup and login
- Save calculations to account
- View calculation history

**Advisor Contact Form:**
- In-app form that creates support ticket
- Sends email notification to SFMC advisors
- Includes full calculation summary

---

### Calculation Engine

**Total Bill Formula:**
`Total_Bill = (Credit_Hours × Cost_Per_Credit) + Mandatory_Fees`

**Gap Calculation (Zero-Floor Logic):**
`Calculated_Gap = Math.max(0, Total_Bill - Total_Aid)`

**Credit Balance Handling:**
If `Total_Aid > Total_Bill`, display as "Credit Balance" (positive surplus)

**Type Safety:**
All currency values handled with Decimal(10,2) precision to prevent floating-point errors

---

### Key Features

- **Real-time updates**: Gap card updates instantly as inputs change
- **Validation guards**: Cannot proceed with empty required fields
- **Credit limit**: Maximum 21 credits enforced
- **High-risk alerts**: Yellow warning when gap exceeds $1,000
- **Branded PDF export**: Professional summary document with VCU branding
- **Mobile responsive**: Gap card becomes floating header on mobile
- **Session tracking**: Unique Session ID and version tracking for data integrity
- **FERPA compliance**: Privacy disclaimer in footer

---

### Footer

- Session ID display
- "A VCU SFMC Project. Designed for student success."
- FERPA privacy disclaimer
- Tuition Table Version: 2026.01

