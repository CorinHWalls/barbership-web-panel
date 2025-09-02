"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  User,
  Scissors,
} from "lucide-react";

interface Appointment {
  id: string;
  clientName: string;
  barberName: string;
  service: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
}

interface AppointmentCalendarProps {
  appointments?: Appointment[];
  onAppointmentClick?: (appointment: Appointment) => void;
  onAppointmentCreate?: (appointment: Partial<Appointment>) => void;
  onAppointmentUpdate?: (appointment: Appointment) => void;
  onAppointmentDelete?: (appointmentId: string) => void;
}

const statusColors = {
  confirmed: "bg-green-500",
  pending: "bg-blue-500",
  completed: "bg-gray-500",
  cancelled: "bg-red-500",
};

const mockBarbers = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Maria Garcia" },
  { id: "3", name: "David Johnson" },
];

const mockServices = [
  { id: "1", name: "Haircut", duration: 30 },
  { id: "2", name: "Beard Trim", duration: 15 },
  { id: "3", name: "Haircut & Beard", duration: 45 },
  { id: "4", name: "Hair Coloring", duration: 60 },
];

const mockAppointments: Appointment[] = [
  {
    id: "1",
    clientName: "Alex Johnson",
    barberName: "John Smith",
    service: "Haircut",
    date: new Date(),
    startTime: "10:00",
    endTime: "10:30",
    status: "confirmed",
  },
  {
    id: "2",
    clientName: "Sarah Williams",
    barberName: "Maria Garcia",
    service: "Hair Coloring",
    date: new Date(),
    startTime: "11:00",
    endTime: "12:00",
    status: "pending",
  },
  {
    id: "3",
    clientName: "Michael Brown",
    barberName: "David Johnson",
    service: "Beard Trim",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    startTime: "14:00",
    endTime: "14:15",
    status: "cancelled",
  },
  {
    id: "4",
    clientName: "Emily Davis",
    barberName: "John Smith",
    service: "Haircut & Beard",
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    startTime: "15:30",
    endTime: "16:15",
    status: "completed",
  },
];

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({
  appointments = mockAppointments,
  onAppointmentClick = () => {},
  onAppointmentCreate = () => {},
  onAppointmentUpdate = () => {},
  onAppointmentDelete = () => {},
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [selectedBarber, setSelectedBarber] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isNewAppointmentDialogOpen, setIsNewAppointmentDialogOpen] =
    useState(false);
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
    date: new Date(),
    status: "pending",
  });

  // Filter appointments based on selected date, barber, and status
  const filteredAppointments = appointments.filter((appointment) => {
    const sameDate =
      appointment.date.getDate() === date.getDate() &&
      appointment.date.getMonth() === date.getMonth() &&
      appointment.date.getFullYear() === date.getFullYear();

    const barberMatch =
      selectedBarber === "all" || appointment.barberName === selectedBarber;
    const statusMatch =
      selectedStatus === "all" || appointment.status === selectedStatus;

    return sameDate && barberMatch && statusMatch;
  });

  const handlePrevDay = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    setDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    setDate(newDate);
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    onAppointmentClick(appointment);
  };

  const handleCreateAppointment = () => {
    onAppointmentCreate(newAppointment);
    setIsNewAppointmentDialogOpen(false);
    setNewAppointment({
      date: new Date(),
      status: "pending",
    });
  };

  const handleUpdateAppointment = () => {
    if (selectedAppointment) {
      onAppointmentUpdate(selectedAppointment);
      setSelectedAppointment(null);
    }
  };

  const handleDeleteAppointment = () => {
    if (selectedAppointment) {
      onAppointmentDelete(selectedAppointment.id);
      setSelectedAppointment(null);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-background text-foreground w-full h-full">
      <Card className="border-zinc-800 bg-zinc-950">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-bold">Appointments</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Button
                variant={view === "calendar" ? "default" : "outline"}
                onClick={() => setView("calendar")}
              >
                Calendar
              </Button>
              <Button
                variant={view === "list" ? "default" : "outline"}
                onClick={() => setView("list")}
              >
                List
              </Button>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsNewAppointmentDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={handlePrevDay}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="font-medium">{formatDate(date)}</div>
                <Button variant="outline" size="icon" onClick={handleNextDay}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Select
                  value={selectedBarber}
                  onValueChange={setSelectedBarber}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Barbers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Barbers</SelectItem>
                    {mockBarbers.map((barber) => (
                      <SelectItem key={barber.id} value={barber.name}>
                        {barber.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {view === "calendar" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <div className="border rounded-md p-4 h-[400px] overflow-y-auto">
                    <div className="grid grid-cols-1 gap-2">
                      {filteredAppointments.length > 0 ? (
                        filteredAppointments.map((appointment) => (
                          <div
                            key={appointment.id}
                            className={`p-3 rounded-md cursor-pointer border border-zinc-800 hover:border-zinc-700 transition-colors ${statusColors[appointment.status]}`}
                            onClick={() => handleAppointmentClick(appointment)}
                          >
                            <div className="flex justify-between items-center">
                              <div className="font-medium">
                                {appointment.clientName}
                              </div>
                              <Badge variant="outline">
                                {appointment.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-zinc-400">
                              {appointment.startTime} - {appointment.endTime} |{" "}
                              {appointment.service}
                            </div>
                            <div className="text-sm text-zinc-400">
                              {appointment.barberName}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-zinc-500">
                          No appointments for this day
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    className="border rounded-md p-3"
                  />
                </div>
              </div>
            )}

            {view === "list" && (
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left p-3">Client</th>
                      <th className="text-left p-3">Time</th>
                      <th className="text-left p-3">Service</th>
                      <th className="text-left p-3">Barber</th>
                      <th className="text-left p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((appointment) => (
                        <tr
                          key={appointment.id}
                          className="border-b border-zinc-800 hover:bg-zinc-900 cursor-pointer"
                          onClick={() => handleAppointmentClick(appointment)}
                        >
                          <td className="p-3">{appointment.clientName}</td>
                          <td className="p-3">
                            {appointment.startTime} - {appointment.endTime}
                          </td>
                          <td className="p-3">{appointment.service}</td>
                          <td className="p-3">{appointment.barberName}</td>
                          <td className="p-3">
                            <Badge className={statusColors[appointment.status]}>
                              {appointment.status}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center py-8 text-zinc-500"
                        >
                          No appointments for this day
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Appointment Dialog */}
      <Dialog
        open={!!selectedAppointment}
        onOpenChange={(open) => !open && setSelectedAppointment(null)}
      >
        <DialogContent className="sm:max-w-[425px] bg-zinc-950 text-white">
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client" className="text-right">
                  Client
                </Label>
                <Input
                  id="client"
                  value={selectedAppointment.clientName}
                  onChange={(e) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      clientName: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="barber" className="text-right">
                  Barber
                </Label>
                <Select
                  value={selectedAppointment.barberName}
                  onValueChange={(value) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      barberName: value,
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select barber" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockBarbers.map((barber) => (
                      <SelectItem key={barber.id} value={barber.name}>
                        {barber.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="service" className="text-right">
                  Service
                </Label>
                <Select
                  value={selectedAppointment.service}
                  onValueChange={(value) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      service: value,
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockServices.map((service) => (
                      <SelectItem key={service.id} value={service.name}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <div className="col-span-3 flex space-x-2">
                  <Input
                    id="startTime"
                    type="time"
                    value={selectedAppointment.startTime}
                    onChange={(e) =>
                      setSelectedAppointment({
                        ...selectedAppointment,
                        startTime: e.target.value,
                      })
                    }
                    className="flex-1"
                  />
                  <span className="flex items-center">to</span>
                  <Input
                    id="endTime"
                    type="time"
                    value={selectedAppointment.endTime}
                    onChange={(e) =>
                      setSelectedAppointment({
                        ...selectedAppointment,
                        endTime: e.target.value,
                      })
                    }
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={selectedAppointment.status}
                  onValueChange={(value: any) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      status: value,
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter className="flex space-x-2">
            <Button variant="destructive" onClick={handleDeleteAppointment}>
              Delete
            </Button>
            <Button
              variant="outline"
              onClick={() => setSelectedAppointment(null)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateAppointment}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Appointment Dialog */}
      <Dialog
        open={isNewAppointmentDialogOpen}
        onOpenChange={setIsNewAppointmentDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px] bg-zinc-950 text-white">
          <DialogHeader>
            <DialogTitle>Create New Appointment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-client" className="text-right">
                <User className="h-4 w-4" />
              </Label>
              <Input
                id="new-client"
                placeholder="Client Name"
                value={newAppointment.clientName || ""}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    clientName: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-barber" className="text-right">
                <Scissors className="h-4 w-4" />
              </Label>
              <Select
                value={newAppointment.barberName}
                onValueChange={(value) =>
                  setNewAppointment({
                    ...newAppointment,
                    barberName: value,
                  })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select barber" />
                </SelectTrigger>
                <SelectContent>
                  {mockBarbers.map((barber) => (
                    <SelectItem key={barber.id} value={barber.name}>
                      {barber.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-service" className="text-right">
                <CalendarIcon className="h-4 w-4" />
              </Label>
              <Select
                value={newAppointment.service}
                onValueChange={(value) =>
                  setNewAppointment({
                    ...newAppointment,
                    service: value,
                  })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {mockServices.map((service) => (
                    <SelectItem key={service.id} value={service.name}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-time" className="text-right">
                <Clock className="h-4 w-4" />
              </Label>
              <div className="col-span-3 flex space-x-2">
                <Input
                  id="new-startTime"
                  type="time"
                  value={newAppointment.startTime || ""}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      startTime: e.target.value,
                    })
                  }
                  className="flex-1"
                />
                <span className="flex items-center">to</span>
                <Input
                  id="new-endTime"
                  type="time"
                  value={newAppointment.endTime || ""}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      endTime: e.target.value,
                    })
                  }
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewAppointmentDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateAppointment}>
              Create Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentCalendar;
