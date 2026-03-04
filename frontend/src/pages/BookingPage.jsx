import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  CreditCard, 
  CheckCircle, 
  ArrowLeft,
  User,
  Mail,
  Phone,
  FileText,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { validateBookingForm, validateDate, validateTime } from "@/lib/validations";
import Footer from "@/components/Footer";

const BookingPage = () => {
  const { expertId } = useParams();
  const navigate = useNavigate();
  
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Confirmation
  const [bookingData, setBookingData] = useState({
    patientName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    sessionType: "video",
    notes: ""
  });
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const { data, error } = await supabase
          .from("clinicians")
          .select(`
            *,
            profiles!inner (
              full_name,
              avatar_url
            )
          `)
          .eq("id", expertId)
          .single();

        if (error) throw error;

        setExpert({
          ...data,
          name: data.profiles?.full_name,
          image: data.profiles?.avatar_url,
          rate: data.session_rate_cents ? (data.session_rate_cents / 100).toFixed(2) : "0",
          currency: data.currency || "USD"
        });
      } catch (error) {
        console.error("Error fetching expert:", error);
        toast({
          title: "Failed to load expert",
          description: error.message,
          variant: "destructive",
        });
        navigate("/experts");
      } finally {
        setLoading(false);
      }
    };

    fetchExpert();
  }, [expertId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setBookingData(prev => ({
      ...prev,
      date: slot.date,
      time: slot.time
    }));
  };

  const validateStep1 = () => {
    const validation = validateBookingForm(bookingData);
    
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      
      // Show first error in toast
      const firstError = Object.values(validation.errors)[0];
      toast({
        title: "Validation Error",
        description: firstError,
        variant: "destructive",
      });
      return false;
    }
    
    setFormErrors({});
    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePayment = async () => {
    setPaymentProcessing(true);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please login to complete booking.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      // Get patient profile
      const { data: patient } = await supabase
        .from("patients")
        .select("id, profile_id")
        .eq("profile_id", user.id)
        .single();

      let patientId = patient?.id;

      // If no patient record, create one
      if (!patientId) {
        const { data: newPatient } = await supabase
          .from("patients")
          .insert({
            profile_id: user.id
          })
          .select("id")
          .single();
        
        patientId = newPatient?.id;
      }

      // Calculate amount in cents
      const amountCents = Math.round(parseFloat(expert.rate) * 100);

      // Create booking record
      const { data: booking, error: bookingError } = await supabase
        .from("bookings")
        .insert({
          patient_id: patientId,
          clinician_profile_id: expert.profile_id,
          session_type: bookingData.sessionType,
          scheduled_at: `${bookingData.date}T${bookingData.time}:00Z`,
          duration_mins: expert.session_duration_mins || 50,
          amount_cents: amountCents,
          currency: expert.currency,
          status: 'pending',
          patient_notes: bookingData.notes
        })
        .select("id")
        .single();

      if (bookingError) throw bookingError;

      // Initialize Razorpay payment
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amountCents,
        currency: expert.currency || "INR",
        name: "Peacix Mental Health",
        description: `Session with ${expert.name}`,
        order_id: await createRazorpayOrder(amountCents, expert.currency),
        handler: function(response) {
          handlePaymentSuccess(response, booking.id);
        },
        prefill: {
          name: bookingData.patientName,
          email: bookingData.email,
          contact: bookingData.phone
        },
        theme: {
          color: "#E8A598" // Primary color
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setPaymentProcessing(false);
    }
  };

  const createRazorpayOrder = async (amount, currency) => {
    // This should call your Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
      body: { amount, currency }
    });

    if (error) throw error;
    return data.orderId;
  };

  const handlePaymentSuccess = async (response, bookingId) => {
    try {
      // Update booking with payment details
      const { error } = await supabase
        .from("bookings")
        .update({
          status: 'confirmed',
          payment_provider: 'razorpay',
          payment_id: response.razorpay_payment_id,
          appointment_id: response.razorpay_order_id
        })
        .eq("id", bookingId);

      if (error) throw error;

      setStep(3);
      toast({
        title: "Booking Confirmed! 🎉",
        description: "Your session has been successfully booked.",
      });
    } catch (error) {
      console.error("Error updating booking:", error);
      toast({
        title: "Payment Successful",
        description: "Booking confirmation pending. We'll contact you soon.",
      });
      setStep(3);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      
      <main className="pb-20">
        <div className="max-w-4xl mx-auto px-6 py-8">

          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(`/expert/${expertId}`)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Button>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <StepIndicator step={1} currentStep={step} label="Your Details" />
            <div className={`w-24 h-1 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
            <StepIndicator step={2} currentStep={step} label="Payment" />
            <div className={`w-24 h-1 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />
            <StepIndicator step={3} currentStep={step} label="Confirmation" />
          </div>

          {/* Step 1: Booking Details */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Expert Info Card */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {expert.name}
                    </h2>
                    <p className="text-primary font-medium">
                      ${expert.rate} / session
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {expert.specialization}
                    </p>
                  </div>
                </div>
              </div>

              {/* Patient Details Form */}
              <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Your Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <InputField
                    icon={<User />}
                    label="Full Name *"
                    name="patientName"
                    value={bookingData.patientName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                  
                  <InputField
                    icon={<Mail />}
                    label="Email *"
                    name="email"
                    type="email"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                  />
                  
                  <InputField
                    icon={<Phone />}
                    label="Phone *"
                    name="phone"
                    type="tel"
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                  />

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Session Type *
                    </label>
                    <select
                      name="sessionType"
                      value={bookingData.sessionType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      <option value="video">Video Call</option>
                      <option value="phone">Phone Call</option>
                      <option value="in-person">In-Person</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    value={bookingData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Anything you'd like to share..."
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Select Date & Time
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <InputField
                    icon={<Calendar />}
                    label="Preferred Date *"
                    name="date"
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => handleInputChange(e)}
                  />
                  
                  <InputField
                    icon={<Clock />}
                    label="Preferred Time *"
                    name="time"
                    type="time"
                    value={bookingData.time}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>

                <p className="text-sm text-muted-foreground">
                  Note: Selected time will be confirmed based on expert's availability.
                  Our team will contact you within 2 hours to confirm.
                </p>
              </div>

              <Button
                onClick={handleNextStep}
                className="w-full"
                size="lg"
              >
                Proceed to Payment
                <CreditCard className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-2xl p-8 space-y-6"
            >
              <h3 className="text-xl font-semibold text-foreground">
                Payment Details
              </h3>

              <div className="space-y-4">
                <SummaryRow label="Expert" value={expert.name} />
                <SummaryRow label="Session Type" value={bookingData.sessionType.toUpperCase()} />
                <SummaryRow label="Date" value={bookingData.date} />
                <SummaryRow label="Time" value={bookingData.time} />
                <SummaryRow label="Duration" value={`${expert.session_duration_mins || 50} minutes`} />
                
                <div className="border-t border-border pt-4 mt-4">
                  <SummaryRow 
                    label="Total Amount" 
                    value={`$${expert.rate}`} 
                    bold 
                  />
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Secure Payment via Razorpay</p>
                    <p className="text-sm text-muted-foreground">
                      All transactions are encrypted and secure.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={paymentProcessing}
                  className="flex-1"
                  size="lg"
                >
                  {paymentProcessing ? "Processing..." : `Pay $${expert.rate}`}
                  <CreditCard className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-2xl p-8 text-center"
            >
              <div className="w-20 h-20 bg-accent/15 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-accent" />
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-2">
                Booking Confirmed!
              </h2>
              
              <p className="text-muted-foreground mb-6">
                Your session has been successfully booked.
              </p>

              <div className="bg-muted/50 rounded-lg p-6 mb-6 text-left">
                <h4 className="font-semibold mb-3">Booking Details:</h4>
                <SummaryRow label="Expert" value={expert.name} />
                <SummaryRow label="Date" value={bookingData.date} />
                <SummaryRow label="Time" value={bookingData.time} />
                <SummaryRow label="Amount Paid" value={`$${expert.rate}`} />
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                You'll receive a confirmation email and SMS shortly.
                Our team will contact you within 2 hours to confirm the appointment.
              </p>

              <Button
                onClick={() => navigate("/experts")}
                size="lg"
              >
                Browse More Experts
              </Button>
            </motion.div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

// Step Indicator Component
const StepIndicator = ({ step, currentStep, label }) => (
  <div className="flex flex-col items-center">
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition ${
        currentStep >= step
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground'
      }`}
    >
      {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
    </div>
    <span className="text-xs text-muted-foreground mt-1">{label}</span>
  </div>
);

// Input Field Component
const InputField = ({ icon, label, name, type = "text", value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-foreground mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none"
      />
    </div>
  </div>
);

// Summary Row Component
const SummaryRow = ({ label, value, bold = false }) => (
  <div className="flex justify-between items-center">
    <span className={`text-sm ${bold ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
      {label}
    </span>
    <span className={`text-sm ${bold ? 'font-semibold text-foreground' : 'text-foreground'}`}>
      {value}
    </span>
  </div>
);

export default BookingPage;
