const imageFallbacks: Record<string, string> = {
  'photo-1590736969955-71cc94901144': 'photo-1615874959474-d609969a20ed',
  'photo-1593078166031-9c7f4c30c0fc': 'photo-1618221195710-dd6b41faaea6',
}

export const diwaliDiyasImage = 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Diya_Diwali_India.jpg/960px-Diya_Diwali_India.jpg'
export const diwaliDiyasCredit = {
  title: 'Diya Diwali India',
  artist: 'Subharnab Majumdar',
  source: 'https://commons.wikimedia.org/wiki/File:Diya_Diwali_India.jpg',
  license: 'CC BY 2.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
}

export function imageUrl(photoId: string, width = 900) {
  const resolvedId = imageFallbacks[photoId] ?? photoId
  return `https://images.unsplash.com/${resolvedId}?auto=format&fit=crop&w=${width}&q=82`
}