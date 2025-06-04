// toast-handler.js

const API_URL = "https://api.jsonbin.io/v3/b/665f0ea9ad19ca34f86b77b6"; // Replaceable mock API

const currencyFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  minimumFractionDigits: 0,
});

const generateTransactionID = () => "TEF" + Math.floor(1000 + Math.random() * 9000);
const maskTransactionID = (txid) => txid.slice(0, 3) + "****";
const maskPhoneNumber = (phone) => phone.slice(0, 2) + "** ***" + phone.slice(7);

const formatDate = (date) =>
  `${date.getDate().toString().padStart(2, "0")}/${
    (date.getMonth() + 1).toString().padStart(2, "0")
  }/${date.getFullYear()}`;

const formatTime = (date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes}:${seconds} ${ampm}`;
};

async function fetchUsers() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch users");
    const { record } = await res.json();
    return record;
  } catch (err) {
    console.error("Toast user fetch error:", err.message);
    return [];
  }
}

export async function showUserToasts(count = 5, interval = 10000) {
  const users = await fetchUsers();
  if (!users.length) return;

  const shuffled = users.sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  selected.forEach((user, index) => {
    setTimeout(() => {
      const now = new Date();
      const txid = generateTransactionID();
      const message = `${currencyFormatter.format(user.amount)} sent to ${user.name} (${maskPhoneNumber(user.phone)}) — ${formatDate(now)} ${formatTime(now)} | Ref: ${maskTransactionID(txid)}`;

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
