"use client"

import React from "react"

import { useState } from "react"
import { Check, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ContactFormClient() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubmitted(true)
    setIsSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
          <Check className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-serif text-2xl font-semibold text-foreground">
          Message Sent!
        </h3>
        <p className="mt-2 text-muted-foreground">
          Thank you for reaching out. We'll get back to you within 24 hours.
        </p>
        <Button
          variant="outline"
          className="mt-6 bg-transparent"
          onClick={() => setSubmitted(false)}
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-card p-6">
      <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
        Send us a Message
      </h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" required placeholder="Your name" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="contactEmail">Email</Label>
            <Input id="contactEmail" type="email" required placeholder="your@email.com" className="mt-1" />
          </div>
        </div>
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" required placeholder="Custom order inquiry" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            required
            placeholder="Tell us about your vision..."
            rows={6}
            className="mt-1"
          />
        </div>
        <Button type="submit" className="w-full gap-2" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
          {!isSubmitting && <Send className="h-4 w-4" />}
        </Button>
      </div>
    </form>
  )
}
