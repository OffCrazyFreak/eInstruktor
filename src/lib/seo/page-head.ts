import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

interface IPageHeadInput {
	path: string;
	title: string;
	description: string;
	noindex?: boolean;
}

export default function pageHead({
	path,
	title,
	description,
	noindex = false,
}: IPageHeadInput) {
	const url = absoluteUrl(path);

	return {
		meta: [
			{ title: `${title} | ${SITE_NAME}` },
			{ name: "description", content: description },

			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: SITE_NAME },
			{ property: "og:locale", content: "hr_HR" },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:url", content: url },

			...(noindex ? [{ name: "robots", content: "noindex" }] : []),
		],
		links: [{ rel: "canonical", href: url }],
	};
}
