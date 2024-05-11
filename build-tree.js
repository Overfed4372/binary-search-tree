import Node from "./node.js";
import mergeSort from "./merge-sort.js";
export default function buildTree (array) {
    const sortedArr = mergeSort(array);
    const build = (arr, start, end) => {
        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);
        const treeNodeRoot = new Node (arr[mid]);
        
        treeNodeRoot.setLeft(build(arr, start, mid-1));
        treeNodeRoot.setRight(build(arr, mid+1, end));
        
        return treeNodeRoot;
    }
    return build (sortedArr, 0, sortedArr.length - 1);
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
// const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// const array = [3, 2, 1, 13, 8, 5, 0, 1, -1];
// const array = [50, 30, 70, 20, 40, 60, 80, 32, 65, 75, 85, 34, 36];
// const tree = buildTree(array);
// prettyPrint(tree);
//[-34,  -2,  -1, 79, 100, 105, 110]
// 0 - 6
/*
 1 : tNR : data = 79 , this.left = build(arr, 0, 2) ,
                       this.right = build(arr, 4, 6)

 2 : tNR (left): data = -2 , this.left = build (arr, 0, 0) -> -34
                          , this.right = build (arr, 2,2) -> -1
 
 3 : tNR (left) : data = -34 , this.left = build (arr, 0, -1) = null
                           , this.right = build (arr, 1, 0) = null
 4 : tnR (right): data = -1
*/