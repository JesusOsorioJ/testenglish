export default function functionFilter(obj, type) {
    const conarrays = Object.keys(obj).map((key) => [Number(key), obj[key]]);
    const filter = conarrays.filter(word => word[1] == type)
    var result = {}
    for (let step of filter) {
        result = { ...result, [step[0]]: step[1] }
    }
    return result
}