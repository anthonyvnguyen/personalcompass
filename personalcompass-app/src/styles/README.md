# Personal Compass Design System

This directory contains the complete design system for the Personal Compass app, providing a single source of truth for all styling decisions.

## 🎨 Design Tokens (`tokens.ts`)

Design tokens are the foundation of our design system. They define the basic visual elements that components use.

### Colors

```typescript
import { colors } from '~/src/styles/tokens';

// Primary brand colors (purple)
colors.primary[500]; // Main brand color: #a855f7
colors.primary[700]; // Darker variant: #7c3aed

// Neutral colors (grays, blacks, whites)
colors.neutral[0]; // White: #ffffff
colors.neutral[950]; // Black: #0a0a0a

// Semantic colors
colors.error[500]; // Error red: #ef4444
colors.success[500]; // Success green: #22c55e

// Theme-specific colors
colors.background.light; // #f5f5f5
colors.background.dark; // #0a0a0a
colors.text.primary.light; // #000000
colors.text.primary.dark; // #ffffff
```

### Spacing

```typescript
import { spacing } from '~/src/styles/tokens';

spacing[4]; // 16px - Most common spacing
spacing[6]; // 24px - Card padding
spacing[8]; // 32px - Section spacing
```

### Typography

```typescript
import { typography } from '~/src/styles/tokens';

typography.fontSize.lg; // 16px - Body text
typography.fontSize['2xl']; // 20px - Section titles
typography.fontSize['4xl']; // 32px - Main titles

typography.fontWeight.semibold; // '600'
typography.fontWeight.bold; // '700'
```

### Border Radius

```typescript
import { borderRadius } from '~/src/styles/tokens';

borderRadius.md; // 6px - Small elements
borderRadius['2xl']; // 12px - Buttons
borderRadius['3xl']; // 16px - Cards
```

## 🧩 Shared Styles (`shared.ts`)

Shared styles provide common patterns and utilities used throughout the app.

### Usage

```typescript
import { sharedStyles } from '~/src/styles/shared';

// Layout
<View style={sharedStyles.container}>
<View style={sharedStyles.header}>
<View style={sharedStyles.section}>

// Typography
<Text style={sharedStyles.title}>
<Text style={sharedStyles.subtitle}>
<Text style={sharedStyles.bodyText}>

// Buttons
<Button style={sharedStyles.primaryButton}>
<Button style={sharedStyles.destructiveButton}>

// Flexbox utilities
<View style={sharedStyles.rowSpaceBetween}>
<View style={sharedStyles.center}>
```

### Themed Helper Functions

```typescript
import {
  getContainerStyle,
  getTextColor,
  getPrimaryColor,
} from '~/src/styles/shared';

// Get themed container style
const containerStyle = getContainerStyle(isDarkMode);

// Get themed text color
const textColor = getTextColor('primary', isDarkMode);

// Get primary brand color
const primaryColor = getPrimaryColor();
```

## 🎯 Component Usage

### Updated Card Component

```typescript
import { Card, CardContent } from '~/components/ui/card';

// No spacing (default)
<Card>
  <CardContent size="md">
    Content
  </CardContent>
</Card>

// With spacing
<Card spacing="md">
  <CardContent size="lg" centered>
    Centered content
  </CardContent>
</Card>
```

### Updated Text Component

```typescript
import { Text } from '~/components/ui/text';

<Text size="lg" weight="semibold" variant="primary">
  Primary text
</Text>

<Text size="md" variant="secondary">
  Secondary text
</Text>
```

### Updated Button Component

```typescript
import { Button } from '~/components/ui/button';

<Button variant="default" size="md">
  Primary button
</Button>

<Button variant="outline" size="sm">
  Outline button
</Button>

<Button variant="destructive">
  Destructive button
</Button>
```

## 📱 Migration Guide

### From Hardcoded Values

**Before:**

```typescript
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#a855f7',
    borderRadius: 12,
    padding: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
});
```

**After:**

```typescript
import { colors, borderRadius, spacing, typography } from '~/src/styles/tokens';

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius['2xl'],
    padding: spacing[4],
  },
  text: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary.light,
  },
});
```

### Using Theme-Aware Colors

**Before:**

```typescript
<Text style={{ color: isDark ? '#ffffff' : '#000000' }}>
```

**After:**

```typescript
import { getTextColor } from '~/src/styles/shared';

<Text style={{ color: getTextColor('primary', isDark) }}>
```

## 🎨 Color Palette

### Primary (Purple)

- `primary[500]`: #a855f7 (Main brand color)
- `primary[700]`: #7c3aed (Darker variant)

### Neutral (Grays)

- `neutral[0]`: #ffffff (White)
- `neutral[50]`: #fafafa (Lightest gray)
- `neutral[200]`: #e5e5e5 (Light border)
- `neutral[600]`: #525252 (Medium gray)
- `neutral[950]`: #0a0a0a (True black)

### Semantic

- `error[500]`: #ef4444 (Error red)
- `success[500]`: #22c55e (Success green)

## 📏 Spacing Scale

- `spacing[1]`: 4px (Tiny)
- `spacing[2]`: 8px (Small)
- `spacing[3]`: 12px (Medium-small)
- `spacing[4]`: 16px (Medium) ← Most common
- `spacing[5]`: 20px (Medium-large)
- `spacing[6]`: 24px (Large) ← Card padding
- `spacing[8]`: 32px (Extra large) ← Section spacing

## 🔤 Typography Scale

### Font Sizes

- `xs`: 12px (Tiny text)
- `sm`: 13px (Small text)
- `base`: 14px (Small body)
- `md`: 15px (Medium body)
- `lg`: 16px (Large body) ← Most common
- `xl`: 18px (Large text)
- `2xl`: 20px (Section titles)
- `3xl`: 24px (Large titles)
- `4xl`: 32px (Main titles)

### Font Weights

- `normal`: '400' (Regular)
- `medium`: '500' (Medium)
- `semibold`: '600' (Semi-bold) ← Most common
- `bold`: '700' (Bold)

## ✅ Best Practices

1. **Always use design tokens** instead of hardcoded values
2. **Use semantic color names** (primary, error, success) instead of specific colors
3. **Use the spacing scale** for consistent margins and padding
4. **Use typography scale** for consistent text sizing
5. **Use theme-aware helpers** for dark/light mode support
6. **Prefer shared styles** for common patterns
7. **Use component props** (Card spacing, Text variants) instead of custom styles

## 🚫 What Not to Do

```typescript
// ❌ Don't use hardcoded colors
backgroundColor: '#a855f7'

// ❌ Don't use arbitrary spacing
marginBottom: 23

// ❌ Don't use arbitrary font sizes
fontSize: 17

// ❌ Don't create theme logic in components
color: isDark ? '#ffffff' : '#000000'

// ❌ Don't use default Card marginBottom
<Card style={{ marginBottom: 20 }}>
```

## ✅ What to Do

```typescript
// ✅ Use design tokens
backgroundColor: colors.primary[500]

// ✅ Use spacing scale
marginBottom: spacing[4]

// ✅ Use typography scale
fontSize: typography.fontSize.lg

// ✅ Use theme helpers
color: getTextColor('primary', isDark)

// ✅ Use Card spacing prop
<Card spacing="md">
```

---

This design system ensures consistency, maintainability, and a professional look throughout the Personal Compass app.
