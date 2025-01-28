<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>BioCalc</title>
  <!-- Link to your shared CSS -->
  <link rel="stylesheet" href="style.css">
</head>
<body class="fade-in" id="body-fade">

  <!-- Header -->
  <header class="header">
    <!-- Title + description in same container -->
    <div class="header-info">
      <h1>BioCalc</h1>
      <p class="subtitle single-line">
        A simple and modern tool to power your biology &amp; chemistry calculations.
      </p>
    </div>

    <!-- About link on the right -->
    <nav class="navbar">
      <ul>
        <li><a href="https://www.google.com">About</a></li>
      </ul>
    </nav>
  </header>

  <!-- Main container for the tool cards -->
  <main>
    <!-- The grid of 6 tool cards -->
    <section class="tool-list">
      <!-- 1) PCR -->
      <div class="tool-card" data-link="pcr.html">
        <img src="https://via.placeholder.com/200x150" alt="PCR">
        <h3>PCR</h3>
      </div>
      
      <!-- 2) Bacteria -->
      <div class="tool-card" data-link="bacteria.html">
        <img src="https://via.placeholder.com/200x150" alt="Bacteria">
        <h3>Bacteria</h3>
      </div>

      <!-- 3) Electrophoresis -->
      <div class="tool-card" data-link="electrophoresis.html">
        <img src="https://via.placeholder.com/200x150" alt="Electrophoresis">
        <h3>Electrophoresis</h3>
      </div>

      <!-- 4) Concentration -->
      <div class="tool-card" data-link="concentration.html">
        <img src="https://via.placeholder.com/200x150" alt="Concentration">
        <h3>Concentration</h3>
      </div>

      <!-- 5) OMICS -->
      <div class="tool-card" data-link="omics.html">
        <img src="https://via.placeholder.com/200x150" alt="OMICS">
        <h3>OMICS</h3>
      </div>

      <!-- 6) Unit Conversion -->
      <div class="tool-card" data-link="units.html">
        <img src="https://via.placeholder.com/200x150" alt="Unit Conversion">
        <h3>Unit Conversion</h3>
      </div>
    </section>
  </main>

  <!-- Optional Footer 
  <footer class="footer">
    <p>&copy; 2025 BioCalc. All rights reserved.</p>
  </footer>
  -->

  <!-- Embedded JS for fade-out navigation -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const body = document.getElementById("body-fade");
      const cards = document.querySelectorAll(".tool-card");

      cards.forEach(card => {
        card.addEventListener("click", e => {
          e.preventDefault();
          const link = card.getAttribute("data-link");
          if (!link) return;

          // Add the fade-out class
          body.classList.add("fade-out");

          // Wait for the transition to end, then navigate
          body.addEventListener("transitionend", function handler() {
            body.removeEventListener("transitionend", handler);
            window.location.href = link;
          });
        });
      });
    });
  </script>
</body>
</html>
