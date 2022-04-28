function functionName(node) {
	if (node.id) {
		return node.id.name;
	}
	return "anon function @" + node.loc.start.line;
}
