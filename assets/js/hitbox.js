const toggleButton = document.getElementById("toggle-hitbox");
const overlay = document.getElementById("overlay");
const tooltip = document.getElementById("tooltip");
const tooltipText = document.getElementById("tooltip-text");
const tooltipLine = document.getElementById("tooltip-line");

let hitboxMode = false;

// Add center dot elements dynamically based on data-center
document.querySelectorAll(".hitbox").forEach((polygon) => {
  const [cx, cy] = polygon.dataset.center.split(',').map(Number);

  const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  dot.setAttribute("cx", cx);
  dot.setAttribute("cy", cy);
  dot.setAttribute("r", "0"); // hidden initially
  dot.classList.add("dot");
  overlay.appendChild(dot);
});

// Toggle hitbox mode
toggleButton.addEventListener("click", () => {
  hitboxMode = !hitboxMode;
  document.body.classList.toggle("hitbox-mode", hitboxMode);

  document.querySelectorAll(".dot").forEach(dot => {
    dot.setAttribute("r", hitboxMode ? "5" : "0");
  });

  if (!hitboxMode) {
    tooltip.classList.add("hidden");
  }
});

// Tooltip logic
document.querySelectorAll(".hitbox").forEach((polygon) => {
  polygon.addEventListener("mouseenter", (e) => {
    if (!hitboxMode) return;

    const tooltipMsg = polygon.dataset.tooltip;
    const [cx, cy] = polygon.dataset.center.split(',').map(Number);

    // Offset tooltip position slightly (e.g., to the upper right of the center)
    const tooltipOffsetX = 40;
    const tooltipOffsetY = -40;

    const tooltipX = cx + tooltipOffsetX;
    const tooltipY = cy + tooltipOffsetY;

    tooltipText.textContent = tooltipMsg;
    tooltipText.style.left = `${tooltipX}px`;
    tooltipText.style.top = `${tooltipY}px`;

    tooltipLine.setAttribute("x1", cx);
    tooltipLine.setAttribute("y1", cy);
    tooltipLine.setAttribute("x2", tooltipX + 10); // 10 = padding offset
    tooltipLine.setAttribute("y2", tooltipY + 10);

    tooltip.classList.remove("hidden");
  });

  polygon.addEventListener("mouseenter", () => {
    if (!hitboxMode) return;
  
    const tooltipMsg = polygon.dataset.tooltip;
    const [cx, cy] = polygon.dataset.center.split(',').map(Number);
  
    const container = document.getElementById("container");
  
    tooltipText.textContent = tooltipMsg;
  
    let tooltipX = cx + 40;
    let tooltipY = cy - 40;
  
    // Temporarily position it
    tooltipText.style.left = `${tooltipX}px`;
    tooltipText.style.top = `${tooltipY}px`;
    tooltipText.style.display = 'block';
  
    // Measure and adjust to prevent overflow
    const tooltipRect = tooltipText.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
  
    if (tooltipX + tooltipRect.width > containerRect.width) {
      tooltipX = containerRect.width - tooltipRect.width - 10;
    }
    if (tooltipY + tooltipRect.height > containerRect.height) {
      tooltipY = containerRect.height - tooltipRect.height - 10;
    }
    if (tooltipX < 0) tooltipX = 10;
    if (tooltipY < 0) tooltipY = 10;
  
    tooltipText.style.left = `${tooltipX}px`;
    tooltipText.style.top = `${tooltipY}px`;
  
    tooltipLine.setAttribute("x1", cx);
    tooltipLine.setAttribute("y1", cy);
    tooltipLine.setAttribute("x2", tooltipX + 10);
    tooltipLine.setAttribute("y2", tooltipY + 10);
  
    tooltip.classList.remove("hidden");
  });
  
  polygon.addEventListener("mouseleave", () => {
    tooltip.classList.add("hidden");
    tooltipText.textContent = "";
    tooltipLine.setAttribute("x1", 0);
    tooltipLine.setAttribute("y1", 0);
    tooltipLine.setAttribute("x2", 0);
    tooltipLine.setAttribute("y2", 0);
  });
  
});
