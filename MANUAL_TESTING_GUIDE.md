# Manual Testing Guide for Production Branch

## Quick Start

### 1. Ensure You're on Production Branch
```bash
git checkout production
git pull origin production  # If you pushed it to remote
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 3. Start Development Server

**Important**: This is a monorepo - all dependencies are in the root `package.json`. Don't `cd` into `client`.

```bash
# Option 1: Run Vite dev server from root (recommended)
npx vite --config client/vite.config.ts

# Option 2: Run full stack (frontend + backend)
npm run dev  # This runs the backend server
# Then in another terminal:
npx vite --config client/vite.config.ts
```

The frontend will typically run on: `http://localhost:5173` (Vite default)
The backend will typically run on: `http://localhost:5001`

## Testing Checklist

### ✅ Visual & Layout Testing

#### 1. Homepage (`/`)
- [ ] Hero section displays correctly
- [ ] All buttons are properly aligned
- [ ] Solutions teaser cards are evenly spaced
- [ ] No content overflow on mobile
- [ ] All sections have consistent spacing
- [ ] Images load properly
- [ ] Animations work smoothly

#### 2. About Page (`/about`)
- [ ] Hero section looks good
- [ ] Stats cards are aligned properly
- [ ] Operating principles section is well-spaced
- [ ] Founder photo displays correctly
- [ ] All flex containers wrap properly on mobile
- [ ] Button groups are centered/aligned correctly

#### 3. Contact Page (`/contact`)
- [ ] Form placeholders show professional text
  - "Enter your full name" (not "John Doe")
  - "your.email@domain.com" (not "john@example.com")
- [ ] Form fields are properly aligned
- [ ] Contact information section looks good
- [ ] Map displays correctly
- [ ] FAQ section is well-formatted

#### 4. Products Page (`/products`)
- [ ] Product cards display correctly
- [ ] Button groups are aligned
- [ ] Grid layout works on all screen sizes
- [ ] No overflow issues
- [ ] All CTAs are clickable

#### 5. Solutions Pages (`/solutions/*`)
- [ ] Solution cards are consistent
- [ ] Feature lists display properly
- [ ] All buttons align correctly
- [ ] Content is readable

#### 6. Careers Page (`/careers`)
- [ ] Job listings are well-formatted
- [ ] Badges align properly
- [ ] Application process section looks good

### ✅ Responsive Design Testing

Test on different screen sizes:

#### Mobile (320px - 768px)
- [ ] All text is readable
- [ ] Buttons are properly sized (min 44x44px for touch)
- [ ] Navigation menu works
- [ ] Forms are usable
- [ ] No horizontal scrolling
- [ ] Flex containers wrap properly
- [ ] Images scale correctly

#### Tablet (768px - 1024px)
- [ ] Layout adapts correctly
- [ ] Grids show appropriate columns
- [ ] Spacing is consistent
- [ ] Navigation is accessible

#### Desktop (1024px+)
- [ ] Content doesn't stretch too wide
- [ ] Max-width constraints work
- [ ] Hover states work
- [ ] All interactive elements are accessible

### ✅ Flexbox & Layout Testing

Check these specific improvements:

1. **Button Groups**
   - Open browser DevTools
   - Inspect button groups on various pages
   - Verify they have `flex-wrap` and `items-center`
   - Resize browser window - buttons should wrap nicely

2. **Flex Containers**
   - Check stats section on homepage
   - Check solutions teaser
   - Verify all flex containers wrap on mobile
   - No content should overflow

3. **Spacing Consistency**
   - Compare spacing between similar sections
   - Verify consistent gaps in flex containers
   - Check padding consistency

### ✅ Browser Testing

Test in multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### ✅ Form Testing

1. **Contact Form** (`/contact`)
   - [ ] All placeholders show updated text
   - [ ] Form validation works
   - [ ] Submit button works
   - [ ] Error messages display correctly

2. **Beta Signup Form**
   - [ ] Placeholders are professional
   - [ ] Form validation works
   - [ ] All fields are accessible

3. **Application Form** (`/apply`)
   - [ ] All placeholders are updated
   - [ ] Form is usable on mobile
   - [ ] Validation works correctly

### ✅ Performance Testing

1. **Page Load**
   - [ ] Pages load quickly
   - [ ] No console errors
   - [ ] Images load properly
   - [ ] No broken assets

2. **Interactions**
   - [ ] Hover effects work smoothly
   - [ ] Button clicks are responsive
   - [ ] Animations don't lag
   - [ ] Form interactions are smooth

### ✅ Accessibility Testing

1. **Keyboard Navigation**
   - [ ] Tab through all interactive elements
   - [ ] Focus states are visible
   - [ ] Forms are keyboard accessible

2. **Screen Reader** (if available)
   - [ ] All images have alt text
   - [ ] Form labels are properly associated
   - [ ] Semantic HTML is used

3. **Visual**
   - [ ] Text contrast is sufficient
   - [ ] Focus indicators are visible
   - [ ] No content relies solely on color

## Common Issues to Watch For

### ❌ Flexbox Issues
- Content overflowing containers
- Buttons not wrapping on mobile
- Misaligned items in flex containers

### ❌ Consistency Issues
- Inconsistent spacing between sections
- Different button styles on different pages
- Inconsistent typography

### ❌ Placeholder Issues
- Old placeholder text still showing
- Unprofessional example content

### ❌ Responsive Issues
- Horizontal scrolling on mobile
- Text too small on mobile
- Buttons too small for touch
- Content cut off on small screens

## Testing Tools

### Browser DevTools
1. **Open DevTools**: `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
2. **Toggle Device Toolbar**: `Cmd+Shift+M` (Mac) / `Ctrl+Shift+M` (Windows)
3. **Test Different Sizes**: Use preset sizes or custom dimensions

### Console Checks
- Open Console tab
- Look for errors (red text)
- Check for warnings (yellow text)
- Verify no 404 errors for assets

### Network Tab
- Check that all assets load (200 status)
- Verify no failed requests
- Check load times

## Quick Test Commands

```bash
# Check if you're on production branch
git branch

# See what changed
git log --oneline -5

# View specific file changes
git diff main..production -- client/src/index.css
```

## Reporting Issues

If you find issues:
1. Note the page/component
2. Note the browser and screen size
3. Take a screenshot
4. Check browser console for errors
5. Document the issue in the production branch

## Next Steps After Testing

If everything looks good:
```bash
# Merge to main
git checkout main
git merge production
git push origin main
```

If issues found:
- Fix on production branch
- Test again
- Then merge to main

