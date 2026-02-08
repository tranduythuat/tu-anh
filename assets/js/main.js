async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log("🚀 ~ handleFormSubmit ~ data:", data);

  const {
    name: name,
    confirm: confirm,
    guest_number: guest_number,
    wish: wish,
  } = data;
  console.log("🚀 ~ handleFormSubmit 2~ data:", data);

  // Thông báo khi bắt đầu gửi
  Swal.fire({
    title: "Đang gửi /Sending/...",
    text: "Vui lòng chờ trong giây lát /Please wait a moment/",
    icon: "info",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  const url =
    "?sheet=sheet-1";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        name,
        confirm,
        guest_number,
        wish,
      }),
    });

    const result = await res.json().catch(() => ({}));
    console.log("Server response:", result);

    form.reset();

    // Thông báo thành công
    Swal.fire({
      title: "Thành công /Success/!",
      text: "Cảm ơn bạn đã gửi phản hồi, thông tin đã được gửi đến dâu rể rồi nha /Thank you for your feedback, the information has been sent to the bride and groom./",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#3f4122ff",
    });
  } catch (error) {
    console.error("Error:", error);

    // Thông báo lỗi
    Swal.fire({
      title: "Lỗi!",
      text: "OPPS! Đã xảy ra lỗi: " + error.message,
      icon: "error",
      confirmButtonText: "Thử lại",
      confirmButtonColor: "#3f4122ff",
    });
  }
}

async function toggleMusic(e) {
  const audio = document.getElementById('audio');
  const iconSvg = document.getElementById('iconSvg');
  if (!audio.src) {
    alert('Chưa có nhạc, vui lòng thêm src cho audio.');
    return;
  }
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }

  audio.addEventListener('play', () => {
    iconSvg.classList.add('spin');
  });
  audio.addEventListener('pause', () => {
    iconSvg.classList.remove('spin');
  });
}


// Kích hoạt ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Gọi các hiệu ứng có sẵn
document.addEventListener("DOMContentLoaded", () => {
  gsapFlipIn(".animate-flip");
  const thumbSwiper = new Swiper(".thumb-swiper", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });

  const mainSwiper = new Swiper(".main-swiper", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: thumbSwiper,
    },
    autoplay: {
      delay: 3000, // thời gian giữa các lần chuyển (ms)
      disableOnInteraction: false, // không tắt khi người dùng bấm
    },
    loop: true, // lặp lại ảnh
    effect: "fade", // hiệu ứng chuyển mượt
    fadeEffect: { crossFade: true },
    speed: 1000 // tốc độ chuyển (ms)
  });

  const btn = document.getElementById('player-btn');
  btn.addEventListener('click', toggleMusic);

  const form = document.forms["rsvpForm"];
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }
});
