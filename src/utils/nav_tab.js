import $ from 'jquery';

export function centerItVariableWidth (target, outer) {
  let $target = $(`a.active.${target}`)
  let $outer = $(`.tabs.tabs-fixed-width.${outer}`)
  let myScrollPos = $target.offset().left + $target.outerWidth(true)/2 + $outer.scrollLeft() - $outer.width()/2;
  $outer.scrollLeft(myScrollPos);
}
