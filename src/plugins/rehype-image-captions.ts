import type { Element, ElementContent, Root, RootContent } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

/*
 * An image followed by a line that is wholly italic becomes a captioned figure:
 *
 *   ![](/images/posts/slug/photo.jpg)
 *   *Fig. 1: what the photo shows*
 *
 * → <figure><img …><figcaption>Fig. 1: what the photo shows</figcaption></figure>
 *
 * The italic line can sit right under the image or after a blank line. Plain text under an
 * image is left alone — it is often body text, not a caption. Runs after rehype-unwrap-images.
 */

function isElement(node: RootContent | undefined, tagName: string): node is Element {
	return node?.type === "element" && node.tagName === tagName;
}

function isWhitespace(node: RootContent | undefined): boolean {
	return node?.type === "text" && node.value.trim() === "";
}

/** The image `node` holds: the img itself, or a paragraph containing only an img. */
function imageOf(node: RootContent): Element | undefined {
	if (node.type !== "element") return undefined;
	if (node.tagName === "img") return node;
	if (node.tagName !== "p") return undefined;
	const [only, ...more] = node.children.filter((n) => !isWhitespace(n));
	return more.length === 0 && isElement(only, "img") ? only : undefined;
}

/** The italic element, if `node` is a paragraph that is wholly italic. */
function captionOf(node: RootContent | undefined): Element | undefined {
	if (!isElement(node, "p")) return undefined;
	const [only, ...more] = node.children.filter((n) => !isWhitespace(n));
	return more.length === 0 && isElement(only, "em") ? only : undefined;
}

function figure(img: Element, caption: Element): Element {
	return {
		type: "element",
		tagName: "figure",
		properties: {},
		children: [
			img,
			{ type: "element", tagName: "figcaption", properties: {}, children: caption.children },
		],
	};
}

function captionImages(children: RootContent[]): RootContent[] {
	const out: RootContent[] = [];
	for (let i = 0; i < children.length; i++) {
		const node = children[i];
		if (!node) continue;

		// Caption on the line right under the image: one paragraph holding both
		if (isElement(node, "p")) {
			const [img, caption, ...more] = node.children.filter((n) => !isWhitespace(n));
			if (more.length === 0 && isElement(img, "img") && isElement(caption, "em")) {
				out.push(figure(img, caption));
				continue;
			}
		}

		// Caption after a blank line: the image, then a paragraph that is wholly italic
		const img = imageOf(node);
		let next = i + 1;
		while (isWhitespace(children[next])) next++;
		const caption = img ? captionOf(children[next]) : undefined;
		if (img && caption) {
			out.push(figure(img, caption));
			i = next;
			continue;
		}

		out.push(node);
	}
	return out;
}

export const rehypeImageCaptions: Plugin<[], Root> = () => (tree) => {
	visit(tree, (node) => {
		if (node.type === "root") {
			node.children = captionImages(node.children);
		} else if (node.type === "element") {
			node.children = captionImages(node.children) as ElementContent[];
		}
	});
};
