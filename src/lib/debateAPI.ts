export interface Message {
  role: 'user' | 'assistant';
  content: string;
  name?: string;
}

export type Speaker = 'Agent A' | 'Agent B' | 'Judge';

export interface DebateRequest {
  messages: Message[];
  currentSpeaker: Speaker;
  topic: string;
}

export interface DebateResponse {
  response: string;
}

export async function callDebateAPI(
  messages: Message[],
  currentSpeaker: Speaker,
  topic: string
): Promise<string> {
  const response = await fetch('/api/debate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages,
      currentSpeaker,
      topic,
    } as DebateRequest),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.error || `API request failed with status ${response.status}`);
  }

  const data: DebateResponse = await response.json();
  return data.response;
}
