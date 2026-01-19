# 🧪 Login Flow Test Cases - All User Types
 
## Overview
Comprehensive test cases for Applicant, Co-applicant, and Guarantor authentication, authorization, and workflow testing.
 
---
 
## 📋 Test Environment Setup
 
### Prerequisites
- ✅ Cognito User Pool configured
- ✅ DynamoDB tables created (Application, CoApplicant, Guarantor, Payment)
- ✅ Stripe test keys configured
- ✅ S3 bucket for document uploads
- ✅ Email service for OTP delivery
 
### Test Accounts
```javascript
// Test credentials format
APPLICANT_EMAIL = "test.applicant@example.com"
COAPPLICANT_EMAIL = "test.coapplicant@example.com"
GUARANTOR_EMAIL = "test.guarantor@example.com"
TEST_PASSWORD = "TestPass123!"
 
// Stripe Test Cards
STRIPE_SUCCESS_CARD = "4242 4242 4242 4242"
STRIPE_DECLINE_CARD = "4000 0000 0000 0002"
STRIPE_3D_SECURE = "4000 0025 0000 3155"
```
 
---
 
## 🎯 APPLICANT TEST CASES
 
### TC-APP-001: New Applicant Signup (Happy Path)
**Priority:** P0 (Critical)  
**Type:** Functional
 
**Preconditions:**
- User does not have an existing account
- Email is valid and accessible
 
**Test Steps:**
1. Navigate to `/signup`
2. Fill in signup form:
   - Username: `testapplicant123`
   - Email: `test.applicant+001@example.com`
   - Full Name: `John Doe`
   - Phone: `+12025550001`
   - Password: `TestPass123!`
   - Confirm Password: `TestPass123!`
3. Click "Sign Up" button
4. Wait for OTP email
5. Enter OTP code received in email
6. Click "Verify" button
 
**Expected Results:**
- ✅ User account created in Cognito
- ✅ `custom:role` = `"applicant"`
- ✅ `zoneinfo` generated (format: `LPPM-YYYYMMDD-XXXXX`)
- ✅ Email verification sent
- ✅ OTP validation successful
- ✅ Redirected to `/applications`
- ✅ Sidebar shows "My Applications" only
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-APP-002: Applicant Login (Existing Account)
**Priority:** P0 (Critical)  
**Type:** Functional
 
**Preconditions:**
- User has verified account with role = 'applicant'
 
**Test Steps:**
1. Navigate to `/login`
2. Enter credentials:
   - Email: `test.applicant@example.com`
   - Password: `TestPass123!`
3. Click "Sign In" button
 
**Expected Results:**
- ✅ Authentication successful
- ✅ User attributes fetched from Cognito
- ✅ `custom:role` = `"applicant"` detected
- ✅ Redirected to `/applications`
- ✅ Applications list displayed
- ✅ Sidebar shows "My Applications" only
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-APP-003: Applicant Role Authorization Check
**Priority:** P0 (Critical)  
**Type:** Security
 
**Preconditions:**
- Logged in as applicant
 
**Test Steps:**
1. While logged in as applicant, try to access:
   - `/playground/co-applicant`
   - `/playground/guarantor`
   - `/admin`
2. Observe redirects and error messages
 
**Expected Results:**
- ✅ `/playground/co-applicant` → Error toast "No permission"
- ✅ Redirected to `/dashboard`
- ✅ `/playground/guarantor` → Error toast "No permission"
- ✅ Redirected to `/dashboard`
- ✅ `/admin` → Error toast "No permission"
- ✅ Redirected to `/dashboard`
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-APP-004: Create New Application
**Priority:** P0 (Critical)  
**Type:** Functional
 
**Preconditions:**
- Logged in as applicant
- On `/applications` page
 
**Test Steps:**
1. Click "Create New Application" button
2. Navigate to `/applications/new`
3. Complete all 7 steps:
   - Step 1: Personal Information
   - Step 2: Address Information
   - Step 3: Employment Information
   - Step 4: Income Verification (Truv)
   - Step 5: Supporting Documents
   - Step 6: Review and Sign
   - Step 7: Payment ($50)
4. Submit application
 
**Expected Results:**
- ✅ All form fields save on "Save Draft"
- ✅ Form data persists between page reloads
- ✅ Documents upload to S3
- ✅ Truv integration works
- ✅ Signature captured
- ✅ Stripe payment processes
- ✅ Webhook updates Payment table
- ✅ Application status = "submitted"
- ✅ Success message displayed
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-APP-005: Applicant Invalid Login Credentials
**Priority:** P1 (High)  
**Type:** Negative
 
**Preconditions:**
- User account exists
 
**Test Steps:**
1. Navigate to `/login`
2. Enter incorrect credentials:
   - Email: `test.applicant@example.com`
   - Password: `WrongPassword123!`
3. Click "Sign In" button
 
**Expected Results:**
- ❌ Authentication fails
- ✅ Error message displayed: "Incorrect username or password"
- ✅ User remains on login page
- ✅ Password field cleared
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-APP-006: Applicant Generate Co-Applicant Invite Link
**Priority:** P0 (Critical)  
**Type:** Functional
 
**Preconditions:**
- Logged in as applicant
- Has at least one application
 
**Test Steps:**
1. Go to `/applications`
2. Select an application
3. Click "Add Co-Applicant"
4. System generates invite link
5. Copy invite link
 
**Expected Results:**
- ✅ Invite link generated with parameters:
  - `?role=coapplicant1`
  - `&agentSub=[applicant-sub]`
  - `&agentEmail=[applicant-email]`
  - `&unit=[unit-info]`
  - `&address=[property-address]`
- ✅ Link is copyable
- ✅ Link format: `https://domain.com/signup?role=coapplicant1&...`
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-APP-007: Applicant Generate Guarantor Invite Link
**Priority:** P0 (Critical)  
**Type:** Functional
 
**Preconditions:**
- Logged in as applicant
- Has at least one application
 
**Test Steps:**
1. Go to `/applications`
2. Select an application
3. Click "Add Guarantor"
4. System generates invite link
5. Copy invite link
 
**Expected Results:**
- ✅ Invite link generated with parameters:
  - `?role=guarantor1`
  - `&agentSub=[applicant-sub]`
  - `&agentEmail=[applicant-email]`
  - `&unit=[unit-info]`
  - `&address=[property-address]`
- ✅ Link is copyable
- ✅ Link format: `https://domain.com/signup?role=guarantor1&...`
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
## 💑 CO-APPLICANT TEST CASES
 
### TC-COAPP-001: Co-Applicant Signup via Invite Link (Happy Path)
**Priority:** P0 (Critical)  
**Type:** Functional
 
**Preconditions:**
- Valid invite link received from applicant
- User does not have an existing account
- Link format: `/signup?role=coapplicant1&agentSub=XXX&agentEmail=YYY&unit=ZZZ&address=AAA`
 
**Test Steps:**
1. Click invite link
2. Redirected to `/signup` with pre-filled parameters
3. Fill in signup form:
   - Username: `testcoapplicant123`
   - Email: `test.coapplicant+001@example.com`
   - Full Name: `Jane Smith`
   - Phone: `+12025550002`
   - Password: `TestPass123!`
4. Click "Sign Up" button
5. Enter OTP received in email
6. Click "Verify" button
 
**Expected Results:**
- ✅ User account created in Cognito
- ✅ `custom:role` = `"coapplicant1"` (from URL)
- ✅ `zoneinfo` = applicant's application_id
- ✅ `custom:agentSub` stored
- ✅ `custom:agentEmail` stored
- ✅ `custom:unit` stored
- ✅ `custom:address` stored
- ✅ OTP validation successful
- ✅ Redirected to `/playground/co-applicant`
- ✅ Sidebar shows "Co-Applicants" only
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-COAPP-002: Co-Applicant Login (Existing Account)
**Priority:** P0 (Critical)  
**Type:** Functional
 
**Preconditions:**
- Co-applicant has verified account
- `custom:role` = `"coapplicant1"`
 
**Test Steps:**
1. Navigate to `/login`
2. Enter credentials:
   - Email: `test.coapplicant@example.com`
   - Password: `TestPass123!`
3. Click "Sign In" button
 
**Expected Results:**
- ✅ Authentication successful
- ✅ `custom:role` = `"coapplicant1"` detected
- ✅ Redirected to `/playground/co-applicant`
- ✅ Co-applicant form displayed
- ✅ Sidebar shows "Co-Applicants" only
- ✅ Cannot access Applications or Guarantors pages
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-COAPP-003: Co-Applicant Role Authorization Check
**Priority:** P0 (Critical)  
**Type:** Security
 
**Preconditions:**
- Logged in as co-applicant
 
**Test Steps:**
1. While logged in as co-applicant, try to access:
   - `/applications`
   - `/playground/guarantor`
   - `/admin`
2. Observe redirects and error messages
 
**Expected Results:**
- ✅ `/applications` → Error toast "No permission"
- ✅ Redirected to `/dashboard`
- ✅ `/playground/guarantor` → Error toast "No permission"
- ✅ Redirected to `/dashboard`
- ✅ `/admin` → Error toast "No permission"
- ✅ Redirected to `/dashboard`
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-COAPP-004: Complete Co-Applicant Form (7 Steps)
**Priority:** P0 (Critical)  
**Type:** Functional
 
**Preconditions:**
- Logged in as co-applicant
- On `/playground/co-applicant` page
- No existing form data
 
**Test Steps:**
1. Complete Step 1 - Personal Information:
   - Name (auto-populated from Cognito)
   - Email (auto-populated from Cognito)
   - Phone
   - Relationship to applicant
   - Date of birth
   - SSN
2. Click "Next" → Save Draft
3. Complete Step 2 - Address Information:
   - Current address
   - City, State, ZIP
   - Length at address
4. Click "Next" → Save Draft
5. Complete Step 3 - Employment:
   - Employment type
   - Employer name
   - Position
   - Annual income
6. Click "Next" → Save Draft
7. Complete Step 4 - Income Verification (Truv):
   - Click "Connect Bank Account"
   - Complete Truv Bridge flow
   - Verify connection successful
8. Click "Next" → Save Draft
9. Complete Step 5 - Documents:
   - Upload ID document
   - Upload proof of income
   - Upload bank statements
10. Click "Next" → Save Draft
11. Complete Step 6 - Review & Sign:
    - Review all information
    - Sign digitally
12. Click "Next" → Save Draft
13. Complete Step 7 - Payment:
    - Stripe embedded checkout displayed
    - Enter test card: 4242 4242 4242 4242
    - CVV: 123, Exp: 12/26
    - Complete payment
14. Submit application
 
**Expected Results:**
- ✅ All steps save data to DynamoDB (CoApplicant table)
- ✅ Form data persists between sessions
- ✅ Documents upload to S3: `documents/{userId}/`
- ✅ Truv bridgeToken and shareUrl saved
- ✅ Signature captured as base64
- ✅ Stripe payment processes ($50.00)
- ✅ Webhook fires: `checkout.session.completed`
- ✅ Payment table updated
- ✅ CoApplicant status = "submitted"
- ✅ Payment status = "paid"
- ✅ Success message displayed
- ✅ Form marked as complete
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-COAPP-005: Co-Applicant Save Draft and Resume
**Priority:** P1 (High)  
**Type:** Functional
 
**Preconditions:**
- Logged in as co-applicant
- Partially completed form (e.g., Steps 1-3 done)
 
**Test Steps:**
1. Fill Steps 1-3 of co-applicant form
2. Click "Save Draft" on Step 3
3. Log out
4. Log back in
5. Navigate to `/playground/co-applicant`
 
**Expected Results:**
- ✅ Draft data saved to DynamoDB
- ✅ Form loads with saved data
- ✅ Current step = last completed step
- ✅ All previously entered data visible
- ✅ User can continue from where they left off
- ✅ Status = "draft"
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-COAPP-006: Co-Applicant Payment Declined
**Priority:** P1 (High)  
**Type:** Negative
 
**Preconditions:**
- Logged in as co-applicant
- Completed steps 1-6
- On payment step (Step 7)
 
**Test Steps:**
1. Enter Stripe decline test card: `4000 0000 0000 0002`
2. CVV: 123, Exp: 12/26
3. Click "Pay $50.00"
 
**Expected Results:**
- ❌ Payment fails
- ✅ Error message displayed: "Your card was declined"
- ✅ User remains on payment step
- ✅ Can retry with different card
- ✅ Form data still saved
- ✅ Status remains "draft"
- ✅ Payment status = "failed"
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-COAPP-007: Co-Applicant Data Isolation
**Priority:** P0 (Critical)  
**Type:** Security
 
**Preconditions:**
- Two co-applicants logged in (different accounts)
 
**Test Steps:**
1. Co-applicant A logs in and creates form data
2. Log out
3. Co-applicant B logs in
4. Navigate to `/playground/co-applicant`
5. Verify Co-applicant B sees only their own data
 
**Expected Results:**
- ✅ Co-applicant A can only see their own data
- ✅ Co-applicant B can only see their own data
- ✅ DynamoDB queries scoped to `userId`
- ✅ No data leakage between users
- ✅ S3 documents scoped to `userId`
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-COAPP-008: Multiple Co-Applicants for Same Application
**Priority:** P1 (High)  
**Type:** Functional
 
**Preconditions:**
- One main application exists
- Applicant generates 2+ co-applicant invite links with different roles
 
**Test Steps:**
1. Generate invite link with `role=coapplicant1`
2. Generate invite link with `role=coapplicant2`
3. Sign up Co-applicant 1 via first link
4. Sign up Co-applicant 2 via second link
5. Both complete their forms
6. Admin views application
 
**Expected Results:**
- ✅ Both co-applicants created with different roles
- ✅ Both linked to same `application_id`
- ✅ Both stored in CoApplicant table
- ✅ Both visible in admin dashboard
- ✅ No data conflicts
- ✅ Each has unique `userId` but same `application_id`
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
## 🛡️ GUARANTOR TEST CASES
 
### TC-GUAR-001: Guarantor Signup via Invite Link (Happy Path)
**Priority:** P0 (Critical)  
**Type:** Functional
 
**Preconditions:**
- Valid invite link received from applicant
- User does not have an existing account
- Link format: `/signup?role=guarantor1&agentSub=XXX&agentEmail=YYY&unit=ZZZ&address=AAA`
 
**Test Steps:**
1. Click invite link
2. Redirected to `/signup` with pre-filled parameters
3. Fill in signup form:
   - Username: `testguarantor123`
   - Email: `test.guarantor+001@example.com`
   - Full Name: `Bob Johnson`
   - Phone: `+12025550003`
   - Password: `TestPass123!`
4. Click "Sign Up" button
5. Enter OTP received in email
6. Click "Verify" button
 
**Expected Results:**
- ✅ User account created in Cognito
- ✅ `custom:role` = `"guarantor1"` (from URL)
- ✅ `zoneinfo` = applicant's application_id
- ✅ `custom:agentSub` stored
- ✅ `custom:agentEmail` stored
- ✅ `custom:unit` stored
- ✅ `custom:address` stored
- ✅ OTP validation successful
- ✅ Redirected to `/playground/guarantor`
- ✅ Sidebar shows "Guarantors" only
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-GUAR-002: Guarantor Login (Existing Account)
**Priority:** P0 (Critical)  
**Type:** Functional
 
**Preconditions:**
- Guarantor has verified account
- `custom:role` = `"guarantor1"`
 
**Test Steps:**
1. Navigate to `/login`
2. Enter credentials:
   - Email: `test.guarantor@example.com`
   - Password: `TestPass123!`
3. Click "Sign In" button
 
**Expected Results:**
- ✅ Authentication successful
- ✅ `custom:role` = `"guarantor1"` detected
- ✅ Redirected to `/playground/guarantor`
- ✅ Guarantor form displayed
- ✅ Sidebar shows "Guarantors" only
- ✅ Cannot access Applications or Co-Applicants pages
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-GUAR-003: Guarantor Role Authorization Check
**Priority:** P0 (Critical)  
**Type:** Security
 
**Preconditions:**
- Logged in as guarantor
 
**Test Steps:**
1. While logged in as guarantor, try to access:
   - `/applications`
   - `/playground/co-applicant`
   - `/admin`
2. Observe redirects and error messages
 
**Expected Results:**
- ✅ `/applications` → Error toast "No permission"
- ✅ Redirected to `/dashboard`
- ✅ `/playground/co-applicant` → Error toast "No permission"
- ✅ Redirected to `/dashboard`
- ✅ `/admin` → Error toast "No permission"
- ✅ Redirected to `/dashboard`
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-GUAR-004: Complete Guarantor Form (7 Steps)
**Priority:** P0 (Critical)  
**Type:** Functional
 
**Preconditions:**
- Logged in as guarantor
- On `/playground/guarantor` page
- No existing form data
 
**Test Steps:**
1. Complete Step 1 - Personal Information:
   - Name (auto-populated from Cognito)
   - Email (auto-populated from Cognito)
   - Phone
   - Relationship to applicant
   - Date of birth
   - SSN
2. Click "Next" → Save Draft
3. Complete Step 2 - Address & Landlord Information:
   - Current address
   - City, State, ZIP
   - Length at address
   - Landlord name, address, contact
   - Current rent amount
4. Click "Next" → Save Draft
5. Complete Step 3 - Employment:
   - Employment type
   - Employer name
   - Position
   - Annual income
6. Click "Next" → Save Draft
7. Complete Step 4 - Income Verification (Truv):
   - Click "Connect Bank Account"
   - Complete Truv Bridge flow
   - Verify connection successful
8. Click "Next" → Save Draft
9. Complete Step 5 - Documents:
   - Upload ID document
   - Upload proof of income
   - Upload bank statements
10. Click "Next" → Save Draft
11. Complete Step 6 - Review & Sign:
    - Review all information
    - Sign digitally
12. Click "Next" → Save Draft
13. Complete Step 7 - Payment:
    - Stripe embedded checkout displayed
    - Enter test card: 4242 4242 4242 4242
    - CVV: 123, Exp: 12/26
    - Complete payment
14. Submit application
 
**Expected Results:**
- ✅ All steps save data to DynamoDB (Guarantor table)
- ✅ Form data persists between sessions
- ✅ Documents upload to S3: `documents/{userId}/`
- ✅ Truv bridgeToken and shareUrl saved
- ✅ Signature captured as base64
- ✅ Landlord information saved
- ✅ Stripe payment processes ($50.00)
- ✅ Webhook fires: `checkout.session.completed`
- ✅ Payment table updated
- ✅ Guarantor status = "submitted"
- ✅ Payment status = "paid"
- ✅ Success message displayed
- ✅ Form marked as complete
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-GUAR-005: Guarantor Save Draft and Resume
**Priority:** P1 (High)  
**Type:** Functional
 
**Preconditions:**
- Logged in as guarantor
- Partially completed form (e.g., Steps 1-4 done)
 
**Test Steps:**
1. Fill Steps 1-4 of guarantor form
2. Click "Save Draft" on Step 4
3. Log out
4. Log back in
5. Navigate to `/playground/guarantor`
 
**Expected Results:**
- ✅ Draft data saved to DynamoDB
- ✅ Form loads with saved data
- ✅ Current step = last completed step
- ✅ All previously entered data visible
- ✅ User can continue from where they left off
- ✅ Status = "draft"
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-GUAR-006: Guarantor Payment with 3D Secure
**Priority:** P1 (High)  
**Type:** Functional
 
**Preconditions:**
- Logged in as guarantor
- Completed steps 1-6
- On payment step (Step 7)
 
**Test Steps:**
1. Enter Stripe 3D Secure test card: `4000 0025 0000 3155`
2. CVV: 123, Exp: 12/26
3. Click "Pay $50.00"
4. Complete 3D Secure authentication
5. Confirm payment
 
**Expected Results:**
- ✅ 3D Secure modal appears
- ✅ User completes authentication
- ✅ Payment processes successfully
- ✅ Webhook fires
- ✅ Payment status = "paid"
- ✅ Guarantor status = "submitted"
- ✅ redirect_on_completion = 'if_required' handles 3D Secure
- ✅ Success message displayed
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-GUAR-007: Multiple Guarantors for Same Application
**Priority:** P1 (High)  
**Type:** Functional
 
**Preconditions:**
- One main application exists
- Applicant generates 2+ guarantor invite links with different roles
 
**Test Steps:**
1. Generate invite link with `role=guarantor1`
2. Generate invite link with `role=guarantor2`
3. Sign up Guarantor 1 via first link
4. Sign up Guarantor 2 via second link
5. Both complete their forms
6. Admin views application
 
**Expected Results:**
- ✅ Both guarantors created with different roles
- ✅ Both linked to same `application_id`
- ✅ Both stored in Guarantor table
- ✅ Both visible in admin dashboard
- ✅ No data conflicts
- ✅ Each has unique `userId` but same `application_id`
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
## 🔄 CROSS-ROLE TEST CASES
 
### TC-CROSS-001: Role Switching Prevention
**Priority:** P0 (Critical)  
**Type:** Security
 
**Preconditions:**
- User logged in with one role
 
**Test Steps:**
1. Log in as applicant
2. Try to manually navigate to co-applicant page
3. Try to manually navigate to guarantor page
4. Log out
5. Log in as co-applicant
6. Try to access applicant pages
7. Log out
8. Log in as guarantor
9. Try to access applicant and co-applicant pages
 
**Expected Results:**
- ✅ All unauthorized access attempts blocked
- ✅ Error toast displayed
- ✅ Redirected to appropriate dashboard
- ✅ No data exposure
- ✅ Role cannot be changed via URL manipulation
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-CROSS-002: Complete Application Flow (All Roles)
**Priority:** P0 (Critical)  
**Type:** End-to-End
 
**Preconditions:**
- Fresh test environment
- No existing data
 
**Test Steps:**
1. **Main Applicant:**
   - Sign up as applicant
   - Create new application
   - Complete all 7 steps
   - Submit with payment
2. **Add Co-Applicant:**
   - Generate co-applicant invite link
   - Send to co-applicant email
3. **Co-Applicant:**
   - Click invite link
   - Sign up as co-applicant
   - Complete all 7 steps
   - Submit with payment
4. **Add Guarantor:**
   - Applicant generates guarantor invite link
   - Send to guarantor email
5. **Guarantor:**
   - Click invite link
   - Sign up as guarantor
   - Complete all 7 steps
   - Submit with payment
6. **Admin Review:**
   - Admin logs in
   - Views complete application with:
     - Main application
     - Co-applicant data
     - Guarantor data
     - All payment statuses
 
**Expected Results:**
- ✅ Main application created successfully
- ✅ Application ID (zoneinfo) consistent
- ✅ Co-applicant linked to application
- ✅ Guarantor linked to application
- ✅ All payments processed ($50 each = $150 total)
- ✅ All payment statuses = "paid"
- ✅ Admin sees complete application package
- ✅ All documents stored in S3
- ✅ All Truv data captured
- ✅ All signatures captured
- ✅ Webhook logs show all 3 payment events
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-CROSS-003: Payment Webhook Reliability
**Priority:** P0 (Critical)  
**Type:** Integration
 
**Preconditions:**
- Stripe webhook configured
- `/api/stripe/webhook` endpoint live
 
**Test Steps:**
1. Complete payment for applicant
2. Check webhook logs
3. Verify Payment table updated
4. Complete payment for co-applicant
5. Check webhook logs
6. Verify Payment table updated
7. Complete payment for guarantor
8. Check webhook logs
9. Verify Payment table updated
 
**Expected Results:**
- ✅ All 3 webhooks received
- ✅ Webhook signature verified
- ✅ Payment records created for all 3
- ✅ Status updated correctly for all 3
- ✅ Metadata (userId, applicationId) correct
- ✅ Amount = 5000 cents ($50.00) for all 3
- ✅ Event type = `checkout.session.completed`
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-CROSS-004: Admin Dashboard Visibility
**Priority:** P0 (Critical)  
**Type:** Functional
 
**Preconditions:**
- Admin logged in
- Test data exists for all three user types
 
**Test Steps:**
1. Log in as admin
2. Navigate to `/admin`
3. Check "Applications" tab
4. Check "Co-Applicants" tab
5. Check "Guarantors" tab
6. Check "Payments" tab
7. Verify filters work
8. Verify search works
 
**Expected Results:**
- ✅ All tabs visible
- ✅ Applications tab shows all main applications
- ✅ Co-Applicants tab shows all co-applicants
- ✅ Guarantors tab shows all guarantors
- ✅ Payments tab shows all payment transactions
- ✅ Payment status badges display correctly
- ✅ Filters work (status, property, date)
- ✅ Search works across all tabs
- ✅ Data accurate and real-time
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-CROSS-005: Session Timeout and Re-authentication
**Priority:** P1 (High)  
**Type:** Security
 
**Preconditions:**
- User logged in (any role)
- Session timeout set (default: 1 hour)
 
**Test Steps:**
1. Log in as any user type
2. Wait for session to expire (or force expiration)
3. Try to access protected page
4. Observe redirect behavior
5. Re-authenticate
6. Verify redirect to original intended page
 
**Expected Results:**
- ✅ Session expires after timeout
- ✅ User redirected to login page
- ✅ Error message: "Session expired, please log in"
- ✅ After login, redirected to role-appropriate dashboard
- ✅ JWT token refreshed
- ✅ New session established
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
## 🔒 SECURITY TEST CASES
 
### TC-SEC-001: SQL Injection Prevention (DynamoDB)
**Priority:** P0 (Critical)  
**Type:** Security
 
**Test Steps:**
1. Try injecting SQL-like syntax in form fields:
   - Name: `'; DROP TABLE Application;--`
   - Email: `test@example.com' OR '1'='1`
2. Submit form
3. Check database
 
**Expected Results:**
- ✅ No SQL injection possible (DynamoDB doesn't use SQL)
- ✅ Input sanitized
- ✅ Data stored as-is (string)
- ✅ No database corruption
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-SEC-002: XSS Prevention
**Priority:** P0 (Critical)  
**Type:** Security
 
**Test Steps:**
1. Enter XSS payload in form fields:
   - Name: `<script>alert('XSS')</script>`
   - Address: `<img src=x onerror=alert('XSS')>`
2. Submit form
3. View data in admin dashboard
4. Check if script executes
 
**Expected Results:**
- ✅ XSS payload escaped/sanitized
- ✅ Script does not execute
- ✅ Data displayed as plain text
- ✅ React automatically escapes JSX
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-SEC-003: JWT Token Manipulation
**Priority:** P0 (Critical)  
**Type:** Security
 
**Test Steps:**
1. Log in as applicant
2. Capture JWT token from browser
3. Modify token payload (change role to 'admin')
4. Send modified token with API request
5. Try to access admin page
 
**Expected Results:**
- ✅ Modified token rejected
- ✅ Signature verification fails
- ✅ User cannot access admin page
- ✅ Error: "Invalid token"
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-SEC-004: CSRF Protection
**Priority:** P1 (High)  
**Type:** Security
 
**Test Steps:**
1. Create malicious site with form auto-submit
2. Target: `/api/stripe/create-checkout-session`
3. Try to initiate payment from external site
4. Check if request succeeds
 
**Expected Results:**
- ✅ CSRF attack blocked
- ✅ Same-origin policy enforced
- ✅ API requires valid origin header
- ✅ Next.js API routes protected
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-SEC-005: Data Access Control (userId Scoping)
**Priority:** P0 (Critical)  
**Type:** Security
 
**Test Steps:**
1. User A creates application (userId = A)
2. User B logs in (userId = B)
3. User B tries to access User A's data via:
   - Direct URL manipulation
   - API calls with User A's IDs
   - DynamoDB query manipulation
4. Check if access is granted
 
**Expected Results:**
- ✅ User B cannot access User A's data
- ✅ All queries scoped to authenticated userId
- ✅ No data leakage
- ✅ 403 Forbidden or empty results
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
## 📱 RESPONSIVE DESIGN TEST CASES
 
### TC-RESP-001: Mobile Login Flow
**Priority:** P1 (High)  
**Type:** UI/UX
 
**Test Steps:**
1. Open site on mobile device (375x667 - iPhone SE)
2. Navigate to `/login`
3. Complete login process
4. Check form rendering
 
**Expected Results:**
- ✅ Form fields stack vertically
- ✅ Buttons are touch-friendly (min 44x44px)
- ✅ Text is readable (min 16px)
- ✅ No horizontal scrolling
- ✅ Keyboard doesn't obscure inputs
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-RESP-002: Tablet Form Completion
**Priority:** P2 (Medium)  
**Type:** UI/UX
 
**Test Steps:**
1. Open site on tablet (768x1024 - iPad)
2. Complete 7-step form as any role
3. Check layout and interactions
 
**Expected Results:**
- ✅ Form uses available space efficiently
- ✅ Two-column layout where appropriate
- ✅ Progress indicator visible
- ✅ Sidebar collapses appropriately
 
**Actual Results:**
_[To be filled during testing]_
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
## 🌐 BROWSER COMPATIBILITY TEST CASES
 
### TC-BROWSER-001: Chrome
**Priority:** P0 (Critical)  
**Type:** Compatibility
 
**Test Steps:**
1. Open site in Chrome (latest version)
2. Complete full login flow for all three roles
3. Test all features
 
**Expected Results:**
- ✅ All features work
- ✅ No console errors
- ✅ Stripe checkout renders correctly
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-BROWSER-002: Safari
**Priority:** P0 (Critical)  
**Type:** Compatibility
 
**Test Steps:**
1. Open site in Safari (latest version)
2. Complete full login flow for all three roles
3. Test all features
 
**Expected Results:**
- ✅ All features work
- ✅ No console errors
- ✅ Date pickers work correctly
- ✅ File uploads work
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
### TC-BROWSER-003: Firefox
**Priority:** P1 (High)  
**Type:** Compatibility
 
**Test Steps:**
1. Open site in Firefox (latest version)
2. Complete full login flow for all three roles
3. Test all features
 
**Expected Results:**
- ✅ All features work
- ✅ No console errors
- ✅ Form validation works
 
**Status:** ⬜ Not Run | 🟡 In Progress | ✅ Pass | ❌ Fail
 
---
 
## 📊 TEST EXECUTION SUMMARY
 
### Test Coverage by Priority
- **P0 (Critical):** 27 test cases
- **P1 (High):** 12 test cases
- **P2 (Medium):** 1 test case
 
### Test Coverage by Category
- **Functional:** 22 test cases
- **Security:** 9 test cases
- **Integration:** 4 test cases
- **UI/UX:** 2 test cases
- **Compatibility:** 3 test cases
- **Negative:** 3 test cases
 
### Test Execution Checklist
- [ ] All P0 tests executed
- [ ] All P1 tests executed
- [ ] All critical bugs fixed
- [ ] Regression testing complete
- [ ] Performance testing complete
- [ ] Security audit complete
- [ ] Documentation updated
 
---
 
## 🐛 BUG REPORTING TEMPLATE
 
### Bug Report Format
```markdown
**Bug ID:** BUG-YYYY-MM-DD-XXX
**Test Case:** TC-XXX-YYY
**Priority:** P0/P1/P2
**Severity:** Critical/High/Medium/Low
 
**Description:**
[Brief description of the bug]
 
**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3
 
**Expected Result:**
[What should happen]
 
**Actual Result:**
[What actually happened]
 
**Screenshots/Logs:**
[Attach evidence]
 
**Environment:**
- Browser:
- OS:
- Date:
```
 
---
 
## ✅ TEST SIGN-OFF
 
**Tested By:** _________________  
**Date:** _________________  
**Environment:** Production / Staging / Development  
**Version:** _________________  
 
**Sign-Off:**
- [ ] All critical test cases passed
- [ ] All known bugs documented
- [ ] Regression testing complete
- [ ] Ready for production deployment
 
**Notes:**
_[Any additional notes or observations]_
 
---
 
**Generated:** January 19, 2026  
**Version:** 1.0  
**Last Updated:** January 19, 2026
 
 