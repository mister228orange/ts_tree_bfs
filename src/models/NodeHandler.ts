import { ITreeNodeHandler } from "src/interfaces/ITreeNodeHandler";
import { TreeNode } from "./TreeNode";
import { TNode } from "./TNode";

export class NodeHandler implements ITreeNodeHandler<TNode> {
    
    async handleNode(node: TreeNode, parent: TreeNode | null): Promise<void> {

        let childrenSum = 0;
        console.log(node);

        if (node.children) {
            childrenSum = node.children.reduce((sum, elem) => sum + elem.valueToParent, 0);
        }
        if (node.addValueCondition) {
            node.value = childrenSum;
        } else if (parent) {
            node.valueToParent += childrenSum;
        }
    }
  }