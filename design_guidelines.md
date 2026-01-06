# Design Guidelines: Salomão Quiz Engine v2

## Design Approach
**Reference-Based**: Inspired by Zing Coach, Mimika, and Typeform's conversion-focused quiz experiences. These platforms excel at creating engaging, sequential experiences that maintain user momentum through thoughtful visual design and progressive disclosure.

## Typography System

**Font Stack**: Use Google Fonts - Outfit (headings) + Inter (body text)

- **Question Titles**: 2xl to 4xl, font-weight-700
- **Descriptions/Subtitles**: base to lg, font-weight-400
- **Card Labels**: sm to base, font-weight-500
- **Button Text**: base, font-weight-600
- **Progress Indicators**: xs to sm, font-weight-500

## Layout & Spacing System

**Spacing Primitives**: Use Tailwind units of 3, 4, 6, and 8 consistently (p-4, gap-6, m-8)

**Container Strategy**:
- Quiz content: max-w-3xl mx-auto for optimal readability
- Full-width progress bar: w-full fixed top-0
- Card grids: max-w-5xl for multi-select scenarios

## Screen Type Components

### 1. Welcome Screen
- Full-height hero (min-h-screen) with centered content
- Large headline (text-4xl md:text-6xl) with supporting subtitle
- Single prominent CTA button (px-8 py-4, rounded-full)
- Optional background gradient or subtle pattern
- Bottom-aligned start indicator ("Scroll to begin" or similar)

### 2. Progress Bar (Global)
- Fixed to top of viewport (sticky top-0 z-50)
- Height: h-2
- Animated fill using Framer Motion with spring physics
- Include step counter (e.g., "3 of 7") positioned top-right corner, small text

### 3. Multi-Select Cards
- Grid layout: grid-cols-1 md:grid-cols-2 gap-4
- Individual cards: rounded-2xl, p-6, border-2
- Icon placement: Top-center or left-aligned, size 40-48px
- Card states require distinct visual treatment (default, hover, selected)
- Selected state: border emphasis (border-4)
- Label text: centered or left-aligned based on icon position

### 4. Image Select Screen
- Grid: grid-cols-2 md:grid-cols-3 gap-3
- Image aspect ratio: aspect-square or aspect-[3/4]
- Each option: rounded-xl overflow-hidden, cursor-pointer
- Selection indicator: Checkmark overlay (absolute top-2 right-2, size 24px)
- Hover state: subtle scale transform (scale-105)

### 5. Info Interstitial
- Centered content block (max-w-2xl)
- Icon or illustration at top (96-128px size)
- Headline + body text with generous spacing (space-y-6)
- Continue button bottom-aligned or inline
- Use this screen for micro-commitments and engagement

### 6. Loading/Calculated Screen
- Centered content: max-w-md
- Animated progress bar (indeterminate or stepped)
- Checklist items (space-y-4):
  - Each item: flex items-center gap-3
  - Checkmark icon that appears sequentially
  - Text fades in with 300ms delay between items
  - 4-6 checklist items total
- Overall animation duration: 4-6 seconds

### 7. Email Capture
- Split layout on desktop (grid md:grid-cols-2):
  - Left: Value proposition, testimonial, or benefit list
  - Right: Form container
- Form elements: Large input fields (h-14), rounded-xl
- Stacked layout (space-y-4)
- Privacy reassurance text below form (text-sm opacity-70)
- Submit button: Full-width, prominent

### 8. VSL/Sales Screen
- Video container: aspect-video, rounded-xl, mb-8
- Headline + subheadline (text-center)
- Benefit bullets (max-w-lg mx-auto, space-y-3)
- Pricing card: Elevated design (shadow-2xl), rounded-2xl, p-8
- CTA button: Extra large (px-12 py-5, text-lg)
- Trust indicators: Payment badges, testimonial quotes

## Navigation & Controls

**Back Button**: 
- Positioned top-left corner
- Icon-only or icon + "Back" text
- Size: 40x40px touch target minimum

**Next/Continue Buttons**:
- Bottom-right or centered based on screen type
- Disabled state when no selection made
- Size: px-8 py-4 minimum
- Rounded-full for primary actions

## Animation Principles

**Screen Transitions**:
- Exit: Slide-out to left, opacity 0, duration 300ms
- Enter: Slide-in from right, opacity 0→1, duration 400ms
- Spring physics: { type: "spring", stiffness: 300, damping: 30 }

**Card Interactions**:
- Hover: Gentle lift (translateY -2px) + shadow increase
- Select: Scale 0.98 → 1, spring animation
- No excessive bouncing or long durations

**Loading Screen**:
- Progress bar: Smooth linear animation
- Checklist items: Stagger by 800ms each
- Checkmarks: Scale from 0 with spring

## White-Label Flexibility

Design system must support:
- Dynamic border-radius (rounded-xl vs rounded-2xl configurable)
- Font family override via config
- All color values themeable (no hardcoded colors)
- Logo placement (top-left or centered based on screen)

## Images

**Hero Image**: Welcome screen can use a background image (cover, center) with overlay gradient for text readability. Alternative: Illustration or abstract pattern.

**Body Selector Images**: User-provided images for body type selection (front view silhouettes), aspect-[2/3], grayscale with color overlay on selection.

**VSL Thumbnail**: Video placeholder or actual video embed, 16:9 ratio.