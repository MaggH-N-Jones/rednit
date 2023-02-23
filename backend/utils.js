function generateId() {
    return Math.round(Math.random() * 10 ** 8)
}
module.exports = { generateId }
