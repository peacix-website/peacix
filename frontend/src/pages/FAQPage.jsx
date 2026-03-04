import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FAQPage = () => {

  const faqs = [
    {
      q: "How do counseling sessions work?",
      a: "Sessions are conducted online through secure video calls."
    },
    {
      q: "Are sessions confidential?",
      a: "Yes, your privacy is fully protected."
    },
    {
      q: "How long does a session last?",
      a: "Sessions typically last 45 to 60 minutes."
    }
  ];

  return (
    <div className="min-h-screen bg-background">

      

      <main className="max-w-4xl mx-auto px-6 py-20">

        <h1 className="text-4xl font-bold text-foreground mb-10">
          FAQs
        </h1>

        <div className="space-y-6">

          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h3 className="font-semibold text-lg mb-2">
                {faq.q}
              </h3>

              <p className="text-muted-foreground">
                {faq.a}
              </p>
            </div>
          ))}

        </div>

      </main>

      <Footer />

    </div>
  );
};

export default FAQPage;