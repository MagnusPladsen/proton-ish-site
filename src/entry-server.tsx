import { StrictMode } from "react"
import { renderToStaticMarkup, renderToString } from "react-dom/server"

import App from "@/App"
import { questions } from "@/components/sections/faq"

// Build-time only: scripts/prerender.mjs writes this HTML into dist/index.html
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

// The FAQ as plain text, for the FAQPage structured data
export function faq() {
  return questions.map(({ q, a }) => ({
    question: q,
    answer: renderToStaticMarkup(<>{a}</>)
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&#x27;|&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, " ")
      .trim(),
  }))
}
