document.querySelectorAll(".design-container").forEach((container) => {
  const overlay = container.querySelector(".overlay");
  const tooltip = container.querySelector(".tooltip");
  const tooltipText = container.querySelector(".tooltip-text");
  const tooltipLine = container.querySelector(".tooltip-line");
  const toggleButton = container.querySelector(".toggle-hitbox");
  let hitboxMode = false;

  // Create center dots
  overlay.querySelectorAll(".hitbox").forEach((polygon) => {
    const [cx, cy] = polygon.dataset.center.split(',').map(Number);
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", cx);
    dot.setAttribute("cy", cy);
    dot.setAttribute("r", "0");
    dot.classList.add("dot");
    overlay.appendChild(dot);
  });

  toggleButton.addEventListener("click", () => {
    hitboxMode = !hitboxMode;
    container.classList.toggle("hitbox-mode", hitboxMode);
    overlay.querySelectorAll(".dot").forEach(dot => {
      dot.setAttribute("r", hitboxMode ? "5" : "0");
    });
    if (!hitboxMode) tooltip.classList.add("hidden");
  });

  overlay.querySelectorAll(".hitbox").forEach((polygon) => {
    polygon.addEventListener("mouseenter", () => {
      if (!hitboxMode) return;

      const tooltipMsg = polygon.dataset.tooltip;
      const [cx, cy] = polygon.dataset.center.split(',').map(Number);

      const bbox = overlay.getBoundingClientRect();
      const scaleX = bbox.width / 800;
      const scaleY = bbox.height / 600;
      const pixelX = cx * scaleX;
      const pixelY = cy * scaleY;

      let tooltipX = pixelX + 40;
      let tooltipY = pixelY - 40;

      tooltipText.textContent = tooltipMsg;
      tooltipText.style.left = `${tooltipX}px`;
      tooltipText.style.top = `${tooltipY}px`;
      tooltipText.style.display = "block";

      const tooltipRect = tooltipText.getBoundingClientRect();
      const wrapperRect = container.getBoundingClientRect();

      if (tooltipX + tooltipRect.width > wrapperRect.width) tooltipX = wrapperRect.width - tooltipRect.width - 10;
      if (tooltipY + tooltipRect.height > wrapperRect.height) tooltipY = wrapperRect.height - tooltipRect.height - 10;
      if (tooltipX < 0) tooltipX = 10;
      if (tooltipY < 0) tooltipY = 10;

      tooltipText.style.left = `${tooltipX}px`;
      tooltipText.style.top = `${tooltipY}px`;

      tooltipLine.setAttribute("x1", pixelX);
      tooltipLine.setAttribute("y1", pixelY);
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
});
