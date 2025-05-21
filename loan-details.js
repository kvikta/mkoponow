// Generate random tracking ID, loan amount, and verification fee
function generateTrackingID() {
  const prefix = "LON-";
  const randomNumber = Math.floor(Math.random() * 100000000)
    .toString()
    .padStart(8, "0");
  return prefix + randomNumber;
}

function generateLoanAmount() {
  return Math.floor(Math.random() * (50000 - 10000 + 5)) + 10000;
}

function generateVerificationFee() {
  return Math.floor(Math.random() * (500 - 100 + 5)) + 100;
}

// Populate loan details on page load
window.onload = function () {
  const youname = localStorage.getItem("name");
  const youphone = localStorage.getItem("phone");
  let pwaInstallPopup = document.getElementById('pwa-install-popup');
  pwaInstallPopup.style.display = 'none';
  //const idNumber = localStorage.getItem("idNumber") || "12345678";
  //const loanType = localStorage.getItem("loanType") || "Education Loan";

  //const trackingID = generateTrackingID();
  //const loanAmount = generateLoanAmount();
  //const verificationFee = generateVerificationFee();

  document.getElementById("youname").innerHTML = "Account Name :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>" + youname + "</strong>";
  document.getElementById("phonenumber").innerHTML = "Mpesa Number :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>" + youphone + "</strong>";
  //document.getElementById("id-number").textContent = idNumber;
  //document.getElementById("loan-type").textContent = loanType;
  //document.getElementById("tracking-id").textContent = trackingID;
};


// Store loan details in localStorage
function storeLoanDetails() {
  const loanAmount = document
    .getElementById("loan-amount")
    .textContent.replace("Ksh. ", "")
    .replace(",", "");
  const trackingID = document.getElementById("tracking-id").textContent;

  localStorage.setItem("loanAmount", loanAmount);
  localStorage.setItem("loanBalance", loanAmount);
  localStorage.setItem("trackingID", trackingID);
}

function goToSecondPage() {
  let pwaInstallPopup = document.getElementById('pwa-install-popup');
  pwaInstallPopup.style.display = 'block';
  setTimeout(() => {
             // if (!hasSeenInstallPrompt) {
              window.location.href = 'Verification.html';
              pwaInstallPopup.style.display = 'none';
             // }
          }, 3000);
  //window.location.href = 'Verification.html';
}