import { defineNode, NodeInterface, TextInterface, setType } from "baklavajs";
import { stringType } from "@/interfaces/InterfaceType";

export const DisplayNode = defineNode({
  type: "StringNode",
  title: "String",
  inputs: {
    value: () => new NodeInterface("Value", "").use(setType, stringType)
  },
  outputs: {
    display: () => new TextInterface("Display", "").use(setType, stringType)
  },
  calculate({ value }) {
    return {
      display: typeof value === "number" ? value.toFixed(3) : String(value)
    };
  }
});
