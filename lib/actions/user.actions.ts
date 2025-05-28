"use server";

import { parseStringify } from "../utils";
import { liveblocks } from "../liveblocks";
import { clerkClient } from "../clerkClient";

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    const { data } = await clerkClient.users.getUserList({
      emailAddress: userIds,
    });

    const users = data.map(
      ({ id, firstName, lastName, emailAddresses, imageUrl }) => ({
        id,
        name: `${firstName} ${lastName}`,
        email: emailAddresses[0].emailAddress,
        avatar: imageUrl,
      })
    );

    const sortedUsers = userIds.map((email) =>
      users.find((user) => user.email === email)
    );
    return sortedUsers;
  } catch (error) {
    console.log(`Error occured while fetching users: ${error}`);
  }
};

export const getDocumentUsers = async ({
  roomId,
  currentUser,
  text,
}: {
  roomId: string;
  currentUser: string;
  text: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const users = Object.keys(room.usersAccesses).filter(
      (email) => email !== currentUser
    );

    if (text.length) {
      const lowerCaseText = text.toLowerCase();

      const filteredUsers = users.filter((email) => {
        email.toLowerCase().includes(lowerCaseText);
      });

      return parseStringify(filteredUsers);
    }

    return parseStringify(users);
  } catch (error) {
    console.error(`Error occured while fetching users: ${error}`);
  }
};
