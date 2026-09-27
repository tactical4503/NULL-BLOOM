# NULL BLOOM

**NULL BLOOM** is an authored 2D fighting game built around a distinctive late-80s/90s arcade/comic visual identity, responsive combat, memorable fighters, a modular character creator, and a moving underground train beneath the water.

## Current repository foundation
- Vite browser build
- Custom game shell and arena presentation
- Versus / Training / Creator entry points
- Data-driven fighter manifests
- Attack frame-data schema
- Individual animation-directory architecture
- Modular creator architecture documented
- Maintainable separation between presentation, fighter data and combat systems

## Production pipeline
**Design → character sheet → individual sprites → animation → implementation → testing**

The project is intentionally being built as real systems rather than a collection of fake UI controls or placeholder claims.

## Next production layers
1. Combat simulation and collision volumes
2. Input buffering, hitstop, hitstun, blockstun and knockback
3. Match state / rounds / camera / HUD
4. Authored roster production
5. Individual transparent animation frames
6. Modular creator asset library and saved recipes
7. CPU behavior and training diagnostics
8. Audio, effects, polish and validation

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
