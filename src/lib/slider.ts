export function computeDotCount(
  slideCount: number,
  slidesToShow: number,
  slidesToScroll = 1,
  infinite = false
) {
  if (infinite) return Math.ceil(slideCount / slidesToScroll);
  return Math.max(1, Math.ceil((slideCount - slidesToShow) / slidesToScroll) + 1);
}
