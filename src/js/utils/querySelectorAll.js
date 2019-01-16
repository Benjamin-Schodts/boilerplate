export default function querySelectorAll(selector = '*', root = document) {
    return Array.prototype.slice.call(root.querySelectorAll(selector));
}
