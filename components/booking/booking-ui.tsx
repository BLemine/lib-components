"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  CalendarDays,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  ChevronRight,
  Check,
  Star,
  MapPin,
  Video,
} from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    id: 1,
    name: "Strategy Consultation",
    duration: "60 min",
    price: "$150",
    description: "Deep dive into your business strategy",
    icon: "strategy",
  },
  {
    id: 2,
    name: "Design Review",
    duration: "45 min",
    price: "$120",
    description: "Expert feedback on your designs",
    icon: "design",
  },
  {
    id: 3,
    name: "Quick Call",
    duration: "30 min",
    price: "$75",
    description: "Quick questions and advice",
    icon: "call",
  },
  {
    id: 4,
    name: "Workshop Session",
    duration: "90 min",
    price: "$200",
    description: "Interactive workshop for your team",
    icon: "workshop",
  },
]

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
]

const bookedSlots = ["10:00", "14:30", "16:00"]

const testimonials = [
  {
    name: "Sarah M.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face",
    rating: 5,
    text: "Incredibly helpful session! Got actionable insights.",
  },
  {
    name: "James R.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    rating: 5,
    text: "Professional and knowledgeable. Highly recommend!",
  },
]

export function BookingUI() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const getSelectedServiceData = () => {
    return services.find(s => s.id === selectedService)
  }

  return (
    <div className="w-full max-w-5xl">
      <div className="grid lg:grid-cols-[1fr_340px] gap-6">
        {/* Main Booking Flow */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Book a Session</CardTitle>
                <CardDescription>Schedule your consultation in a few steps</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={cn(
                      "h-2 w-8 rounded-full transition-colors",
                      s <= step ? "bg-primary" : "bg-muted"
                    )}
                  />
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Step 1: Select Service */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="font-semibold text-lg">Select a Service</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={cn(
                        "p-4 rounded-xl border text-left transition-all hover:border-primary/50",
                        selectedService === service.id
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "hover:bg-muted/50"
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">{service.name}</h4>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {service.duration}
                            </Badge>
                            <span className="font-semibold text-primary">{service.price}</span>
                          </div>
                        </div>
                        {selectedService === service.id && (
                          <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                            <Check className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Date & Time */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="font-semibold text-lg">Select Date & Time</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                      className="rounded-lg border p-3"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label>Available Times</Label>
                    {selectedDate ? (
                      <ScrollArea className="h-[280px] pr-4">
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map((time) => {
                            const isBooked = bookedSlots.includes(time)
                            return (
                              <button
                                key={time}
                                disabled={isBooked}
                                onClick={() => setSelectedTime(time)}
                                className={cn(
                                  "p-3 rounded-lg border text-center transition-all",
                                  isBooked && "opacity-50 cursor-not-allowed bg-muted",
                                  selectedTime === time
                                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                                    : "hover:border-primary/50 hover:bg-muted/50"
                                )}
                              >
                                <span className="font-medium">{time}</span>
                                {isBooked && <p className="text-xs text-muted-foreground">Booked</p>}
                              </button>
                            )
                          })}
                        </div>
                      </ScrollArea>
                    ) : (
                      <div className="h-[280px] flex items-center justify-center rounded-lg border border-dashed">
                        <p className="text-sm text-muted-foreground">Select a date to see available times</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Your Details */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="font-semibold text-lg">Your Details</h3>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <textarea
                        id="notes"
                        placeholder="Tell us about your goals for this session..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm pl-10 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="text-center py-6">
                  <div className="h-16 w-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Booking Confirmed!</h3>
                  <p className="text-muted-foreground">Your session has been scheduled successfully</p>
                </div>
                <Card className="bg-muted/30">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedTime} - {getSelectedServiceData()?.duration}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Video className="h-4 w-4 text-muted-foreground" />
                      <span>Zoom Meeting (link will be sent via email)</span>
                    </div>
                  </CardContent>
                </Card>
                <p className="text-sm text-muted-foreground text-center">
                  A confirmation email has been sent to {formData.email}
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-4 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
              >
                Back
              </Button>
              {step < 4 ? (
                <Button
                  onClick={handleNext}
                  disabled={
                    (step === 1 && !selectedService) ||
                    (step === 2 && (!selectedDate || !selectedTime)) ||
                    (step === 3 && (!formData.name || !formData.email))
                  }
                >
                  {step === 3 ? "Confirm Booking" : "Continue"}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button onClick={() => { setStep(1); setSelectedService(null); setSelectedDate(undefined); setSelectedTime(null); }}>
                  Book Another Session
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Booking Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedService ? (
                <>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="font-medium">{getSelectedServiceData()?.name}</p>
                    <p className="text-sm text-muted-foreground">{getSelectedServiceData()?.description}</p>
                  </div>
                  {selectedDate && (
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>
                    </div>
                  )}
                  {selectedTime && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedTime}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total</span>
                    <span className="text-xl font-bold">{getSelectedServiceData()?.price}</span>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Select a service to see summary
                </p>
              )}
            </CardContent>
          </Card>

          {/* Testimonials */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">What People Say</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{testimonial.name}</p>
                      <div className="flex">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-warning text-warning" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{`"${testimonial.text}"`}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>support@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+1 (555) 123-4567</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
