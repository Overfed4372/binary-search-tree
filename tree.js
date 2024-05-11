import Node from "./node.js";
import buildTree from "./build-tree.js";
export default class Tree {
    constructor (array) {
        this.root = buildTree(array);
    }
    insert (value) {
        const insertRec = (root, key) => {
            if (root === null) {
                root = new Node (key);
                return root;
            }
            if (key < root.data) {
                root.left = insertRec(root.left, key);
            } else if (key > root.data) {
                root.right = insertRec(root.right, key);
            }
            return root;
        }
        this.root = insertRec(this.root, value);
    }
    delete (value) {
        const deleteRec = (root, key) => {
            if (!root) return root;
            if (key < root.data) {
                root.left = deleteRec(root.left, key);
            } else if (key > root.data) {
                root.right = deleteRec(root.right, key);
            } else {
                if (root.left === null) {
                    return root.right;
                } else if (root.right === null) {
                    return root.left;
                }
                root.data = minValue(root.right);
                root.right = deleteRec(root.right, root.data);
            }
            return root;
        }
        this.root = deleteRec(this.root, value);
        function minValue (node) {
            let minV = node.data;
            while (node.left !== null) {
                minV = node.left.data;
                // console.log("minV", minV);
                node=node.left;
            }
            return minV;
        }
    }
    find (value) {
        const findRec = (root, key) => {
            if (!root) return root;
            if (key < root.data) {
                return findRec (root.left, key);
            } else if (key > root.data) {
                return findRec (root.right, key);
            } else if (key === root.data) return root;
        }
        return findRec(this.root, value);
    }
    get showTree () {
        return this.root;
    }
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};
const tree = new Tree ([50, 30, 70, 20, 40, 60, 80, 32, 65, 75, 85, 34, 36]);
// const tree = new Tree ([50, 30, 40, 39.5, 38, 39.51, 70, 20, 40, 60, 80, 32, 65, 75, 85, 34, 36]);
tree.insert(38);
tree.insert(39);
tree.insert(40);
tree.insert(39.5);
tree.insert(39.51);
// tree.delete(39.51);
// tree.delete(39.5);
// tree.delete(38);
// tree.delete(32);
// tree.delete(36);
// tree.delete(50);
// tree.delete(50);
// tree.delete(40);
tree.delete(60);
tree.delete(39);
// console.log(tree.find(36));
prettyPrint(tree.find(123));
// console.log(tree.showTree);
// prettyPrint(tree.showTree);