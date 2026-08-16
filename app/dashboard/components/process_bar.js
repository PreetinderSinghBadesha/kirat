'use client'

import React from 'react'

const CircularProgressBar = ({
  strokeWidth = 5,
  sqSize = 56,
  percentage,
  color = '#5594f1',
  trackColor = '#e5e5e5',
  textColor = '#222222',
}) => {
  const radius = (sqSize - strokeWidth) / 2
  const viewBox = `0 0 ${sqSize} ${sqSize}`
  const dashArray = radius * Math.PI * 2
  const dashOffset = dashArray - (dashArray * percentage) / 100

  return (
    <svg width={sqSize} height={sqSize} viewBox={viewBox} className="flex-shrink-0">
      <circle
        className="fill-none"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={strokeWidth}
        stroke={trackColor}
      />

      <circle
        className="fill-none transition-all duration-300 ease-in-out"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
          stroke: color,
        }}
      />

      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        fill={textColor}
        fontSize="13"
        fontWeight="600"
      >
        {Math.round(percentage)}%
      </text>
    </svg>
  )
}

export default CircularProgressBar
