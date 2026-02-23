import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useChatStore = create(
  persist(
    (set, get) => ({
      messages: [],
      conversations: [],
      currentConversationId: null,

      addMessage: (message) => {
        set((state) => ({
          messages: [...state.messages, message]
        }));
      },

      clearMessages: () => {
        set({ messages: [] });
      },

      setMessages: (messages) => {
        set({ messages });
      },

      createNewConversation: () => {
        const newConv = {
          id: Date.now().toString(),
          title: 'New Chat',
          messages: [],
          createdAt: new Date().toISOString()
        };
        
        set((state) => ({
          conversations: [newConv, ...state.conversations],
          currentConversationId: newConv.id,
          messages: []
        }));
        
        return newConv.id;
      },

      loadConversation: (conversationId) => {
        const conversation = get().conversations.find(c => c.id === conversationId);
        if (conversation) {
          set({
            currentConversationId: conversationId,
            messages: conversation.messages || []
          });
        }
      },

      updateConversationTitle: (conversationId, title) => {
        set((state) => ({
          conversations: state.conversations.map(c =>
            c.id === conversationId ? { ...c, title } : c
          )
        }));
      },

      deleteConversation: (conversationId) => {
        set((state) => ({
          conversations: state.conversations.filter(c => c.id !== conversationId),
          messages: state.currentConversationId === conversationId ? [] : state.messages,
          currentConversationId: state.currentConversationId === conversationId ? null : state.currentConversationId
        }));
      },

      saveCurrentConversation: () => {
        const { currentConversationId, messages, conversations } = get();
        if (!currentConversationId) return;

        const title = messages.length > 0 
          ? messages[0].content.substring(0, 50) + '...'
          : 'New Chat';

        set({
          conversations: conversations.map(c =>
            c.id === currentConversationId
              ? { ...c, messages, title, updatedAt: new Date().toISOString() }
              : c
          )
        });
      }
    }),
    {
      name: 'chat-storage'
    }
  )
);
