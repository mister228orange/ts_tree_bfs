import {TreeNode} from "./TreeNode";


export class TNode extends TreeNode{
    constructor(child: TNode) {
        super();
        this.parentId = child.parentId;
        this.id = child.id;
        this.value = child.value;
        this.addValueCondition = child.addValueCondition;
        this.valueToParent = child.valueToParent;
        this.children = null;
    }

    public layer: number;
}