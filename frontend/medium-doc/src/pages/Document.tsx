import  { useState, useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "./Coffejson.json"; // Lottie JSON
import { Button } from "../components/button";
import { Heading } from "../components/Heading";
import { QRCodeCanvas } from "qrcode.react";
import { BACK_END_URL } from "../../congif";

const Document = () => {
  const [upiLink, setUpiLink] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const userId = "123"; // replace with actual logged-in userId

  const handlePayment = async (amount: number) => {
    try {
      const res = await fetch(`${BACK_END_URL}/api/v1/blog/userUpi?amount=${amount}`, {
        method: "POST",
        headers: {
           "Content-Type": "application/json" ,
             Authorization : `Bearer ${localStorage.getItem('token')}`

        },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();
      console.log(data.upiLink);
      
      if (!data.upiLink) return alert("Could not get UPI link!");

      setUpiLink(data.upiLink);
      setTimeLeft(90); // 1.5 min visual expiry
    } catch (err) {
      console.error("Error fetching UPI link:", err);
    }
  };

  // countdown timer for visual expiry
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setUpiLink(null); // hide QR when expired
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div className="grid grid-rows-12 h-screen">
      <div className="row-span-2 pt-2">
        <div className="row-span-1 flex items-start justify-between p-1">
          <div className="w-1/2 h-full flex items-center justify-start gap-2">
            <Heading heading="StoiresNstore" />
          </div>
         
        </div>
        <hr />
      </div>

      <div className="row-span-10 bg-[url('/coffe.png')]">
        <div className="grid grid-cols-2">
          <div className="col-span-1 flex items-center justify-center">
            <div className="flex items-center justify-center flex-col h-2/3 w-2/3 border-2 border-gray-100 rounded-lg shadow-lg">
              <div className="bg-[url('background.png')]">
                <h3 className="p-5 text-violet-500 font-bold text-3xl font-serif">
                  Buy him coffee
                </h3>
              </div>

              <div className="p-4 flex gap-3">
                <Button heading="100" onClick={() => handlePayment(100)} />
                <Button heading="500" onClick={() => handlePayment(500)} />
              </div>

              {upiLink && (
                <div className="mt-4 flex flex-col items-center">
                  <QRCodeCanvas value={upiLink} size={200} />
                  <p className="text-sm text-gray-500 mt-2">
                    Expires in {timeLeft}s
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="col-span-1 flex justify-center items-center">
            <Lottie
              animationData={animationData}
              loop={true}
              style={{ width: "540px", height: "530px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Document;
