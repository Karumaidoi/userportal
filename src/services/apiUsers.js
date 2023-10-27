import { supabase } from "./supabase";

export async function logIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signUp({ email, userName, phone, password }) {
  const { data, error } = await supabase.auth.signUp(
    {
      email: email,
      password: password,
    },
    {
      data: {
        userName,
        phone,
      },
    }
  );

  if (error) {
    throw new Error(error?.message);
  } else {
    try {
      await createUser(email, userName, phone);
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  return data;
}

export async function createUser(email, userName, phone) {
  const { data, error } = await supabase.from("Users").insert({
    email,
    phone,
    isAdmin: false,
    userName,
  });

  if (error) {
    throw new Error(error?.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error?.message);
  }

  const users = await getUsers();

  const currentUser = users?.filter((user) => user?.email === data?.user.email);

  return currentUser;
}

export async function getUsers() {
  const { data, error } = await supabase.from("Users").select();

  if (error) {
    throw new Error();
  }

  return data;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error?.message);
  }
}
