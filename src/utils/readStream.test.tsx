import { readStream } from './readStream'

// Mock TextDecoder
class MockTextDecoder {
  constructor(private encoding: string) {}

  decode(buffer: Uint8Array): string {
    if (!buffer) {
      return ''
    }
    return Buffer.from(buffer).toString((this as any).encoding)
  }
}

(global as any).TextDecoder = MockTextDecoder

describe('readStream', () => {
  test('should iterate over the stream and yield content', async () => {
    const mockResponse: any = new Response()
    const mockData = [
      '{"content": "First chunk of JSON data"}\n\n',
      '{"content": "Second chunk of JSON data"}\n\n',
    ]
    const chunks = mockData.map((chunk) => new Uint8Array(Buffer.from(chunk)))
    const reader = {
      read: jest.fn(() =>
        Promise.resolve({ done: false, value: chunks.shift() }),
      ),
    }
    mockResponse.body = { getReader: () => reader }

    const asyncGenerator = readStream(mockResponse)
    const { value, done } = await asyncGenerator.next() // Read the first chunk
    const content = value // Extract the content from the first chunk

    expect(content).toEqual('First chunk of JSON data')
    expect(done).toEqual(false) 
  })
})
