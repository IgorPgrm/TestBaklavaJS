import {
    defineNode,
    TextInterface,
    SelectInterface,
    NodeInterface,
    setType
  } from "baklavajs";

  import { execType, stringType } from "@/interfaces/InterfaceType";
  
  export const QueueNode = defineNode({
    type: "QueueNode",
    title: "Очередь",
    inputs: {
      exec_pin: () => new TextInterface("Выполняется").setPort(true).use(setType, execType),
      operation: () => new SelectInterface("Операции", "Добавить", ["Добавить", "Извлечь"]).setPort(false),
      queue_key: () => new NodeInterface("Key", 'ключ').setPort(true).use(setType, stringType),
      queue_value: () => new NodeInterface("Value", 'значение').setPort(true).use(setType, stringType)
    },
    outputs: {
      result: () => new NodeInterface("Status").use(setType, stringType),
      exec_pin: () => new TextInterface().setPort(true).use(setType, execType),
    },
    created(graph, node) {
      // Обновляем выходной порт при создании узла
      node.on('inputValueChanged', (input) => {
        console.log('inputValueChanged')
        if (input === 'operation') {
          updateOutputPort(node);
          graph.$forceUpdate(); // Принудительное обновление компонентов BaklavaJS
        }
      });
    }
  });
  
  function updateOutputPort(node) {
    const operation = node.getInput('operation').value;
    const outputName = (operation === 'Извлечь') ? 'Значение' : 'Status';
  
    // Удаляем текущий выходной порт и добавляем новый
    node.removeOutput('result');
    node.addOutput(outputName,  new NodeInterface(outputName));
  }

