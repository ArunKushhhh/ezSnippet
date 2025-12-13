import { Card, CardContent } from "@/components/ui/card"
import { Code2, Search, Share2, Sparkles, FolderTree, Users } from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "Syntax Highlighting",
    description:
      "Beautiful, accurate syntax highlighting for 100+ programming languages. Your code always looks its best.",
  },
  {
    icon: Sparkles,
    title: "AI Explanations",
    description: "Gemini auto-generates human-friendly explanations for your snippets. Keep, edit, or replace them.",
  },
  {
    icon: Search,
    title: "Lightning Search",
    description: "Find any snippet instantly with full-text search across titles, code, tags, and explanations.",
  },
  {
    icon: FolderTree,
    title: "Smart Organization",
    description: "Organize snippets into collections and folders. Tag and categorize for quick access.",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Share snippets with your team or the world. Public, private, or team-only access controls.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together in real-time. Comment, suggest edits, and build a shared knowledge base.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to manage code snippets</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features designed for developers who value their time.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border bg-linear-to-br from-transparent to-primary/15 transition-colors hover:border-primary/50">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
