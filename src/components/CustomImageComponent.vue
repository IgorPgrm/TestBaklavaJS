<template>
  <img :src="imageUrl" alt="Custom Image" style="width: 110px; height: 110px;">
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      default: "https://static.npmjs.com/attachments/ck3uweazy72ye8874y9kkxnx1-gak.png", // Значение по умолчанию
    },
  },
};
</script>