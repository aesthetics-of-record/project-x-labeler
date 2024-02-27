import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { pb } from '@/lib/pocketbase/db';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Project = () => {
  const [images, setImages] = useState<any>([]);
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    pb.collection('images')
      .getList(1, 50, {
        filter: `project_id="${id}"`,
      })
      .then((list: any) => {
        console.log(list);
        setImages(list.items);
      });
  }, []);

  return (
    <div className="p-4 space-y-4 w-[1200px]">
      <header className="">
        <h1 className="font-black text-4xl">PROJECT-DETAIL</h1>
        <p className="text-sm text-slate-700 dark:text-slate-400">
          진행중인 프로젝트 입니다.
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
        {images.map((image: any) => {
          return (
            <Card
            onClick={() => {
              navigate(`/project/${id}/labeler/${image.id}`)
            }}>
              <CardContent>
                <img
                  src={`http://43.201.106.51/api/files/${image.collectionId}/${image.id}/${image.image}`}
                />
                {image.image}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Project;
