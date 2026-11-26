export interface User { id: string; username: string; }
export interface Character { id: string; name: string; description?: string; }
export interface Conversation { id: string; characterId: string; }
export interface Message { id: string; conversationId: string; role: "user" | "assistant"; content: string; }
