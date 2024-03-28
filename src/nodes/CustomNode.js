import { defineNode, NodeInterface, TextInterface } from "baklavajs";

export const CustomNode = defineNode({
  type: "CustomNode",
  title: "Custom",
  inputs: {
    value: () => new NodeInterface("Value", ""),
    value2: () => new NodeInterface("Value2", ""),
    value3: () => new NodeInterface("Value3", ""),
  },
  outputs: {
    display: () => new TextInterface("Display", "")
  },
  calculate({ value }) {
    return {
      display: typeof value === "number" ? value.toFixed(3) : String(value)
    };
  }
});