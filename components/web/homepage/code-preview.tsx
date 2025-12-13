"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Sparkles } from "lucide-react"

const codeExample = `// React Hook for debouncing values
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}`

export function CodePreview() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
      {/* Code Block */}
      <Card className="overflow-hidden border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <span className="font-mono text-sm text-muted-foreground">useDebounce.tsx</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
        <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">
          <code className="text-muted-foreground">
            <span className="text-muted-foreground/60">{"// React Hook for debouncing values"}</span>
            {"\n"}
            <span className="text-primary">import</span>
            {" { useState, useEffect } "}
            <span className="text-primary">from</span> <span className="text-emerald-400">{`'react'`}</span>;{"\n\n"}
            <span className="text-primary">export function</span> <span className="text-yellow-400">useDebounce</span>
            {"<T>(value: T, delay: number): T {"}
            {"\n  "}
            <span className="text-primary">const</span>
            {" [debouncedValue, setDebouncedValue] = "}
            <span className="text-yellow-400">useState</span>
            {"<T>(value);"}
            {"\n\n  "}
            <span className="text-yellow-400">useEffect</span>
            {"(() => {"}
            {"\n    "}
            <span className="text-primary">const</span>
            {" handler = "}
            <span className="text-yellow-400">setTimeout</span>
            {"(() => {"}
            {"\n      "}
            <span className="text-yellow-400">setDebouncedValue</span>
            {"(value);"}
            {"\n    }, delay);"}
            {"\n\n    "}
            <span className="text-primary">return</span>
            {" () => "}
            <span className="text-yellow-400">clearTimeout</span>
            {"(handler);"}
            {"\n  }, [value, delay]);"}
            {"\n\n  "}
            <span className="text-primary">return</span>
            {" debouncedValue;"}
            {"\n}"}
          </code>
        </pre>
      </Card>

      {/* AI Explanation */}
      <Card className="border-border bg-linear-to-br from-transparent to-primary/15 p-6">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-medium">AI-Generated Explanation</span>
          <Badge variant="secondary" className="ml-auto">
            Gemini
          </Badge>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            <strong className="text-foreground">useDebounce</strong> is a custom React hook that delays updating a value
            until a specified time has passed since the last change.
          </p>
          <p>
            <strong className="text-foreground">How it works:</strong> When the input value changes, a timer starts. If
            the value changes again before the timer completes, the timer resets. The debounced value only updates when
            the timer finishes.
          </p>
          <p>
            <strong className="text-foreground">Use cases:</strong> Perfect for search inputs, form validation, or any
            scenario where you want to reduce the frequency of expensive operations.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="outline">React</Badge>
          <Badge variant="outline">TypeScript</Badge>
          <Badge variant="outline">Hooks</Badge>
          <Badge variant="outline">Performance</Badge>
        </div>
      </Card>
    </div>
  )
}
