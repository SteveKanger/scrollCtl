import tweenCreate from '../tween/tweenCreate'

const handleAddTween = (controllerVars, data) => {
  const { items } = controllerVars.get()
  const tween = tweenCreate(controllerVars, data)
  items.push(tween)
  return tween.id
}

export default handleAddTween
