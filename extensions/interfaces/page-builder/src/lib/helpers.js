export const globalExists = (varName) => {
	// Calling eval by another name causes evalled code to run in a
	// subscope of the global scope, rather than the local scope.
	const globalEval = eval
	try {
		globalEval(varName)
		return true
	} catch (e) {
		return false
	}
}
