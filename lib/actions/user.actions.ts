"use server";

import { clerkClient, EmailAddress } from "@clerk/nextjs/server";

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    const { data } = await clerkClient.users.getUserList({
      EmailAddress: userIds,
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
