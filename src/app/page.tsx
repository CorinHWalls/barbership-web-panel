"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  DollarSign,
  Users,
  Scissors,
  CalendarCheck,
  BarChart,
} from "lucide-react";
import AppointmentCalendar from "@/components/dashboard/AppointmentCalendar";
import KioskInterface from "@/components/kiosk/KioskInterface";

export default function DashboardPage() {
  const [mode, setMode] = useState<"admin" | "kiosk">("admin");

  // Mock data for dashboard stats
  const stats = [
    {
      title: "Total Appointments",
      value: "24",
      icon: <Calendar className="h-4 w-4 text-red-500" />,
    },
    {
      title: "Completed Today",
      value: "16",
      icon: <CalendarCheck className="h-4 w-4 text-green-500" />,
    },
    {
      title: "Daily Revenue",
      value: "$1,240",
      icon: <DollarSign className="h-4 w-4 text-yellow-500" />,
    },
    {
      title: "Active Barbers",
      value: "4",
      icon: <Scissors className="h-4 w-4 text-blue-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with mode toggle */}
      <header className="border-b border-gray-800 bg-gray-900 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Scissors className="h-6 w-6 text-red-500" />
            <h1 className="text-xl font-bold">Barbershop Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-gray-800 p-1">
              <Button
                variant={mode === "admin" ? "default" : "outline"}
                size="sm"
                onClick={() => setMode("admin")}
                className={
                  mode === "admin" ? "bg-red-600 text-white" : "text-gray-400"
                }
              >
                Admin
              </Button>
              <Button
                variant={mode === "kiosk" ? "default" : "outline"}
                size="sm"
                onClick={() => setMode("kiosk")}
                className={
                  mode === "kiosk" ? "bg-red-600 text-white" : "text-gray-400"
                }
              >
                Kiosk
              </Button>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-gray-700 text-gray-300"
            >
              <Users className="mr-2 h-4 w-4" /> Account
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      {mode === "admin" ? (
        <div className="flex min-h-[calc(100vh-73px)]">
          {/* Sidebar Navigation */}
          <aside className="w-64 border-r border-gray-800 bg-gray-900 p-4">
            <nav className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <BarChart className="mr-2 h-4 w-4 text-red-500" /> Dashboard
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <Calendar className="mr-2 h-4 w-4 text-red-500" /> Appointments
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <Scissors className="mr-2 h-4 w-4 text-red-500" /> Barbers
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <Users className="mr-2 h-4 w-4 text-red-500" /> Clients
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <DollarSign className="mr-2 h-4 w-4 text-red-500" /> Finances
              </Button>
            </nav>
          </aside>

          {/* Main Dashboard Content */}
          <main className="flex-1 overflow-auto bg-gray-950 p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Dashboard Overview</h2>
              <p className="text-gray-400">
                Welcome back! Here's what's happening today.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={index} className="border-gray-800 bg-gray-900">
                  <CardContent className="flex items-center justify-between p-6">
                    <div>
                      <p className="text-sm font-medium text-gray-400">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className="rounded-full bg-gray-800 p-3">
                      {stat.icon}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tabs for different views */}
            <Tabs defaultValue="calendar" className="w-full">
              <TabsList className="bg-gray-900">
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="barbers">Barber Schedule</TabsTrigger>
              </TabsList>
              <TabsContent value="calendar" className="mt-4">
                <Card className="border-gray-800 bg-gray-900">
                  <CardHeader>
                    <CardTitle>Appointment Calendar</CardTitle>
                    <CardDescription className="text-gray-400">
                      View and manage all appointments. Drag to reschedule.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AppointmentCalendar />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="list">
                <Card className="border-gray-800 bg-gray-900">
                  <CardHeader>
                    <CardTitle>Appointment List</CardTitle>
                    <CardDescription className="text-gray-400">
                      View appointments in list format for quick editing.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border border-gray-800 p-4 text-center">
                      <p className="text-gray-400">
                        Appointment list view will be displayed here
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="barbers">
                <Card className="border-gray-800 bg-gray-900">
                  <CardHeader>
                    <CardTitle>Barber Schedules</CardTitle>
                    <CardDescription className="text-gray-400">
                      View and manage barber availability and appointments.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border border-gray-800 p-4 text-center">
                      <p className="text-gray-400">
                        Barber schedules will be displayed here
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Recent Activity */}
            <Card className="mt-6 border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription className="text-gray-400">
                  Latest updates and notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      time: "10:30 AM",
                      text: "John Smith checked in for his appointment with Alex",
                    },
                    {
                      time: "09:45 AM",
                      text: "New appointment booked by Michael Johnson for tomorrow at 2:00 PM",
                    },
                    {
                      time: "09:15 AM",
                      text: "Sarah canceled her appointment for today at 11:30 AM",
                    },
                    {
                      time: "08:30 AM",
                      text: "Daily system backup completed successfully",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 rounded-md border border-gray-800 bg-gray-950 p-3"
                    >
                      <div className="rounded-full bg-gray-800 p-2">
                        <Clock className="h-4 w-4 text-red-500" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.text}</p>
                        <p className="text-sm text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      ) : (
        <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-gray-950">
          <KioskInterface />
        </div>
      )}
    </div>
  );
}
