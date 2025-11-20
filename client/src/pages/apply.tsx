import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, ArrowLeft, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jobApplicationFormSchema } from "@shared/schema";
import type { z } from "zod";
import HeadTags from "@/components/seo/head-tags";

type JobApplicationForm = z.infer<typeof jobApplicationFormSchema>;

const JobApplication = () => {
  const [location] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Get position from URL params if provided
  const urlParams = new URLSearchParams(location.split('?')[1]);
  const defaultPosition = urlParams.get('position') || '';

  const form = useForm<JobApplicationForm>({
    resolver: zodResolver(jobApplicationFormSchema),
    defaultValues: {
      position: (defaultPosition as JobApplicationForm['position']) || undefined,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      university: "",
      studyField: "",
      graduationYear: "",
      experience: "",
      motivation: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: JobApplicationForm & { cvFile?: File }) => {
      const formData = new FormData();
      
      // Add all form data
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'cvFile' && value) {
          formData.append(key, value);
        }
      });
      
      // Add CV file if selected
      if (selectedFile) {
        formData.append('cvFile', selectedFile);
      }

      const response = await fetch('/api/job-applications', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We'll review your application and get back to you soon.",
      });
      form.reset();
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type (PDF, DOC, DOCX)
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF, DOC, or DOCX file.",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const onSubmit = (data: JobApplicationForm) => {
    mutation.mutate({ ...data, cvFile: selectedFile || undefined });
  };

  return (
    <>
      <HeadTags
        title="Apply for Internship | Haydeen Technologies Ghana"
        description="Apply for UX/UI Design Intern or Agribusiness Research Intern positions at Haydeen Technologies. Join us in building AgriConnect platform."
        keywords="apply internship Ghana, UX UI design intern application, agribusiness research intern application, AgriConnect jobs Ghana"
        canonical="https://haydeentechnologies.com/apply"
      />
      
      {/* Header */}
      <section className="bg-[#0A3D62] text-white py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Link href="/careers" className="inline-flex items-center text-white/80 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Careers
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Apply for Internship</h1>
            <p className="text-lg opacity-90">
              Join our team and help build technology that transforms agriculture in Ghana and West Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-[#0A3D62]">Internship Application</CardTitle>
                <CardDescription>
                  Please fill out all required fields and upload your CV. We'll review your application and contact you within 1-2 weeks.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-8">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Position Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="position">Position Applied For *</Label>
                    <Select
                      onValueChange={(value) => form.setValue("position", value as JobApplicationForm['position'])}
                      defaultValue={form.getValues("position")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select the position you're applying for" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UX/UI Design Intern">UX/UI Design Intern</SelectItem>
                        <SelectItem value="Agribusiness Research Intern">Agribusiness Research Intern</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.position && (
                      <p className="text-sm text-red-600">{form.formState.errors.position.message}</p>
                    )}
                  </div>

                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#0A3D62]">Personal Information</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          {...form.register("firstName")}
                          placeholder="Enter your first name"
                        />
                        {form.formState.errors.firstName && (
                          <p className="text-sm text-red-600">{form.formState.errors.firstName.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          {...form.register("lastName")}
                          placeholder="Enter your last name"
                        />
                        {form.formState.errors.lastName && (
                          <p className="text-sm text-red-600">{form.formState.errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...form.register("email")}
                          placeholder="your.email@example.com"
                        />
                        {form.formState.errors.email && (
                          <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...form.register("phone")}
                          placeholder="+233 XX XXX XXXX"
                        />
                        {form.formState.errors.phone && (
                          <p className="text-sm text-red-600">{form.formState.errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        {...form.register("location")}
                        placeholder="City, Region (e.g., Accra, Greater Accra)"
                      />
                      {form.formState.errors.location && (
                        <p className="text-sm text-red-600">{form.formState.errors.location.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Educational Background */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#0A3D62]">Educational Background</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="university">University/Institution</Label>
                      <Input
                        id="university"
                        {...form.register("university")}
                        placeholder="Name of your university or institution"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="studyField">Field of Study</Label>
                        <Input
                          id="studyField"
                          {...form.register("studyField")}
                          placeholder="e.g., Computer Science, Business Administration"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="graduationYear">Expected Graduation Year</Label>
                        <Input
                          id="graduationYear"
                          {...form.register("graduationYear")}
                          placeholder="e.g., 2024, 2025"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Experience & Motivation */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#0A3D62]">Experience & Motivation</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="experience">Relevant Experience</Label>
                      <Textarea
                        id="experience"
                        {...form.register("experience")}
                        placeholder="Briefly describe any relevant experience, projects, or skills"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motivation">Why do you want to join Haydeen Technologies? *</Label>
                      <Textarea
                        id="motivation"
                        {...form.register("motivation")}
                        placeholder="Tell us what motivates you to apply for this position and how you can contribute to our mission"
                        rows={4}
                      />
                      {form.formState.errors.motivation && (
                        <p className="text-sm text-red-600">{form.formState.errors.motivation.message}</p>
                      )}
                    </div>
                  </div>

                  {/* CV Upload */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#0A3D62]">Upload Your CV</h3>
                    
                    <div className="space-y-2">
                      <Label>CV/Resume</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        {selectedFile ? (
                          <div className="flex items-center justify-center space-x-2">
                            <FileText className="h-8 w-8 text-[#27AE60]" />
                            <div>
                              <p className="font-medium text-[#0A3D62]">{selectedFile.name}</p>
                              <p className="text-sm text-gray-500">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedFile(null);
                                if (fileInputRef.current) fileInputRef.current.value = '';
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-lg font-medium text-gray-600 mb-2">
                              Upload Your CV
                            </p>
                            <p className="text-sm text-gray-500 mb-4">
                              PDF, DOC, or DOCX format (Max 5MB)
                            </p>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              Choose File
                            </Button>
                          </div>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-[#27AE60] hover:bg-[#27AE60]/90 text-white"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Submitting Application...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobApplication;