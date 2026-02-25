import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");

      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }, 1000);
  };

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 rounded-full p-4">
              <Mail className="w-10 h-10" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Get expert mental health insights
          </h2>

          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join our community to receive expert advice, wellness tips,
            and updates on our services. No spam, just valuable content.
          </p>

          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/15 backdrop-blur-md rounded-2xl p-6 max-w-md mx-auto border border-white/20"
            >
              <div className="flex items-center justify-center mb-3">
                <CheckCircle className="w-7 h-7 text-accent mr-2" />
                <span className="text-lg font-semibold">
                  Successfully Subscribed!
                </span>
              </div>
              <p className="text-primary-foreground/80 text-sm">
                Thank you for subscribing. You'll receive our next newsletter soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="
                    flex-1
                    px-5
                    py-3
                    rounded-full
                    bg-background
                    text-foreground
                    border border-border
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary
                  "
                  required
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-full px-6"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Subscribe
                    </>
                  )}
                </Button>
              </div>

              <p className="text-sm text-primary-foreground/70 mt-3">
                Join 5,000+ subscribers
              </p>
            </form>
          )}

          {/* Bottom Info Blocks */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <InfoCard title="Weekly" text="Expert Articles" />
            <InfoCard title="Monthly" text="Wellness Tips" />
            <InfoCard title="Quarterly" text="Success Stories" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const InfoCard = ({ title, text }) => (
  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
    <div className="text-xl font-semibold">{title}</div>
    <div className="text-primary-foreground/80 text-sm mt-1">{text}</div>
  </div>
);

export default Newsletter;