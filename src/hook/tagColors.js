import { ref } from "vue";

export function tagColors() {
  const tagColors = ref({});

  function tagClass(tag) {
    if (tagColors.value[tag]) {
      return tagColors.value[tag];
    } else {
        const colors = [
        '#ECECEC', '#B0E2FF', '#D3D3E7', '#FEF9C3', '#ECEBFA', '#B6D7A8', '#D6EFD6', '#FFFACD', '#D7F0FF', '#E7E7F6', 
        '#C7E5FF', '#F2F2F2', '#B0E0E6', '#E0E0EB', '#EEE8AA', '#D8BFD8', '#F0FFF0', '#C8E6C9', '#F5F5DC', '#B0C4DE', 
        '#E6E6FA', '#C1FFC1', '#D2B48C', '#C0C0C0', '#B0E0E6', '#F4A460', '#F0E68C', '#F5DEB3', '#E0FFFF', '#A9A9A9', 
        '#E6E6FA', '#DDA0DD', '#F0E68C', '#EEE8AA', '#D3D3D3', '#FFE4E1', '#87CEFA', '#E6E6FA', '#D8BFD8', '#ADD8E6', 
        '#AFEEEE', '#B0C4DE', '#E0FFFF']
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      tagColors.value[tag] = randomColor;
      return randomColor;
    }
  }

  return { tagClass };
}

