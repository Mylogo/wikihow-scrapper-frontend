export const ScrapTypes = Object.freeze({
  Scrap: 'scrap',
  Text: 'text',
})

export const ScrapState = Object.freeze({
  Default: 'default',
  Error: 'error',
  Fetching: 'fetching',
  Initialized: 'initialized',
})

const sharedValues = () => ({
  state: ScrapState.Default,
  data: null,
})

export const createScrap = (id) => ({
  id,
  type: ScrapTypes.Scrap,
  ...sharedValues(),
  article: null,
  sections: null,
})

export const createText = (id) => ({
  id,
  type: ScrapTypes.Text,
  doc: null,
  ...sharedValues(),
})

export const getTextFromToken = (text, token) => {
  return text.substr(token.start, token.end)
}

export const makeTokenId = (scrap, token, sectionId = undefined) => {
  return makeTokenIdWithTokenId(scrap, token.id, sectionId)
}

export const makeTokenIdWithTokenId = (scrap, tokenId, sectionId = undefined) => {
  if (sectionId == null) {
    return scrap.id + '->' + tokenId
  }

  return scrap.id + '->' + sectionId + '->' + tokenId
}

export const getWordData = (scrap, token) => {
  return getWordDataWithTokenId(scrap, token.id)
}

export const getWordDataWithTokenId = (scrap, tokenId) => {
  return scrap.words[tokenId]
}