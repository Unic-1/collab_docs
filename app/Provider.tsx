"use client";

import React from "react";
import {
  ClientSideSuspense,
  LiveblocksProvider,
} from "@liveblocks/react/suspense";
import Loader from "@/components/Loader";
import { getClerkUsers, getDocumentUsers } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user: clerkUser } = useUser();

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });

        return users;
      }}
      resolveMentionSuggestions={async ({ roomId, currentUser, text }) => {
        const users = await getDocumentUsers({
          roomId,
          currentUser: clerkUser?.emailAddresses[0].emailAddress!,
          text,
        });

        return users;
      }}
    >
      <ClientSideSuspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
