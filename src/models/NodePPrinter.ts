import { ITreeNodeHandler } from "src/interfaces/ITreeNodeHandler";
import { TreeNode } from "./TreeNode";
import { TNode } from "./TNode";

export class NodePPrinter implements ITreeNodeHandler<TNode> {

    async handleNode(node: TNode): Promise<void> {
        const layer_shift = "|  ";
        console.log(`${layer_shift.repeat(node.layer)} Node ${node.id}\
         - condition: ${node.addValueCondition} value: ${node.value}, valueToParent: ${node.valueToParent}`)
        }
  }