import React from 'react'
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import checkMark from "../assets/check-mark.gif";

function OrderStatus() {
    const navigate = useNavigate();

  return (
    <React.Fragment>
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-5 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-8 max-w-lg"
      >
        <div className=' flex justify-center items-center'>
            <img src={checkMark} alt="" className=' w-12 sm:w-14 md:w-16 lg:w-20' />
        </div>
        <h2 className="text-2xl font-semibold mt-4">Thank You for Your Order!</h2>
        <p className="text-gray-600 mt-2">Your order has been placed successfully.</p>

        {/* Order Details */}
        <div className="mt-4 border-t pt-4 text-left">
          {/* <p className="text-sm text-gray-500">Order Number: <span className="font-semibold">#{orderDetails?.id || "12345"}</span></p>
          <p className="text-sm text-gray-500">Estimated Delivery: <span className="font-semibold">{orderDetails?.deliveryDate || "3-5 Business Days"}</span></p> */}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-6">
          <button onClick={() => navigate("/orders")} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">View Order</button>
          <button onClick={() => navigate("/")} className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md">Continue Shopping</button>
        </div>
      </motion.div>
    </div>
    </React.Fragment>
  )
}

export default OrderStatus