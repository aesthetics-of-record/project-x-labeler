import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { pb } from '@/lib/pocketbase/db';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [projects, setProjects] = useState<any>([]);
  const navigate = useNavigate()

  useEffect(() => {
    pb.collection('projects')
      .getFullList({ sort: 'created' })
      .then((list: any) => {
        console.log(list);

        setProjects(list);
      });
  }, []);

  return (
    <div className="p-4 space-y-4 w-[1200px]">
      <header className="">
        <h1 className="font-black text-4xl">PROJECT</h1>
        <p className="text-sm text-slate-700 dark:text-slate-400">
          새로운 프로젝트를 추가할 수 있습니다.
        </p>
        <div className="h-4" />
        <Button
          className="px-6"
          size={'default'}
          onClick={() => {
            // router.refresh();
          }}
        >
          새로고침
        </Button>
        <div className="h-4" />

        <Separator className="bg-slate-300 dark:bg-slate-700" />
      </header>
      <div className="grid grid-cols-4 gap-4">
        {projects.map((project: any) => {
          return (
            <Card
            onClick={() => {
              navigate("/project/" + project?.id)
            }}>
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
