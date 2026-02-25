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
        'Resume and interview preparation',
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
      sessionFormat: '50-minute sessions for individuals, 90-minute sessions for couples/families',
      duration: '50-90 minutes per session',
      price: '₹1599/session',
      features: [
        'Couples therapy techniques',
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
      whoFor: 'Students of all ages dealing with academic stress, peer pressure, and personal challenges',
      whatToExpect: 'Age-appropriate support tailored to student life challenges and academic pressures',
      sessionFormat: '45-minute supportive sessions with student-focused approaches',
      duration: '45 minutes per session',
      price: '₹1199/session',
      features: [
        'Academic stress management',
        'Exam anxiety support',
        'Peer relationship guidance',
        'Study skills development',
        'Parent-teacher coordination'
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
      description: 'Connect with your assigned counselor via secure video platform',
      icon: Users
    },
    {
      step: '03',
      title: 'Receive Support',
      description: 'Engage in professional counseling tailored to your specific needs',
      icon: Heart
    },
    {
      step: '04',
      title: 'Track Progress',
      description: 'Monitor your mental health journey with ongoing support and resources',
      icon: TrendingUp
    }
  ];

  const benefits = [
    'Licensed and RCI-registered professionals',
    'Confidential and secure sessions',
    'Flexible scheduling options',
    'Evidence-based therapeutic approaches',
    'Multilingual support available',
    'Affordable pricing with payment plans',
    '24/7 customer support',
    'Progress tracking and resources'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                Professional mental health support tailored to your unique needs and circumstances
              </p>
            </motion.div>
          </div>
        </section>

        {/* Service Process */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our simple, straightforward process to connect you with the right support
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-10 h-10 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-3">{step.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Services */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Comprehensive Services</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Professional support for every aspect of your mental health and wellness journey
              </p>
            </motion.div>
            
            <div className="space-y-12">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-indigo-600 p-8 flex flex-col justify-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                      <p className="text-blue-100 mb-6">{service.description}</p>
                      <div className="bg-white/20 rounded-lg p-4">
                        <div className="text-white">
                          <div className="flex items-center justify-between mb-2">
                            <span>Duration:</span>
                            <span className="font-semibold">{service.duration}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Price:</span>
                            <span className="font-bold text-lg">{service.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3 p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-3">Who It's For</h4>
                          <p className="text-gray-600 mb-6">{service.whoFor}</p>
                          
                          <h4 className="text-lg font-bold text-gray-900 mb-3">What to Expect</h4>
                          <p className="text-gray-600 mb-6">{service.whatToExpect}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-3">Session Format</h4>
                          <p className="text-gray-600 mb-6">{service.sessionFormat}</p>
                          
                          <h4 className="text-lg font-bold text-gray-900 mb-3">Key Features</h4>
                          <ul className="space-y-2">
                            {service.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-600">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg">
                          Book Now
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Services</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                What makes our mental health support different and effective
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-gray-700 font-medium">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Session Information */}
        <section className="py-20 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Session Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Flexible Scheduling</h3>
                      <p className="text-gray-600">Book sessions at your convenience with 24/7 availability</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Shield className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Secure Platform</h3>
                      <p className="text-gray-600">End-to-end encrypted sessions with complete privacy protection</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Star className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Quality Assurance</h3>
                      <p className="text-gray-600">All counselors are RCI registered and regularly evaluated</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to Get Started?</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Initial Consultation</span>
                    <span className="font-bold text-gray-900">Free</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">Follow-up Sessions</span>
                    <span className="font-bold text-gray-900">Starting at ₹1199</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Package Deals</span>
                    <span className="font-bold text-green-600">Save up to 20%</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 text-lg">
                  Book Your Session Now
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;