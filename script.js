const cartBadge = document.querySelector(".badge");
const addButtons = document.querySelectorAll(".add-to-cart");
const yearNode = document.querySelector("#year");
const logoCubes = document.querySelectorAll(".logo-cube");

let cartCount = 0;

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cartCount += 1;
    cartBadge.textContent = String(cartCount);
    button.textContent = "Added";
    setTimeout(() => {
      button.textContent = "Add";
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

    dropAnim = cube.animate(
      [
        { transform: `translateY(-12px) scale(1.015) ${rest}` },
        { transform: `translateY(2px) rotate(${2.2 * dir}deg) ${rest}`, offset: 0.32 },
        { transform: `translateY(-4px) rotate(${1.1 * -dir}deg) ${rest}`, offset: 0.54 },
        { transform: `translateY(1px) rotate(${0.6 * dir}deg) ${rest}`, offset: 0.72 },
        { transform: `translateY(-1px) rotate(${0.28 * -dir}deg) ${rest}`, offset: 0.86 },
        { transform: rest, offset: 1 }
      ],
      {
        duration: 360,
        easing: "cubic-bezier(0.22, 0.7, 0.24, 1)",
        fill: "forwards"
      }
    );
  });
});
