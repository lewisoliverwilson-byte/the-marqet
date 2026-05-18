const KEY = 'marqet:waitlist-intent'
const EVENT = 'marqet:intent-changed'

export function setSellerIntent() {
  sessionStorage.setItem(KEY, 'seller')
  window.dispatchEvent(new Event(EVENT))
}

export function consumeIntent() {
  const value = sessionStorage.getItem(KEY)
  if (value) sessionStorage.removeItem(KEY)
  return value
}

export { EVENT as INTENT_EVENT }
