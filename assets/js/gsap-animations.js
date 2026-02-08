// Không dùng export để hỗ trợ chạy bằng script thuần
function gsapFlipIn(selector) {
  gsap.utils.toArray(selector).forEach((el) => {
    const delay = parseFloat(el.dataset.delay) || 0;
    gsap.to(el, {
      rotateY: 0,
      scale: 1,
      filter: "brightness(1)",
      opacity: 1,
      duration: 2,
      delay: delay,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });
}
