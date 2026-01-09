// ABOUTME: Reusable component for rendering static Tick expressions from sprite sheets.
// ABOUTME: Used in pages where Tick appears but doesn't need full interactivity.

import coreSprites from '../assets/tick/sprites/Core Expressions from Pixelorama.png'
import secondarySprites from '../assets/tick/sprites/Secondary Expressions from Pixelorama.png'

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
  const spriteSheet = isCore ? coreSprites : secondarySprites
  const spriteIndex = isCore
    ? coreExpressionIndex[expression]
    : secondaryExpressionIndex[expression as SecondaryExpression]
  const backgroundPositionX = `${-spriteIndex * 100 / 9}%`

  return (
    <div
      className={`${sizeClasses[size]} rounded-full ${className}`}
      style={{
        backgroundImage: `url(${spriteSheet})`,
        backgroundSize: '1000% 100%',
        backgroundPosition: `${backgroundPositionX} 0`,
      }}
      role="img"
      aria-label={`Tick looking ${expression}`}
    />
  )
}
