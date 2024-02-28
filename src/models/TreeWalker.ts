import { ITreeNodeHandler } from '../interfaces/ITreeNodeHandler';
import { TreeNode } from '../models/TreeNode';

class TreeWalker {
  private tree: TreeNode[];
  private handler: ITreeNodeHandler<TreeNode> | null = null;

  constructor(treeData: TreeNode[]) {
    this.tree = treeData;
  }

  init(handler: ITreeNodeHandler<TreeNode>): void {
    this.handler = handler;
  }

  reverseWalk(): void {
    if (!this.handler) {
      throw new Error('Handler is not initialized');
    }

    const visited: Set<number> = new Set();

    const visitNode = (node: TreeNode | null) => {
      if (node && !visited.has(node.id)) {
        visited.add(node.id);

        this.handler!.handleNode(node, node.parentId ? this.findParent(node.parentId) : null);

        // Рекурсивно обрабатываем детей текущего узла
        this.tree
          .filter((child) => child.parentId === node.id)
          .forEach((child) => visitNode(child));
      }
    };

    // Начинаем обход с узлов, у которых нет детей
    const rootNodes = this.tree.filter((node) => !this.tree.some((child) => child.parentId === node.id));
    rootNodes.forEach((node) => visitNode(node));
  }

  private findParent(parentId: number): TreeNode | null {
    return this.tree.find((node) => node.id === parentId) || null;
  }
}
