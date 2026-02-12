import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Sparkles, Users } from "lucide-react"

export const metadata = {
  title: "About | WeMark - Handcrafted with Love",
  description: "Learn about WeMark and our passion for creating beautiful handcrafted shadow boxes.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1">
                <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl text-balance">
                  Made Just For You
                </h1>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  At WeMark, every shadow box is a labor of love. We believe that the best
                  gifts are the ones made by hand, with care and intention. Each paper rose
                  is delicately crafted, each message thoughtfully placed, to create a
                  keepsake that captures your most precious moments.
                </p>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  What started as a passion project has grown into a mission: to help
                  people express their love through beautiful, personalized art pieces
                  that stand the test of time.
                </p>
              </div>
              <div className="flex-1 relative w-full max-w-md">
                <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src="/images/mom-shadow-box.jpeg"
                    alt="WeMark handcrafted shadow box close-up"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Our Values
            </h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
                  Crafted with Love
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Every petal, every detail is made by hand with genuine care and
                  attention. No two pieces are exactly alike.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
                  Uniquely Personal
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  We work with you to customize every aspect -- names, colors,
                  messages, and photos to make your gift truly one-of-a-kind.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
                  Celebrating Connection
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Our mission is to strengthen the bonds between people through
                  meaningful, heartfelt gifts they'll treasure forever.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary/30">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground text-balance">
              Ready to Create Something Special?
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Browse our collection or reach out for a custom creation.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/shop">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
