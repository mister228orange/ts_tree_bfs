import { TreeData } from './data/TreeData'
import { TreeNode } from './models/TreeNode';
import { ITreeWalker } from './interfaces/ITreeWalker'
import { ITreeNodeHandler } from './interfaces/ITreeNodeHandler'
import { TreeWalker} from "./models/TreeWalker";
import { NodeHandler} from "./models/NodeHandler";
import {NodePPrinter} from "./models/NodePPrinter";

const treeData = TreeData.getData();
const treeWalker = new TreeWalker(treeData);


const handler = new NodeHandler();
const printer: NodePPrinter = new NodePPrinter();
treeWalker.init(handler);

treeWalker.pprint();

// Выполняем обход и обработку
const walkPromise = treeWalker.reverseWalk();
Promise.all([walkPromise])
treeWalker.pprint()