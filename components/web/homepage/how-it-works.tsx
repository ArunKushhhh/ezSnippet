import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    step: "01",
    title: "Sign in with Google",
    description: "One-click authentication. No passwords to remember, no forms to fill out.",
  },
  {
    step: "02",
    title: "Create your first snippet",
    description: "Paste your code, add a title, and let Gemini generate an explanation automatically.",
  },
  {
    step: "03",
    title: "Organize & share",
    description: "Tag, categorize, and share with your team. Build your personal code library.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border bg-linear-to-br from-transparent to-primary/15 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get started in minutes</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No complex setup. No credit card required. Just sign in and start saving snippets.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={step.step} className="relative border-border bg-linear-to-br from-transparent to-card">
              <CardContent className="p-6">
                <span className="mb-4 inline-block font-mono text-4xl font-bold text-primary">{step.step}</span>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden h-px w-8 -translate-y-1/2 translate-x-full bg-border md:block" />
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
