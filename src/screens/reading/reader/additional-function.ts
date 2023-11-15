let lastTap: number | null = null
let timer: NodeJS.Timeout
const handleDoublePress = () => {
	if (lastTap) {
		toggleReadingUi()
		clearTimeout(timer)
		lastTap = null
	} else {
		lastTap = Date.now()
		timer = setTimeout(() => {
			lastTap = null
			clearTimeout(timer)
		}, 300)
	}
}
