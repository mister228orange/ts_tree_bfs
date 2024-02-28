import { TreeData } from './data/TreeData'
import { TreeNode } from './models/TreeNode';
import { ITreeWalker } from './interfaces/ITreeWalker'
import { ITreeNodeHandler } from './interfaces/ITreeNodeHandler'

const treeData = TreeData.getData();
const treeWalker = new TreeWalker(treeData);

class MyTreeNodeHandler implements ITreeNodeHandler {
  handleNode(node: TreeNode, parent: TreeNode | null): void {
    if (node.addValueCondition) {
      // Если условие добавления значения выполняется, вычисляем сумму значений детей
      const childrenSum = treeData
        .filter((child) => child.parentId === node.id)
        .reduce((sum, child) => sum + child.value, 0);

      node.value = childrenSum;
    }

    if (parent && !parent.addValueCondition) {
      // Если у родителя условие добавления значения не выполняется, отправляем значения выше
      parent.valueToParent += node.valueToParent;
    }

    if (node.value) {
      // Если узел имеет значение, отправляем только valueToParent родителю
      if (parent) {
        parent.valueToParent += node.valueToParent;
      }
    }
  }
}

const handler = new MyTreeNodeHandler();
treeWalker.init(handler);

// Выводим дерево до обработки
console.log('Before:');
treeData.forEach((node) => {
  console.log(
    `Node ${node.id} - condition: ${node.addValueCondition}, value: ${node.value}, valueToParent: ${node.valueToParent}`
  );
});

// Выполняем обход и обработку
treeWalker.reverseWalk();

// Выводим дерево после обработки
console.log('\nAfter:');
treeData.forEach((node) => {
  console.log(
    `Node ${node.id} - condition: ${node.addValueCondition}, value: ${node.value}, valueToParent: ${node.valueToParent}`
  );
});