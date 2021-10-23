import tweenCreate from '../tween/tweenCreate'

const handleAddTween = (ctlStore, data) => {
  const { items } = ctlStore.get()
  const tween = tweenCreate(ctlStore, data)
  items.push(tween)
  return tween.id
}

export default handleAddTween
