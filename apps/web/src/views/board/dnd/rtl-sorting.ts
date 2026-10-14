import type { SortingStrategy } from "@dnd-kit/sortable";
import { horizontalListSortingStrategy } from "@dnd-kit/sortable";

import type { TextDirection } from "~/locales";

/**
 * dnd-kit's `horizontalListSortingStrategy` assumes that a higher index sits
 * further to the right. In RTL the list is laid out right-to-left, so the
 * shifts have to be mirrored.
 */
const rtlHorizontalListSortingStrategy: SortingStrategy = ({
  activeIndex,
  activeNodeRect,
  index,
  rects,
  overIndex,
}) => {
  const activeRect = rects[activeIndex] ?? activeNodeRect;

  if (!activeRect) return null;

  if (index === activeIndex) {
    const overRect = rects[overIndex];

    if (!overRect) return null;

    return {
      x:
        activeIndex < overIndex
          ? overRect.left - activeRect.left
          : overRect.left +
            overRect.width -
            (activeRect.left + activeRect.width),
      y: 0,
      scaleX: overRect.width / activeRect.width,
      scaleY: 1,
    };
  }

  const currentRect = rects[index];

  if (!currentRect) return null;

  const neighbourRect =
    activeIndex < index ? rects[index - 1] : rects[index + 1];
  const gap = neighbourRect
    ? Math.max(
        0,
        Math.abs(neighbourRect.left - currentRect.left) - currentRect.width,
      )
    : 0;
  const shift = activeRect.width + gap;

  if (index > activeIndex && index <= overIndex) {
    return { x: shift, y: 0, scaleX: 1, scaleY: 1 };
  }

  if (index < activeIndex && index >= overIndex) {
    return { x: -shift, y: 0, scaleX: 1, scaleY: 1 };
  }

  return { x: 0, y: 0, scaleX: 1, scaleY: 1 };
};

export const getHorizontalListSortingStrategy = (
  direction: TextDirection,
): SortingStrategy =>
  direction === "rtl"
    ? rtlHorizontalListSortingStrategy
    : horizontalListSortingStrategy;
