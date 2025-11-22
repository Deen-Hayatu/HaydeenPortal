# Build Optimization Notes

## ✅ Fixed Issues

### TypeScript Error (TS2345)
- **Fixed**: Narrowed catch variable from `unknown` to `Error` before logging
- **Location**: `api/index.ts` line 59
- **Status**: ✅ Resolved

## ⚠️ Optimization Opportunities

### 1. Large Bundle Size Warning
**Issue**: `index-Bv_0mikC.js` is ~883 KB (gzip ~250 KB)

**Recommendations**:
- Use dynamic `import()` for large components/pages
- Implement code-splitting with Vite's route-based splitting
- Consider lazy loading for:
  - Solution pages (`/solutions/agriconnect`, `/solutions/ghehr`)
  - Blog pages
  - MVP documentation page
- Use `build.rollupOptions.output.manualChunks` in `vite.config.ts`

**Example**:
```typescript
// Instead of:
import HeavyComponent from './HeavyComponent';

// Use:
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

### 2. Unsplash Image 404s
**Issue**: External Unsplash images returning 404

**Affected Files**:
- `client/src/pages/products.tsx` (2 images)
- `client/src/pages/solutions/ghehr.tsx` (5 images)
- `client/src/pages/solutions/agriconnect.tsx` (6 images)
- `client/src/components/home/featured-case-study.tsx` (1 image)

**Solutions**:
1. **Replace with local images**: Download and host in `client/public/images/`
2. **Use placeholder service**: Use `https://via.placeholder.com/800x600` for development
3. **Add error handling**: Add `onError` fallback to `<img>` tags
4. **Use CDN**: Host images on a reliable CDN (Cloudinary, Imgix, etc.)

**Quick Fix - Add Error Handling**:
```tsx
<img 
  src="https://images.unsplash.com/..."
  onError={(e) => {
    e.currentTarget.src = '/images/placeholder.jpg';
  }}
  alt="..."
/>
```

### 3. Node.js Version
**Current**: `"node": "22.x"` in `package.json`
**Status**: ✅ Vercel supports Node.js 22.x
**Note**: Keep as-is, but verify Vercel runtime compatibility

## 📋 Action Items

### High Priority
- [ ] Fix Unsplash image 404s (add error handling or replace with local images)
- [ ] Implement code-splitting for large pages

### Medium Priority
- [ ] Optimize bundle size with dynamic imports
- [ ] Add image optimization (WebP format, lazy loading)

### Low Priority
- [ ] Consider using a CDN for static assets
- [ ] Implement service worker for caching

## 🚀 Next Steps

1. **Immediate**: After deployment, verify TypeScript error is resolved
2. **Short-term**: Add image error handling to prevent broken images
3. **Long-term**: Implement code-splitting to improve load times

