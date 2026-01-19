# 🔐 Login Flow Diagram - All User Types
 
## Overview
This document provides comprehensive logic flow diagrams for all three user types: Applicant, Co-applicant, and Guarantor.
 
---
 
## 📊 User Authentication & Role Assignment Flow
 
```mermaid
graph TB
    Start([User Visits Site]) --> SignupOrLogin{Already has<br/>account?}
    
    %% Login Path
    SignupOrLogin -->|Yes| LoginPage[Navigate to /login]
    LoginPage --> EnterCreds[Enter credentials<br/>username/email + password]
    EnterCreds --> CognitoAuth[Cognito authenticates user]
    CognitoAuth --> AuthSuccess{Auth<br/>Successful?}
    
    AuthSuccess -->|No| ShowError[Show error message]
    ShowError --> LoginPage
    
    AuthSuccess -->|Yes| FetchUserAttrs[Fetch user attributes<br/>from Cognito]
    FetchUserAttrs --> GetRole[Extract custom:role<br/>from attributes]
    
    %% Signup Path
    SignupOrLogin -->|No| SignupType{Signup Type?}
    
    %% Main Applicant Signup
    SignupType -->|Main Applicant| MainSignup[Navigate to /signup]
    MainSignup --> EnterSignupInfo[Enter signup info:<br/>- Username<br/>- Email<br/>- Phone<br/>- Password<br/>- Full Name]
    EnterSignupInfo --> GenerateZoneinfo[Generate unique zoneinfo:<br/>LPPM-YYYYMMDD-XXXXX]
    GenerateZoneinfo --> SetApplicantRole[Set custom:role = 'applicant']
    SetApplicantRole --> CreateCognitoUser[Create Cognito user<br/>with attributes]
    CreateCognitoUser --> SendOTP[Send verification OTP<br/>to email]
    SendOTP --> EnterOTP[User enters OTP code]
    EnterOTP --> VerifyOTP{OTP Valid?}
    VerifyOTP -->|No| SendOTP
    VerifyOTP -->|Yes| GetRole
    
    %% Co-Applicant Signup
    SignupType -->|Co-Applicant| CoAppInvite[Receive invite link<br/>with parameters:<br/>?agentSub=XXX<br/>&agentEmail=YYY<br/>&role=coapplicant1]
    CoAppInvite --> CoAppSignup[Navigate to /signup<br/>with params]
    CoAppSignup --> EnterCoAppInfo[Enter signup info:<br/>- Username<br/>- Email<br/>- Password<br/>- Full Name]
    EnterCoAppInfo --> ExtractParams[Extract from URL:<br/>- agentSub<br/>- agentEmail<br/>- unit<br/>- address]
    ExtractParams --> GenerateCoAppZoneinfo[Use main applicant's<br/>zoneinfo as application_id]
    GenerateCoAppZoneinfo --> SetCoAppRole[Set custom:role from URL<br/>coapplicant1/2/3/4]
    SetCoAppRole --> StoreCoAppAttrs[Store in Cognito:<br/>- custom:role<br/>- custom:agentSub<br/>- custom:agentEmail<br/>- custom:unit<br/>- custom:address<br/>- zoneinfo]
    StoreCoAppAttrs --> CreateCoAppUser[Create Cognito user]
    CreateCoAppUser --> SendCoAppOTP[Send OTP to email]
    SendCoAppOTP --> EnterCoAppOTP[User enters OTP]
    EnterCoAppOTP --> VerifyCoAppOTP{OTP Valid?}
    VerifyCoAppOTP -->|No| SendCoAppOTP
    VerifyCoAppOTP -->|Yes| GetRole
    
    %% Guarantor Signup
    SignupType -->|Guarantor| GuarantorInvite[Receive invite link<br/>with parameters:<br/>?agentSub=XXX<br/>&agentEmail=YYY<br/>&role=guarantor1]
    GuarantorInvite --> GuarantorSignup[Navigate to /signup<br/>with params]
    GuarantorSignup --> EnterGuarantorInfo[Enter signup info:<br/>- Username<br/>- Email<br/>- Password<br/>- Full Name]
    EnterGuarantorInfo --> ExtractGuarantorParams[Extract from URL:<br/>- agentSub<br/>- agentEmail<br/>- unit<br/>- address]
    ExtractGuarantorParams --> GenerateGuarantorZoneinfo[Use main applicant's<br/>zoneinfo as application_id]
    GenerateGuarantorZoneinfo --> SetGuarantorRole[Set custom:role from URL<br/>guarantor1/2/3/4]
    SetGuarantorRole --> StoreGuarantorAttrs[Store in Cognito:<br/>- custom:role<br/>- custom:agentSub<br/>- custom:agentEmail<br/>- custom:unit<br/>- custom:address<br/>- zoneinfo]
    StoreGuarantorAttrs --> CreateGuarantorUser[Create Cognito user]
    CreateGuarantorUser --> SendGuarantorOTP[Send OTP to email]
    SendGuarantorOTP --> EnterGuarantorOTP[User enters OTP]
    EnterGuarantorOTP --> VerifyGuarantorOTP{OTP Valid?}
    VerifyGuarantorOTP -->|No| SendGuarantorOTP
    VerifyGuarantorOTP -->|Yes| GetRole
    
    %% Role-Based Routing
    GetRole --> RoleCheck{Check<br/>custom:role}
    
    RoleCheck -->|applicant| ApplicantDash[Redirect to<br/>/applications]
    RoleCheck -->|coapplicant1-4| CoAppDash[Redirect to<br/>/playground/co-applicant]
    RoleCheck -->|guarantor1-4| GuarantorDash[Redirect to<br/>/playground/guarantor]
    RoleCheck -->|admin| AdminDash[Redirect to<br/>/admin]
    RoleCheck -->|agent| AgentDash[Redirect to<br/>/listings/active]
    RoleCheck -->|undefined/other| DefaultDash[Redirect to<br/>/dashboard]
    
    DefaultDash --> RoleRedirect[Dashboard auto-detects<br/>role and redirects]
    RoleRedirect --> GetRole
 
    style Start fill:#e1f5ff
    style ApplicantDash fill:#90EE90
    style CoAppDash fill:#FFB6C1
    style GuarantorDash fill:#DDA0DD
    style AdminDash fill:#FFD700
    style AgentDash fill:#87CEEB
```
 
---
 
## 🎯 Applicant Login Flow
 
```mermaid
flowchart TD
    A1[Applicant visits /login] --> A2[Enter credentials]
    A2 --> A3[Cognito Sign In]
    A3 --> A4{Auth<br/>Success?}
    
    A4 -->|No| A5[Show error]
    A5 --> A1
    
    A4 -->|Yes| A6[Fetch user attributes]
    A6 --> A7[Extract custom:role]
    A7 --> A8{Role =<br/>'applicant'?}
    
    A8 -->|No| A9[Redirect to<br/>role dashboard]
    A8 -->|Yes| A10[Redirect to /applications]
    
    A10 --> A11[Load Applications Page]
    A11 --> A12[Verify role = 'applicant']
    A12 --> A13{Authorized?}
    
    A13 -->|No| A14[Show error toast:<br/>'No permission']
    A14 --> A15[Redirect to /dashboard]
    
    A13 -->|Yes| A16[Fetch user data:<br/>- sub userId<br/>- zoneinfo applicationId]
    A16 --> A17[Query DynamoDB:<br/>Application table<br/>WHERE userId = sub]
    A17 --> A18[Display applications list]
    A18 --> A19[Sidebar shows:<br/>- My Applications ONLY]
    
    A19 --> A20[User can:<br/>- View applications<br/>- Edit applications<br/>- Add co-applicants<br/>- Add guarantors]
    
    A20 --> A21{Action?}
    A21 -->|Create New| A22[Navigate to<br/>/applications/new]
    A21 -->|Edit| A23[Load existing data<br/>from DynamoDB]
    A21 -->|Add Co-App| A24[Generate invite link<br/>with role=coapplicant]
    A21 -->|Add Guarantor| A25[Generate invite link<br/>with role=guarantor]
    
    style A10 fill:#90EE90
    style A18 fill:#E8F5E9
    style A20 fill:#C8E6C9
```
 
---
 
## 💑 Co-Applicant Login Flow
 
```mermaid
flowchart TD
    C1[Co-Applicant visits /login] --> C2[Enter credentials]
    C2 --> C3[Cognito Sign In]
    C3 --> C4{Auth<br/>Success?}
    
    C4 -->|No| C5[Show error]
    C5 --> C1
    
    C4 -->|Yes| C6[Fetch user attributes]
    C6 --> C7[Extract custom:role<br/>e.g. 'coapplicant1']
    C7 --> C8{Role starts with<br/>'coapplicant'?}
    
    C8 -->|No| C9[Redirect to<br/>role dashboard]
    C8 -->|Yes| C10[Redirect to<br/>/playground/co-applicant]
    
    C10 --> C11[Load Co-Applicant Page]
    C11 --> C12[Verify role starts with<br/>'coapplicant']
    C12 --> C13{Authorized?}
    
    C13 -->|No| C14[Show error toast:<br/>'No permission']
    C14 --> C15[Redirect to /dashboard]
    
    C13 -->|Yes| C16[Fetch user data:<br/>- sub userId<br/>- zoneinfo applicationId<br/>- custom:role e.g. coapplicant1<br/>- custom:agentSub<br/>- custom:agentEmail]
    
    C16 --> C17[Query DynamoDB:<br/>CoApplicant table<br/>WHERE userId = sub<br/>AND application_id = zoneinfo]
    
    C17 --> C18{Existing<br/>record?}
    
    C18 -->|No| C19[Show empty form<br/>Auto-populate:<br/>- Name from Cognito<br/>- Email from Cognito]
    
    C18 -->|Yes| C20[Load saved data:<br/>- Personal info<br/>- Employment<br/>- Documents<br/>- Payment status<br/>- Truv data]
    
    C19 --> C21[Display 7-step form]
    C20 --> C21
    
    C21 --> C22[Sidebar shows:<br/>- Co-Applicants ONLY]
    
    C22 --> C23[Available steps:<br/>1. Personal Info<br/>2. Address Info<br/>3. Employment<br/>4. Income Verification Truv<br/>5. Documents Upload<br/>6. Review & Sign<br/>7. Payment]
    
    C23 --> C24{User action?}
    
    C24 -->|Save Draft| C25[Save to CoApplicant table<br/>status = 'draft']
    C24 -->|Upload Docs| C26[Upload to S3<br/>Path: documents/userId/]
    C24 -->|Complete Truv| C27[Truv Bridge integration<br/>Store: bridgeToken, shareUrl]
    C24 -->|Make Payment| C28[Create Stripe session<br/>Amount: $50]
    
    C28 --> C29[Embedded Stripe Checkout]
    C29 --> C30{Payment<br/>Complete?}
    
    C30 -->|No| C31[Show payment error]
    C30 -->|Yes| C32[Stripe webhook fires:<br/>checkout.session.completed]
    
    C32 --> C33[Update Payment table:<br/>- userId<br/>- applicationId<br/>- status: 'paid'<br/>- amount: 5000 cents]
    
    C33 --> C34[Update CoApplicant:<br/>status = 'submitted'<br/>payment = JSON data]
    
    C34 --> C35[Show success message]
    C35 --> C36[Application submitted]
    
    style C10 fill:#FFB6C1
    style C21 fill:#FFE4E1
    style C35 fill:#98FB98
```
 
---
 
## 🛡️ Guarantor Login Flow
 
```mermaid
flowchart TD
    G1[Guarantor visits /login] --> G2[Enter credentials]
    G2 --> G3[Cognito Sign In]
    G3 --> G4{Auth<br/>Success?}
    
    G4 -->|No| G5[Show error]
    G5 --> G1
    
    G4 -->|Yes| G6[Fetch user attributes]
    G6 --> G7[Extract custom:role<br/>e.g. 'guarantor1']
    G7 --> G8{Role starts with<br/>'guarantor'?}
    
    G8 -->|No| G9[Redirect to<br/>role dashboard]
    G8 -->|Yes| G10[Redirect to<br/>/playground/guarantor]
    
    G10 --> G11[Load Guarantor Page]
    G11 --> G12[Verify role starts with<br/>'guarantor']
    G12 --> G13{Authorized?}
    
    G13 -->|No| G14[Show error toast:<br/>'No permission']
    G14 --> G15[Redirect to /dashboard]
    
    G13 -->|Yes| G16[Fetch user data:<br/>- sub userId<br/>- zoneinfo applicationId<br/>- custom:role e.g. guarantor1<br/>- custom:agentSub<br/>- custom:agentEmail]
    
    G16 --> G17[Query DynamoDB:<br/>Guarantor table<br/>WHERE userId = sub<br/>AND application_id = zoneinfo]
    
    G17 --> G18{Existing<br/>record?}
    
    G18 -->|No| G19[Show empty form<br/>Auto-populate:<br/>- Name from Cognito<br/>- Email from Cognito]
    
    G18 -->|Yes| G20[Load saved data:<br/>- Personal info<br/>- Employment<br/>- Documents<br/>- Payment status<br/>- Truv data]
    
    G19 --> G21[Display 7-step form]
    G20 --> G21
    
    G21 --> G22[Sidebar shows:<br/>- Guarantors ONLY]
    
    G22 --> G23[Available steps:<br/>1. Personal Info<br/>2. Address & Landlord Info<br/>3. Employment<br/>4. Income Verification Truv<br/>5. Documents Upload<br/>6. Review & Sign<br/>7. Payment]
    
    G23 --> G24{User action?}
    
    G24 -->|Save Draft| G25[Save to Guarantor table<br/>status = 'draft']
    G24 -->|Upload Docs| G26[Upload to S3<br/>Path: documents/userId/]
    G24 -->|Complete Truv| G27[Truv Bridge integration<br/>Store: bridgeToken, shareUrl]
    G24 -->|Make Payment| G28[Create Stripe session<br/>Amount: $50]
    
    G28 --> G29[Embedded Stripe Checkout]
    G29 --> G30{Payment<br/>Complete?}
    
    G30 -->|No| G31[Show payment error]
    G30 -->|Yes| G32[Stripe webhook fires:<br/>checkout.session.completed]
    
    G32 --> G33[Update Payment table:<br/>- userId<br/>- applicationId<br/>- status: 'paid'<br/>- amount: 5000 cents]
    
    G33 --> G34[Update Guarantor:<br/>status = 'submitted'<br/>payment = JSON data]
    
    G34 --> G35[Show success message]
    G35 --> G36[Application submitted]
    
    style G10 fill:#DDA0DD
    style G21 fill:#F0E6FF
    style G35 fill:#98FB98
```
 
---
 
## 🔑 Key Cognito Attributes by User Type
 
### Applicant
```json
{
  "sub": "uuid-xxxx-xxxx",
  "email": "applicant@example.com",
  "email_verified": "true",
  "name": "John Doe",
  "phone_number": "+1234567890",
  "custom:role": "applicant",
  "zoneinfo": "LPPM-20260119-12345"
}
```
 
### Co-Applicant
```json
{
  "sub": "uuid-yyyy-yyyy",
  "email": "coapplicant@example.com",
  "email_verified": "true",
  "name": "Jane Smith",
  "phone_number": "+1234567891",
  "custom:role": "coapplicant1",
  "zoneinfo": "LPPM-20260119-12345",
  "custom:agentSub": "agent-sub-id",
  "custom:agentEmail": "agent@example.com",
  "custom:unit": "Apt 3B",
  "custom:address": "123 Main St"
}
```
 
### Guarantor
```json
{
  "sub": "uuid-zzzz-zzzz",
  "email": "guarantor@example.com",
  "email_verified": "true",
  "name": "Bob Johnson",
  "phone_number": "+1234567892",
  "custom:role": "guarantor1",
  "zoneinfo": "LPPM-20260119-12345",
  "custom:agentSub": "agent-sub-id",
  "custom:agentEmail": "agent@example.com",
  "custom:unit": "Apt 3B",
  "custom:address": "123 Main St"
}
```
 
---
 
## 🔐 Role-Based Access Control Matrix
 
| Feature | Applicant | Co-Applicant | Guarantor | Admin | Agent |
|---------|-----------|--------------|-----------|-------|-------|
| **Sidebar Access** |
| My Applications | ✅ | ❌ | ❌ | ✅ | ✅ |
| Co-Applicants | ❌ | ✅ | ❌ | ✅ | ❌ |
| Guarantors | ❌ | ❌ | ✅ | ✅ | ❌ |
| Admin Dashboard | ❌ | ❌ | ❌ | ✅ | ❌ |
| Active Listings | ❌ | ❌ | ❌ | ✅ | ✅ |
| **Page Access** |
| /applications | ✅ | ❌ | ❌ | ✅ | ✅ |
| /applications/new | ✅ | ❌ | ❌ | ✅ | ✅ |
| /playground/co-applicant | ❌ | ✅ | ❌ | ✅ | ❌ |
| /playground/guarantor | ❌ | ❌ | ✅ | ✅ | ❌ |
| /admin | ❌ | ❌ | ❌ | ✅ | ❌ |
| /listings/active | ❌ | ❌ | ❌ | ✅ | ✅ |
| **Actions** |
| Create Application | ✅ | ❌ | ❌ | ✅ | ✅ |
| Edit Application | ✅ | ❌ | ❌ | ✅ | ✅ |
| Submit Co-App Form | ❌ | ✅ | ❌ | ❌ | ❌ |
| Submit Guarantor Form | ❌ | ❌ | ✅ | ❌ | ❌ |
| Make Payment | ✅ | ✅ | ✅ | ❌ | ❌ |
| View All Applications | ❌ | ❌ | ❌ | ✅ | ✅ |
| Generate Invite Links | ✅ | ❌ | ❌ | ✅ | ✅ |
 
---
 
## 📊 Database Query Patterns by Role
 
### Applicant Queries
```typescript
// Get user's applications
const applications = await client.models.Application.list({
  filter: { userId: { eq: userSub } }
})
 
// Get co-applicants for application
const coApplicants = await client.models.CoApplicant.list({
  filter: { application_id: { eq: applicationId } }
})
 
// Get guarantors for application
const guarantors = await client.models.Guarantor.list({
  filter: { application_id: { eq: applicationId } }
})
```
 
### Co-Applicant Queries
```typescript
// Get own co-applicant record
const coApplicant = await client.models.CoApplicant.get({
  userId: userSub,
  coApplicantId: zoneinfo
})
 
// Or list all records for this user
const records = await client.models.CoApplicant.list({
  filter: {
    userId: { eq: userSub },
    application_id: { eq: zoneinfo }
  }
})
```
 
### Guarantor Queries
```typescript
// Get own guarantor record
const guarantor = await client.models.Guarantor.get({
  userId: userSub,
  guarantorId: zoneinfo
})
 
// Or list all records for this user
const records = await client.models.Guarantor.list({
  filter: {
    userId: { eq: userSub },
    application_id: { eq: zoneinfo }
  }
})
```
 
---
 
## 🔄 Payment Processing Flow (All User Types)
 
```mermaid
sequenceDiagram
    participant User
    participant Form as Application Form
    participant API as Next.js API
    participant Stripe
    participant Webhook as Stripe Webhook
    participant DB as DynamoDB
    
    User->>Form: Complete Step 7 (Payment)
    Form->>API: POST /api/stripe/create-checkout-session
    Note over API: userId, userEmail, userRole,<br/>applicationId, amount
    
    API->>Stripe: Create embedded checkout session
    Note over Stripe: mode: 'payment'<br/>ui_mode: 'embedded'<br/>redirect_on_completion: 'if_required'
    
    Stripe-->>API: Return clientSecret
    API-->>Form: clientSecret
    
    Form->>Stripe: Display embedded checkout
    User->>Stripe: Complete payment
    
    Stripe->>Webhook: POST /api/stripe/webhook
    Note over Webhook: Event: checkout.session.completed
    
    Webhook->>Webhook: Verify signature
    Webhook->>DB: Create/Update Payment record
    Note over DB: Payment table<br/>userId, applicationId,<br/>status: 'paid'
    
    Webhook->>DB: Update Application status
    Note over DB: Application/CoApplicant/Guarantor<br/>status: 'submitted'
    
    Stripe-->>Form: onComplete callback fires
    Form->>User: Show success message
    Form->>Form: Navigate to next page
```
 
---
 
## 🎯 Key Implementation Files
 
### Authentication & Role Management
- `lib/cognito-sdk.ts` - Cognito SDK functions (signUp, signIn, attributes)
- `lib/role-routing.ts` - Role-based routing logic
- `components/login-form.tsx` - Login form component
- `components/signup-form.tsx` - Signup form component
 
### Page-Level Authorization
- `app/applications/page.tsx` - Applicant dashboard
- `app/playground/co-applicant/page.tsx` - Co-applicant dashboard
- `app/playground/guarantor/page.tsx` - Guarantor dashboard
- `app/admin/page.tsx` - Admin dashboard
 
### Forms & Payment
- `components/co-applicant-form.tsx` - 7-step co-applicant form
- `components/guarantor-form.tsx` - 7-step guarantor form
- `components/stripe-payment-step.tsx` - Embedded Stripe checkout
 
### API Routes
- `app/api/stripe/create-checkout-session/route.ts` - Create payment session
- `app/api/stripe/webhook/route.ts` - Handle Stripe events
 
### Database Operations
- `lib/co-applicant-db.ts` - Co-applicant CRUD operations
- `lib/guarantor-db.ts` - Guarantor CRUD operations
- `lib/payment-api.ts` - Payment status queries
 
---
 
## 🚀 Testing Scenarios
 
### Scenario 1: New Applicant
1. User visits site → No account
2. Click "Sign Up" → Role not specified
3. Enter details → Auto-assign role = 'applicant'
4. Verify email → Enter OTP
5. Login → Redirect to /applications
6. Create new application → 7-step form
 
### Scenario 2: Invited Co-Applicant
1. Applicant generates invite link with ?role=coapplicant1
2. Co-applicant receives link
3. Click link → Opens /signup with params
4. Sign up → Role = 'coapplicant1' auto-set
5. Verify email → Enter OTP
6. Login → Redirect to /playground/co-applicant
7. Fill form → Complete payment → Submit
 
### Scenario 3: Invited Guarantor
1. Applicant generates invite link with ?role=guarantor1
2. Guarantor receives link
3. Click link → Opens /signup with params
4. Sign up → Role = 'guarantor1' auto-set
5. Verify email → Enter OTP
6. Login → Redirect to /playground/guarantor
7. Fill form → Complete payment → Submit
 
### Scenario 4: Returning User
1. User has existing account
2. Visit /login
3. Enter credentials
4. Cognito validates
5. Fetch custom:role attribute
6. Redirect based on role:
   - applicant → /applications
   - coapplicant → /playground/co-applicant
   - guarantor → /playground/guarantor
   - admin → /admin
   - agent → /listings/active
 
---
 
## 🔐 Security Features
 
### Authentication
✅ Cognito JWT tokens for all authenticated requests  
✅ Email verification required (OTP)  
✅ Phone number validation (E.164 format)  
✅ Password complexity requirements  
 
### Authorization
✅ Role-based access control (RBAC)  
✅ Page-level authorization checks  
✅ Sidebar filtering based on role  
✅ API route protection  
 
### Data Isolation
✅ Users can only access their own data (userId filter)  
✅ Co-applicants scoped to application_id  
✅ Guarantors scoped to application_id  
✅ Admin has full access  
 
### Payment Security
✅ Stripe embedded checkout (PCI compliant)  
✅ Webhook signature verification  
✅ Metadata validation (userId, applicationId)  
✅ Amount stored in cents (5000 = $50.00)  
 
---
 
## 📈 State Management
 
### User State (All Roles)
```typescript
const [userId, setUserId] = useState<string>("")           // Cognito sub
const [userZoneinfo, setUserZoneinfo] = useState<string>("")  // Application ID
const [userRole, setUserRole] = useState<string>("")       // custom:role
const [email, setEmail] = useState<string>("")
const [name, setName] = useState<string>("")
```
 
### Application State (Applicant)
```typescript
const [applications, setApplications] = useState<Application[]>([])
const [coApplicants, setCoApplicants] = useState<CoApplicant[]>([])
const [guarantors, setGuarantors] = useState<Guarantor[]>([])
const [payments, setPayments] = useState<Payment[]>([])
```
 
### Form State (Co-Applicant/Guarantor)
```typescript
const [currentStep, setCurrentStep] = useState<number>(0)
const [formStatus, setFormStatus] = useState<"draft" | "submitted">("draft")
const [paymentStatus, setPaymentStatus] = useState<string>("pending")
const [documents, setDocuments] = useState<any[]>([])
const [truvBridgeToken, setTruvBridgeToken] = useState<string>("")
const [signature, setSignature] = useState<string>("")
```
 
---
 
## 🎉 Summary
 
This comprehensive flow diagram covers:
 
1. ✅ **Authentication** - Signup, login, OTP verification
2. ✅ **Role Assignment** - Automatic via custom:role attribute
3. ✅ **Authorization** - Page-level and component-level checks
4. ✅ **Routing** - Role-based dashboard redirection
5. ✅ **Data Access** - Scoped queries based on userId and role
6. ✅ **Payment Processing** - Stripe embedded checkout + webhooks
7. ✅ **Security** - JWT tokens, role validation, data isolation
 
All three user types (Applicant, Co-Applicant, Guarantor) follow similar patterns with role-specific variations in:
- Signup parameters (invite links with role)
- Dashboard access (different pages)
- Form workflows (similar 7-step structure)
- Data tables (different DynamoDB tables)
- Payment integration (same Stripe flow)
 
---
 
**Generated:** January 19, 2026  
**Version:** 1.0  
**Status:** ✅ Production Ready
 
 