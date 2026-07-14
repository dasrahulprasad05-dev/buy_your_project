import { useState } from 'react';
import { Loader2 } from 'lucide-react';
// import axios from 'axios'; // Commented out for now

// Helper to decode JWT payload (without verification — just reading the claims)
const getLoggedInUser = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
};

const RazorpayButton = ({ project }) => {
  const [loading, setLoading] = useState(false);

  /* --- RAZORPAY LOGIC (Commented out until keys are available) ---
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  -------------------------------------------------------------- */

  const handlePayment = async () => {
    setLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      alert("Payment gateway integration is coming soon! (Razorpay keys pending)");
      setLoading(false);
    }, 800);

    /* --- RAZORPAY LOGIC (Commented out until keys are available) ---
    try {
      const res = await loadRazorpay();
      
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        setLoading(false);
        return;
      }

      // Get logged-in user info from JWT, or use guest fallback
      const user = getLoggedInUser();
      const customerName = user?.name || 'Guest User';
      const customerEmail = user?.email || 'guest@example.com';

      // 1. Create order on the backend
      const orderData = {
        amount: project.price,
        customerName,
        customerEmail,
        projectId: project._id
      };
      
      // Fallback for demo mode if backend is not running
      let orderId = `demo_order_${Math.random()}`;
      let rzpOrderId = `rzp_order_${Math.random()}`;
      let keyId = 'rzp_test_123';

      try {
        const result = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/payment/checkout`, orderData);
        orderId = result.data.orderId;
        rzpOrderId = result.data.order.id;
        
        const keyResult = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/payment/key`);
        keyId = keyResult.data.key;
      } catch (err) {
        console.log("Backend not reachable. Running in demo mode.");
      }

      // 2. Initialize Razorpay options
      const options = {
        key: keyId,
        amount: project.price * 100,
        currency: 'INR',
        name: 'Rahul Developer',
        description: `Purchase of ${project.title}`,
        order_id: rzpOrderId,
        handler: async function (response) {
          try {
            const verifyData = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              orderId: orderId
            };
            const verifyResult = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/payment/verify`, verifyData);
            if (verifyResult.data.success) {
              alert('Payment Successful!');
            }
          } catch (err) {
            alert('Payment Verification failed (or backend not running).');
          }
        },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: '9999999999'
        },
        theme: {
          color: '#3b82f6'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error(error);
      alert('Something went wrong during checkout.');
    } finally {
      setLoading(false);
    }
    -------------------------------------------------------------- */
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full mt-6 bg-primary hover:bg-primaryHover text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg shadow-lg shadow-primary/20"
    >
      {loading ? <Loader2 className="animate-spin" /> : 'Buy Now Securely'}
    </button>
  );
};

export default RazorpayButton;

