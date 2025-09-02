"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  CheckCircle,
  Clock,
  Scissors,
  UserCheck,
} from "lucide-react";

interface KioskInterfaceProps {
  onSwitchToAdmin?: () => void;
}

const KioskInterface = ({
  onSwitchToAdmin = () => {},
}: KioskInterfaceProps) => {
  const [activeTab, setActiveTab] = useState("check-in");
  const [checkInStep, setCheckInStep] = useState(1);
  const [bookingStep, setBookingStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedService, setSelectedService] = useState<string>();
  const [selectedBarber, setSelectedBarber] = useState<string>();
  const [selectedTime, setSelectedTime] = useState<string>();

  // Mock data
  const services = [
    { id: "1", name: "Haircut", price: "$30", duration: "30 min" },
    { id: "2", name: "Beard Trim", price: "$15", duration: "15 min" },
    { id: "3", name: "Haircut & Beard", price: "$40", duration: "45 min" },
    { id: "4", name: "Hot Towel Shave", price: "$35", duration: "30 min" },
    { id: "5", name: "Hair Coloring", price: "$60", duration: "60 min" },
  ];

  const barbers = [
    { id: "1", name: "John Smith" },
    { id: "2", name: "Mike Johnson" },
    { id: "3", name: "David Williams" },
    { id: "4", name: "Robert Brown" },
  ];

  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
  ];

  const resetCheckIn = () => {
    setCheckInStep(1);
  };

  const resetBooking = () => {
    setBookingStep(1);
    setSelectedService(undefined);
    setSelectedBarber(undefined);
    setSelectedTime(undefined);
    setDate(new Date());
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    resetCheckIn();
    resetBooking();
  };

  const renderCheckInContent = () => {
    switch (checkInStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="appointment-id" className="text-lg">
                Appointment ID or Phone Number
              </Label>
              <Input
                id="appointment-id"
                placeholder="Enter your appointment ID or phone number"
                className="h-14 text-lg"
              />
            </div>
            <Button
              className="w-full h-16 text-xl"
              onClick={() => setCheckInStep(2)}
            >
              Find Appointment
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-muted/20 p-6 rounded-lg space-y-4">
              <div className="flex justify-between">
                <span className="text-lg font-medium">Appointment Details</span>
                <span className="text-lg font-medium text-primary">
                  Today, 2:30 PM
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg">Service:</span>
                <span className="text-lg">Haircut & Beard</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg">Barber:</span>
                <span className="text-lg">John Smith</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg">Duration:</span>
                <span className="text-lg">45 min</span>
              </div>
            </div>
            <Button
              className="w-full h-16 text-xl"
              onClick={() => setCheckInStep(3)}
            >
              Check In Now
            </Button>
            <Button
              variant="outline"
              className="w-full h-12"
              onClick={() => setCheckInStep(1)}
            >
              Back
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 text-center">
            <CheckCircle className="w-24 h-24 mx-auto text-green-500" />
            <h2 className="text-2xl font-bold">Check-In Successful!</h2>
            <p className="text-lg">Your barber will be with you shortly.</p>
            <p className="text-lg font-medium">
              Estimated wait time: 5-10 minutes
            </p>
            <Button
              className="w-full h-16 text-xl mt-6"
              onClick={() => setCheckInStep(1)}
            >
              Done
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderBookingContent = () => {
    switch (bookingStep) {
      case 1: // Select Service
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Select a Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <Card
                  key={service.id}
                  className={`cursor-pointer transition-all ${selectedService === service.id ? "border-primary ring-2 ring-primary" : ""}`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-medium">{service.name}</h3>
                        <div className="flex items-center mt-2 text-muted-foreground">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                      <div className="text-xl font-bold">{service.price}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button
              className="w-full h-16 text-xl"
              onClick={() => setBookingStep(2)}
              disabled={!selectedService}
            >
              Continue
            </Button>
          </div>
        );
      case 2: // Select Barber
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Choose Your Barber</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {barbers.map((barber) => (
                <Card
                  key={barber.id}
                  className={`cursor-pointer transition-all ${selectedBarber === barber.id ? "border-primary ring-2 ring-primary" : ""}`}
                  onClick={() => setSelectedBarber(barber.id)}
                >
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-2xl font-bold">
                        {barber.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">{barber.name}</h3>
                      <p className="text-muted-foreground">Available Today</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="flex-1 h-16 text-xl"
                onClick={() => setBookingStep(1)}
              >
                Back
              </Button>
              <Button
                className="flex-1 h-16 text-xl"
                onClick={() => setBookingStep(3)}
                disabled={!selectedBarber}
              >
                Continue
              </Button>
            </div>
          </div>
        );
      case 3: // Select Date & Time
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Select Date & Time</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-lg mb-2 block">Date</Label>
                <div className="border rounded-md p-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="mx-auto"
                    disabled={(date) => {
                      // Disable dates in the past
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                  />
                </div>
              </div>
              <div>
                <Label className="text-lg mb-2 block">
                  Available Time Slots
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className="h-12"
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="flex-1 h-16 text-xl"
                onClick={() => setBookingStep(2)}
              >
                Back
              </Button>
              <Button
                className="flex-1 h-16 text-xl"
                onClick={() => setBookingStep(4)}
                disabled={!selectedTime || !date}
              >
                Continue
              </Button>
            </div>
          </div>
        );
      case 4: // Contact Information
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Your Information</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-lg">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  className="h-14 text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-lg">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  className="h-14 text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-lg">
                  Email (Optional)
                </Label>
                <Input
                  id="email"
                  placeholder="Enter your email address"
                  className="h-14 text-lg"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="flex-1 h-16 text-xl"
                onClick={() => setBookingStep(3)}
              >
                Back
              </Button>
              <Button
                className="flex-1 h-16 text-xl"
                onClick={() => setBookingStep(5)}
              >
                Continue
              </Button>
            </div>
          </div>
        );
      case 5: // Confirmation
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Confirm Your Appointment</h2>
            <div className="bg-muted/20 p-6 rounded-lg space-y-4">
              <div className="flex justify-between">
                <span className="text-lg">Service:</span>
                <span className="text-lg font-medium">
                  {services.find((s) => s.id === selectedService)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg">Barber:</span>
                <span className="text-lg font-medium">
                  {barbers.find((b) => b.id === selectedBarber)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg">Date:</span>
                <span className="text-lg font-medium">
                  {date ? format(date, "EEEE, MMMM d, yyyy") : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg">Time:</span>
                <span className="text-lg font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg">Price:</span>
                <span className="text-lg font-medium">
                  {services.find((s) => s.id === selectedService)?.price}
                </span>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="flex-1 h-16 text-xl"
                onClick={() => setBookingStep(4)}
              >
                Back
              </Button>
              <Button
                className="flex-1 h-16 text-xl"
                onClick={() => setBookingStep(6)}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        );
      case 6: // Success
        return (
          <div className="space-y-6 text-center">
            <CheckCircle className="w-24 h-24 mx-auto text-green-500" />
            <h2 className="text-2xl font-bold">Booking Successful!</h2>
            <div className="bg-muted/20 p-6 rounded-lg space-y-2 text-left">
              <p className="text-lg">
                Your appointment has been confirmed for:
              </p>
              <p className="text-xl font-bold">
                {date ? format(date, "EEEE, MMMM d, yyyy") : ""} at{" "}
                {selectedTime}
              </p>
              <p className="text-lg mt-4">
                Appointment ID:{" "}
                <span className="font-mono font-bold">BRB-2023-45678</span>
              </p>
              <p className="text-lg mt-4">
                A confirmation has been sent to your phone.
              </p>
            </div>
            <Button className="w-full h-16 text-xl mt-6" onClick={resetBooking}>
              Done
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderServicesContent = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Our Services</h2>
        <div className="grid grid-cols-1 gap-4">
          {services.map((service) => (
            <Card key={service.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-medium">{service.name}</h3>
                    <div className="flex items-center mt-2 text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                  <div className="text-xl font-bold">{service.price}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button
          className="w-full h-16 text-xl"
          onClick={() => {
            setActiveTab("book");
            resetBooking();
          }}
        >
          Book a Service
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-black p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Scissors className="h-8 w-8 text-primary mr-2" />
          <h1 className="text-2xl font-bold">BarberShop</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={onSwitchToAdmin}>
          Admin Mode
        </Button>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-8 max-w-5xl">
        <Card className="border-2 border-muted">
          <CardHeader className="pb-0">
            <Tabs
              defaultValue="check-in"
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 h-16 rounded-b-none">
                <TabsTrigger value="check-in" className="text-lg py-6">
                  <UserCheck className="mr-2 h-5 w-5" />
                  Check In
                </TabsTrigger>
                <TabsTrigger value="book" className="text-lg py-6">
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  Book Appointment
                </TabsTrigger>
                <TabsTrigger value="services" className="text-lg py-6">
                  <Scissors className="mr-2 h-5 w-5" />
                  Services
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-6 md:p-8 min-h-[500px]">
            <Tabs value={activeTab} className="w-full">
              <TabsContent value="check-in" className="mt-0">
                {renderCheckInContent()}
              </TabsContent>
              <TabsContent value="book" className="mt-0">
                {renderBookingContent()}
              </TabsContent>
              <TabsContent value="services" className="mt-0">
                {renderServicesContent()}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-black p-4 text-center mt-8">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} BarberShop. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default KioskInterface;
