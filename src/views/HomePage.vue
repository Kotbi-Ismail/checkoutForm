<template>
  <div class="checkout-form">
    <h1>Checkout Form</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="fullName">Full Name:</label>
        <input type="text" id="fullName" v-model="form.fullName" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>

      <div class="form-group">
        <label for="address">Delivery Address:</label>
        <textarea id="address" v-model="form.address" rows="4" required></textarea>
      </div>

      <div class="form-group">
        <label for="paymentMethod">Payment Method:</label>
        <select id="paymentMethod" v-model="form.paymentMethod" @change="handlePaymentMethodChange" required>
          <option value="" disabled>Select payment method</option>
          <option value="creditCard">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="bankTransfer">Bank Transfer</option>
        </select>
      </div>

      <!-- Dynamic payment method forms -->
      <div v-if="form.paymentMethod === 'creditCard'">
        <div class="form-group">
          <label for="creditCardNumber">Credit Card Number:</label>
          <input type="text" id="creditCardNumber" v-model="creditCard.number" placeholder="1234 5678 9012 3456" required />
        </div>
        <div class="form-group">
          <label for="creditCardExpiry">Expiry Date:</label>
          <input type="text" id="creditCardExpiry" v-model="creditCard.expiry" placeholder="MM/YY" required />
        </div>
        <div class="form-group">
          <label for="creditCardCVV">CVV:</label>
          <input type="text" id="creditCardCVV" v-model="creditCard.cvv" placeholder="123" required />
        </div>
      </div>

      <div v-if="form.paymentMethod === 'paypal'">
        <div class="form-group">
          <label for="paypalEmail">PayPal Email:</label>
          <input type="email" id="paypalEmail" v-model="paypal.email" placeholder="example@example.com" required />
        </div>
      </div>

      <div v-if="form.paymentMethod === 'bankTransfer'">
        <div class="form-group">
          <label for="bankAccountNumber">Bank Account Number:</label>
          <input type="text" id="bankAccountNumber" v-model="bankTransfer.accountNumber" placeholder="123456789" required />
        </div>
        <div class="form-group">
          <label for="bankRoutingNumber">Bank Routing Number:</label>
          <input type="text" id="bankRoutingNumber" v-model="bankTransfer.routingNumber" placeholder="987654321" required />
        </div>
      </div>

      <button type="submit" class="submit-button">Submit</button>
    </form>
  </div>
</template>

<script>
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  name: 'HomePage',
  data() {
    return {
      form: {
        fullName: '',
        email: '',
        address: '',
        paymentMethod: ''
      },
      creditCard: {
        number: '',
        expiry: '',
        cvv: ''
      },
      paypal: {
        email: ''
      },
      bankTransfer: {
        accountNumber: '',
        routingNumber: ''
      }
    };
  },
  methods: {
    handleSubmit() {
      this.downloadPDF();
      
      // Optionally, reset the form here if needed
      this.form = {
        fullName: '',
        email: '',
        address: '',
        paymentMethod: ''
      };
      this.creditCard = {
        number: '',
        expiry: '',
        cvv: ''
      };
      this.paypal = {
        email: ''
      };
      this.bankTransfer = {
        accountNumber: '',
        routingNumber: ''
      };
    },
    handlePaymentMethodChange() {
      if (this.form.paymentMethod === 'creditCard') {
        this.paypal.email = '';
        this.bankTransfer.accountNumber = '';
        this.bankTransfer.routingNumber = '';
      } else if (this.form.paymentMethod === 'paypal') {
        this.creditCard.number = '';
        this.creditCard.expiry = '';
        this.creditCard.cvv = '';
        this.bankTransfer.accountNumber = '';
        this.bankTransfer.routingNumber = '';
      } else if (this.form.paymentMethod === 'bankTransfer') {
        this.creditCard.number = '';
        this.creditCard.expiry = '';
        this.creditCard.cvv = '';
        this.paypal.email = '';
      }
    },
    downloadPDF() {
      try {
        const doc = new jsPDF();
        
        // Title
        doc.setFontSize(16);
        doc.text('Checkout Form Submission', 14, 20);

        // Table content
        const tableColumn = ["Field", "Value"];
        const tableRows = [
          ["Full Name", this.form.fullName],
          ["Email", this.form.email],
          ["Address", this.form.address],
          ["Payment Method", this.form.paymentMethod],
          ...(this.form.paymentMethod === 'creditCard' ? [
            ["Credit Card Number", this.creditCard.number],
            ["Expiry Date", this.creditCard.expiry],
            ["CVV", this.creditCard.cvv]
          ] : []),
          ...(this.form.paymentMethod === 'paypal' ? [
            ["PayPal Email", this.paypal.email]
          ] : []),
          ...(this.form.paymentMethod === 'bankTransfer' ? [
            ["Bank Account Number", this.bankTransfer.accountNumber],
            ["Bank Routing Number", this.bankTransfer.routingNumber]
          ] : [])
        ];

        // Adding table to PDF
        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 30,
          margin: { horizontal: 14 },
          styles: { fontSize: 12, cellPadding: 5 },
          headStyles: { fillColor: [0, 123, 255], textColor: [255, 255, 255] },
          alternateRowStyles: { fillColor: [242, 242, 242] }
        });

        // Save the PDF
        doc.save('checkout-form.pdf');
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    }
  }
}
</script>

<style scoped>
.checkout-form {
  max-width: 700px;
  margin: 0 auto;
  padding: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  background-color: #f8f9fa;
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 24px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
  color: #333;
}

input, textarea, select {
  width: 100%;
  padding: 14px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input:focus, textarea:focus, select:focus {
  border-color: #007bff;
  outline: none;
}

textarea {
  resize: vertical;
}

button.submit-button {
  width: 100%;
  padding: 14px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button.submit-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

button.submit-button:active {
  background-color: #004085;
  transform: translateY(0);
}
</style>
