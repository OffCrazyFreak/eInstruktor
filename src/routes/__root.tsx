import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";
import TanStackQueryDevtools from "@/components/custom/devtools/query-devtools-plugin";
import { authConfigQueryOptions } from "@/lib/auth/auth-config.functions";
import AuthStatusProvider from "@/lib/auth/auth-status-provider";
import appCss from "@/styles.css?url";

interface IRouterContext {
	queryClient: QueryClient;
}

interface IRootDocumentProps {
	children: ReactNode;
}

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

export const Route = createRootRouteWithContext<IRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "eInstruktor",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	// Cached for the whole visit, so client navigations never call the server for it again.
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(authConfigQueryOptions()),
	shellComponent: RootDocument,
});

function RootDocument({ children }: IRootDocumentProps) {
	return (
		<html lang="hr" suppressHydrationWarning>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: inline theme script must run before hydration to prevent a flash of the wrong theme */}
				<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
				<HeadContent />
			</head>
			<body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(0,174,243,0.22)]">
				<AuthStatusProvider>{children}</AuthStatusProvider>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
