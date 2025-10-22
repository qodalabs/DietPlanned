"use client"
import React from 'react'
import Head from 'next/head'

export function Seo({
  title = 'DietPlanned — Personal Diet Planner',
  description = 'Humanized diet planning with assessments, BMI, and smart plans.',
  image = '/og.png',
}: {
  title?: string
  description?: string
  image?: string
}) {
  const url = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  )
}

export default Seo

