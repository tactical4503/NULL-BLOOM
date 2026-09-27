# NULL BLOOM architecture

## Core
Rendering, input, combat simulation, collision, camera, audio, match state and UI remain separate concerns.

## Fighters
Fighters are data-driven. Character manifests point to animation and attack definitions. Animation frames are individual image files with a consistent anchor and scale.

## Combat
Attacks expose startup, active and recovery frames plus damage, hitstun, blockstun, hitstop, knockback and collision volumes.

## Creator
The creator is modular rather than a single painted sprite. Planned layers: body, head, face, hair, tops, bottoms, footwear, accessories, weapons, markings, effects and palettes. A saved fighter is a recipe referencing those assets.

## Production
Design -> character sheet -> sprites -> animation -> implementation -> testing. Do not replace authored assets with procedural filler when production assets are required.