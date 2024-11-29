export function prepareImageSrc(base64Data: string|null): string {
    if (!base64Data) {
      return 'https://cdn2.iconfinder.com/data/icons/symbol-gray-set-3a/100/1-17-512.png'
    }
  
    const mimeType = getMimeType(base64Data)
  
    return `data:${mimeType};base64,${base64Data}`
  }

  function getMimeType(base64Data: string): string {

    if (base64Data.startsWith('/9j/')) {
      return 'image/jpeg'
    }

    if (base64Data.startsWith('iVBORw0KGgo')) {
      return 'image/png'
    }

    if (base64Data.startsWith('R0lGODdh') || base64Data.startsWith('R0lGODlh')) {
      return 'image/gif'
    }


    return 'image/png'
  }