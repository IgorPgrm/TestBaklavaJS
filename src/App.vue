<template>
  <div style="width: 100vw; height: 100vh">
    <baklava-editor :config="editorConfig" :view-model="baklava" />
    <baklava-node :node="imageNode"></baklava-node>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {
  EditorComponent,
  useBaklava,
  DependencyEngine,
  BaklavaInterfaceTypes,
  applyResult
} from "baklavajs";
import "@baklavajs/themes/dist/syrup-dark.css";

import { DisplayNode } from "./nodes/DisplayNode";
import { ImageNode } from "./nodes/ImageNode";
import { MathNode } from "./nodes/MathNode";
import { CustomNode } from "./nodes/CustomNode";
import { QueueNode } from "./nodes/QueueNode";
import { numberType, execType } from "@/interfaces/InterfaceType";
// import { MinimapPlugin } from "@baklavajs/plugin-minimap";

export default defineComponent({
  components: {
    "baklava-editor": EditorComponent
  },
  setup() {
    const baklava = useBaklava();
    const engine = new DependencyEngine(baklava.editor);

    engine.start();

        // Конфигурация для стилей соединений
    const editorConfig = {
      connections: {
        string_port: {
          style: {
            stroke: 'blue',
            'stroke-width': '2px',
          },
        },
        // Другие типы соединений и их стили
      },
    };

    const nodeInterfaceTypes = new BaklavaInterfaceTypes(baklava.editor, {
      viewPlugin: baklava
    });
    nodeInterfaceTypes.addTypes(numberType);
    nodeInterfaceTypes.addTypes(execType);
    nodeInterfaceTypes.addTypes(execType);


    baklava.editor.registerNodeType(MathNode);
    baklava.editor.registerNodeType(CustomNode);
    baklava.editor.registerNodeType(DisplayNode);
    baklava.editor.registerNodeType(QueueNode);
    baklava.editor.registerNodeType(ImageNode);

    baklava.settings.enableMinimap = true;
    // baklava.settings.displayValueOnHover = false;
    // baklava.displayedGraph.sidebar.visible = true;

    baklava.editor.registerNodeType(MathNode, { category: "Доступные:" });
    baklava.editor.registerNodeType(DisplayNode, { category: "Подписка:" });
    baklava.editor.registerNodeType(CustomNode, { category: "Подписка:" });
    baklava.editor.registerNodeType(QueueNode, { category: "Подписка:" });
    baklava.editor.registerNodeType(ImageNode, { category: "Подписка:" });

    const token = Symbol();
    engine.events.afterRun.subscribe(token, (result) => {
      engine.pause();
      applyResult(result, baklava.editor);
      engine.resume();
    });


    // Add some nodes for demo purposes
    function addNodeWithCoordinates(nodeType, x, y) {
      const n = new nodeType();
      baklava.displayedGraph.addNode(n);
      n.position.x = x;
      n.position.y = y;
      return n;
    }
    const node1 = addNodeWithCoordinates(MathNode, 300, 140);
    const node2 = addNodeWithCoordinates(DisplayNode, 550, 140);
    const node3 = addNodeWithCoordinates(QueueNode, 539, 311);
    const node4 = addNodeWithCoordinates(QueueNode, 889, 311);

    baklava.displayedGraph.addConnection(
      node1.outputs.result,
      node2.inputs.value
    );
    baklava.displayedGraph.addConnection(
      node3.outputs.exec_pin,
      node4.inputs.exec_pin
    );

    baklava.displayedGraph.addConnection(
      node3.outputs.result,
      node4.inputs.queue_key
    );

    return { baklava, editorConfig,  imageNode: new ImageNode()  };
  }
});
</script>
<style></style>
