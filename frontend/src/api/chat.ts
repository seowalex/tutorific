import api from './base';
import type { Chat, ChatInfo } from '../types/chat';

interface AddChatResponse {
  id: number;
}

interface AddMessageRequest {
  chatId: number;
  senderId: number;
  content: string;
}

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<[ChatInfo], void>({
      query: () => ({
        url: 'conversation',
      }),
      transformResponse: (response: { data: [ChatInfo] }) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Chat' as const, id })),
              { type: 'Chat', id: 'LIST' },
            ]
          : [{ type: 'Chat', id: 'LIST' }],
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
      invalidatesTags: (result) =>
        result ? [{ type: 'Chat', id: 'LIST' }] : [],
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
      async onQueryStarted({ chatId, ...body }, { dispatch }) {
        const message = { id: new Date().getTime(), ...body };

        dispatch(
          extendedApi.util.updateQueryData(
            'getChats',
            undefined as void,
            (draft) => {
              const pendingChat = draft.find((chat) => chat.id === chatId);

              if (pendingChat) {
                pendingChat.lastMessage = message;
              }
            }
          )
        );

        dispatch(
          extendedApi.util.updateQueryData('getChat', chatId, (draft) => {
            draft.messages.unshift(message);
          })
        );
      },
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
