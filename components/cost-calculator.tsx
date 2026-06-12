"use client"

import { useState, useMemo } from "react"
import { Plus, Trash2, Copy, RefreshCw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Material {
  id: string
  name: string
  unit: string
  quantity: number
  unitCost: number
}

const CATEGORIES = [
  "Shadow Box", "Business Cards", "Custom T-Shirts",
  "Gift Boxes", "Logos / Vinyl", "Stickers", "Stationery", "Other",
]

const DEFAULT_MATERIALS: Material[] = [
  { id: "1", name: "Cardstock Paper", unit: "sheet",  quantity: 20, unitCost: 0.14 },
  { id: "2", name: "Photo Paper",     unit: "sheet",  quantity: 1,  unitCost: 0.28 },
  { id: "3", name: "Glue Stick",      unit: "stick",  quantity: 3,  unitCost: 0.08 },
  { id: "4", name: "Printer Ink",     unit: "ml",     quantity: 1,  unitCost: 0.07 },
  { id: "5", name: "Gift Box",        unit: "unit",   quantity: 1,  unitCost: 6.00 },
]

const INITIAL_STATE = {
  productName: "",
  category: "Shadow Box",
  laborTime: 60,
  hourlyLaborRate: 18,
  overheadPercent: 10,
  marginPercent: 50,
}

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 })

let nextId = 6

export function CostCalculator() {
  const [form, setForm] = useState(INITIAL_STATE)
  const [materials, setMaterials] = useState<Material[]>(DEFAULT_MATERIALS)
  const [copied, setCopied] = useState(false)

  const set = (key: keyof typeof INITIAL_STATE, val: string | number) =>
    setForm(prev => ({ ...prev, [key]: val }))

  // ── Calculations ────────────────────────────────────────────────────────────
  const calc = useMemo(() => {
    const totalMaterialsCost = materials.reduce((s, m) => s + m.quantity * m.unitCost, 0)
    const laborCost = (form.laborTime / 60) * form.hourlyLaborRate
    const overheadCost = (totalMaterialsCost + laborCost) * (form.overheadPercent / 100)
    const totalCost = totalMaterialsCost + laborCost + overheadCost
    const suggestedPrice = form.marginPercent < 100
      ? totalCost / (1 - form.marginPercent / 100)
      : 0
    const profit = suggestedPrice - totalCost
    return { totalMaterialsCost, laborCost, overheadCost, totalCost, suggestedPrice, profit }
  }, [materials, form])

  // ── Material helpers ─────────────────────────────────────────────────────────
  const addMaterial = () =>
    setMaterials(prev => [...prev, { id: String(nextId++), name: "", unit: "unit", quantity: 1, unitCost: 0 }])

  const removeMaterial = (id: string) =>
    setMaterials(prev => prev.filter(m => m.id !== id))

  const updateMaterial = (id: string, key: keyof Material, val: string | number) =>
    setMaterials(prev => prev.map(m => m.id === id ? { ...m, [key]: val } : m))

  // ── Copy summary ─────────────────────────────────────────────────────────────
  const copySummary = () => {
    const lines = [
      `WeMark Cost Summary`,
      `===================`,
      `Product : ${form.productName || "—"}`,
      `Category: ${form.category}`,
      ``,
      `MATERIALS`,
      ...materials.map(m => `  ${m.name} (${m.quantity} ${m.unit} × ${fmt(m.unitCost)}) = ${fmt(m.quantity * m.unitCost)}`),
      ``,
      `Materials Cost : ${fmt(calc.totalMaterialsCost)}`,
      `Labor Cost     : ${fmt(calc.laborCost)} (${form.laborTime} min @ $${form.hourlyLaborRate}/hr)`,
      `Overhead (${form.overheadPercent}%) : ${fmt(calc.overheadCost)}`,
      `─────────────────────`,
      `Total Cost     : ${fmt(calc.totalCost)}`,
      `Suggested Price: ${fmt(calc.suggestedPrice)} (${form.marginPercent}% margin)`,
      `Profit         : ${fmt(calc.profit)}`,
    ]
    navigator.clipboard.writeText(lines.join("\n"))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearCalculator = () => {
    setForm(INITIAL_STATE)
    setMaterials(DEFAULT_MATERIALS)
  }

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── LEFT: inputs ─────────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Product info */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              Product Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  placeholder="e.g. MOM Shadow Box"
                  value={form.productName}
                  onChange={e => set("productName", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={form.category}
                  onChange={e => set("category", e.target.value)}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Labor & rates */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
              Labor & Rates
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="laborTime">Labor Time (min)</Label>
                <Input
                  id="laborTime"
                  type="number"
                  min={0}
                  value={form.laborTime}
                  onChange={e => set("laborTime", Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  min={0}
                  step={0.5}
                  value={form.hourlyLaborRate}
                  onChange={e => set("hourlyLaborRate", Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="overhead">Overhead (%)</Label>
                <Input
                  id="overhead"
                  type="number"
                  min={0}
                  max={100}
                  value={form.overheadPercent}
                  onChange={e => set("overheadPercent", Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="margin">Margin (%)</Label>
                <Input
                  id="margin"
                  type="number"
                  min={0}
                  max={99}
                  value={form.marginPercent}
                  onChange={e => set("marginPercent", Number(e.target.value))}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Materials */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl font-semibold text-foreground">Materials</h2>
              <Button size="sm" variant="outline" onClick={addMaterial} className="gap-1.5 border-primary/30 hover:bg-primary/10 hover:text-primary">
                <Plus className="h-4 w-4" />
                Add Material
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-muted-foreground border-b border-border">
                    <th className="text-left pb-3 pr-3 min-w-[140px]">Material</th>
                    <th className="text-left pb-3 pr-3 w-20">Unit</th>
                    <th className="text-right pb-3 pr-3 w-24">Qty</th>
                    <th className="text-right pb-3 pr-3 w-28">Unit Cost</th>
                    <th className="text-right pb-3 pr-3 w-28">Extended</th>
                    <th className="w-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {materials.map(m => (
                    <tr key={m.id} className="group">
                      <td className="py-2 pr-3">
                        <Input
                          value={m.name}
                          onChange={e => updateMaterial(m.id, "name", e.target.value)}
                          placeholder="Material name"
                          className="h-8 text-sm"
                        />
                      </td>
                      <td className="py-2 pr-3">
                        <Input
                          value={m.unit}
                          onChange={e => updateMaterial(m.id, "unit", e.target.value)}
                          placeholder="unit"
                          className="h-8 text-sm"
                        />
                      </td>
                      <td className="py-2 pr-3">
                        <Input
                          type="number"
                          min={0}
                          step={0.5}
                          value={m.quantity}
                          onChange={e => updateMaterial(m.id, "quantity", Number(e.target.value))}
                          className="h-8 text-sm text-right"
                        />
                      </td>
                      <td className="py-2 pr-3">
                        <div className="relative">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
                          <Input
                            type="number"
                            min={0}
                            step={0.01}
                            value={m.unitCost}
                            onChange={e => updateMaterial(m.id, "unitCost", Number(e.target.value))}
                            className="h-8 text-sm text-right pl-5"
                          />
                        </div>
                      </td>
                      <td className="py-2 pr-3 text-right font-medium text-foreground">
                        {fmt(m.quantity * m.unitCost)}
                      </td>
                      <td className="py-2">
                        <button
                          onClick={() => removeMaterial(m.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-border">
                    <td colSpan={4} className="pt-3 text-sm font-semibold text-foreground">
                      Total Materials Cost
                    </td>
                    <td className="pt-3 text-right font-bold text-primary text-base">
                      {fmt(calc.totalMaterialsCost)}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* ── RIGHT: summary ───────────────────────────────────────────── */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">

            {/* Cost breakdown */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-5">
                Cost Summary
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Materials</span>
                  <span className="font-medium">{fmt(calc.totalMaterialsCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Labor
                    <span className="text-xs ml-1 text-muted-foreground/70">
                      ({form.laborTime}m @ ${form.hourlyLaborRate}/hr)
                    </span>
                  </span>
                  <span className="font-medium">{fmt(calc.laborCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Overhead ({form.overheadPercent}%)</span>
                  <span className="font-medium">{fmt(calc.overheadCost)}</span>
                </div>

                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-semibold text-foreground">Total Cost</span>
                  <span className="font-bold text-foreground text-base">{fmt(calc.totalCost)}</span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 shadow-sm">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-5">
                Pricing
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Margin</span>
                  <span className="font-medium">{form.marginPercent}%</span>
                </div>
                <div className="flex justify-between items-center border-t border-primary/20 pt-3">
                  <span className="font-semibold text-foreground">Suggested Price</span>
                  <span className="font-serif text-2xl font-bold text-primary">
                    {fmt(calc.suggestedPrice)}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-green-50 dark:bg-green-950/20 rounded-lg px-3 py-2">
                  <span className="text-green-700 dark:text-green-400 font-medium">Profit</span>
                  <span className="text-green-700 dark:text-green-400 font-bold">
                    {fmt(calc.profit)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <Button onClick={copySummary} variant="outline" className="w-full gap-2 border-primary/30 hover:bg-primary/10 hover:text-primary">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy Summary"}
              </Button>
              <Button onClick={clearCalculator} variant="ghost" className="w-full gap-2 text-muted-foreground hover:text-destructive">
                <RefreshCw className="h-4 w-4" />
                Clear Calculator
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
