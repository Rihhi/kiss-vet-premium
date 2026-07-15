import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Az oldal nem található</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A keresett oldal nem létezik vagy áthelyezésre került.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Vissza a főoldalra
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">Hiba történt</h1>
        <p className="mt-2 text-sm text-muted-foreground">Kérjük próbálja újra.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Újrapróbálás
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kiss Állatorvosi Rendelő – Békéscsaba | Prémium állategészségügy" },
      { name: "description", content: "Kiss Állatorvosi Rendelő Békéscsabán. Szeretettel és szakértelemmel kedvence egészségéért. Időpontfoglalás, sürgősségi ellátás, oltások, sebészet." },
      { name: "author", content: "Kiss Állatorvosi Rendelő" },
      { property: "og:title", content: "Kiss Állatorvosi Rendelő – Békéscsaba | Prémium állategészségügy" },
      { property: "og:description", content: "Kiss Állatorvosi Rendelő Békéscsabán. Szeretettel és szakértelemmel kedvence egészségéért. Időpontfoglalás, sürgősségi ellátás, oltások, sebészet." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kiss Állatorvosi Rendelő – Békéscsaba | Prémium állategészségügy" },
      { name: "twitter:description", content: "Kiss Állatorvosi Rendelő Békéscsabán. Szeretettel és szakértelemmel kedvence egészségéért. Időpontfoglalás, sürgősségi ellátás, oltások, sebészet." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3cd68579-c632-4c72-9169-37a3a7accea8/id-preview-5571b454--cf2b657f-2499-4444-8345-c186ff3e6ca1.lovable.app-1783967313672.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3cd68579-c632-4c72-9169-37a3a7accea8/id-preview-5571b454--cf2b657f-2499-4444-8345-c186ff3e6ca1.lovable.app-1783967313672.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="hu">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
