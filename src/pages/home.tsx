import { Card, CardContent } from "@/components/ui/card";
import { pb } from "@/lib/pocketbase/db";
import { useEffect, useState } from "react";

const Home = () => {
  const [projects, setProjects] = useState<any>([]);

  useEffect(() => {
    pb.collection("projects")
      .getFullList({ sort: "-created" })
      .then((list: any) => {
        console.log(list);

        setProjects(list);
      });
  }, []);

  return (
    <div>
      <div>
        {projects.map((project: any) => {
          return (
            <Card>
              <CardContent>
                <div>{project?.title}</div>
                <div>{project?.description}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
