"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy, Mail, Plus, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

interface InvitationCodeGeneratorProps {
  className?: string;
}

export default function InvitationCodeGenerator({
  className = "",
}: InvitationCodeGeneratorProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { generateInvitationCode, userProfile } = useAuth();

  const handleGenerateCode = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const { data, error } = await generateInvitationCode(email);

    if (error) {
      setError(error.message || "Failed to generate invitation code");
    } else {
      setGeneratedCode(data.invitation_code);
      setSuccess(`Invitation code generated successfully for ${email}`);
      setEmail("");
    }

    setLoading(false);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  const resetForm = () => {
    setEmail("");
    setError(null);
    setSuccess(null);
    setGeneratedCode(null);
  };

  // Only show to admin users
  const isAdmin =
    userProfile?.roles && Array.isArray(userProfile.roles)
      ? userProfile.roles.includes("admin") ||
        userProfile.roles.includes("owner")
      : false;

  if (!isAdmin) {
    return null;
  }

  return (
    <div className={className}>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            onClick={() => {
              resetForm();
              setIsDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Generate Invitation Code
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center">
              <Mail className="mr-2 h-5 w-5 text-red-500" />
              Generate Barber Invitation
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-500 bg-green-500/10">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-500">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            {generatedCode && (
              <Card className="border-gray-700 bg-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-300">
                    Generated Invitation Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 px-3 py-2 bg-gray-950 border border-gray-700 rounded text-green-400 font-mono text-sm">
                      {generatedCode}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(generatedCode)}
                      className="border-gray-700 hover:bg-gray-700"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    This code expires in 30 days. Share it with the barber to
                    create their account.
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Barber Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter barber's email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                disabled={loading}
              />
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => setIsDialogOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={handleGenerateCode}
                disabled={loading || !email}
              >
                {loading ? "Generating..." : "Generate Code"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
