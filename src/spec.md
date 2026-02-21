# Specification

## Summary
**Goal:** Enhance the eagle logo entry animation with a head-activated neon glow effect that creates a power-on visual where energy originates from the eagle's head and spreads across the entire logo.

**Planned changes:**
- Implement head-first power-on animation where neon energy originates from eagle head and instantly spreads during entry
- Apply strongest electric blue neon glow on eagle head and eyes, visible from the first animation frame
- Create smooth energy spread effect flowing from head to wings to body over 0.4-0.6 seconds
- Implement three-layer neon glow system: inner illumination in head, medium glow around outline, soft outer ambient aura
- Add cinematic light bloom burst at eagle head on animation start with optional shimmer sweep across wings
- Stabilize glow into continuous soft breathing pulse after entry, keeping head slightly brighter
- Use GPU-accelerated transforms only, with glow pre-rendered before animation begins

**User-visible outcome:** The eagle logo powers on like an AI emblem activating from the brain, with electric blue neon energy emanating from the head and flowing across the wings and body, followed by a subtle breathing pulse effect.
