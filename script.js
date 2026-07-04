// ==========================================
// Currency Converter UI
// Author: M Mubbashir Idrees
// ==========================================

// ==============================
// Select Elements
// ==============================
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");

const result = document.getElementById("result");
const exchangeRate = document.getElementById("exchangeRate");
const message = document.getElementById("message");

const swapBtn = document.getElementById("swapBtn");
const copyBtn = document.getElementById("copyBtn");
const resetBtn = document.getElementById("resetBtn");

// ==============================
// Demo Exchange Rates (Base: USD)
// ==============================
const rates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    PKR: 278.50,
    INR: 83.20,
    AED: 3.67,
    CAD: 1.36,
    AUD: 1.52,
    JPY: 157.30,
    CNY: 7.25,
    SAR: 3.75,
    TRY: 32.40,
    CHF: 0.90,
    SGD: 1.35,
    MYR: 4.71
};

// ==============================
// Event Listeners
// ==============================
amountInput.addEventListener("input", convertCurrency);
fromCurrency.addEventListener("change", convertCurrency);
toCurrency.addEventListener("change", convertCurrency);

swapBtn.addEventListener("click", swapCurrencies);
copyBtn.addEventListener("click", copyResult);
resetBtn.addEventListener("click", resetConverter);

// ==============================
// Currency Conversion
// ==============================
function convertCurrency() {

    const amount = parseFloat(amountInput.value);

    if (amountInput.value.trim() === "") {

        result.textContent = "--";
        exchangeRate.textContent = "--";
        showMessage("Please enter an amount.", "#ef4444");
        return;

    }

    if (isNaN(amount) || amount <= 0) {

        result.textContent = "--";
        exchangeRate.textContent = "--";
        showMessage("Enter a valid amount greater than 0.", "#ef4444");
        return;

    }

    const fromRate = rates[fromCurrency.value];
    const toRate = rates[toCurrency.value];

    const usdAmount = amount / fromRate;
    const convertedAmount = usdAmount * toRate;

    result.textContent =
        `${convertedAmount.toFixed(2)} ${toCurrency.value}`;

    const rate = toRate / fromRate;

    exchangeRate.textContent =
        `1 ${fromCurrency.value} = ${rate.toFixed(4)} ${toCurrency.value}`;

    showMessage("Conversion completed successfully!", "#22c55e");

}

// ==============================
// Swap Currencies
// ==============================
function swapCurrencies() {

    const temp = fromCurrency.value;

    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    convertCurrency();

}

// ==============================
// Copy Result
// ==============================
async function copyResult() {

    if (result.textContent === "--") {

        showMessage("Nothing to copy.", "#ef4444");
        return;

    }

    try {

        await navigator.clipboard.writeText(result.textContent);

        showMessage("✅ Result copied successfully!", "#22c55e");

    } catch {

        showMessage("❌ Failed to copy result.", "#ef4444");

    }

}

// ==============================
// Reset Converter
// ==============================
function resetConverter() {

    amountInput.value = "";

    fromCurrency.value = "USD";
    toCurrency.value = "PKR";

    result.textContent = "--";
    exchangeRate.textContent = "--";

    showMessage("Converter reset successfully.", "#6366f1");

}

// ==============================
// Message Helper
// ==============================
function showMessage(text, color) {

    message.textContent = text;
    message.style.color = color;

    clearTimeout(showMessage.timer);

    showMessage.timer = setTimeout(() => {

        message.textContent = "";

    }, 2000);

}

// ==============================
// Initial State
// ==============================
resetConverter();