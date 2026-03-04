# 🚀 Production Deployment Checklist

## ✅ P0 Critical Improvements Implemented

### 1. **Authentication & Route Protection**
- ✅ Created `ProtectedRoute` component
- ✅ Added authentication checks to `/booking/*`, `/dashboard`, `/chat`
- ✅ Role-based access control (patient/clinician)
- ✅ Auth state subscription with auto-redirect

**Files Modified:**
- `src/components/ProtectedRoute.jsx` (NEW)
- `src/routes/AppRoutes.jsx` (UPDATED)

### 2. **Form Validation System**
- ✅ Comprehensive validation schemas
- ✅ Email, phone, name validation
- ✅ Date validation (no past dates)
- ✅ Payment amount validation
- ✅ Centralized validation logic

**Files Modified:**
- `src/lib/validations.js` (NEW)
- `src/pages/BookingPage.jsx` (UPDATED)

### 3. **Payment Security Hardening**
- ✅ Server-side amount verification in Edge Function
- ✅ Expert rate validation from database
- ✅ Prevents client-side manipulation
- ✅ Amount mismatch detection
- ✅ Maximum payment limit enforcement

**Files Modified:**
- `supabase/functions/create-razorpay-order/index.ts` (ENHANCED)

---

## 🔒 Security Enhancements

### Authentication Flow
```javascript
// Before: No auth check
navigate("/booking/:id");

// After: Protected route
<ProtectedRoute allowedRoles={['patient']}>
  <BookingPage />
</ProtectedRoute>
```

### Payment Verification
```javascript
// Client sends request
{ amount: 150000, expertId: "uuid" }

// Edge Function verifies:
1. Fetch expert from database
2. Compare client amount vs server rate
3. Reject if mismatch
4. Create Razorpay order only if valid
```

---

## 📋 Still Needed (Manual Setup)

### Database RLS Policies

Run these SQL commands in Supabase SQL Editor:

```sql
-- Enable RLS on bookings table
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Patients can view their own bookings
CREATE POLICY "Patients can view own bookings"
ON bookings FOR SELECT
USING (auth.uid() = patient_id);

-- Patients can create their own bookings
CREATE POLICY "Patients can create own bookings"
ON bookings FOR INSERT
WITH CHECK (auth.uid() = patient_id);

-- Clinicians can view bookings for their patients
CREATE POLICY "Clinicians can view their bookings"
ON bookings FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM clinicians
    WHERE clinicians.profile_id = auth.uid()
    AND clinicians.id = clinician_profile_id
  )
);

-- Mood entries privacy
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own mood entries"
ON mood_entries FOR ALL
USING (auth.uid() = user_id);

-- Journal entries privacy
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own journal entries"
ON journal_entries FOR ALL
USING (auth.uid() = patient_id);
```

### Database Indexes for Performance

```sql
-- Bookings indexes
CREATE INDEX idx_bookings_patient_id ON bookings(patient_id);
CREATE INDEX idx_bookings_clinician_id ON bookings(clinician_profile_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_scheduled_at ON bookings(scheduled_at);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);

-- Clinicians indexes
CREATE INDEX idx_clinicians_specialization ON clinicians(specialization);
CREATE INDEX idx_clinicians_city ON clinicians(city);
CREATE INDEX idx_clinicians_avg_rating ON clinicians(avg_rating DESC);
CREATE INDEX idx_clinicians_type ON clinicians(clinician_type);

-- Mood entries indexes
CREATE INDEX idx_mood_entries_user_id ON mood_entries(user_id);
CREATE INDEX idx_mood_entries_created_at ON mood_entries(created_at DESC);

-- Journal entries indexes
CREATE INDEX idx_journal_entries_patient_id ON journal_entries(patient_id);
CREATE INDEX idx_journal_entries_created_at ON journal_entries(created_at DESC);
```

### Environment Variables

Create `.env` file:

```bash
# Supabase
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Razorpay
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx
VITE_RAZORPAY_MODE=test

# Feature Flags
VITE_ENABLE_BOOKINGS=true
VITE_ENABLE_CHAT=true

# Environment
VITE_ENVIRONMENT=development
```

Create `.env.example` for version control (without actual keys):

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_RAZORPAY_KEY_ID=
VITE_RAZORPAY_MODE=test
VITE_ENVIRONMENT=development
```

---

## 🎯 Testing Checklist

### Manual Testing

- [ ] **Auth Flow**
  - [ ] Unauthenticated user redirected to /auth
  - [ ] Authenticated user can access protected routes
  - [ ] Wrong role (clinician) blocked from patient routes
  
- [ ] **Booking Flow**
  - [ ] Form validates all fields properly
  - [ ] Past dates rejected
  - [ ] Invalid emails rejected
  - [ ] Phone validation works
  - [ ] Payment amount verified server-side
  - [ ] Razorpay checkout opens
  - [ ] Success confirmation shows
  - [ ] Booking saved to database

- [ ] **Security**
  - [ ] Cannot manipulate payment amount in browser
  - [ ] Cannot book without login
  - [ ] RLS policies prevent unauthorized access
  - [ ] Error messages don't leak sensitive info

### Automated Testing (Recommended)

```bash
# Install testing libraries
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm run test
```

---

## 📊 Monitoring Setup

### 1. Error Tracking (Sentry)

```bash
npm install @sentry/react @sentry/tracing
```

Initialize in `main.jsx`:

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_ENVIRONMENT,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 0.2,
});
```

### 2. Analytics (Google Analytics)

Add to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
  
  // Track bookings
  gtag('event', 'booking_started', {
    'event_category': 'conversion',
    'event_label': 'Expert Booking'
  });
</script>
```

---

## 🔧 Deployment Steps

### 1. Deploy Edge Functions

```bash
# Login to Supabase
supabase login

# Link project
supabase link --project-ref your_project_ref

# Deploy function
supabase functions deploy create-razorpay-order

# Set secrets
supabase secrets set RAZORPAY_KEY_ID=your_key_id
supabase secrets set RAZORPAY_KEY_SECRET=your_key_secret
supabase secrets set SUPABASE_URL=your_supabase_url
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. Build Frontend

```bash
cd frontend
npm install
npm run build

# Test production build
npm run preview
```

### 3. Database Migration

Run all SQL commands from the RLS and Indexes sections above.

### 4. Environment Configuration

Set production environment variables in your hosting platform:
- Vercel: Settings → Environment Variables
- Netlify: Site Settings → Build & Deploy → Environment
- AWS Amplify: App Settings → Environment Variables

---

## 🚨 Common Production Issues & Solutions

### Issue: "Amount verification failed"
**Cause:** Client sending wrong amount
**Solution:** Edge function now fetches expert rate from DB

### Issue: "RLS policy violation"
**Cause:** User trying to access others' data
**Solution:** Implement RLS policies as shown above

### Issue: "Razorpay not defined"
**Cause:** Razorpay script not loaded
**Solution:** Add script tag to `index.html`

### Issue: "User not authenticated"
**Cause:** Session expired
**Solution:** ProtectedRoute handles redirect to /auth

---

## 📈 Performance Optimization

### Code Splitting

Update `AppRoutes.jsx`:

```javascript
import { lazy, Suspense } from 'react';

const ExpertsPage = lazy(() => import("@/pages/ExpertsPage"));
const ExpertDetail = lazy(() => import("@/pages/ExpertDetail"));
const BookingPage = lazy(() => import("@/pages/BookingPage"));

// In Routes
<Suspense fallback={<LoadingSpinner />}>
  <Route path="/experts" element={<ExpertsPage />} />
</Suspense>
```

### Image Optimization

```jsx
// Use WebP format
<img 
  src={expert.image.replace('.jpg', '.webp')} 
  alt={expert.name}
  loading="lazy"
  width="400"
  height="400"
/>
```

---

## ✅ Pre-Launch Checklist

- [ ] All P0 items implemented
- [ ] RLS policies added
- [ ] Database indexes created
- [ ] Environment variables set
- [ ] Edge functions deployed
- [ ] Payment flow tested end-to-end
- [ ] Auth flow tested
- [ ] Mobile responsive tested
- [ ] Cross-browser tested
- [ ] Error tracking configured
- [ ] Analytics setup
- [ ] Terms & Privacy pages created
- [ ] Contact/support information added
- [ ] SSL certificate active
- [ ] Database backups enabled
- [ ] Rate limiting configured
- [ ] Load testing completed

---

## 🎉 Post-Launch Monitoring

### Week 1 Metrics to Watch:
- Booking conversion rate
- Payment failure rate
- Auth error rate
- Page load times
- API response times
- Error rates by type

### Tools to Use:
- Supabase Logs
- Razorpay Dashboard
- Google Analytics
- Sentry/Error Tracking
- Lighthouse Performance

---

**Status: Ready for Production Review** ✅

All critical security and validation improvements have been implemented. Manual database configuration required before deployment.
