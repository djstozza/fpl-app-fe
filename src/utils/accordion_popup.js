import $ from 'jquery';

export function popup(e) {
  const $target = $(e.target);
  const $card = $target.parents('.card');

  if ($target.attr('aria-expanded') === "true"|| $target.parents('.card-header').attr('aria-expanded') === "true") {
    $card.addClass('popup')
    $card.animate({
      width: "105%",
      right: "2.5%",
      "margin-bottom": "1%",
    }, 200);
  } else {
    $card.animate({
      width: "100%",
      right: "0",
      "margin-bottom": "0",
    }, 200, () => {
      $card.removeClass('popup')
    });
  }

  $(".card-header").not('.popup').animate({
    width: "100%",
    right: "0",
    "margin-bottom": "0",
  }, 200)
}
