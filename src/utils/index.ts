export default {
  parseBool: (txt: any): boolean => {
    switch (typeof txt) {
      case 'boolean':
        return txt
      case 'number':
        return !(txt === 0)
      case 'string':
        return txt.toLowerCase() === 'true'
      default:
        return false
    }
  }
}