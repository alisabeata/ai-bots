async function* readStream(response: Response): AsyncGenerator<string> {
  const reader: ReadableStreamDefaultReader<Uint8Array> =
    response.body!.getReader()
  const decoder: TextDecoder = new TextDecoder('utf-8')

  while (true) {
    const { done, value } = await reader.read()
    if (done) {
      break // stream has ended
    }

    // decode the chunk
    const decodedChunk = decoder
      .decode(value, { stream: true })
      .trim()
      .split('\n\n')

    // traverse the decodedChunk array
    for (const chunk of decodedChunk) {
      try {
        // attempt to parse the chunk as JSON
        const parsedData = JSON.parse(chunk)
        // yield the content
        yield parsedData.content
      } catch (error) {
        // if parsing fails, log error and yield a placeholder string
        console.error('Error parsing JSON data: ', error)
        yield ' '
      }
    }
  }
}

export { readStream }
