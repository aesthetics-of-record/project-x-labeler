import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { Link, useLocation } from 'react-router-dom';
import {
  Dashboard,
  Extensions,
  Home,
  Icon,
  Settings,
} from '@/icons/global';
import { ModeToggle } from '../global/mode-toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const LeftSidebarSm: React.FC = () => {
  let location = useLocation();

  const routes = useMemo(
    () => [
      {
        icon: Home,
        label: '홈화면',
        active: location.pathname === '/',
        href: '/',
      },
      {
        icon: Settings,
        label: '설정',
        active: location.pathname === '/setting',
        href: '/setting',
      },
      {
        icon: Dashboard,
        label: '이미지 라벨러',
        active: location.pathname === '/labeler',
        href: '/labeler',
      },
      {
        icon: Extensions,
        label: '확장프로그램',
        active: location.pathname === '/extensions',
        href: '/extensions',
      },
    ],
    [location]
  );

  return (
    <div className="h-screen flex flex-col gap-y-2 border-r bg-slate-200 dark:bg-slate-900 w-[64px] py-4">
      <section className="flex items-center justify-center group w-full aspect-1">
        <Icon className="dark:text-slate-400 transition duration-300 dark:group-hover:text-slate-200 group-hover:animate-spin text-2xl" />
      </section>

      <div className="flex-1"></div>

      <section className="flex flex-col">
        {routes.map((item: any) => {
          return (
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Link
                    key={item.label}
                    to={item.href}
                    className={cn(
                      'w-[64px] transform hover:-translate-y-[2px] transition duration-300 aspect-1 flex items-center justify-center hover:bg-border',
                      item.active
                        ? 'text-primary hover:text-primary dark:hover:text-primary'
                        : ''
                    )}
                  >
                    <item.icon
                      width={24}
                      height={24}
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </section>

      <div className="px-2 my-1">
        <Separator className="bg-slate-300 dark:bg-slate-700" />
      </div>

      <section className="flex items-center justify-center">
        <div className="">
          <ModeToggle />
        </div>
      </section>
    </div>
  );
};

export default LeftSidebarSm;
