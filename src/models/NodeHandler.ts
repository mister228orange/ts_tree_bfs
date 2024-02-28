import { ITreeNodeHandler } from "src/interfaces/ITreeNodeHandler";
import { TreeNode } from "./TreeNode";
import { TNode } from "./TNode";

export class NodeHandler implements ITreeNodeHandler <TNode extends TreeNode>{
    
    async handleNode(node: TreeNode, parent: TreeNode | null): Promise<void> {
      
        const childrenSum = node.children.reduce((sum, elem) => { return sum + elem.valueToParent}, 0);

        if (node.addValueCondition) {
            node.value = childrenSum;
        } else if (parent) {
            node.valueToParent += childrenSum;
        } 
    }
  }