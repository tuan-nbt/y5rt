document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    // Chuyển đổi trạng thái menu trên mobile
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }

    // Xử lý đóng menu khi click ra ngoài (chỉ cho mobile menu)
    document.addEventListener('click', function(event) {
        if (mainNav.classList.contains('active') && !mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
            mainNav.classList.remove('active');
        }
    });

    // Ngăn chặn đóng menu khi click vào dropdown toggle trên mobile
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(event) {
            // Ngăn chặn hành vi mặc định của thẻ a (chuyển hướng)
            event.preventDefault(); 
            // Ngăn chặn sự kiện nổi bọt lên document để không đóng menu
            event.stopPropagation(); 
            // Tắt/bật dropdown menu con
            const dropdownMenu = this.nextElementSibling;
            if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // Đóng tất cả dropdown khi click vào body (ngoại trừ dropdown-toggle)
    document.body.addEventListener('click', function(event) {
        dropdownToggles.forEach(toggle => {
            const dropdownMenu = toggle.nextElementSibling;
            if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu') && dropdownMenu.style.display === 'block' && !toggle.contains(event.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
    });
});