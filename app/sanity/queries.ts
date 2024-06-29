import groq from 'groq'

export const TOGGLE_GROUPS_QUERY = groq`*[_type == "toggleGroup"][0...1]{
  _id,
  toggles[]{
    _key, 
    "enabled": enabled == true
  }
}`

export const SITE_META_QUERY = groq`*[_id == "siteMeta"][0]{ content }`
