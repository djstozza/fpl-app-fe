import $ from 'jquery';

export function centerItVariableWidth (target, outer, onLoad) {
  const $target = $(`.${target}`);
  const $outer = $(`.${outer}`);
  const myScrollPos = $target.offset().left + $target.outerWidth(true)/2 + $outer.scrollLeft() - $outer.width()/2;
  onLoad ? $outer.scrollLeft(myScrollPos) : $outer.animate({ scrollLeft: myScrollPos }, 700);
}
