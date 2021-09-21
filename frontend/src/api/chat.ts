import api from './base';
import type { Chat, ChatInfo } from '../types/chat';

interface AddChatResponse {
  id: number;
}

interface AddMessageRequest {
  chatId: number;
  content: string;
}

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<[ChatInfo], void>({
      query: () => ({
        url: 'conversation',
      }),
      transformResponse: (response: { data: [ChatInfo] }) => response.data,
      providesTags: ['Chat'],
    }),
    getChat: builder.query<Chat, number>({
      query: (id) => ({
        url: `conversation/${id}`,
      }),
      transformResponse: (response: { data: Chat }) => response.data,
      providesTags: (result, error, id) => [{ type: 'Chat', id }],
    }),
    addChat: builder.mutation<number, number>({
      query: (otherProfileId) => ({
        url: 'conversation',
        method: 'POST',
        body: {
          otherProfileId,
        },
      }),
      transformResponse: (response: { data: AddChatResponse }) =>
        response.data.id,
      invalidatesTags: (result) => (result ? ['Chat'] : []),
    }),
    addMessage: builder.mutation<void, AddMessageRequest>({
      query: ({ chatId, content }) => ({
        url: 'message',
        method: 'POST',
        body: {
          conversationId: chatId,
          content,
        },
      }),
      invalidatesTags: (result, error, arg) =>
        result ? [{ type: 'Chat', id: arg.chatId }] : [],
    }),
  }),
});

export const {
  useGetChatsQuery,
  useGetChatQuery,
  useAddChatMutation,
  useAddMessageMutation,
  usePrefetch,
} = extendedApi;
