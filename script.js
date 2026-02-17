const cartBadge = document.querySelector(".badge");
const addButtons = document.querySelectorAll(".add-to-cart");
const yearNode = document.querySelector("#year");
const logoCubes = document.querySelectorAll(".logo-cube");

let cartCount = 0;

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cartCount += 1;
    cartBadge.textContent = String(cartCount);
    button.textContent = "Tilføjet";
    setTimeout(() => {
      button.textContent = "Tilføj";
    }, 900);
  });
});

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

logoCubes.forEach((cube, index) => {
  let dropAnim;

  cube.addEventListener("pointerenter", () => {
    if (dropAnim) {
      dropAnim.cancel();
      dropAnim = undefined;
    }
    cube.classList.add("is-lifted");
  });

  cube.addEventListener("pointerleave", () => {
    cube.classList.remove("is-lifted");
    if (dropAnim) {
      dropAnim.cancel();
    }

    const rest = getComputedStyle(cube).getPropertyValue("--rest-transform").trim();
    const dir = index % 2 === 0 ? -1 : 1;
    const drift = Number(((Math.random() * 2 - 1) * 2.4).toFixed(2));
    const tiltBias = Number(((Math.random() * 2 - 1) * 0.8).toFixed(2));

    dropAnim = cube.animate(
      [
        { transform: `translateY(-12px) scale(1.015) ${rest}` },
        {
          transform: `translateX(${drift}px) translateY(2.6px) rotate(${(2.1 + tiltBias) * dir}deg) ${rest}`,
          offset: 0.34
        },
        {
          transform: `translateX(${(-0.55 * drift).toFixed(2)}px) translateY(-3.4px) rotate(${(0.95 - tiltBias) * -dir}deg) ${rest}`,
          offset: 0.57
        },
        {
          transform: `translateX(${(0.32 * drift).toFixed(2)}px) translateY(1.3px) rotate(${(0.52 + tiltBias * 0.4) * dir}deg) ${rest}`,
          offset: 0.76
        },
        {
          transform: `translateX(${(-0.15 * drift).toFixed(2)}px) translateY(-0.7px) rotate(${(0.22 - tiltBias * 0.3) * -dir}deg) ${rest}`,
          offset: 0.9
        },
        { transform: rest, offset: 1 }
      ],
      {
        duration: 470,
        easing: "cubic-bezier(0.2, 0.68, 0.25, 1)",
        fill: "forwards"
      }
    );
  });
});
