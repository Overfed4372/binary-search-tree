class Node {
    constructor (data) {
        this.data = data;
        this.right = null;
        this.left = null;
    }
    setLeft (left) {
        this.left = left;
    }
    setRight (right) {
        this.right = right;
    }
}

function mergeSort (list) {
    if (list.length <= 1) {
        return list;
    }
    const breakPoint = list.length/2;
    let leftSide = list.slice(0, breakPoint);
    let rightSide = list.slice(breakPoint);
    leftSide = mergeSort(leftSide);
    rightSide = mergeSort(rightSide);
    return merge(leftSide, rightSide);
    
    function merge(leftArr, rightArr) {
        let mergedArr = [];
        while (leftArr.length > 0 && rightArr.length > 0) {
            if (rightArr.at(0)< leftArr.at(0)) {
                mergedArr.push(rightArr.at(0));
                rightArr.shift();
            //remove duplicate values
            } else if (rightArr.at(0) === leftArr.at(0)) {
                mergedArr.push(rightArr.at(0));
                rightArr.shift();
                leftArr.shift();
            //
            } else {
                mergedArr.push(leftArr.at(0));
                leftArr.shift();
            }
        }
        if (leftArr.length === 0) {
            mergedArr = mergedArr.concat(rightArr);
        } else if (rightArr.length === 0) {
            mergedArr = mergedArr.concat(leftArr);
        }
        return mergedArr;
    }
}
// console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1, -1]));
// console.log(mergeSort([105, 79, 100, 110, 105, 79, 100, -1, -2, -2, -34]));
// [-34,  -2,  -1, 79, 100, 105, 110]
// console.log(mergeSort([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));

function buildTree (array) {
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

class Tree {
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
    levelOrder (callback=null) {
        //the root of the tree is initially in the queue
        const queue = [this.root];
        const levelOrderArr = [];
        //duplicating root tree
        // let tmp = this.root;
        // recursion
        const level = (q, node) => {
            if (q.length === 0) return;
            levelOrderArr.push(q[0].data);
            q.shift();
            if (node.left !== null) q.push(node.left);
            if (node.right !== null) q.push(node.right);
            node = q[0];
            level (q, node);
        }
        level(queue, this.root);
        return levelOrderArr;
        // 
        
        /* iteration 
        do {
            levelOrderArr.push(queue[0].data);
            queue.shift();
            if (tmp.left !== null) queue.push(tmp.left);
            if (tmp.right !== null) queue.push(tmp.right);
            tmp = queue[0];
        }
        while (queue.length > 0)
        */
    }
    inOrder (callback=null) {
      const inOrderArr = [];
      const toLeftRootRight = function (node) {
        if (!node.left) {
          inOrderArr.push(node.data);
          if (node.right) toLeftRootRight(node.right);
        } else if (node.left) {
          toLeftRootRight(node.left);
          inOrderArr.push(node.data);
          if (node.right) toLeftRootRight(node.right);
        }
      }
      toLeftRootRight(this.root);
      return inOrderArr;
    }
    preOrder(callback=null) {
      const preOrderArr = [];
      const toRootLeftRight = function (node) {
        preOrderArr.push(node.data);
        if (node.left) toRootLeftRight(node.left);
        if (node.right) toRootLeftRight(node.right);
      }
      toRootLeftRight(this.root);
      return preOrderArr;
    }
    postOrder(callback=null) {
      const postorderArr = [];
      const toLeftRightRoot = function (node) {
        if (!node.left) {
          if (node.right) toLeftRightRoot(node.right);
          postorderArr.push(node.data);
        } else if (!node.right) {
          if (node.left) toLeftRightRoot(node.left);
          postorderArr.push(node.data);
        } else {
          toLeftRightRoot(node.left);
          toLeftRightRoot(node.right);
          postorderArr.push(node.data);
        }
      }
      toLeftRightRoot(this.root);
      return postorderArr;
    }
    height (node) {
      let heightNum = 0;
      let maxHeightNum = 0;
      if (!node) return 0;
      const getHeight = (node) => {
        // if (node.data !== null) heightNum ++;
        if (!node.left && !node.right) {
          if (heightNum > maxHeightNum) maxHeightNum = heightNum;
          // console.log(node.data);
          // heightNum = 0;
          return;
        }
        if (node.left) {
          heightNum ++;
          // console.log(node.left.data);
          getHeight(node.left);
          heightNum --;
        } if (node.right) {
          heightNum ++;
          // console.log(node.right.data)
          getHeight(node.right);
          heightNum --;
        }
      }
      getHeight(node);
      return maxHeightNum;
    }
    depth (nodeValue) {
      let depthNum = 0;
      let realDepthNum = 0;
      const getDepth = (node) => {
        if (node.data === nodeValue) {
          realDepthNum = depthNum;
          return;
        }
        if (node.left) {
          depthNum ++;
          getDepth(node.left);
          depthNum --;
        }
        if (node.right) {
          depthNum ++;
          getDepth(node.right);
          depthNum --;
        }
      }
      getDepth(this.root);
      return realDepthNum;
    }
    isBalanced () {
      let height = {right:0, left:0};
      let result = true;
      const checkBalance = (node) => {
        if (!result) return result;
        height.left = node.left ? this.height(node.left) + 1: 0;
        height.right = node.right ? this.height(node.right) + 1: 0;
        //height of right and left are inequal
        // console.log(node.data, height.left, height.right, Math.abs(height.left - height.right));
        if (Math.abs(height.left - height.right) > 1) result = false;
        if (node.left) checkBalance(node.left);
        if (node.right) checkBalance(node.right);
        //found no inequalities
        return result;
      }
      return checkBalance(this.root);
    }
    get showTree () {
        return this.root;
    }
    rebalance () {
      const levelOrderArr = this.levelOrder();
      this.root = buildTree(levelOrderArr);
    }
}
// const prettyPrint = (node, prefix = "", isLeft = true) => {
//     if (node === null) {
//       return;
//     }
//     if (node.right !== null) {
//       prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
//     }
//     console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
//     if (node.left !== null) {
//       prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
//     }
// };
// const tree = new Tree ([50, 30, 70, 20, 40, 60, 80, 32, 65, 75, 85, 34, 36]);
// const tree = new Tree ([50, 30, 39.53, 39.54,39.505, 39.52, 40, 39.5, 38, 39.51, 70, 20, 40, 60, 80, 32, 65, 75, 85, 34, 36]);
// tree.insert(38);
// tree.insert(39);
// tree.insert(40);
// tree.insert(39.5);
// tree.insert(39.51);
// tree.insert(39.51);
// tree.insert(39.52);
// tree.insert(39.54);
// tree.insert(39.53);
// tree.delete(39.51);
// tree.delete(39.5);
// tree.delete(38);
// tree.delete(32);
// tree.delete(36);
// tree.delete(50);
// tree.delete(50);
// tree.delete(40);
// tree.delete(60);
// tree.delete(39);
// console.log(tree.find(36));
// prettyPrint(tree.find(123));
// console.log(tree.levelOrder());
// console.log(tree.inOrder());
// console.log(tree.preOrder());
// console.log(tree.postorder());
// const selectedNode = tree.find(65);
// console.log(tree.height(selectedNode));
// console.log(tree.depth(39.52));
// console.log(tree.showTree);
// console.log(tree.isBalanced());
// tree.rebalance();
// console.log(tree.isBalanced());
function randomNumbers (max, qty) {
  const arr = [];
  for (let i=1; i<=qty; i++) {
    arr.push(Math.floor(Math.random() * max));
  }
  return arr;
}
// const rawBSTArr = randomNumbers(100, 50);
const rawBSTArr = [
   8,  9, 10, 11, 12, 13, 15, 17, 19,
  21, 24, 25, 27, 39, 40, 42, 43, 45,
  46, 52, 53, 56, 61, 70, 71, 75, 83,
  85, 86, 88, 89, 90, 91, 92, 97, 98
];
const tree = new Tree (rawBSTArr); 
// console.log(tree.inOrder())
// tree.delete(54);
// tree.delete(56);
// tree.delete(75);
// tree.delete(18);
// tree.delete(1);
// tree.delete(52);
// tree.delete(84);
// tree.delete(47);
// tree.delete(33);
// tree.delete(28);
const deleteRandomNumbers = ((max, qty) => {
    for (let i=1; i<=qty; i++) {
      tree.delete(Math.floor(Math.random() * max));
    }
})(100, 20);
console.log("In order:", tree.inOrder());
console.log("Pre order: ",tree.preOrder());
console.log("Post order", tree.postOrder());
// tree.rebalance();
console.log("Is the tree balanced? ", tree.isBalanced());
// const foundNode = tree.find(39);
// console.log(tree.height(foundNode));
prettyPrint(tree.showTree);