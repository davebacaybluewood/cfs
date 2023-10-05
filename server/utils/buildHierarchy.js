function buildHierarchy(arry) {
  let roots = [],
    children = {};

  // find the top level nodes and hash the children based on parent
  for (let i = 0, len = arry.length; i < len; ++i) {
    let item = arry[i],
      p = item.parent,
      target = !p ? roots : children[p] || (children[p] = []);

    target.push({ value: item });
  }

  // function to recursively build the tree
  let findChildren = function (parent) {
    if (children[parent.value.hierarchyId]) {
      parent.children = children[parent.value.hierarchyId];
      for (let i = 0, len = parent.children.length; i < len; ++i) {
        findChildren(parent.children[i]);
      }
    }
  };

  // enumerate through to handle the case where there are multiple roots
  for (let i = 0, len = roots.length; i < len; ++i) {
    findChildren(roots[i]);
  }

  return roots;
}
