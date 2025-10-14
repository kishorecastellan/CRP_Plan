## 🏡 CRP Affordable Housing Application – Core MVP Agile Sprint Plan  
**Sprint Duration:** October 14 – October 24, 2025  
**Goal:** Deliver a **Core MVP** for the CRP Affordable Housing Application with authentication, step-based sections, save draft, file upload, and submission, using a sandbox workflow for backend and a test branch for safe integration.

---

## 🎯 MVP Objective
Develop a **step-based applicant portal** that enables users to fill and submit affordable housing applications with document uploads using:

- **Frontend:** Next.js Gen 2  
- **Backend:** AWS Amplify (AppSync + DynamoDB)  
- **Authentication:** Amazon Cognito User Pool (manual integration)  
- **Storage:** Amazon S3 for supporting documents  
- **Environment Setup:** Amplify Sandbox for backend testing and `test` branch for CI/CD testing  
- **Goal:** Applicants can register/login, fill form sections, save drafts, upload documents, and submit applications securely.

---

## 🧩 Core Modules (MVP Scope)
1. **Authentication (Cognito User Pool Integration)**
2. **Backend Setup (Amplify + AppSync + DynamoDB Schema)**
3. **Frontend Stepper Form Flow (Next.js)**
4. **Save Draft Functionality**
5. **File Upload (S3 Integration)**
6. **Final Submission + Validation**
7. **Testing + Deployment (Sandbox & Test Branch)**

---

## 🗓️ Sprint Breakdown (Oct 14 – Oct 24)

| **Date** | **Focus Area** | **Main Tasks** | **Subtasks / Deliverables** | **Expected Output / Status** |
|-----------|----------------|----------------|------------------------------|------------------------------|
| **Oct 14 (Mon)** | 🏗️ Backend Initialization | 1. Initialize Amplify backend.<br />2. Create Sandbox environment for backend testing.<br />3. Draft GraphQL schema for core sections. | - `amplify init` and `amplify sandbox start`.<br />- Define schema for Applicant, Household, Income, and Documents.<br />- Plan DynamoDB key design.<br />- Commit initial setup to `test` branch. | ✅ Amplify backend initialized with sandbox active and schema draft ready. |
| **Oct 15 (Tue)** | 🔐 Cognito Integration | 1. Create Cognito User Pool manually.<br />2. Integrate with Next.js frontend.<br />3. Test login flow in sandbox environment. | - Configure Cognito in AWS console.<br />- Connect Amplify Auth library.<br />- Build and test login/register pages.<br />- Verify sessions in sandbox. | ✅ Applicant login and registration functional in sandbox. |
| **Oct 16 (Wed)** | 🗄️ GraphQL + DynamoDB Setup | 1. Finalize schema.<br />2. Push API changes to sandbox.<br />3. Test CRUD operations. | - `amplify push` to sandbox.<br />- Implement `createApplicant` and `updateApplicant` mutations.<br />- Verify DynamoDB persistence.<br />- Merge tested schema into `test` branch. | ✅ Working API for Applicant form section, verified in sandbox. |
| **Oct 17 (Thu)** | 🧠 Stepper UI + Form Layout | 1. Create stepper component in Next.js.<br />2. Implement Applicant Details form.<br />3. Connect to GraphQL mutation (sandbox API). | - Multi-step UI (Next/Back).<br />- Connect first section to backend.<br />- Verify data flow from UI → AppSync → DynamoDB. | ✅ Stepper layout functional and data persisting via sandbox API. |
| **Oct 18 (Fri)** | 💾 Save Draft Functionality | 1. Implement Save Draft logic.<br />2. Persist partial data per step.<br />3. Resume form progress. | - Update `updateApplicant` mutation.<br />- Auto-save on step change.<br />- Retrieve draft data on reload.<br />- Merge working version into `test` branch. | ✅ Save draft working for initial sections. |
| **Oct 21 (Mon)** | 🧾 Add Core Sections | 1. Add Household Occupants section.<br />2. Add Income Details section.<br />3. Integrate save draft. | - Create additional section components.<br />- Extend schema.<br />- Verify section saves and resumes via sandbox backend. | ✅ 3 core sections integrated with backend draft save. |
| **Oct 22 (Tue)** | 📁 File Upload (Supporting Documents) | 1. Add S3 storage.<br />2. Build upload component.<br />3. Link uploaded files to applicant record. | - `amplify add storage`.<br />- Upload to S3 via Amplify Storage API.<br />- Save file metadata in DynamoDB.<br />- Verify end-to-end in sandbox, then merge into `test` branch. | ✅ File uploads working and linked with applicant record. |
| **Oct 23 (Wed)** | ⚙️ Submission Flow + Testing | 1. Implement Review & Submit step.<br />2. Validate required fields.<br />3. Test in sandbox and promote to test branch. | - Create review page.<br />- Add final submit mutation.<br />- Validate mandatory fields.<br />- Merge validated features to `test`. | ✅ End-to-end flow tested successfully in sandbox and promoted to `test`. |
| **Oct 24 (Thu)** | 🚀 Deployment + Demo Prep | 1. Deploy from `test` to `main` branch.<br />2. Publish Amplify Hosting.<br />3. Final verification and demo. | - `amplify publish` from main.<br />- Verify Cognito + API + S3 flow.<br />- Prepare demo walkthrough. | 🚀 MVP deployed from test to production, ready for demo. |

---

## 🧱 Daily Stand-up Format
Each day, share:
- **Yesterday:** Completed tasks  
- **Today:** Planned tasks  
- **Blockers:** Issues or dependencies  

**Example:**  
> ✅ Completed Cognito integration in sandbox  
> 🎯 Today: Adding Save Draft logic  
> ⚠️ Blocker: S3 upload not returning URL  

---

## ⚙️ Branching & Environment Strategy

### 🧩 **Amplify Environments**
| Environment | Purpose | Notes |
|--------------|----------|-------|
| **sandbox** | Used for rapid testing of schema and API updates before pushing to test branch. | Frequent iterations; safe for experimental changes. |
| **test** | Stable environment synced with `test` branch for QA and integration testing. | All changes tested before merge to main. |
| **prod** | Final production environment linked to `main` branch for live deployment. | Used only for final MVP release. |

**Commands Example:**
```bash
amplify sandbox start       # start local backend testing
amplify push --env test     # push tested backend changes
amplify publish --env prod  # deploy final version
