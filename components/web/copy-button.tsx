"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export function CopyButton({ codeExample }: { codeExample: string | undefined }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample!);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant={"secondary"} onClick={handleCopy}>
      {copied ? (
        <>
          <Check className="h-4 w-4 text-primary" />
          <p className="hidden md:block">Copied</p>
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          <p className="hidden md:block">Copy</p>
        </>
      )}
    </Button>
  );
}
