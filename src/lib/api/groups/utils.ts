export function createGroupCode() {
  return Date.now().toString(36).slice(-5)
}