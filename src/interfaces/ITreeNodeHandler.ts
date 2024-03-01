import { TreeNode } from '../models/TreeNode'
import {TNode} from "../models/TNode";

export interface ITreeNodeHandler<TNode extends TreeNode> {
    handleNode(node: TNode, parent?: TNode): Promise<void>
}
