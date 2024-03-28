<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <div ref="editorContainer"></div>
     -->
     <BaklavaVueRenderer/>
  </div>
</template>

<script>
import { createEditor } from '@baklavajs/core';
import BaklavaVueRenderer from '@baklavajs/plugin-renderer-vue3';

export default {
  name: 'HelloWorld',
  components: {BaklavaVueRenderer},
  mounted() {
    const editor = createEditor({
      renderer: BaklavaVueRenderer,
    });

    // Ваш код для работы с редактором узлов BaklavaJS
    console.log(editor); // Пример использования переменной
  },
};
</script>


<style scoped>

</style>
