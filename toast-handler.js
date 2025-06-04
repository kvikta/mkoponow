// toast-handler.js

const users = [
  { name: "Ali Kamau", phone: "0712345123", amount: 8700 },
  { name: "Jane Njeri", phone: "0723456789", amount: 4500 },
  { name: "Samuel Otieno", phone: "0709876543", amount: 6100 },
];

const currencyFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  minimumFractionDigits: 0,
});

/**
 * Generate a fake transaction ID.
 */
const generateTransactionID = () => "TEF" + Math.floor(1000 + Math.random() * 9000);

/**
 * Mask the transaction ID for privacy.
 */
const maskTransactionID = (txid) => txid.slice(0, 3) + "****";

/**
 * Mask a phone number (format: 07** ***123).
 */
const maskPhoneNumber = (phone) => phone.slice(0, 2) + "** ***" + phone.slice(7);

/**
 * Format date as DD/MM/YYYY.
 */
const formatDate = (date) =>
  `${date.getDate().toString().padStart(2, "0")}/${
    (date.getMonth() + 1).toString().padStart(2, "0")
  }/${date.getFullYear()}`;

/**
 * Format time as HH:MM:SS AM/PM.
 */
const formatTime = (date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes}:${seconds} ${ampm}`;
};

/**
 * Display toast notifications for random users.
 * @param {number} count - Number of users to display.
 * @param {number} interval - Interval between toasts in milliseconds.
 */
export function showUserToasts(count = 5, interval = 10000) {
  const clonedUsers = structuredClone(users);
  const shuffled = clonedUsers.sort(() => Math.random() - 0.5);
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
