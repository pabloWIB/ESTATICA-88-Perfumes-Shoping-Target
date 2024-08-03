$(document).ready(function() {
    const $items = $('.weird-carousel__items');
    const $item = $('.weird-carousel__item');
    const itemCount = $item.length;
    const itemWidth = $item.outerWidth(true); // Includes margin
    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * itemWidth;
        $items.css('transform', `translateX(${offset}px)`);
    }

    $('.weird-carousel__btn--next').click(function() {
        if (currentIndex < itemCount - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    $('.weird-carousel__btn--prev').click(function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
});