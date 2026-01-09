// ABOUTME: Script to extract individual sprite frames from sprite sheets.
// ABOUTME: Exports each expression as a separate PNG file for animation work.

import sharp from 'sharp'
import { mkdir, access } from 'fs/promises'
import path from 'path'

const SPRITE_SIZE = 128
const OUTPUT_DIR = './src/assets/tick/animation_starts'
const SPRITES_DIR = './src/assets/tick/sprites'

const coreExpressions = [
  'idle',
  'smug',
  'shocked',
  'happy',
  'unhinged',
  'suspicious',
  'disappointed',
  'concerned',
  'celebrating',
  'judgmental',
]

const secondaryExpressions = [
  'eager',
  'skeptical',
  'waving',
  'annoyed',
  'tapping_foot',
  'pleading',
  'confused',
  'apologetic',
  'relaxed',
  'scheming',
]

async function extractSprites() {
  // Ensure output directory exists
  await mkdir(OUTPUT_DIR, { recursive: true })

  // Extract core expressions
  console.log('Extracting core expressions...')
  const coreSpriteSheet = path.join(SPRITES_DIR, `core_expressions_${SPRITE_SIZE}.png`)

  for (let i = 0; i < coreExpressions.length; i++) {
    const name = coreExpressions[i]
    const outputPath = path.join(OUTPUT_DIR, `core_${name}.png`)

    await sharp(coreSpriteSheet)
      .extract({
        left: i * SPRITE_SIZE,
        top: 0,
        width: SPRITE_SIZE,
        height: SPRITE_SIZE,
      })
      .toFile(outputPath)

    console.log(`  ✓ core_${name}.png`)
  }

  // Extract secondary expressions
  console.log('Extracting secondary expressions...')
  const secondarySpriteSheet = path.join(SPRITES_DIR, `secondary_expressions_${SPRITE_SIZE}.png`)

  for (let i = 0; i < secondaryExpressions.length; i++) {
    const name = secondaryExpressions[i]
    const outputPath = path.join(OUTPUT_DIR, `secondary_${name}.png`)

    await sharp(secondarySpriteSheet)
      .extract({
        left: i * SPRITE_SIZE,
        top: 0,
        width: SPRITE_SIZE,
        height: SPRITE_SIZE,
      })
      .toFile(outputPath)

    console.log(`  ✓ secondary_${name}.png`)
  }

  console.log(`\nDone! Extracted ${coreExpressions.length + secondaryExpressions.length} sprites to ${OUTPUT_DIR}`)
}

extractSprites().catch(console.error)
