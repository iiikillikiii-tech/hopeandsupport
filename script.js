const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const copyButtons = document.querySelectorAll("[data-copy]");
const copyStatus = document.querySelector("[data-copy-status]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.getAttribute("data-copy") || button.textContent.trim();

    try {
      await navigator.clipboard.writeText(value);
      updateCopyStatus("Zkopírováno: " + value);
    } catch {
      fallbackCopy(value);
      updateCopyStatus("Údaj připraven ke zkopírování: " + value);
    }
  });
});

function fallbackCopy(value) {
  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.top = "-999px";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove();
}

function updateCopyStatus(message) {
  if (!copyStatus) {
    return;
  }

  copyStatus.textContent = message;
}
