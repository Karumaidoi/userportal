import { supabase } from "./supabase";

export async function getProjects() {
  const { data, error } = await supabase.from("Projects").select("*, Users(*)");

  if (error) {
    throw new Error(error?.message);
  }

  return data;
}

export async function updateProject(projectId, bids) {
  const { data, error } = await supabase
    .from("Projects")
    .update({ bids: bids })
    .eq("id", projectId);

  if (error) {
    throw new Error(error?.message);
  }

  return data;
}

export async function createBid({ Project: projectId, User: userId, bids }) {
  const { data, error } = await supabase.from("Bids").insert({
    Project: projectId,
    User: userId,
    isAccepted: false,
  });

  if (error) {
    throw new Error(error?.message);
  }

  try {
    const newProject = await updateProject(projectId, bids);
    console.log(newProject);
  } catch (error) {
    throw new Error(error?.message);
  }

  return data;
}

export async function getBids() {
  const { data, error } = await supabase.from("Bids").select("*, Projects(*)");

  if (error) {
    throw new Error(error?.message);
  }

  return data;
}
