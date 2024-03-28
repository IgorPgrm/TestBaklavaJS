import {
    defineNode,
    NumberInterface,
    SelectInterface,
    setType,
    NodeInterface
  } from "baklavajs";

  import { floatType } from "@/interfaces/InterfaceType";
  
  export const MathNode = defineNode({
    type: "MathNode",
    title: "Math",
    inputs: {
      operation: () =>
        new SelectInterface("Operation", "Add", ["Add", "Subtract"]).setPort(
          false
        ),
      num1: () => new NumberInterface("Num 1", 1).use(setType, floatType),
      num2: () => new NumberInterface("Num 2", 1).use(setType, floatType)
    },
    outputs: {
      result: () => new NodeInterface("Result").use(setType, floatType)
    },
    calculate({ num1, num2, operation }) {
      if (operation === "Add") {
        return { result: num1 + num2 };
      } else {
        return { result: num1 - num2 };
      }
    }
  });
  