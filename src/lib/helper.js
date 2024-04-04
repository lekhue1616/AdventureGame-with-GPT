export async function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function joinArrayNaturally(arr, usualJoin = ', ', lastJoin = ' and ') {
	if (arr.length == 0) return '';
	if (arr.length == 1) return arr[0];
	if (arr.length == 2) return arr.join(lastJoin);

	const lastEl = arr.pop();
	return arr.join(usualJoin) + lastJoin + lastEl;
}
