import { CreateUserParams, SignInParams } from "@/type";
import {Account, Avatars, Client, Databases, ID, Query} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  platform: "com.giggler.foodordering",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: "68f75273001e06e4c9f1",
  userCollectionId: "68f75273001e06e4c9f1", // <-- FIX
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

// ✅ MUST PASS client instance, not Client class
export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);

// ---------------------------------------------------
// Create User
// ---------------------------------------------------
export const createUser = async ({ email, password, name }: CreateUserParams) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      name
    );

    if (!newAccount) throw new Error("Account creation failed");

    // auto-sign in user
    await signIn({ email, password });

    // Generate avatar
    const avatarUrl = avatars.getInitialsURL(name);

    // Create user document
    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        email,
        name,
        avatar: avatarUrl,
        accountId: newAccount.$id,
      }
    );

  } catch (e: any) {
    throw new Error(e?.message || "Failed to create user");
  }
};

// ---------------------------------------------------
// Sign In User
// ---------------------------------------------------
export const signIn = async ({ email, password }: SignInParams) => {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (e: any) {
    throw new Error(e?.message || "Failed to sign in");
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("No current user found");

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if(!currentUser.documents) throw new Error("User document not found");

    return currentUser.documents[0];
  } catch (e: any) {
    throw new Error(e?.message || "Failed to get current user");
  }
};


