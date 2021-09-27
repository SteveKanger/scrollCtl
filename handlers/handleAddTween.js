import tweenCreate from '../tween/tweenCreate'

const handleAddTween = (appStore, data) => {
  const { items } = appStore.get()
  const tween = tweenCreate(appStore, data)
  items.push(tween)
  return tween.id
}

export default handleAddTween
