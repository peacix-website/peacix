import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Video, Shield, CheckCircle, ArrowRight, Star, Book, Heart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ServicesPage = () => {

  const services = [
    {
      title: 'Online Video Counseling',
      description: 'One-on-one professional counseling sessions conducted via secure video calls',
      whoFor: 'Individuals seeking convenient, accessible mental health support from home',
      whatToExpect: 'Personalized therapy sessions with licensed counselors in a comfortable virtual environment',
      sessionFormat: '45-minute structured sessions with follow-up support',
      duration: '45 minutes per session',
      price: '₹1299/session',
      features: [
        'Secure video platform',
        'Professional counselors',
        'Flexible scheduling',
        'Session recordings available',
        'Progress tracking'
      ],
      icon: Video
    },
    {
      title: 'Career Counseling',
      description: 'Professional guidance for career development, transitions, and workplace challenges',
      whoFor: 'Professionals, students, and job seekers navigating career decisions',
      whatToExpect: 'Strategic career planning and personalized guidance for professional growth',
      sessionFormat: '60-minute comprehensive career assessment and planning sessions',
      duration: '60 minutes per session',
      price: '₹1499/session',
      features: [
        'Career assessment tools',
        'Resume preparation',
        'Professional development planning',
        'Workplace stress management',
        'Leadership coaching'
      ],
      icon: Users
    },
    {
      title: 'Relationship & Family Counseling',
      description: 'Specialized support for couples and families facing relationship challenges',
      whoFor: 'Couples, families, and individuals dealing with relationship issues',
      whatToExpect: 'Evidence-based therapy to improve communication and strengthen relationships',
      sessionFormat: '50–90 minute sessions',
      duration: '50-90 minutes',
      price: '₹1599/session',
      features: [
        'Couples therapy',
        'Family systems approach',
        'Communication enhancement',
        'Conflict resolution',
        'Relationship rebuilding'
      ],
      icon: Heart
    },
    {
      title: 'Student Mental Health Support',
      description: 'Specialized counseling services addressing student-specific mental health concerns',
      whoFor: 'Students dealing with academic stress, peer pressure, and personal challenges',
      whatToExpect: 'Age-appropriate support tailored to student life challenges',
      sessionFormat: '45-minute supportive sessions',
      duration: '45 minutes',
      price: '₹1199/session',
      features: [
        'Academic stress management',
        'Exam anxiety support',
        'Peer relationship guidance',
        'Study skills development',
        'Parent coordination'
      ],
      icon: Book
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Book Your Session',
      description: 'Choose your preferred service and schedule a convenient time slot',
      icon: Calendar
    },
    {
      step: '02',
      title: 'Meet Your Counselor',
      description: 'Connect with your counselor via secure video platform',
      icon: Users
    },
    {
      step: '03',
      title: 'Receive Support',
      description: 'Engage in professional counseling tailored to your needs',
      icon: Heart
    },
    {
      step: '04',
      title: 'Track Progress',
      description: 'Monitor your mental health journey with support resources',
      icon: TrendingUp
    }
  ];

  const benefits = [
    'Licensed and RCI-registered professionals',
    'Confidential and secure sessions',
    'Flexible scheduling options',
    'Evidence-based therapeutic approaches',
    'Multilingual support available',
    'Affordable pricing',
    '24/7 support assistance',
    'Progress tracking tools'
  ];

  return (
    <div className="min-h-screen bg-background">

      

      <main className="pb-20">

        {/* Hero */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Professional mental health support tailored to your unique needs
            </p>
          </div>
        </section>


        {/* Process */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">

            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground">
                Our simple process to connect you with support
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">

              {processSteps.map((step, i) => (

                <div key={i} className="text-center">

                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>

                  <div className="text-3xl font-bold text-primary mb-2">
                    {step.step}
                  </div>

                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {step.title}
                  </h3>

                  <p className="text-muted-foreground">
                    {step.description}
                  </p>

                </div>

              ))}

            </div>

          </div>
        </section>


        {/* Services */}
        <section className="py-20 bg-muted/40">
          <div className="max-w-7xl mx-auto px-6 space-y-12">

            {services.map((service, index) => (

              <div key={index} className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">

                <div className="md:flex">

                  {/* Left */}
                  <div className="md:w-1/3 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8">

                    <service.icon className="w-10 h-10 mb-6"/>

                    <h3 className="text-2xl font-bold mb-3">
                      {service.title}
                    </h3>

                    <p className="opacity-90 mb-6">
                      {service.description}
                    </p>

                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="flex justify-between">
                        <span>Duration</span>
                        <span className="font-semibold">{service.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Price</span>
                        <span className="font-bold">{service.price}</span>
                      </div>
                    </div>

                  </div>

                  {/* Right */}
                  <div className="md:w-2/3 p-8">

                    <h4 className="font-semibold text-foreground mb-2">
                      Who It's For
                    </h4>

                    <p className="text-muted-foreground mb-6">
                      {service.whoFor}
                    </p>

                    <h4 className="font-semibold text-foreground mb-2">
                      Features
                    </h4>

                    <ul className="space-y-2 mb-8">

                      {service.features.map((feature,i)=>(
                        <li key={i} className="flex items-center text-muted-foreground">
                          <CheckCircle className="w-4 h-4 mr-2 text-primary"/>
                          {feature}
                        </li>
                      ))}

                    </ul>

                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Book Now
                      <ArrowRight className="ml-2 w-4 h-4"/>
                    </Button>

                  </div>

                </div>

              </div>

            ))}

          </div>
        </section>


        {/* Benefits */}
        <section className="py-20">

          <div className="max-w-7xl mx-auto px-6">

            <div className="grid md:grid-cols-4 gap-6">

              {benefits.map((benefit,i)=>(
                <div key={i} className="bg-card border border-border rounded-xl p-6 text-center">

                  <CheckCircle className="w-6 h-6 text-primary mx-auto mb-3"/>

                  <p className="text-muted-foreground font-medium">
                    {benefit}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </section>

      </main>

      <Footer />

    </div>
  );
};

export default ServicesPage;