/* ===== 1. ORDER DATA (Example) ===== */
const order = {
  orderId: "ORD-10245",
  customerName: "John Doe",
  amount: 25000,
  status: "PENDING" // PENDING | CONFIRMED | REJECTED
};


/* ===== 2. DOM ELEMENTS ===== */
const customerEl = document.getElementById("customer");
const orderIdEl = document.getElementById("orderId");
const amountEl = document.getElementById("amount");
const statusEl = document.getElementById("status");

const confirmBtn = document.getElementById("confirmBtn");
const rejectBtn = document.getElementById("rejectBtn");


/* ===== 3. RENDER ORDER DETAILS ===== */
function renderOrder(order) {
  customerEl.textContent = order.customerName;
  orderIdEl.textContent = order.orderId;
  amountEl.textContent = `₦${order.amount.toLocaleString()}`;
  statusEl.textContent = order.status;
}


/* ===== 4. VALIDATION ===== */
function canUpdateOrder(order) {
  return order.status === "PENDING";
}


/* ===== 5. CONFIRM ORDER ===== */
function confirmOrder(order) {
  if (!canUpdateOrder(order)) {
    alert("This order has already been processed.");
    return;
  }

  order.status = "CONFIRMED";
  updateOrder(order);
}


/* ===== 6. REJECT ORDER ===== */
function rejectOrder(order) {
  if (!canUpdateOrder(order)) {
    alert("This order has already been processed.");
    return;
  }

  order.status = "REJECTED";
  updateOrder(order);
}


/* ===== 7. UPDATE ORDER (UI + BACKEND HOOK) ===== */
function updateOrder(order) {
  renderOrder(order);


  alert(`Order ${order.status} successfully`);
}


/* ===== 8. BUTTON EVENTS ===== */
confirmBtn.addEventListener("click", () => {
  confirmOrder(order);
});

rejectBtn.addEventListener("click", () => {
  rejectOrder(order);
});


/* ===== 9. INITIALIZE ON PAGE LOAD ===== */
document.addEventListener("DOMContentLoaded", () => {
  renderOrder(order);
});
