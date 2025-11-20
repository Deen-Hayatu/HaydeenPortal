# Quick Test Guide

## 🚀 Starting the Server

The dev server should be running. If not, start it with:
```bash
npm run dev
```

Then open: **http://localhost:5001** (or check your terminal for the actual port)

## ✅ Quick Visual Checks

### 1. Homepage Countdown Timers
1. Go to homepage
2. Scroll down to "Our MVP Portfolio" section
3. **Look for:** Two countdown timers side-by-side showing:
   - GhEHR: Countdown to Q1 2026
   - AgriConnect: Countdown to Q2 2026
4. **Watch:** Numbers should update every second

### 2. Beta Signup Form on Contact Page
1. Go to `/contact`
2. **Look for:** Green gradient section at top with beta signup form
3. **Also check:** Tabs at top of contact form ("General Inquiry" / "Beta Access")
4. **Test:** Fill out the beta form and submit

### 3. Solution Pages
1. Go to `/solutions/agriconnect`
   - Check hero section for countdown timer
   - Scroll down to "Request Beta Access" section
   - Verify form has "AgriConnect" pre-selected

2. Go to `/solutions/ghehr`
   - Check hero section for countdown timer
   - Scroll down to "Request Beta Access" section
   - Verify form has "GhEHR" pre-selected

## 🐛 Common Issues & Fixes

### Countdown Timer Not Showing
- Check browser console for errors
- Verify dates are in the future
- Check that Clock icon from lucide-react is imported

### Beta Form Not Submitting
- Check browser console for errors
- Verify `/api/contact` endpoint is working
- Check network tab for API call
- Verify form validation passes

### Styling Issues
- Clear browser cache
- Check Tailwind classes are correct
- Verify responsive breakpoints

## 📱 Test on Mobile

1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Test on iPhone/Android sizes
4. Verify:
   - Timers stack vertically
   - Forms are readable
   - Buttons are clickable

## 🔍 Browser Console Checks

Open DevTools Console (F12) and check for:
- ✅ No red errors
- ✅ No TypeScript errors
- ✅ No missing imports
- ✅ No undefined components

## 📊 Expected Countdown Values

As of today, you should see approximately:
- **GhEHR:** ~330+ days (until Jan 1, 2026)
- **AgriConnect:** ~430+ days (until Apr 1, 2026)

*Note: Actual values depend on current date*

## 🎯 What to Test

1. **Countdown Timers**
   - [ ] Display correctly
   - [ ] Update every second
   - [ ] Show correct time remaining
   - [ ] Look good on mobile

2. **Beta Signup Forms**
   - [ ] All fields work
   - [ ] Validation works
   - [ ] Submission succeeds
   - [ ] Success message appears
   - [ ] Form resets properly

3. **Navigation**
   - [ ] "Request Beta Access" buttons work
   - [ ] Smooth scrolling works
   - [ ] Links navigate correctly

## 💡 Tips

- Use browser DevTools to inspect elements
- Check Network tab to see API calls
- Use React DevTools if installed
- Test in incognito mode to avoid cache issues

## 🆘 If Something Doesn't Work

1. **Check browser console** for errors
2. **Check terminal** where dev server is running
3. **Verify imports** are correct
4. **Clear browser cache** and reload
5. **Restart dev server** if needed

## 📝 Report Issues

If you find issues, note:
- What page/component
- What you expected
- What actually happened
- Browser console errors (if any)
- Screenshot (if possible)

