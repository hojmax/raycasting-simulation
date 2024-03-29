function swap(items, leftIndex, rightIndex) {
  var temp = items[leftIndex]
  items[leftIndex] = items[rightIndex]
  items[rightIndex] = temp
}

function partition(items, left, right) {
  var pivot = items[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right //right pointer
  while (i <= j) {
    while (items[i].angle < pivot.angle) {
      i++
    }
    while (items[j].angle > pivot.angle) {
      j--
    }
    if (i <= j) {
      swap(items, i, j) //swapping two elements
      i++
      j--
    }
  }
  return i
}

function quickSortSegments(items, left, right) {
  var index
  if (items.length > 1) {
    index = partition(items, left, right) //index returned from partition
    if (left < index - 1) { //more elements on the left side of the pivot
      quickSortSegments(items, left, index - 1)
    }
    if (index < right) { //more elements on the right side of the pivot
      quickSortSegments(items, index, right)
    }
  }
  return items
}
