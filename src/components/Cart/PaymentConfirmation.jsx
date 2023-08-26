import React from "react";

const PaymentConfirmation = () => {
  return (
    <section className="confirmationWindow">
      
      <h2>Dear Customer, your Order is confirmed!</h2>
      
      <div className="paymentData">
        
        <div className="orderData">
          * Dati dell'ordine QUI *
        </div>
        
        <h2> Thank You for your Order!!!</h2>
        
      </div>

      <a href="/Products" class="button" >Continue Shopping</a>
    
    </section>
  );
};

export default PaymentConfirmation;
