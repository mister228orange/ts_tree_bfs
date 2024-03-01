import { ITreeNodeHandler } from '../interfaces/ITreeNodeHandler';
import { TreeNode } from '../models/TreeNode';
import {TNode} from "./TNode";

export class TreeWalker {
  private tree: TNode[];
  private handler: ITreeNodeHandler<TNode> | null = null;
  private root: TNode;
  private id_pos_mapping: {};
  private bfs_order: number[];


  constructor(treeData: TreeNode[]) {
    this.tree = treeData as TNode[];
  }

  init(handler: ITreeNodeHandler<TreeNode>): void {
    this.handler = handler;
    this.root = this.tree.find((node) => !node.hasOwnProperty("parentId"));
    this.root.layer = 0;
    this.id_pos_mapping = {};
    this.tree.forEach(
        (node, index) =>
        {
          this.id_pos_mapping[node.id] = index;
          this.tree[index].children = this.getEveryChild(node.id);
        }
    );
    this.bfs_order = this.get_bfs_order()
  }

  getEveryChild(parentId) :TNode[] {
    return this.tree.filter(node => {return node.parentId == parentId}).map(child => {
      return new TNode (child)
    }).sort((a,b) => {if (a.id < b.id) return 1;
    else if (a.id==b.id) return 0; return -1})
  }

  getNodeById(id: number) {
    return this.tree[this.id_pos_mapping[id]];
  }

  get_bfs_order(): number[] {
    let order = [];
    let queue = [this.root.id];
    while (queue.length) {
      let currentId = queue.shift();
      order.push(currentId);
      const node = this.getNodeById(currentId);
      if (node.children) {
        node.children.forEach(child => {
          queue.push(child.id);
          this.tree[this.id_pos_mapping[child.id]].layer = node.layer + 1;
        })
      }
    }
    return order;
  }

  async reverseWalk(): Promise<void> {
    const vertexAmount = this.tree.length;
    const visitedIds: Set<number> = new Set();
    while (this.bfs_order.length) {
      const leaf_id = this.bfs_order.pop()
      let node = this.getNodeById(leaf_id);
      let parent = null;
      if (node.parentId) {
        parent = this.getNodeById(node.parentId);
      }
      this.handler.handleNode(node, parent);
    }

  }


  pprint(): void {
    let stack = [this.root.id];
    while (stack.length) {
      let currentId = stack.pop();
      const node = this.getNodeById(currentId);
      this.pprintNode(node);
      if (node.children) {
        node.children.forEach(child => {
          stack.push(child.id);
        })
      }
    }
  }

  pprintNode(node: TNode){
    const layer_shift = "|  ";
    console.log(`${layer_shift.repeat(node.layer)} Node ${node.id}\
     - condition: ${node.addValueCondition} value: ${node.value}, valueToParent: ${node.valueToParent}`)
  }
}
