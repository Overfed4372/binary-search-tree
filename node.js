export default class Node {
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