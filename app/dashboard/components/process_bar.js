'use client'

import React from 'react'

const CircularProgressBar = ({
  strokeWidth = 8,
  sqSize = 160,
  percentage,
  color = '#7c3aed',
}) => {
  const radius = (sqSize - strokeWidth) / 2
  const viewBox = `0 0 ${sqSize} ${sqSize}`
  const dashArray = radius * Math.PI * 2
  const dashOffset = dashArray - (dashArray * percentage) / 100

  return (
    <svg width={sqSize} height={sqSize} viewBox={viewBox}>
      <circle
        className="fill-none stroke-gray-200"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={strokeWidth}
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
        fill="#172554"
        className="text-l font-semibold"
      >
        {percentage}%
      </text>
    </svg>
  )
}

export default CircularProgressBar
