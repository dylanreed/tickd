// ABOUTME: Reusable component for rendering static Tick expressions from sprite sheets.
// ABOUTME: Used in pages where Tick appears but doesn't need full interactivity.

// Import sprite sheets at different sizes for optimal display
import coreSprites48 from '../assets/tick/sprites/core_expressions_48.png'
import coreSprites128 from '../assets/tick/sprites/core_expressions_128.png'
import coreSprites256 from '../assets/tick/sprites/core_expressions_256.png'
import secondarySprites48 from '../assets/tick/sprites/secondary_expressions_48.png'
import secondarySprites128 from '../assets/tick/sprites/secondary_expressions_128.png'
import secondarySprites256 from '../assets/tick/sprites/secondary_expressions_256.png'

const coreSpritesBySize = {
  sm: coreSprites48,
  md: coreSprites128,
  lg: coreSprites128,
  xl: coreSprites256,
}

const secondarySpritesBySize = {
  sm: secondarySprites48,
  md: secondarySprites128,
  lg: secondarySprites128,
  xl: secondarySprites256,
}

// Core expressions (sheet 1, positions 0-9)
type CoreExpression = 'idle' | 'happy' | 'suspicious' | 'concerned' | 'disappointed' | 'judgmental' | 'unhinged' | 'celebrating' | 'shocked' | 'smug'

// Secondary expressions (sheet 2, positions 0-9)
type SecondaryExpression = 'eager' | 'scheming' | 'relaxed' | 'confused' | 'apologetic' | 'pleading' | 'skeptical' | 'annoyed' | 'waving' | 'tapping_foot'

export type TickExpression = CoreExpression | SecondaryExpression

const coreExpressionIndex: Record<CoreExpression, number> = {
  idle: 0,
  happy: 1,
  suspicious: 2,
  concerned: 3,
  disappointed: 4,
  judgmental: 5,
  unhinged: 6,
  celebrating: 7,
  shocked: 8,
  smug: 9,
}

const secondaryExpressionIndex: Record<SecondaryExpression, number> = {
  eager: 0,
  scheming: 1,
  relaxed: 2,
  confused: 3,
  apologetic: 4,
  pleading: 5,
  skeptical: 6,
  annoyed: 7,
  waving: 8,
  tapping_foot: 9,
}

function isCoreExpression(expr: TickExpression): expr is CoreExpression {
  return expr in coreExpressionIndex
}

interface TickSpriteProps {
  expression: TickExpression
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-20 h-20',
  lg: 'w-32 h-32',
  xl: 'w-48 h-48',
}

export default function TickSprite({ expression, className = '', size = 'md' }: TickSpriteProps) {
  const isCore = isCoreExpression(expression)
  const spriteSheet = isCore ? coreSpritesBySize[size] : secondarySpritesBySize[size]
  const spriteIndex = isCore
    ? coreExpressionIndex[expression]
    : secondaryExpressionIndex[expression as SecondaryExpression]
  // Each frame is 1/10 of the sheet, position as percentage of (imageWidth - containerWidth)
  const backgroundPositionX = `${spriteIndex * -11.111}%`

  return (
    <div
      className={`${sizeClasses[size]} ${className}`}
      style={{
        backgroundImage: `url(${spriteSheet})`,
        backgroundSize: '1000% 100%',
        backgroundPosition: `${backgroundPositionX} center`,
      }}
      role="img"
      aria-label={`Tick looking ${expression}`}
    />
  )
}
