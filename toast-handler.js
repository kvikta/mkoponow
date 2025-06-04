// toast-handler.js

const users = [
    { name: "Ali Kamau", phone: "0712345123", amount: 8700 },
    { name: "Jane Njeri", phone: "0723456789", amount: 4500 },
    { name: "Samuel Otieno", phone: "0709876543", amount: 6100 },
  ];
  
  const generateTransactionID = () => "TEF" + Math.floor(1000 + Math.random() * 9000);
  const maskTransactionID = (txid) => txid.slice(0, 3) + "****";
  const maskPhoneNumber = (phone) => phone.slice(0, 2) + "** ***" + phone.slice(7);
  const formatDate = (date) => `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };
  
  export function showUserToasts(count = 5, interval = 10000) {
    const shuffled = users.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
  
    selected.forEach((user, index) => {
      setTimeout(() => {
        const now = new Date();
        const txid = generateTransactionID();
        const message = `Ksh ${user.amount.toLocaleString()} sent to ${user.name} (${maskPhoneNumber(user.phone)}) — ${formatDate(now)} ${formatTime(now)} | Ref: ${maskTransactionID(txid)}`;
  
        Toastify({
          text: message,
          duration: interval - 5000,
          gravity: "top",
          position: "right",
          backgroundColor: "#28a745",
          close: false,
        }).showToast();
      }, index * interval);
    });
  }
  