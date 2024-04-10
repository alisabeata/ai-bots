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
    const decodedChunk = decoder
      .decode(value, { stream: true })
      .trim()
      .split('\n\n')

    // Traverse the decodedChunk array
    for (const chunk of decodedChunk) {
      try {
        // Attempt to parse the chunk as JSON
        const parsedData = JSON.parse(chunk)
        // Yield the content
        yield parsedData.content
      } catch (error) {
        // If parsing fails, log error and yield a placeholder string
        console.error('Error parsing JSON data: ', error)
        yield ' '
      }
    }
  }
}

export { readStream }
