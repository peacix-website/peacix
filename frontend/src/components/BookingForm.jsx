import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const BookingForm = ({ counselorId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceTypes = [
    "Online Video Counseling",
    "Career Counseling",
    "Relationship & Family Counseling",
    "Student Mental Health Support",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/[-\s]/g, ""))) {
      newErrors.phone = "Phone number must be 10-15 digits";
    }

    if (!formData.serviceType)
      newErrors.serviceType = "Please select a service type";

    if (!formData.preferredDate)
      newErrors.preferredDate = "Preferred date is required";

    if (!formData.preferredTime)
      newErrors.preferredTime = "Preferred time is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Some required fields are missing or invalid.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("bookings").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service_type: formData.serviceType,
          preferred_date: formData.preferredDate,
          preferred_time: formData.preferredTime,
          message: formData.message,
          counselor_id: counselorId || null,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Booking Request Submitted 🌸",
        description:
          "Our team will contact you within 24 hours to confirm your appointment.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
      });

      setErrors({});
    } catch (error) {
      console.error("Booking submission error:", error);

      toast({
        title: "Booking Failed",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-card p-6 rounded-2xl border border-border shadow-sm"
    >
      <InputField
        label="Full Name *"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />

      <InputField
        label="Email Address *"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      <InputField
        label="Phone Number *"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
      />

      {/* Service Type */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Service Type *
        </label>
        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:outline-none transition"
        >
          <option value="">Select a service</option>
          {serviceTypes.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        {errors.serviceType && (
          <p className="text-destructive text-sm mt-1">
            {errors.serviceType}
          </p>
        )}
      </div>

      <InputField
        label="Preferred Date *"
        type="date"
        name="preferredDate"
        value={formData.preferredDate}
        onChange={handleChange}
        error={errors.preferredDate}
      />

      <InputField
        label="Preferred Time *"
        type="time"
        name="preferredTime"
        value={formData.preferredTime}
        onChange={handleChange}
        error={errors.preferredTime}
      />

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Additional Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:outline-none transition"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className="w-full"
      >
        {isSubmitting ? "Submitting..." : "Book Your Session"}
      </Button>
    </form>
  );
};

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
}) => (
  <div>
    <label className="block text-sm font-medium text-foreground mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:outline-none transition"
    />
    {error && (
      <p className="text-destructive text-sm mt-1">
        {error}
      </p>
    )}
  </div>
);

export default BookingForm;
