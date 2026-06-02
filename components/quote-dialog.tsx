"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check } from "lucide-react"
import type { Service } from "@/lib/services"

interface QuoteDialogProps {
  service: Service | null
  open: boolean
  onClose: () => void
  locale?: string
}

export function QuoteDialog({ service, open, onClose, locale = "en" }: QuoteDialogProps) {
  const es = locale === "es"
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [fields, setFields] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resetForm = () => {
    setName(""); setEmail(""); setPhone(""); setFields({})
    setSubmitted(false); setError(null)
  }

  const handleClose = () => { resetForm(); onClose() }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: es ? service?.nameEs : service?.name,
          name, email, phone, fields,
        }),
      })
      if (!res.ok) throw new Error("Failed")
      setSubmitted(true)
    } catch {
      setError(es ? "Error al enviar. Intenta de nuevo." : "Error sending. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (!service) return null

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="py-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground">
              {es ? "¡Solicitud enviada!" : "Request sent!"}
            </h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {es
                ? "Recibimos tu solicitud. Te contactaremos en menos de 24 horas con el precio y los detalles."
                : "We received your request. We'll contact you within 24 hours with pricing and details."}
            </p>
            <Button className="mt-6" onClick={handleClose}>
              {es ? "Cerrar" : "Close"}
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">
                {es ? service.nameEs : service.name}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                {es
                  ? "Llena el formulario y te enviamos el precio en menos de 24 horas."
                  : "Fill out the form and we'll send you a quote within 24 hours."}
              </p>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="q-name">{es ? "Nombre" : "Name"} *</Label>
                  <Input id="q-name" required value={name} onChange={e => setName(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="q-phone">{es ? "Teléfono / WhatsApp" : "Phone / WhatsApp"}</Label>
                  <Input id="q-phone" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="q-email">Email *</Label>
                <Input id="q-email" type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1" />
              </div>

              <div className="border-t border-border pt-4 space-y-4">
                <p className="text-sm font-medium text-foreground">
                  {es ? "Detalles del pedido" : "Order details"}
                </p>
                {service.formFields.map(field => (
                  <div key={field.key}>
                    <Label htmlFor={`q-${field.key}`}>
                      {es ? field.labelEs : field.label}
                      {field.required && " *"}
                    </Label>
                    {field.type === "select" ? (
                      <Select
                        value={fields[field.key] || ""}
                        onValueChange={v => setFields(prev => ({ ...prev, [field.key]: v }))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder={es ? "Selecciona..." : "Select..."} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map(opt => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === "textarea" ? (
                      <Textarea
                        id={`q-${field.key}`}
                        value={fields[field.key] || ""}
                        onChange={e => setFields(prev => ({ ...prev, [field.key]: e.target.value }))}
                        className="mt-1"
                        rows={3}
                      />
                    ) : (
                      <Input
                        id={`q-${field.key}`}
                        type={field.type}
                        value={fields[field.key] || ""}
                        onChange={e => setFields(prev => ({ ...prev, [field.key]: e.target.value }))}
                        className="mt-1"
                      />
                    )}
                  </div>
                ))}
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                {submitting
                  ? (es ? "Enviando..." : "Sending...")
                  : (es ? "Enviar solicitud" : "Send request")}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
