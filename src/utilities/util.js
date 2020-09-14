import * as axios from "axios";

export const BASE_URL = 'http://localhost:10000'

const constructUrl = (relatvePath) => `${BASE_URL}${relatvePath}`

const constructParams = (text, openie) => {
  const params = { text }

  if (openie) {
    params.openie = openie
  }

  return params
}

export const analyzeText = (text, openie = false) => {
  const params = constructParams(text, openie)
  return axios.get(constructUrl('/parse'), {
    params,
  })
}

export const analyzeWikihow = (text, openie = false) => {
  const params = constructParams(text, openie)
  return axios.get(constructUrl('/wikihow'), {
    params,
  })
}

export const POS = {
  ADJ: "ADJ",
  ADP: "ADP",
  ADV: "ADV",
  AUX: "AUX",
  CONJ: "CONJ",
  DET: "DET",
  INTJ: "INTJ",
  NOUN: "NOUN",
  NUM: "NUM",
  PART: "PART",
  PRON: "PRON",
  PROPN: "PROPN",
  PUNCT: "PUNCT",
  SCONJ: "SCONJ",
  SYM: "SYM",
  VERB: "VERB",
  X: "X",
}

export const POSTags = {
  ADJ: "adjective",
  ADP: "adposition",
  ADV: "adverb",
  AUX: "auxiliary verb",
  CONJ: "coordinating conjunction",
  DET: "determiner",
  INTJ: "interjection",
  NOUN: "noun",
  NUM: "numeral",
  PART: "particle",
  PRON: "pronoun",
  PROPN: "proper noun",
  PUNCT: "punctuation",
  SCONJ: "subordinating conjunction",
  SYM: "symbol",
  VERB: "verb",
  X: "other",
}

export const getPosTag = (abbr) => {
  return POSTags[abbr.toUpperCase()] || 'Unknown'
}
