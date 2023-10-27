import { Button, Spin, Tag } from "antd";
import { useProjects } from "../hooks/useProjects";
import { useCreateBid } from "../hooks/useCreateBid";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useBids } from "../hooks/useBids";

function HomePage() {
  const { projects, fetchingProjects } = useProjects();
  const { createBidAPI, isCreatingBid } = useCreateBid();
  const { currentUser, fetchingUser } = useCurrentUser();
  const { bids, gettingBids } = useBids();

  //Check if an object is inside an array index
  function containsObject(obj, list) {
    console.log(obj);
    console.log(list);
    var i;
    for (i = 0; i < list.length; i++) {
      console.log(list[i].Project);
      if (list[i].Project === obj?.id) {
        return true;
      }
    }

    return false;
  }

  // Handle adding Bids
  function handleClick(project) {
    console.log(project);

    const newBid = {
      Project: project?.id,
      User: currentUser?.at(0).id,
      bids: project?.bids + 1,
    };

    createBidAPI(newBid, {});

    console.log(newBid);
  }

  if (fetchingProjects || fetchingUser || gettingBids) {
    return (
      <div>
        <Spin />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 shadow-sm bg-white shadow-slate-100 md:grid-cols-3">
      {projects.map((project, index) => (
        <div className="flex flex-col items-start" key={index}>
          <img className="h-[10rem] w-full object-cover" src={project?.image} />

          <div className="flex items-center gap-3 mt-4">
            <h3>{project?.title}</h3>
            <Tag color="processing">{project?.projectNumber}</Tag>
          </div>
          <p className="text-sm text-left my-3 h-[5rem] overflow-scroll">
            {project?.description}
          </p>

          <h6 className="mb-4">
            Location: <Tag color="success">{project?.location}</Tag>
          </h6>

          <p>Project owner: {project?.Users.userName}</p>

          {!containsObject(project, bids) && (
            <Button
              onClick={() => handleClick(project)}
              className="w-full h-8 bg-stone-800 text-white my-6 hover:text-white hover:bg-stone-900"
            >
              {isCreatingBid ? <Spin /> : "Bid"}
            </Button>
          )}

          {containsObject(project, bids) && (
            <Button
              onClick={() => handleClick(project)}
              className="w-full h-8 bg-stone-800 text-white my-6 hover:text-white hover:bg-stone-900"
            >
              {isCreatingBid ? <Spin /> : "UnBid"}
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

export default HomePage;
