# Testing Checklist for Beta Features

## 🧪 Testing the Countdown Timer

### Homepage (Solutions Teaser Section)
- [ ] Navigate to homepage
- [ ] Scroll to "Our MVP Portfolio" section
- [ ] Verify two countdown timers appear side-by-side
- [ ] Check that GhEHR timer shows correct countdown (to Q1 2026)
- [ ] Check that AgriConnect timer shows correct countdown (to Q2 2026)
- [ ] Verify timers update every second (watch seconds count down)
- [ ] Check mobile responsiveness (timers stack on mobile)

### AgriConnect Solution Page
- [ ] Navigate to `/solutions/agriconnect`
- [ ] Check hero section for countdown timer
- [ ] Verify timer shows "AgriConnect launches in:"
- [ ] Check timer updates in real-time
- [ ] Verify styling (white background with green border)

### GhEHR Solution Page
- [ ] Navigate to `/solutions/ghehr`
- [ ] Check hero section for countdown timer
- [ ] Verify timer shows "GhEHR launches in:"
- [ ] Check timer updates in real-time
- [ ] Verify styling matches design

## 🧪 Testing the Beta Signup Form

### Contact Page
- [ ] Navigate to `/contact`
- [ ] Check for dedicated beta signup section at top (green gradient background)
- [ ] Verify form fields:
  - [ ] Name field (required)
  - [ ] Email field (required, validates email format)
  - [ ] Platform dropdown (AgriConnect, GhEHR, Both)
  - [ ] Role field (required)
- [ ] Test form validation:
  - [ ] Try submitting empty form (should show errors)
  - [ ] Try invalid email (should show error)
  - [ ] Try name < 2 characters (should show error)
- [ ] Fill out form completely and submit
- [ ] Verify success message appears
- [ ] Check toast notification appears
- [ ] Verify form resets after success

### Contact Page Tabs
- [ ] Check tabs appear: "General Inquiry" and "Beta Access"
- [ ] Click "Beta Access" tab
- [ ] Verify beta signup form appears
- [ ] Switch back to "General Inquiry" tab
- [ ] Verify regular contact form appears

### AgriConnect Solution Page
- [ ] Navigate to `/solutions/agriconnect`
- [ ] Scroll to "Request Beta Access" section
- [ ] Verify beta signup form appears
- [ ] Check that "AgriConnect" is pre-selected in platform dropdown
- [ ] Test form submission
- [ ] Verify success state

### GhEHR Solution Page
- [ ] Navigate to `/solutions/ghehr`
- [ ] Scroll to "Request Beta Access" section
- [ ] Verify beta signup form appears
- [ ] Check that "GhEHR" is pre-selected in platform dropdown
- [ ] Test form submission
- [ ] Verify success state

## 🔗 Testing Navigation & Links

### "Request Beta Access" Buttons
- [ ] Click "Request Beta Access" button on homepage
- [ ] Verify it navigates to contact page or scrolls to beta section
- [ ] Click "Request Beta Access" on AgriConnect page
- [ ] Verify it scrolls to beta signup section (#beta-signup anchor)
- [ ] Click "Request Beta Access" on GhEHR page
- [ ] Verify it scrolls to beta signup section (#beta-signup anchor)

### Smooth Scrolling
- [ ] Test smooth scroll to beta section works
- [ ] Verify page doesn't jump abruptly
- [ ] Check on mobile devices

## 📱 Mobile Responsiveness

### Countdown Timers
- [ ] Test on mobile viewport
- [ ] Verify timers stack vertically on mobile
- [ ] Check text is readable
- [ ] Verify spacing is appropriate

### Beta Signup Forms
- [ ] Test form on mobile
- [ ] Verify all fields are accessible
- [ ] Check dropdown works on mobile
- [ ] Verify submit button is easily clickable
- [ ] Test keyboard navigation

## 🎨 Visual Testing

### Countdown Timer Styling
- [ ] Verify green border (border-[#27AE60])
- [ ] Check white background
- [ ] Verify text is readable
- [ ] Check clock icon appears
- [ ] Verify numbers are large and bold

### Beta Form Styling
- [ ] Check form has white background
- [ ] Verify border and shadow
- [ ] Check button is green (#27AE60)
- [ ] Verify success state (green background, white text)
- [ ] Check loading state (spinner appears)

## 🔧 Functional Testing

### Form Submission
- [ ] Submit valid beta signup form
- [ ] Check browser console for errors
- [ ] Verify API call is made to `/api/contact`
- [ ] Check network tab for request/response
- [ ] Verify success toast appears
- [ ] Check that form data is correctly formatted

### Error Handling
- [ ] Test with network disconnected (should show error)
- [ ] Test with invalid API response
- [ ] Verify error toast appears
- [ ] Check form doesn't reset on error

### Success State
- [ ] After successful submission, verify:
  - [ ] Success message appears
  - [ ] Form is hidden
  - [ ] "Request Access for Another Platform" button appears
  - [ ] Clicking button resets form

## 🐛 Common Issues to Check

- [ ] No console errors in browser DevTools
- [ ] No TypeScript errors in IDE
- [ ] All imports resolve correctly
- [ ] Components render without crashing
- [ ] No layout shifts when timers update
- [ ] Forms don't submit multiple times on double-click
- [ ] Loading states work correctly

## 📊 Expected Behavior

### Countdown Timer
- Updates every second
- Shows days, hours, minutes, seconds
- Formats numbers correctly (no leading zeros needed)
- Handles timezone correctly
- Shows "Launch Day!" when date is reached

### Beta Signup Form
- Validates all required fields
- Shows helpful error messages
- Submits to `/api/contact` endpoint
- Formats message with platform and role info
- Shows success state after submission
- Allows reset to submit again

## 🚀 Quick Test Commands

```bash
# Start dev server
npm run dev

# Check for TypeScript errors (if tsc is available)
npx tsc --noEmit

# Build to check for build errors
npm run build
```

## 📝 Test Results Template

```
Date: ___________
Tester: ___________

Countdown Timer:
- Homepage: [ ] Pass [ ] Fail - Notes: ___________
- AgriConnect: [ ] Pass [ ] Fail - Notes: ___________
- GhEHR: [ ] Pass [ ] Fail - Notes: ___________

Beta Signup Form:
- Contact Page: [ ] Pass [ ] Fail - Notes: ___________
- AgriConnect: [ ] Pass [ ] Fail - Notes: ___________
- GhEHR: [ ] Pass [ ] Fail - Notes: ___________

Navigation:
- Links work: [ ] Pass [ ] Fail - Notes: ___________
- Smooth scroll: [ ] Pass [ ] Fail - Notes: ___________

Mobile:
- Responsive: [ ] Pass [ ] Fail - Notes: ___________

Issues Found:
1. ___________
2. ___________
3. ___________
```

## 🎯 Priority Tests

**Must Test:**
1. ✅ Countdown timers display and update
2. ✅ Beta form validation works
3. ✅ Form submission succeeds
4. ✅ Success state displays
5. ✅ No console errors

**Should Test:**
6. Mobile responsiveness
7. Smooth scrolling
8. Error handling
9. Form reset after success

**Nice to Test:**
10. Performance (timer updates don't lag)
11. Accessibility (keyboard navigation)
12. Cross-browser compatibility

