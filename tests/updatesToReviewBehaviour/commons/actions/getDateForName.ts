export const getDateForName = () => {
  const date = new Date()
  const created = 'created:' + date.toLocaleDateString('en-gb')
  const reviewId = 'id:' + date.getTime()
  const currentDate = created + ' ' + reviewId
  return currentDate
}