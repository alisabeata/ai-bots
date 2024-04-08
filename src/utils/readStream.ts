async function* readStream(response: Response): AsyncGenerator<string> {
  const reader: ReadableStreamDefaultReader<Uint8Array> =
    response.body!.getReader()
  const decoder: TextDecoder = new TextDecoder('utf-8')

  while (true) {
    const { done, value } = await reader.read()
    if (done) {
      break // Stream has ended
    }

    // Decode the chunk
    const decodedChunk = decoder.decode(value, { stream: true })

    try {
      // Attempt to parse the chunk as JSON
      console.log(decodedChunk)
      const parsedData = JSON.parse(String(decodedChunk).replace(/\\[1]/g, ''))

      // Yield the content
      yield parsedData.content
    } catch (error) {
      console.error('Error parsing JSON data: ', error)
      // If parsing fails, continue to the next chunk
      yield ' '
    }
  }
}

export { readStream }
