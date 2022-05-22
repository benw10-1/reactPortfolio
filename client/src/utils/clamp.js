function clamp(val, min, max) {
    return Math.min(max, Math.max(val, min))
}

export default clamp