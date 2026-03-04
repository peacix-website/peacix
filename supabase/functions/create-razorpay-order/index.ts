// Supabase Edge Function for creating Razorpay orders
// Location: supabase/functions/create-razorpay-order/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { amount, currency, expertId } = await req.json();

    // Validate inputs
    if (!amount || amount <= 0) {
      throw new Error('Invalid amount');
    }

    if (amount > 1000000) { // 10 lakh limit in paise
      throw new Error('Amount exceeds maximum limit');
    }

    // Verify expert exists and get their actual rate
    // This prevents client-side manipulation of amounts
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

    const expertResponse = await fetch(
      `${supabaseUrl}/rest/v1/clinicians?id=eq.${expertId}`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const experts = await expertResponse.json();
    
    if (!experts || experts.length === 0) {
      throw new Error('Expert not found');
    }

    const expert = experts[0];
    const serverAmount = expert.session_rate_cents;

    // Verify the amount matches what the expert charges
    if (serverAmount !== amount) {
      console.error(`Amount mismatch: client=${amount}, server=${serverAmount}`);
      throw new Error('Payment amount verification failed');
    }

    // Initialize Razorpay
    const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID');
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error('Razorpay credentials not configured');
    }

    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount,
      currency: currency || 'INR',
      receipt: `booking_${Date.now()}_${expertId}`,
      payment_capture: 1,
    });

    return new Response(
      JSON.stringify({ 
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        expertName: expert.profiles?.full_name
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to create order',
        details: error.toString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
