const stats = [
  { value: "50K+", label: "Snippets Saved" },
  { value: "10K+", label: "Developers" },
  { value: "99.9%", label: "Uptime" },
  { value: "<100ms", label: "Search Speed" },
];

export function Stats() {
  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-primary sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
