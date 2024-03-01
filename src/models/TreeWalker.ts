import { ITreeNodeHandler } from '../interfaces/ITreeNodeHandler';
import { TreeNode } from '../models/TreeNode';
import {TNode} from "./TNode";

export class TreeWalker {
  private tree: TNode[];
  private handler: ITreeNodeHandler<TNode> | null = null;
  private root: TNode;
  private id_pos_mapping: {};
  private bfs_order: number[];
  private children: number[];


  constructor(treeData: TreeNode[]) {
    this.tree = treeData as TNode[];
  }

  init(handler: ITreeNodeHandler<TreeNode>): void {
    this.handler = handler;
    this.root = this.tree.find((node) => !node.hasOwnProperty("parentId"));
    this.root.layer = 0;
    this.id_pos_mapping = {};
    this.tree.forEach((node, index) => {this.id_pos_mapping[node.id] = index});
    this.bfs_order = this.get_bfs_order();
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

    for (let i = 0; i < vertexAmount; i++) {
      let lastVertexId = this.bfs_order.pop();
      if (!(lastVertexId  in visitedIds)) {
        await this.handler.handleNode(this.getNodeById(lastVertexId));
      }
      visitedIds.add(lastVertexId);
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
          console.log(child);
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
