import React from "react";
import {
useNavigate
} from "react-router-dom";

const PaymentCancel = () => {
const navigate =
useNavigate();

return (
<div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">

<div className="bg-[#1e293b] p-10 rounded-2xl text-center w-[420px]">

<h1 className="text-4xl font-bold text-red-400 mb-4">
❌ Payment Cancelled
</h1>

<p>
No worries, try again anytime.
</p>

<button
onClick={()=>
navigate("/user/subscription")
}
className="mt-6 bg-green-500 px-6 py-3 rounded-xl"
>
Go Back
</button>

</div>
</div>
);
};

export default PaymentCancel;