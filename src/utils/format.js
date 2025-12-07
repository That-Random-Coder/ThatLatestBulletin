export const formatDate = (dateString) => {
  try {
    return new Intl.DateTimeFormat('en', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(dateString || Date.now()))
  } catch (err) {
    return 'Recently'
  }
}

export const truncateWords = (text, limit = 30) => {
  if (!text) return ''
  const words = text.trim().split(/\s+/)
  if (words.length <= limit) return text.trim()
  return `${words.slice(0, limit).join(' ')}…`
}
